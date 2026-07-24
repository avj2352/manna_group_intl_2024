import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

import "@/styles/page-transition.css";

const ROWS = 4;
const COLS = 16;

export const PageTransition = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLSpanElement[]>([]);
  const isAnimatingRef = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  const getRowBlocks = (row: number) => {
    const start = row * COLS;
    const end = start + COLS;

    return blocksRef.current.slice(start, end);
  };

  const animateIn = (onComplete: () => void) => {
    const timeline = gsap.timeline({
      onComplete,
    });

    for (let row = 0; row < ROWS; row += 1) {
      timeline.to(
        getRowBlocks(row),
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: {
            each: 0.025,
            from: row % 2 === 0 ? "start" : "end",
          },
        },
        "<"
      );
    }

    return timeline;
  };

  const animateOut = (onComplete?: () => void) => {
    const timeline = gsap.timeline({
      onComplete,
    });

    for (let row = 0; row < ROWS; row += 1) {
      timeline.to(
        getRowBlocks(row),
        {
          scaleX: 0,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: {
            each: 0.025,
            from: row % 2 === 0 ? "start" : "end",
          },
        },
        "<"
      );
    }

    return timeline;
  };

  useEffect(() => {
    const blocks = blocksRef.current;

    gsap.killTweensOf(blocks);

    gsap.set(blocks, {
      scaleX: 1,
      visibility: "visible",
    });

    animateOut(() => {
      isAnimatingRef.current = false;
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (!link) return;

      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      // Allow normal same-page anchor links.
      if (href.startsWith("#") && !href.startsWith("#/")) {
        return;
      }

      let destination = "";

      // HashRouter route such as #/careers.
      if (href.startsWith("#/")) {
        destination = href.slice(1);
      } else if (href.startsWith("/")) {
        destination = href;
      } else {
        return;
      }

      const destinationPath = destination
        .split("?")[0]
        .split("#")[0];

      if (
        destinationPath === location.pathname ||
        isAnimatingRef.current
      ) {
        return;
      }

      event.preventDefault();

      isAnimatingRef.current = true;

      const blocks = blocksRef.current;

      gsap.killTweensOf(blocks);

      gsap.set(blocks, {
        scaleX: 0,
        visibility: "visible",
      });

      animateIn(() => {
        navigate(destination);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      });
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [location.pathname, navigate]);

  return (
    <div
      ref={gridRef}
      className="transition-grid"
      aria-hidden="true"
    >
      {Array.from({ length: ROWS * COLS }).map((_, index) => {
        const row = Math.floor(index / COLS);
        const column = index % COLS;

        return (
          <span
            key={index}
            ref={(element) => {
              if (element) {
                blocksRef.current[index] = element;
              }
            }}
            className="transition-block"
            style={{
              left: `${(column / COLS) * 100}%`,
              top: `${(row / ROWS) * 100}%`,
              width: `calc(${100 / COLS}% + 1px)`,
              height: `calc(${100 / ROWS}% + 1px)`,
              transformOrigin:
                row % 2 === 0 ? "left center" : "right center",
            }}
          />
        );
      })}
    </div>
  );
};