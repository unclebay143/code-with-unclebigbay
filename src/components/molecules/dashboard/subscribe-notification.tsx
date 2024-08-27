import { useState } from 'react';

export const SubscribeNotification = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubscribe = () => {
    setShowConfirm(true);
    setTimeout(() => {
      window.open(
        'https://www.youtube.com/@unclebigbay?sub_confirmation=1',
        '_blank',
      );
      setShowConfirm(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-4 p-4 bg-slate-900  rounded-md ">
      {!showConfirm ? (
        <button
          onClick={handleSubscribe}
          className="text-white font-medium hover:underline"
        >
          Hi there! Subscribe to our YouTube channel
        </button>
      ) : (
        <p className="text-white font-medium">Subscribing...</p>
      )}
    </div>
  );
};
