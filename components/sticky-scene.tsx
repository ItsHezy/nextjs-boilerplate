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
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const shell = shellRef.current;

    if (!root || !shell) {
      return;
    }

    let frame = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setProgress = (value: number) => {
      shell.style.setProperty("--sticky-progress", value.toFixed(4));
      shell.style.setProperty(
        "--sticky-progress-inverse",
        (1 - value).toFixed(4)
      );
    };

    const animate = () => {
      if (media.matches) {
        currentProgressRef.current = 1;
        targetProgressRef.current = 1;
        setProgress(1);
        frame = 0;
        return;
      }

      const delta = targetProgressRef.current - currentProgressRef.current;

      if (Math.abs(delta) < 0.0015) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
        frame = 0;
        return;
      }

      currentProgressRef.current += delta * 0.12;
      setProgress(currentProgressRef.current);
      frame = window.requestAnimationFrame(animate);
    };

    // Keep a CSS progress value in sync with scroll for the sticky motion.
    const update = () => {
      if (media.matches) {
        targetProgressRef.current = 1;
      } else {
        const rect = root.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const travel = Math.max(root.offsetHeight - viewportHeight, 1);
        const scrolled = Math.min(Math.max(-rect.top, 0), travel);
        targetProgressRef.current = scrolled / travel;
      }

      if (!frame) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const requestUpdate = () => {
      update();
    };

    setProgress(0);
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
