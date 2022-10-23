import {
  Container,
  Sprite,
  Stage,
  useTick,
  withFilters,
} from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { utils, filters } from "pixi.js";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import image from "next/image";
import PixiPlugin from "gsap/PixiPlugin";
import Link from "next/link";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

type LastWorkType = {
  target: number;
  image: {
    id: string;
    alt: string;
    url: string;
    width: string;
    height: string;
  };
};

const Filters = withFilters(Container, {
  displacement: filters.DisplacementFilter,
});

const widthSprite = 380;
const heightSprite = 570;

const StageNoSSR = ({ image, target }: LastWorkType): JSX.Element => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const displacementSpriteRef = useRef(null);
  const [renderFilter, setRenderFilter] = useState(false);
  const mask = useRef(null);
  const refImg = useRef(null);

  useEffect(() => {
    if (process.browser) {
      let type = "WebGL";
      if (!utils.isWebGLSupported()) {
        type = "canvas";
      }
      utils.sayHello(type);
      displacementSpriteRef.current.texture.baseTexture.wrapMode =
        PIXI.WRAP_MODES.REPEAT;
      setRenderFilter(true);
      // animate();
    }
    // return () => {
    //   animate();
    // };
  }, []);

  useEffect(() => {
    const linkWork1 = document.querySelector("#work1 .link-work");
    const linkWork2 = document.querySelector("#work2 .link-work");
    const linkWork3 = document.querySelector("#work3 .link-work");
    const tl = gsap.timeline();

    linkWork1.addEventListener("mouseenter", function () {
      if (target === 1) {
        tl.to(displacementSpriteRef.current.scale, {
          x: 0,
          y: 0,
          ease: "Power2.easeInOut",
          duration: 0.3,
        });
      }
    });
    linkWork1.addEventListener("mouseleave", function () {
      if (target === 1) {
        tl.to(displacementSpriteRef.current.scale, {
          x: 1,
          y: 1,
          ease: "Power2.easeInOut",
          duration: 0.3,
        });
      }
    });
    linkWork2.addEventListener("mouseenter", function () {
      if (target === 2) {
        tl.to(displacementSpriteRef.current.transform.scale, {
          x: 0,
          y: 0,
          ease: "Power2.easeInOut",
          duration: 0.8,
        }).to(refImg.current.scale, {
          x: 0.31,
          y: 0.31,
          duration: 0.5,
          delay: -0.5,
        });
      }
    });
    linkWork2.addEventListener("mouseleave", function () {
      if (target === 2) {
        tl.to(displacementSpriteRef.current.transform.scale, {
          x: 1,
          y: 1,
          ease: "Power2.easeInOut",
          duration: 0.8,
        }).to(refImg.current.scale, {
          x: 0.296875,
          y: 0.296875,
          duration: 0.5,
          delay: -0.5,
        });
      }
    });
    linkWork3.addEventListener("mouseenter", function () {
      if (target === 3) {
        tl.to(displacementSpriteRef.current.transform.scale, {
          x: 0,
          y: 0,
          ease: "Power2.easeInOut",
          duration: 0.8,
        }).to(refImg.current.scale, {
          x: 0.31,
          y: 0.31,
          duration: 0.5,
          delay: -0.5,
        });
      }
    });
    linkWork3.addEventListener("mouseleave", function () {
      if (target === 3) {
        tl.to(displacementSpriteRef.current.transform.scale, {
          x: 1,
          y: 1,
          ease: "Power2.easeInOut",
          duration: 0.8,
        }).to(refImg.current.scale, {
          x: 0.296875,
          y: 0.296875,
          duration: 0.5,
          delay: -0.5,
        });
      }
    });

    linkWork1.addEventListener("click", function (e) {
      // Ticker.shared.remove(displacementSpriteRef.current);
      // if (target === 1) {
      // }
      // e.preventDefault();
      // setAnim(false);
    });
  }, []);

  useTick(() => setX((x) => x + 6));
  useTick(() => setY((y) => y + 2));

  // useEffect(() => {
  //   const SliderItem = document.querySelectorAll(".inner-work .img-work");
  //   SliderItem.forEach((el) => el.remove());
  // }, []);

  // function animate() {
  //   if (anim == true) {
  //     setX((x) => x + 6);
  //     setY((y) => y + 2);
  //     requestAnimationFrame(animate);
  //   }
  // }

  const container = document.querySelector("#wrapWorks");
  const windowWidth = container.clientWidth;

  return (
    <>
      <Sprite x={x} y={y} image="smoke2.jpg" ref={displacementSpriteRef} />
      {renderFilter && (
        <>
          <Filters
            displacement={{
              construct: [displacementSpriteRef.current],
            }}
            anchor={0.5}
          >
            <Sprite
              ref={refImg}
              width={380}
              height={570}
              image={image.url}
              interactive={true}
              name={"sprite" + target}
            ></Sprite>
          </Filters>
        </>
      )}
    </>
  );
};

const wrapped = ({ image, target }: LastWorkType): JSX.Element => {
  const pixiSet = {
    options: {
      backgroundColor: 0x171717,
      backgroundAlpha: 0,
      autoResize: true,
      antialias: true,
      roundPixels: true,
      resolution: window.devicePixelRatio || 1,
      clearBeforeRender: false,
    },
  };
  const container = document.querySelector("#wrapWorks");
  const windowWidth = container.clientWidth;
  console.log(windowWidth, "width");

  const windowHeight = window.innerHeight;
  console.log(windowHeight, "height");

  return (
    <>
      <Stage
        width={380}
        height={570}
        {...pixiSet}
        data-cursor-label="Voir le projet"
        // raf={false}
      >
        <Container>
          <StageNoSSR image={image} target={target} />
        </Container>
      </Stage>
    </>
  );
};

export default wrapped;
