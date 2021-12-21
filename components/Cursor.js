import React from "react";
import gsap from "gsap";

class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.mouseIsHover = false;
    this.follower = React.createRef();
    this.cursorHoverElems = "a, button, .btn-main";
  }

  componentDidMount() {
    let circlePos = { x: 0, y: 0 };
    let mousePos = { x: 0, y: 0 };

    document.querySelector("html").classList.add("no-touch");

    gsap.to(
      {},
      {
        duration: 0.01,
        repeat: -1,
        onRepeat: () => {
          circlePos.x += (mousePos.x - circlePos.x) / 5;
          circlePos.y += (mousePos.y - circlePos.y) / 5;

          gsap.set(this.follower.current, {
            x: circlePos.x,
            y: circlePos.y,
          });

          gsap.to(this.follower.current, {
            scale: this.mouseIsHover ? 1.9 : 1,
            duration: 0.4,
          });
        },
      }
    );

    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    document.addEventListener("mousemove", (e) => {
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
        <div className="cursor__circle" ref={this.follower} />
      </div>
    );
  }
}

export default Cursor;
