import React, { useEffect, useState } from "react";

const OfflinePage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
    window.location.reload();
  };

  if (isOnline) {
    return <div>You are now online. Page reloading...</div>;
  } else {
    return <div>You are offline. Please check your internet connection.</div>;
  }
}

export default OfflinePage;