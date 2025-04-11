import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [phone, setPhone] = useState("919026944460");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [timer, setTimer] = useState(0);
  const { loginWithOtp, sendOtp, resendOtp } = useAuth();
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format (should start with country code)
    if (!/^[0-9]{10,12}$/.test(phone.replace(/\s/g, ''))) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number with country code",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number (add country code if not present)
      let formattedPhone = phone;
      if (!formattedPhone.startsWith("91")) {
        formattedPhone = `91${formattedPhone}`;
      }

      const response = await sendOtp(formattedPhone);
      setRequestId(response.request_id);
      setShowOtpInput(true);
      setTimer(30); // 30 seconds countdown for resend

      toast({
        title: "OTP Sent",
        description: "OTP has been sent to your phone number",
      });

      // Focus the first OTP input
      if (otpInputRefs[0].current) {
        otpInputRefs[0].current.focus();
      }
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Unable to send OTP. Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter the complete 4-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number if not already formatted
      let formattedPhone = phone;
      if (!formattedPhone.startsWith("91")) {
        formattedPhone = `91${formattedPhone}`;
      }

      await loginWithOtp(formattedPhone, otpValue);

      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
      });
    } catch (error) {
      // Improved error handling
      let errorMessage = "Please try again.";

      // Check if it's an Axios error with a response from the server
      if (error.response && error.response.data && error.response.data.error) {
        // Use the server's error message
        errorMessage = error.response.data.error;
      } else if (error.message) {
        // If there's no specific server error but there is a message
        errorMessage = error.message;
      }

      toast({
        title: "Login Failed",
        description: `${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;

    setIsSubmitting(true);

    try {
      // Format phone number if not already formatted
      let formattedPhone = phone;
      if (!formattedPhone.startsWith("91")) {
        formattedPhone = `91${formattedPhone}`;
      }

      await resendOtp(formattedPhone);
      setTimer(30); // Reset timer

      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your phone number",
      });
    } catch (error) {
      toast({
        title: "Failed to Resend OTP",
        description: "Unable to resend OTP. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3 && otpInputRefs[index + 1].current) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpInputRefs[index - 1].current) {
      otpInputRefs[index - 1].current.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#7E3AF2] bg-opacity-10">
              <div className="absolute inset-0 m-1.5 rounded-full bg-[#7E3AF2]"></div>
              <div className="absolute inset-0 m-4 rounded-full bg-white"></div>
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            {showOtpInput ? "Enter OTP" : "Welcome Back"}
          </CardTitle>
          <p className="text-center text-gray-600">
            {showOtpInput
              ? `OTP sent to ${phone}`
              : "Login with your mobile number"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {!showOtpInput ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Enter your phone number with country code (e.g., 91 for India)
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-covrzy-purple hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Sending OTP
                  </span>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  One-Time Password
                </label>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      ref={otpInputRefs[index]}
                      className="w-12 h-12 text-center text-lg"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-covrzy-purple hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Verifying
                  </span>
                ) : (
                  "Verify & Login"
                )}
              </Button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isSubmitting}
                  className="text-sm text-covrzy-purple hover:underline disabled:text-gray-400 disabled:no-underline"
                >
                  {timer > 0
                    ? `Resend OTP in ${formatTime(timer)}`
                    : "Resend OTP"}
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp(["", "", "", ""]);
                  }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-500">
            For admin login <Link to="/admin/login" className="text-covrzy-purple hover:underline">click here</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;