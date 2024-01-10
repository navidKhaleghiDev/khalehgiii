/* eslint-disable jsx-a11y/click-events-have-key-events */
type PropsType = {
  label: string;
  onClick: () => void;
};

export function BaseChip({ label, onClick }: PropsType) {
  return (
    <div className="h-6 bg-gray-200 rounded-md flex items-center">
      <div className="p-2">{label}</div>
      <div
        className="p-2 select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear"
        onClick={onClick}
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5745 1L1 12.5745"
            stroke="#FEAD69"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1.00024 1L12.5747 12.5745"
            stroke="#FEAD69"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
