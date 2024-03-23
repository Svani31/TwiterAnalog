"use client";
import { useEffect } from "react";
import LandingPage from "../components/landing/page";

export default function Home() {
  useEffect(() => {
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/65fee91a1ec1082f04da6ea7/1hpm3vogl';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
}
