
'use client';
import React, { useState } from 'react';

type Props = {
  id: string; // YouTube video id
  title: string;
  className?: string;
};

export default function LiteYouTube({ id, title, className = '' }: Props) {
  const [play, setPlay] = useState(false);
  const src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-black ${className}`}>
      {play ? (
        <iframe
          className="w-full h-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setPlay(true)}
          className="group w-full h-full relative"
        >
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:bg-white shadow">
              ▶
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
