"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Mounts its children only while they are near the viewport.
 *
 * The page runs several WebGL canvases; browsers cap how many contexts can be
 * alive at once, so each scene is created on approach and torn down again once
 * it is well out of view.
 */
export function LazyScene({
  children,
  className,
  fallback = null,
  rootMargin = "300px",
}: {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = host.current;
    // IntersectionObserver is absent during the static prerender; the scene
    // simply stays unmounted until the effect runs in the browser.
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setActive(entries[0]?.isIntersecting ?? false),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={host} className={className}>
      {active ? children : fallback}
    </div>
  );
}
