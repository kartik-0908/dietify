"use client";

import { Button } from "./ui/button";

export const WaitlistButton = () => {


   const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <Button
      onClick={() => scrollToSection("waitlist")}
      className="bg-[#2E2C2C] text-[#FF4601] font-semibold font-[Helvetica] hover:bg-[#3D3B3B]"
    >
      JOIN WAITLIST
    </Button>
  );
};
