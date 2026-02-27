import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-full max-h-full p-4">
        <div className="w-[600px] h-[844px] sm:w-[400px] sm:h-[780px] bg-white/5 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
