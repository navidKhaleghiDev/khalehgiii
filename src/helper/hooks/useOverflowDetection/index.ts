import { useState, useEffect, useCallback } from 'react';

// function calculatePercentage(targetWidth: number, baseWidth: number) {
//   const updatedData = (targetWidth / baseWidth) * 100;
//   return updatedData.toFixed();
// }

export function useOverflowCheck() {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (updatedId: string) => {
    setIsHovered(true);
    setId(updatedId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const checkOverflow = useCallback(() => {
    if (!id) return;

    const cellRef = document.getElementById(id);
    if (cellRef) {
      const overflow = cellRef.scrollWidth > cellRef.offsetWidth;
      setIsOverflowing(overflow);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      checkOverflow();
    }

    const handleResize = () => checkOverflow();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [id, checkOverflow]);

  return {
    isOverflowing,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
