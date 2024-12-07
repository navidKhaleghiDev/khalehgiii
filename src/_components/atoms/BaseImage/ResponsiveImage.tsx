import { BaseImageProps } from './types';

export function ResponsiveImage({ src, alt, className }: BaseImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
