import {
  Container,
  Graphics,
  Sprite,
  Stage,
  useApp,
  useTick,
  withFilters,
  withPixiApp,
} from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { utils, filters } from "pixi.js";
import * as PIXI from "pixi.js";
import gsap from "gsap";

const Filters = withFilters(Container, {
  displacement: filters.DisplacementFilter,
});

// const img = document.querySelector(".thumb");
// const imgSrc = img.getAttribute("src");

// const spriteImages = document.querySelectorAll(".img-work");
// const spriteImagesSrc = [];

// for (let i = 0; i < spriteImages.length; i++) {
//   const image = spriteImages[i];
//   spriteImagesSrc.push(image.getAttribute("src"));
// }

// const images = spriteImagesSrc;

const img1 = document.querySelector("#work1 .img-work");
const imgSrc1 = img1.getAttribute("src");

const img2 = document.querySelector("#work2 .img-work");
const imgSrc2 = img2.getAttribute("src");

const img3 = document.querySelector("#work3 .img-work");
const imgSrc3 = img3.getAttribute("src");

const StageNoSSR = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const displacementSpriteRef = useRef(null);
  const displacementSpriteRef2 = useRef(null);
  const displacementSpriteRef3 = useRef(null);
  const [renderFilter, setRenderFilter] = useState(false);
  const mask = useRef(null);
  const refImg1 = useRef(null);

  useEffect(() => {
    if (process.browser) {
      let type = "WebGL";
      if (!utils.isWebGLSupported()) {
        type = "canvas";
      }
      utils.sayHello(type);
      displacementSpriteRef.current.texture.baseTexture.wrapMode =
        PIXI.WRAP_MODES.REPEAT;
      displacementSpriteRef2.current.texture.baseTexture.wrapMode =
        PIXI.WRAP_MODES.REPEAT;
      displacementSpriteRef3.current.texture.baseTexture.wrapMode =
        PIXI.WRAP_MODES.REPEAT;
      setRenderFilter(true);
      // animate();
    }
    return () => {
      animate();
      // setRenderFilter(false);
    };
  }, []);

  function animate() {
    setX((x) => x + 4);
    setY((y) => y + 2);
    requestAnimationFrame(animate);
  }

  useTick((delta) => setX((x) => x + 4 * delta));
  useTick((delta) => setY((y) => y + 2));

  // function stopAnimate() {
  //   setX((x) => 0);
  //   setY((y) => 0);
  //   requestAnimationFrame(stopAnimate);
  // }

  const mouseEnter = () => {
    const tl = gsap.timeline();
    tl.to(displacementSpriteRef.current.scale, {
      x: 0,
      y: 0,
      ease: "Expo.easeInOut",
      duration: 1,
    });
    console.log("enter");
  };

  const mouseLeave = () => {
    const tl = gsap.timeline();
    tl.to(displacementSpriteRef.current.scale, {
      x: 4 * 0.3,
      y: 2,
      ease: "Expo.easeInOut",
      duration: 1,
    });
    console.log("exit");
  };

  const test = () => {
    console.log("test");
  };

  useEffect(() => {
    // if (refImg1.current) {
    //   refImg1.current.addEventListener("mouseenter", mouseEnter);
    // }
    const SliderItem = document.querySelectorAll(".inner-work");
    SliderItem.forEach((el) => el.remove());
  }, []);

  return (
    <>
      <Sprite x={x} y={y} image="smoke.png" ref={displacementSpriteRef} />
      {renderFilter && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef.current],
          }}
        >
          {/* <Sprite width={420} height={250} image="/images/img-intro.jpg" /> */}
          <Sprite
            ref={refImg1}
            width={380}
            height={570}
            image={imgSrc1}
            mask={mask.current}
            interactive={true}
            // blendMode={PIXI.BLEND_MODES.ADD}
            roundPixels={true}
            // filters={[blurFilter, matrixFilter]}
            mouseover={mouseEnter}
            mouseout={mouseLeave}
            click={test}
          />
          {/* <Graphics
              draw={(g) => {
                g.beginFill(0xff3300);
                g.drawRect(0, 0, 420, 250);
                g.endFill();
              }}
              ref={mask}
            /> */}
        </Filters>
      )}
      <Sprite x={x} y={y} image="smoke.png" ref={displacementSpriteRef2} />
      {renderFilter && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef2.current],
          }}
        >
          <Sprite width={380} height={570} image={imgSrc2} y={590} />
        </Filters>
      )}
      <Sprite x={x} y={y} image="smoke.png" ref={displacementSpriteRef3} />
      {renderFilter && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef3.current],
          }}
        >
          <Sprite width={380} height={570} image={imgSrc3} y={1180} />
        </Filters>
      )}
    </>
  );
};

const wrapped = () => {
  const pixiSet = {
    options: {
      backgroundColor: 0x171717,
      transparent: true,
      autoResize: true,
      antialias: true,
      roundPixels: true,
      resolution: window.devicePixelRatio || 1,
    },
  };
  const windonWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  console.log(windowHeight, "height");

  return (
    <Stage width={380} height={windowHeight * 3} {...pixiSet}>
      <Container>
        <StageNoSSR></StageNoSSR>
      </Container>
    </Stage>
  );
};

export default wrapped;
