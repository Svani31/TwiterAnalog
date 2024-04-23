"use client";
import { useEffect } from "react";
import LandingPage from "../components/landing/page";

export default function Home() {
  useEffect(() => {
    const loadScript = () => {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/65fee91a1ec1082f04da6ea7/1hpm3vogl';
      s1.setAttribute('crossorigin', '*');
      
      // Check if s0.parentNode is not null before attempting to insertBefore
      var s0 = document.getElementsByTagName("script")[0];
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        console.error("Unable to find script element in the document.");
      }
    };

    // Load script after component mounts
    loadScript();
  }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
}
