import { ISvgProp } from './types';

export function BlockSvg({ className }: ISvgProp) {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.5 7.5H13.5V5.25C13.5 4.05653 13.0259 2.91193 12.182 2.06802C11.3381 1.22411 10.1935 0.75 9 0.75C7.80653 0.75 6.66193 1.22411 5.81802 2.06802C4.97411 2.91193 4.5 4.05653 4.5 5.25V7.5H1.5C1.10218 7.5 0.720644 7.65804 0.43934 7.93934C0.158035 8.22064 0 8.60218 0 9V19.5C0 19.8978 0.158035 20.2794 0.43934 20.5607C0.720644 20.842 1.10218 21 1.5 21H16.5C16.8978 21 17.2794 20.842 17.5607 20.5607C17.842 20.2794 18 19.8978 18 19.5V9C18 8.60218 17.842 8.22064 17.5607 7.93934C17.2794 7.65804 16.8978 7.5 16.5 7.5ZM6 5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V7.5H6V5.25ZM16.5 19.5H1.5V9H16.5V19.5Z"
        fill="#14B8A6"
      />
    </svg>
  );
}