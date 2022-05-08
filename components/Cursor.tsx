import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Cursor = () => {
  const cursorCircle = useRef(null);
  const cursor = useRef(null);
  const cursorWraper = useRef(null);
  const label = useRef(null);
  const cursorHoverElems = "a, button, .btn-main, [data-cursor-label]";
  let mouseIsHover = false;
  useEffect(() => {
    if (cursor.current == null || cursor == null) return;
    document.addEventListener("pointermove", (e) => {
      if (cursor.current == null) return;
      const tl = gsap.timeline();
      tl.set(cursor.current, {
        x: e.clientX,
        y: e.clientY,
      }).to(cursor.current, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        onComplete: () => {
          gsap.to(cursor.current, {
            duration: 0.2,
          });
          mouseIsHover
            ? cursorWraper.current.classList.add("is-hover")
            : cursorWraper.current.classList.remove("is-hover");
        },
      });

      if ((e.target as HTMLElement).closest(cursorHoverElems)) {
        mouseIsHover = true;
        if ((e.target as HTMLElement).getAttribute("data-cursor-label")) {
          cursor.current.classList.add("has-label");
          label.current.innerHTML = (e.target as HTMLElement).getAttribute(
            "data-cursor-label"
          );
        }
      } else {
        mouseIsHover = false;
        cursor.current.classList.remove("has-label");
        label.current.innerHTML = "";
      }
    });
  }, []);

  return (
    <div className="cursor" ref={cursor}>
      <div className="cursor-wrapper" ref={cursorWraper}>
        <div className="cursor-circle" id="cursor-circle" ref={cursorCircle}>
          <div className="cursor-label" ref={label}></div>
        </div>
      </div>
    </div>
  );
};

export default Cursor;
