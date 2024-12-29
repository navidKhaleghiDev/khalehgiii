export type CVA<T extends Record<string, string>> = {
  (props: any): string;
  base?: string;
  variants?: {
    [key in keyof T]: string[];
  };
  defaultVariants?: Partial<T>;
};
