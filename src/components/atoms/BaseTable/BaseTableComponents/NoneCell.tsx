import { useState } from 'react';
import { Typography } from '@ui/atoms/Typography';
import checkBoldIcon from '@iconify-icons/ph/check-bold';
import { Icon } from '@iconify/react';
import { TableCell } from '../BaseTableTypes';

export function NoneCell({ row, id, head }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(row[id]);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCopyToClipboard();
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      className=" overflow-hidden overflow-ellipsis group-hover:text-gray-800 rounded-md group-hover:border group-hover-border-gray-300 p-2 group-hover:bg-white group-hover:shadow-lg transition duration-400 z-auto group-hover:absolute  group-hover:max-w-[30vw] group-hover:cursor-pointer flex "
      onClick={handleCopyToClipboard}
    >
      <Typography size={head?.size ? head?.size : 'body3'} type="div">
        {row[id]}
      </Typography>
      {isCopied && (
        <Icon
          icon={checkBoldIcon}
          className="ml-2 text-green-500"
          width="1.5em"
          height="1.5em"
        />
      )}
    </div>
  );
}
