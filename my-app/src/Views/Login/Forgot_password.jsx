import React, { useState, useEffect } from "react";

const Forgot_Password = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const handleSendRequest = (e) => {
    e.preventDefault();
    alert("Yêu cầu khôi phục mật khẩu đã được gửi!");
    setShowOTP(true);
    setTimer(120); // Bắt đầu đếm ngược 120 giây
  };

  // Hiện cảnh báo mã OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Sang 1 trang khác 
    
  };

  // Xử lý Countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200 p-6">
      <div className="flex rounded-2xl bg-gradient-to-b from-pink-500 via-pink-400 to-orange-400 shadow-lg max-w-4xl w-full p-6 sm:p-10">

        {/* Hình ảnh bên trái */}
        <div className="relative flex-shrink-0 rounded-2xl overflow-hidden max-w-[280px] w-full">
          <img
            alt="Reset password illustration"
            className="w-full h-full object-cover"
            src="https://stories.freepiklabs.com/storage/33427/Forgot-password_Mesa-de-trabajo-1.svg"
          />
        </div>

        {/* Form bên phải */}
        <div className="flex flex-col flex-grow ml-8 justify-center max-w-lg w-full">
          <h2 className="text-3xl text-black font-bold mb-6">
            {showOTP ? "Enter Verification Code" : "Forgot your password?"}
            <br />
            <span className="text-4xl text-cyan-400 ml-35">
              {showOTP ? "Check Your Gmail" : "Recover Now"}
            </span>
          </h2>

          {/* Form nhập Email / SĐT */}
          {!showOTP && (
            <form className="space-y-4 max-w-md w-full" onSubmit={handleSendRequest}>
              <div className="relative">
                <input
                  className="w-full rounded-lg border-2 border-black bg-pink-200 px-4 py-3 text-sm tracking-widest placeholder-black focus:outline-none shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                  placeholder="Enter your Email or Phone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="mt-4 max-w-[200px] rounded-lg border-2 border-black bg-pink-200 px-6 py-3 text-sm tracking-widest shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-pink-100"
                  type="submit"
                >
                  Send Request
                </button>
              </div>
            </form>
          )}

          {/* Form nhập OTP */}
          {showOTP && (
            <form className="space-y-4 max-w-md w-full" onSubmit={handleVerifyOTP}>
              <div className="relative">
                <input
                  className="w-full text-center rounded-lg border-2 border-black bg-pink-200 px-4 py-3 text-xl tracking-[10px] placeholder-black focus:outline-none shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                  placeholder="_____" // 5 ký tự
                  type="text"
                  maxLength={5}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="mt-4 max-w-[200px] rounded-lg border-2 border-black bg-pink-200 px-6 py-3 text-sm tracking-widest shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-pink-100"
                  type="submit"
                >
                  Verify
                </button>

                {timer > 0 ? (
                  <span className="text-sm text-black">Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    className="text-sm text-pink-600 underline hover:text-red-600"
                    onClick={() => setTimer(120)}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Back to login */}
          <p className="text-xs text-black mt-4 text-right">
            Back to 
            <a className="text-sm text-pink-600 hover:underline" href="/login"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;
