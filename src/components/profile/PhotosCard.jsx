import React from 'react';

const PHOTOS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=150&fit=crop',
];

export default function PhotosCard() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">My Photos</h3>
        <button className="text-sm text-primary font-medium hover:underline">See all</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {PHOTOS.map((src, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}