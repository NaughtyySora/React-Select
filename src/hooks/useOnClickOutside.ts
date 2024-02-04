import { MutableRefObject, useEffect, MouseEvent } from "react";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside(ref: MutableRefObject<HTMLElement | null>, handler: Handler) {

  useEffect(() => {
    const listener = (e: any) => {
      e.stopPropagation();
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
