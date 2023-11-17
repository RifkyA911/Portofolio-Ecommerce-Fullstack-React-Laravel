import { useEffect } from "react";
import Echo from "laravel-echo";

const Testing = () => {
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "your-pusher-key", // Sesuaikan dengan kunci Pusher Anda
      cluster: "your-pusher-cluster", // Sesuaikan dengan cluster Pusher Anda
      encrypted: true,
    });

    echo
      .channel(`App.Models.User.${userId}`)
      .listen("YourEventName", (data) => {
        console.log("Received data:", data);
        // Lakukan sesuatu dengan data yang diterima
      });

    return () => {
      // Bersihkan listener jika komponen di-unmount
      echo.leaveChannel(`App.Models.User.${userId}`);
    };
  }, [userId]);

  //   return (
  //     // ... your component JSX
  //   );
};

export default Testing;
