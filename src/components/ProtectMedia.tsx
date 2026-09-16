"use client";

import { useEffect } from "react";

function isProtectedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "img, picture, svg, canvas, [data-protect-media], .protect-media",
    ),
  );
}

/**
 * Soft deterrents against casual image download / drag-save.
 * Cannot fully prevent capture (screenshots, DevTools, network tab).
 */
export function ProtectMedia() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
