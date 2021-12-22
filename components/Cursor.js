import React from "react";
import gsap from "gsap";

class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.mouseIsHover = false;
    this.cursorCircle = React.createRef();
    this.cursorHoverElems = "a, button, .btn-main";
  }

  componentDidMount() {
    document.addEventListener("mousemove", (e) => {
      const tl = gsap.timeline();
      tl.set(this.cursorCircle.current, {
        x: e.clientX,
        y: e.clientY,
      }).to(this.cursorCircle.current, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        onComplete: () => {
          gsap.to(this.cursorCircle.current, {
            duration: 0.2,
            scale: this.mouseIsHover ? 3 : 1,
          });
        },
      });
      if (e.target.closest(this.cursorHoverElems)) {
        this.mouseIsHover = true;
      } else {
        this.mouseIsHover = false;
      }
    });
  }

  render() {
    return (
      <div className="cursor">
        <div className="cursor-circle" ref={this.cursorCircle} />
      </div>
    );
  }
}

export default Cursor;
