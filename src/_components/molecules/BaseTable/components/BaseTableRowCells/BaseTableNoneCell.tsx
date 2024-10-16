import { Typography } from '@redesignUi/atoms/Typography/Typography';

export function BaseTableNoneCell(props) {
  const { row, header, id } = props;

  const cellLabel = Array.isArray(id)
    ? id.map((i: string) => `${row[i]} `)
    : row[id];

  return (
    <div className="group w-full">
      <div className="relative w-full max-w-[300px] overflow-hidden group">
        <Typography
          variant={header?.variant ? header?.variant : 'body6'}
          type="p"
          className="text-center whitespace-nowrap text-ellipsis overflow-hidden group-hover:whitespace-nowrap group-hover:overflow-visible transition-transform duration-1000 ease-linear group-hover:translate-x-[50%] group-hover:duration-[1000ms]"
        >
          {cellLabel ?? '--'}
        </Typography>
      </div>
    </div>
  );
}
