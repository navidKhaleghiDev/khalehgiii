import PhImage from '@iconify-icons/ph/image';
import { BaseIcon, Card } from '@redesignUi/atoms';

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
        <BaseIcon icon={PhImage} color="neutral" size="md" />
      )}
    </Card>
  );
}
