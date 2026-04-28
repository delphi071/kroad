"use client";

import { useEffect, useState } from "react";

type ToastEntry = { id: number; message: string; visible: boolean };

let listeners: ((message: string) => void)[] = [];

export function showToast(message: string) {
  listeners.forEach((fn) => fn(message));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  useEffect(() => {
    const listener = (message: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, visible: false }]);
      // next frame: show
      requestAnimationFrame(() => {
        setToasts((t) => t.map((x) => (x.id === id ? { ...x, visible: true } : x)));
      });
      // hide after 2.5s
      setTimeout(() => {
        setToasts((t) => t.map((x) => (x.id === id ? { ...x, visible: false } : x)));
      }, 2500);
      // remove after fade-out
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 2800);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-[40px] left-1/2 z-[1000] flex -translate-x-1/2 flex-col items-center gap-[8px]"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="font-pretendard rounded-[8px] bg-black/85 px-[40px] py-[14px] text-[15px] leading-[1.5] tracking-[-0.3px] text-white shadow-lg backdrop-blur-sm transition-all duration-300"
          style={{
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? "translateY(0)" : "translateY(8px)",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
