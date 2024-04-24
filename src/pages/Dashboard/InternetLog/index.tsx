export function InternetLog() {
  return (
    <div className="flex w-full items-center justify-center  mt-40">
      <iframe
        title="internet-log"
        className="w-full h-screen scale-125"
        src={import.meta.env.VITE_SARG_BASE_URL}
      />
    </div>
  );
}
