import { IBaseImage } from './types';

export function ResponsiveImage({ src, alt, className }: IBaseImage) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
