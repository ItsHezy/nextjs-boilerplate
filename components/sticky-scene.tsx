"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type StickySceneProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function StickyScene({
  children,
  className = "",
  contentClassName = "",
}: StickySceneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shell = shellRef.current;

    if (!root || !shell) {
      return;
    }

    let frame = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Keep a CSS progress value in sync with scroll for the sticky motion.
    const update = () => {
      frame = 0;

      if (media.matches) {
        shell.style.setProperty("--sticky-progress", "1");
        shell.style.setProperty("--sticky-progress-inverse", "0");
        return;
      }

      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = Math.max(root.offsetHeight - viewportHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), travel);
      const progress = scrolled / travel;

      shell.style.setProperty("--sticky-progress", progress.toFixed(4));
      shell.style.setProperty(
        "--sticky-progress-inverse",
        (1 - progress).toFixed(4)
      );
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={["relative", className].filter(Boolean).join(" ")}
    >
      <div className="sticky top-0 overflow-visible">
        <div
          ref={shellRef}
          className={["sticky-scene-shell", contentClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
