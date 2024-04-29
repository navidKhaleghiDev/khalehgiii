export function CustomTolltip({ title }) {
  const titleStyle =
    'group-hover:flex group-hover:border group-hover-border-gray-300 p-2 group-hover:bg-white group-hover:shadow-lg transition duration-400 group-hover:absolute group-hover:max-w-[30vw] group-hover:cursor-pointer group-hover:text-gray-800 rounded-md z-100';
  return (
    <span className={`-top-5 absolute hidden bg-red-white ${titleStyle} `}>
      {title}
    </span>
  );
}
