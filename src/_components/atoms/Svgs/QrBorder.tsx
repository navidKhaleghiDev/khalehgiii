interface QrBorderProps extends React.PropsWithChildren {
  className?: string;
}

export function QrBorder({ className, children }: QrBorderProps) {
  return (
    <svg
      width="182"
      height="183"
      viewBox="0 0 182 183"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="11"
        y="11"
        width="160"
        height="160"
        fill="url(#pattern0_3047_33518)"
      />
      <path d="M1 28L0.999999 1.5L28.5 1.5" stroke="#111827" />
      <path d="M154.5 1H181V28.5" stroke="#111827" />
      <path d="M181 155L181 181.5L153.5 181.5" stroke="#111827" />
      <path d="M27.5 182L1 182L1 154.5" stroke="#111827" />
      <defs>
        <pattern
          id="pattern0_3047_33518"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_3047_33518" transform="scale(0.00444444)" />
        </pattern>
      </defs>
      <g className="" transform="translate(10, 10)">
        {children}
      </g>
    </svg>
  );
}
