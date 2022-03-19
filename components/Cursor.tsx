import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorCircle = useRef(null);
  const cursorHoverElems = "a, button, .btn-main";
  let mouseIsHover = false;
  useEffect(() => {
    if (cursorCircle.current == null || cursorCircle == null) return;
    document.addEventListener("mousemove", (e) => {
      if (cursorCircle.current == null) return;
      const tl = gsap.timeline();
      tl.set(cursorCircle.current, {
        x: e.clientX,
        y: e.clientY,
      }).to(cursorCircle.current, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        onComplete: () => {
          gsap.to(cursorCircle.current, {
            duration: 0.2,
            scale: mouseIsHover ? 3 : 1,
          });
        },
      });
      if ((e.target as HTMLElement).closest(cursorHoverElems)) {
        mouseIsHover = true;
      } else {
        mouseIsHover = false;
      }
    });
  }, []);

  return (
    <div className="cursor">
      <div className="cursor-circle" ref={cursorCircle}></div>
    </div>
  );
};

export default Cursor;
