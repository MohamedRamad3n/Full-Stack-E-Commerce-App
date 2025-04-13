import { useEffect, useState } from "react";
import { toaster } from "../components/ui/toaster";

const InternetConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Close all existing toasts when coming back online
      toaster.dismiss();
      toaster.create({
        title: "You are back online",
        type: "success",
        duration: 3000,
        meta: { closable: true },
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
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