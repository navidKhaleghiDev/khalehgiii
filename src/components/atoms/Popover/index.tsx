export function Popover() {
  return (
    <div className="bg-red-100 p-2 relative flex">
      <div className="bg-red-300 p-2">click</div>
      <div className="bg-red-300 p-2 absolute left-[-50px] flex items-center">
        {/* <svg
            className="absolute z-10  bottom-[-10px] "
            width={16}
            height={10}
            viewBox="0 0 16 10"
            fill="#f0f"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="#f0f" />
          </svg> */}
        <svg
          className="absolute z-10  right-[-0.9rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M21 12l-18 12v-24z" />
        </svg>
        tooltip
      </div>
    </div>
  );
}
