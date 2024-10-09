import { Typography } from '@ui/atoms/Typography';

export function BaseTableNoneCell(props) {
  const { row, id, header } = props;

  return (
    <div role="button" tabIndex={0} className=" flex cursor-text">
      <Typography
        variant={header?.variant ? header?.variant : 'body4'}
        type="div"
      >
        {row[id] ? row[id] : '--'}
      </Typography>
    </div>
  );
}
