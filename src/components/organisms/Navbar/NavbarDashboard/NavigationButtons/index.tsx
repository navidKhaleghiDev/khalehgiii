import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import arrowLeftBoldIcon from "@iconify-icons/ph/arrow-left-bold";
import arrowRightBoldIcon from "@iconify-icons/ph/arrow-right-bold";
import arrowClockwiseBoldIcon from "@iconify-icons/ph/arrow-clockwise-bold";

import { IconButton } from "@ui/atoms/BaseButton";

export const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    // On a new route, add it to our history stack and update the current index.
    if (location.pathname !== historyStack[currentIndex]) {
      setHistoryStack((prev) => [
        ...prev.slice(0, currentIndex + 1),
        location.pathname,
      ]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [location.pathname]);

  const refreshPage = () => {
    navigate(0);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < historyStack.length - 1;

  return (
    <div className="flex">
      <IconButton
        icon={arrowClockwiseBoldIcon}
        size="xl"
        className="ml-4 rounded-3xl"
        color="tealNoBg"
        onClick={refreshPage}
      />
      <IconButton
        icon={arrowRightBoldIcon}
        size="xl"
        className="ml-4 rounded-3xl"
        color={canGoForward ? "tealNoBg" : "neutralNoBg"}
        onClick={() => {
          navigate(1);
          setCurrentIndex((prev) => prev + 1);
        }}
        disabled={!canGoForward}
      />
      <IconButton
        icon={arrowLeftBoldIcon}
        size="xl"
        className="ml-4 rounded-3xl"
        color={canGoBack ? "tealNoBg" : "neutralNoBg"}
        onClick={() => {
          navigate(-1);
          setCurrentIndex((prev) => prev - 1);
        }}
        disabled={!canGoBack}
      />
    </div>
  );
};
