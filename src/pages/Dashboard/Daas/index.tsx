import { useEffect, useState } from "react";
import { Typography } from "@ui/atoms";
import { ProgressBar } from "@ui/molecules/ProgressBar";

export function Daas({ src }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Typography size="body3">در حال آماده سازی دسکتاپ</Typography>
      <div className="w-1/2">
        <ProgressBar durationInSeconds={3} />
      </div>
    </div>
  ) : (
    <iframe width="100%" height="100%" src={src} title="Desktop As Service" />
  );
}
