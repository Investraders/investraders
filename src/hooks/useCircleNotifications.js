import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Subscribes to new posts and responses in a circle and creates
 * notifications for all circle members (except the author).
 */
export function useCircleNotifications({ circle, user }) {
  useEffect(() => {
    if (!circle || !user) return;

    const notifyMembers = async (message, type) => {
      const memberIds = circle.member_ids || [];
      const recipients = memberIds.filter((id) => id !== user.id);
      if (recipients.length === 0) return;

      await Promise.all(
        recipients.map((userId) =>
          base44.entities.Notification.create({
            user_id: userId,
            type,
            message,
            circle_id: circle.id,
            circle_name: circle.name,
            is_read: false,
          })
        )
      );
    };

    const unsubPost = base44.entities.Post.subscribe((event) => {
      if (event.type === 'create' && event.data?.circle_id === circle.id) {
        const author = event.data.author_name || 'Someone';
        notifyMembers(`${author} posted in ${circle.name}`, 'new_post');
      }
    });

    const unsubResponse = base44.entities.CircleResponse.subscribe((event) => {
      if (event.type === 'create' && event.data?.circle_id === circle.id) {
        const author = event.data.author_name || 'Someone';
        notifyMembers(`${author} responded to a question in ${circle.name}`, 'new_response');
      }
    });

    const unsubComment = base44.entities.Comment.subscribe((event) => {
      // Only notify if this comment belongs to a post in THIS circle
      if (event.type === 'create' && event.data?.circle_id === circle.id) {
        const author = event.data.author_name || 'Someone';
        notifyMembers(`${author} commented in ${circle.name}`, 'new_comment');
      }
    });

    return () => {
      unsubPost();
      unsubResponse();
      unsubComment();
    };
  }, [circle?.id, user?.id]);
}