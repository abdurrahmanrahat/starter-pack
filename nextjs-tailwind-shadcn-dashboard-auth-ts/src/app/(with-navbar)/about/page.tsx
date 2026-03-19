"use client";

import { toast } from "sonner";

const AboutPage = () => {
  const showToast = () => {
    // toast.success("Test");
    toast.error("err");
    console.log("tt");
  };
  return (
    <div>
      AboutPage
      <button onClick={showToast}>Show</button>
    </div>
  );
};

export default AboutPage;
