import { ISvgProp } from './types';

export function PassSvg({ className }: ISvgProp) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.0244 1.4686C6.97566 1.27656 7.0049 1.07303 7.10573 0.902468C7.20655 0.731908 7.37077 0.608174 7.56252 0.558289C9.16136 0.145935 10.8387 0.145935 12.4375 0.558289C12.6146 0.60363 12.769 0.712088 12.8718 0.863279C12.9746 1.01447 13.0186 1.19798 12.9955 1.37933C12.9725 1.56068 12.884 1.72737 12.7467 1.84808C12.6095 1.96879 12.4328 2.03521 12.25 2.03485C12.1868 2.03452 12.1238 2.02633 12.0625 2.01048C10.7097 1.66155 9.29039 1.66155 7.93752 2.01048C7.84198 2.03496 7.74255 2.04037 7.64492 2.02637C7.54729 2.01238 7.45338 1.97927 7.36856 1.92894C7.28375 1.87861 7.20969 1.81204 7.15063 1.73305C7.09158 1.65406 7.04868 1.56419 7.0244 1.4686ZM3.04284 3.16923C1.8864 4.34653 1.04771 5.7981 0.605336 7.38798C0.577169 7.48349 0.568305 7.58365 0.579259 7.68263C0.590214 7.7816 0.620769 7.8774 0.669141 7.96444C0.717513 8.05149 0.782734 8.12802 0.860999 8.18959C0.939265 8.25116 1.02901 8.29652 1.12499 8.32304C1.22097 8.34956 1.32128 8.35669 1.42005 8.34403C1.51882 8.33138 1.61408 8.29917 1.70027 8.24931C1.78647 8.19945 1.86187 8.13292 1.92208 8.0536C1.98229 7.97429 2.0261 7.88378 2.05096 7.78735C2.42489 6.44183 3.1346 5.21339 4.11346 4.21735C4.24147 4.07335 4.30916 3.88561 4.30248 3.69306C4.29581 3.5005 4.21528 3.3179 4.0776 3.18311C3.93992 3.04833 3.75565 2.9717 3.563 2.96911C3.37034 2.96653 3.18408 3.03818 3.04284 3.16923ZM2.05096 12.2077C2.02461 12.1127 1.97983 12.0239 1.91916 11.9463C1.8585 11.8687 1.78314 11.8038 1.69739 11.7553C1.61164 11.7068 1.51718 11.6757 1.4194 11.6637C1.32163 11.6517 1.22244 11.6591 1.12752 11.6855C1.0326 11.7118 0.9438 11.7566 0.866186 11.8173C0.788573 11.8779 0.723669 11.9533 0.675179 12.039C0.62669 12.1248 0.595564 12.2193 0.583581 12.317C0.571597 12.4148 0.578989 12.514 0.605336 12.6089C1.04771 14.1988 1.8864 15.6504 3.04284 16.8277C3.11119 16.9007 3.19345 16.9593 3.28479 17C3.37612 17.0407 3.47468 17.0628 3.57467 17.0649C3.67465 17.067 3.77405 17.049 3.867 17.0121C3.95995 16.9753 4.04459 16.9201 4.11593 16.85C4.18727 16.78 4.24387 16.6963 4.2824 16.604C4.32094 16.5117 4.34062 16.4127 4.34031 16.3127C4.33999 16.2127 4.31967 16.1137 4.28055 16.0217C4.24144 15.9296 4.18431 15.8464 4.11252 15.7767C3.13489 14.7803 2.42564 13.5524 2.05096 12.2077ZM12.0625 17.9892C10.7097 18.3385 9.29034 18.3385 7.93752 17.9892C7.84162 17.9629 7.74143 17.9559 7.64279 17.9686C7.54416 17.9814 7.44904 18.0136 7.36298 18.0635C7.27692 18.1133 7.20163 18.1798 7.14151 18.259C7.08138 18.3382 7.0376 18.4286 7.01274 18.5249C6.98787 18.6212 6.9824 18.7215 6.99666 18.8199C7.01091 18.9184 7.0446 19.013 7.09576 19.0983C7.14693 19.1836 7.21454 19.2578 7.29467 19.3167C7.37481 19.3756 7.46586 19.418 7.56252 19.4414C9.16136 19.8538 10.8387 19.8538 12.4375 19.4414C12.6274 19.3893 12.7892 19.2645 12.8879 19.0941C12.9866 18.9237 13.0143 18.7213 12.9651 18.5307C12.9159 18.34 12.7936 18.1763 12.6247 18.075C12.4559 17.9737 12.2539 17.9429 12.0625 17.9892ZM18.8735 11.6874C18.7785 11.661 18.6794 11.6536 18.5816 11.6656C18.4838 11.6775 18.3893 11.7087 18.3036 11.7571C18.2178 11.8056 18.1425 11.8705 18.0818 11.9482C18.0211 12.0258 17.9764 12.1146 17.95 12.2095C17.5764 13.5554 16.8666 14.7843 15.8875 15.7805C15.8185 15.8508 15.764 15.934 15.7272 16.0253C15.6903 16.1167 15.6718 16.2144 15.6728 16.3129C15.6737 16.4114 15.694 16.5088 15.7325 16.5994C15.7711 16.6901 15.8271 16.7723 15.8974 16.8413C15.9677 16.9103 16.0509 16.9647 16.1422 17.0016C16.2336 17.0384 16.3313 17.0569 16.4298 17.056C16.5283 17.0551 16.6257 17.0348 16.7163 16.9963C16.807 16.9577 16.8891 16.9017 16.9581 16.8314C18.1144 15.654 18.9531 14.2025 19.3956 12.6127C19.4223 12.5176 19.4299 12.4182 19.4181 12.3203C19.4062 12.2223 19.3752 12.1276 19.3267 12.0416C19.2781 11.9556 19.2131 11.8801 19.1354 11.8193C19.0576 11.7585 18.9686 11.7137 18.8735 11.6874ZM17.9491 7.79298C17.9754 7.8879 18.0202 7.9767 18.0809 8.05431C18.1415 8.13193 18.2169 8.19683 18.3027 8.24532C18.3884 8.29381 18.4829 8.32493 18.5806 8.33692C18.6784 8.3489 18.7776 8.34151 18.8725 8.31516C18.9674 8.28882 19.0562 8.24403 19.1339 8.18337C19.2115 8.1227 19.2764 8.04734 19.3249 7.96159C19.3734 7.87584 19.4045 7.78138 19.4165 7.68361C19.4284 7.58583 19.4211 7.48665 19.3947 7.39173C18.9523 5.80185 18.1136 4.35028 16.9572 3.17298C16.8889 3.09997 16.8066 3.04138 16.7153 3.00064C16.6239 2.9599 16.5254 2.93784 16.4254 2.93575C16.3254 2.93367 16.226 2.9516 16.133 2.98849C16.0401 3.02539 15.9555 3.0805 15.8841 3.15059C15.8128 3.22068 15.7562 3.30433 15.7176 3.39661C15.6791 3.4889 15.6594 3.58796 15.6597 3.68797C15.6601 3.78798 15.6804 3.88691 15.7195 3.97895C15.7586 4.07099 15.8157 4.15428 15.8875 4.22391C16.865 5.2201 17.5743 6.44765 17.9491 7.79204V7.79298Z"
        fill="#14B8A6"
      />
    </svg>
  );
}