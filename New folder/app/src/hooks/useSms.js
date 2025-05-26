import { useState } from "react";

export function useSms() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendSms = async (orderId, phoneNumber, text) => {
    setIsSending(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://sms.panel.com/api/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "API_KEY_HERE", // 🔥 اینجا API Key خود را بگذارید
          phone: phoneNumber,
          message: text,
          sender: "YourCompanyName",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "خطایی رخ داده است.");
      }
    } catch (err) {
      setError("مشکلی در اتصال به سرور وجود دارد.");
    } finally {
      setIsSending(false);
    }
  };

  return {
    isSending,
    error,
    success,
    sendSms,
  };
}

