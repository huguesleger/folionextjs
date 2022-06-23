import React, { useEffect } from "react";
import gsap from "gsap";
import { getMousePos } from "./utils";

type HoverItemType = {
  titre: string;
  desc: string;
  image: string;
};

const HoverItem = ({ titre, desc, image }: HoverItemType): JSX.Element => {
  useEffect(() => {
    let mousepos = { x: 0, y: 0 };
    const items = document.querySelectorAll(".wrap-list-item");
    const sectionItems = document.querySelector(".section-competences");
    const boundsSectionItems = sectionItems.getBoundingClientRect();
    window.addEventListener("mousemove", (ev) => {
      mousepos = getMousePos(ev);
    });

    window.addEventListener("mousemove", (ev) => {
      items.forEach((el) => {
        const reveal = el.querySelector(".hover-reveal");
        const boundsItem = el.getBoundingClientRect();
        const boundsReveal = reveal.getBoundingClientRect();

        el.addEventListener("mousemove", (e) => {
          console.log(boundsSectionItems, "tt");
          gsap.set(reveal, {
            x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
            y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
          });
          const tl = gsap.timeline();
          tl.to(reveal, {
            duration: 0.2,
            x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
            y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
          });
        });
        el.addEventListener("mouseenter", (e) => {
          gsap.set(reveal, {
            opacity: 0,
          });
          const tl = gsap.timeline({
            onStart: () => {},
          });
        });
      });
    });

    items.forEach((el) => {
      const reveal = el.querySelector(".hover-reveal");
      const boundsItem = el.getBoundingClientRect();
      const boundsReveal = reveal.getBoundingClientRect();

      el.addEventListener("mousemove", (e) => {
        const tl = gsap.timeline({
          onStart: () => {
            gsap.set(reveal, {
              opacity: 1,
            });
          },
        });
        gsap.set(reveal, {
          x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
          y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
        });
        tl.to(reveal, {
          duration: 0.2,
          x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
          y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
        });
      });
      el.addEventListener("mouseleave", (e) => {
        const tl = gsap.timeline();
        tl.to(reveal, {
          opacity: 0,
        });
      });
    });
  }, []);

  return (
    <div className="list-item">
      <div className="title-list">
        <h3>{titre}</h3>
      </div>
      <div className="desc-list">
        <p>{desc}</p>
      </div>
      <div className="hover-reveal">
        <div className="hover-reveal-inner">
          <div
            className="hover-reveal-img"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HoverItem;
