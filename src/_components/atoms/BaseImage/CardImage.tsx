import PhImage from '@iconify-icons/ph/image';
import { BaseIcon, Card } from '@ui/atoms';

import { IBaseImage } from './types';
import { ResponsiveImage } from './ResponsiveImage';

export function CardImage({ src, alt, className }: Partial<IBaseImage>) {
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
