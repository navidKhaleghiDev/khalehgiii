import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export function useClickOutside(props: {
  ref: MutableRefObject<HTMLDivElement | null>;
  setValue: Dispatch<SetStateAction<boolean>>;
  value: boolean;
}) {
  const { ref, setValue, value } = props;
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event?.target as Node) &&
        value
      ) {
        setValue(!value);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setValue, value]);
}
