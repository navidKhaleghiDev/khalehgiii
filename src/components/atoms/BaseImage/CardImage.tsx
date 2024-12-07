import { BaseIcon, Card } from '@ui/atoms';
import imageIcon from '@iconify-icons/ph/image';

import { BaseImageProps } from './types';
import { ResponsiveImage } from './ResponsiveImage';

export function CardImage({ src, alt, className }: Partial<BaseImageProps>) {
  return (
    <Card
      color="neutral"
      className={`bg-gray-200 flex justify-center items-center ${className}`}
    >
      {src ? (
        <ResponsiveImage src={src} alt={alt ?? ''} />
      ) : (
        <BaseIcon icon={imageIcon} color="neutral" size="xxl" />
      )}
    </Card>
  );
}
