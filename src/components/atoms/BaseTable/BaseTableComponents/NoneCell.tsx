import { Typography } from '@ui/atoms/Typography';

export function NoneCell({ row, id, head }: any) {
  return (
    <Typography
      size={head?.size ? head?.size : 'body3'}
      type="div"
      className={` overflow-hidden overflow-ellipsis group-hover:text-gray-800 rounded-md group-hover:border group-hover-border-gray-300 p-2 group-hover:bg-white group-hover:shadow-lg transition duration-400 z-auto group-hover:absolute  group-hover:max-w-[30vw] group-hover:cursor-pointer `}
    >
      {row[id]}
    </Typography>
  );
}
