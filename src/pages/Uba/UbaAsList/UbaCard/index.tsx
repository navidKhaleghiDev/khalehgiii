import { BaseIcon, Card, Typography } from '@ui/atoms';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IUba } from '@src/services/analyze/types';
import { StringifyProperties } from '@src/types/global';

type ProductCardProps = {
  uba: StringifyProperties<IUba> | IUba;
  isHeader?: boolean;
};

export function UbaCard({ uba, isHeader }: ProductCardProps) {
  const overflowUiStyle = {
    typo: !isHeader
      ? 'group-hover:text-gray-800 group-hover:overflow-visible rounded-md group-hover:whitespace-normal group-hover:overflow-auto group-hover:border group-hover:shadow-lg  group-hover-border-gray-300  p-2 group-hover:bg-white transition duration-300 z-auto'
      : '',
    div: 'group w-3/12 text-center break-words text-ellipsis whitespace-nowrap overflow-hidden overflow-ellipsis px-6',
  };

  const repetedStyle = `${overflowUiStyle.typo} ${
    isHeader ? 'uppercase' : ''
  } `;

  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && 'bg-teal-500 text-white'} flex ${
          isHeader ? 'h-10' : 'h-14'
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <Typography
          size="body4"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {uba.username}
        </Typography>

        <Typography
          size="body4"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {!isHeader ? dateAndNumber(uba.updated_at) : uba.updated_at}
        </Typography>

        <div className={overflowUiStyle.div} dir="ltr">
          <Typography size="body4" type="div" className={repetedStyle}>
            {uba.original_file_name}
          </Typography>
        </div>

        <div className={overflowUiStyle.div} dir="ltr">
          {Array.isArray(uba.file_names) ? (
            <Typography size="body4" type="div" className={repetedStyle}>
              {uba.file_names.map((item) => ` ${item} ,`)}
            </Typography>
          ) : (
            <Typography size="body4" type="div" className={repetedStyle}>
              {uba.file_names}
            </Typography>
          )}
        </div>

        <Typography
          size="body4"
          type="div"
          className="px-3 w-2/12 text-center uppercase"
        >
          {uba.malbehave_count}
        </Typography>

        <Typography
          size="body4"
          type="div"
          className="w-1/12 text-center break-words text-ellipsis uppercase"
        >
          {isHeader ? (
            uba.is_ban
          ) : (
            <div className="w-full flex justify-center ">
              <BaseIcon
                icon={uba.is_ban ? lockKeyFillIcon : lockKeyOpenFillIcon}
                color={uba.is_ban ? 'red' : 'teal'}
              />
            </div>
          )}
        </Typography>
        <Typography
          size="body4"
          type="div"
          className="px-3 w-1/12 text-center uppercase"
        >
          {uba.transmission_type}
        </Typography>
      </Card>
    </>
  );
}
