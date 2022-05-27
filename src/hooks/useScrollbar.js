import { useEffect, useRef } from "react";
import "../scrollbar.css";

const useScrollbar = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    let timer;

    const onScroll = (e) => {
      if (!scrollElement) {
        return;
      }
      e.target.classList.add("scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => {
        e.target.classList.remove("scrolling");
      }, 200);
    };

    scrollElement?.addEventListener("scroll", onScroll);

    return () => {
      scrollElement?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollRef;
};

export default useScrollbar;
