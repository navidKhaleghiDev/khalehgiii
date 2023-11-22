import { PALLET } from "@src/constants/theme";
import { cva } from "class-variance-authority";

export const baseIconStyles = cva("fill-current", {
  variants: {
    color: {
      neutral: `${PALLET.TEXT_COLOR.NEUTRAL}`,
      teal: `${PALLET.TEXT_COLOR.TEAL}`,
      yellow: `${PALLET.TEXT_COLOR.YELLOW}`,
      red: `${PALLET.TEXT_COLOR.RED}`,
      tealLink: ``,
      textLink: ``,
    },
    hoverColor: {
      primary: "hover:text-teal-600",
      default: "", // it should be empty
    },
    size: {
      xs: "h-4 w-4",
      sm: "h-3 w-3",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
      xxl: "h-16 w-16",
      xxxl: "h-20 w-20",
      default: "",
    },
  },
});
