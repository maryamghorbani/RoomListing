import { memo } from 'react';
import type { RoomMedia } from '@/types/room.ts';
import { ImageMedia } from './ImageMedia.tsx';
import { VideoMedia } from './VideoMedia.tsx';

interface MediaViewerProps {
  media: RoomMedia[];
  alt?: string;
}

function MediaViewerComponent({ media, alt }: MediaViewerProps) {
  const primary = media[0];
  if (!primary) return null;

  const images = media.filter((m) => m.type === 'image');

  if (primary.type === 'image') {
    return <ImageMedia images={images} alt={alt} />;
  }

  return <VideoMedia url={primary.url} />;
}

export const MediaViewer = memo(MediaViewerComponent);
