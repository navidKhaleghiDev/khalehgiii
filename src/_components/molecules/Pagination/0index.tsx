/* eslint-disable jsx-a11y/anchor-is-valid */
import PhCaretDoubleLeft from '@iconify-icons/ph/caret-double-left';
import { BaseIcon } from '@ui/atoms';

const dataMock = [
  { id: '1', number: 1 },
  { id: '2', number: 2 },
  { id: '3', number: 3 },
  { id: '4', number: 4 },
  { id: '5', number: 5 },
];
const mClass =
  'flex w-8 h-8 mx-0.5 p-0 justify-center items-center rounded-md leading-tight text-xl text-teal-600 bg-white border border-teal-600 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
export function Pagination() {
  return (
    <div dir="ltr" className="mt-auto flex w-full items-center justify-center">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a href="#" className={mClass}>
              <span className="sr-only">Previous</span>
              <BaseIcon icon={PhCaretDoubleLeft} />
            </a>
          </li>
          {dataMock.map((item) => (
            <li key={item.id}>
              <a href="#" className={mClass}>
                {item.number}
              </a>
            </li>
          ))}

          <li>
            <a href="#" className={mClass}>
              <span className="sr-only">Next</span>
              <BaseIcon icon={PhCaretDoubleLeft} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
