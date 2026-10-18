"use client";

import { useEffect, useState } from "react";

const MIN_DELTA = 8;
const ALWAYS_VISIBLE_UNTIL = 120;
const SCROLLED_AFTER = 16;

// `hidden`: scrolling down, shown again as soon as the visitor scrolls up. `scrolled`: the page has left the top.
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      if (Math.abs(y - last) < MIN_DELTA) return;
      setHidden(y > last && y > ALWAYS_VISIBLE_UNTIL);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled, show: () => setHidden(false) };
}
