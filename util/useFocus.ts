import { useEffect, useRef } from "react";

export function useFocus() {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      const input = ref.current as HTMLInputElement;
      const selection = document.getSelection();

      if (input && selection) {
        if (selection.type === "Caret") {
          input.focus();
        }
      }
    };

    document.addEventListener("mouseup", handleFocus);

    return () => {
      document.removeEventListener("mouseup", handleFocus);
    };
  }, [ref]);

  return ref;
}
