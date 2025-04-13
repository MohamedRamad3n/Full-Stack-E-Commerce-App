import { useEffect, useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useDispatch } from "react-redux";
import { setIsOnline } from "../app/features/newtworkSlice";
const InternetConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setIsOnline(true));
      toaster.dismiss();
      toaster.create({
        title: "You are back online",
        type: "success",
        duration: 3000,
        meta: { closable: true },
      });
    };

    const handleOffline = () => {
      dispatch(setIsOnline(false));
      toaster.create({
        title: "You are offline",
        description: "Please check your internet connection",
        type: "wrining",
        duration: undefined,
        meta: { closable: false },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show initial status if offline
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
};

export default InternetConnectionProvider;