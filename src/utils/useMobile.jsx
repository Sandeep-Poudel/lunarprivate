import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        );
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
}

function useIsSidebarOpen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsSidebarOpen(!document.querySelector(".sidebar").classList.contains("-translate-x-full"));
    };
    window.addEventListener("resize", onChange);
    onChange();
    return () => window.removeEventListener("resize", onChange);
  }, []);

  return isSidebarOpen;
}

export { useIsMobile, useIsSidebarOpen };