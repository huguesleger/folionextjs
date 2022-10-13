import {
  Container,
  Graphics,
  Sprite,
  Stage,
  Text,
  useApp,
  useTick,
  withFilters,
  withPixiApp,
} from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { utils, filters, TextStyle } from "pixi.js";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import image from "next/image";
import PixiPlugin from "gsap/PixiPlugin";
import Link from "next/link";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

type LastWorkType = {
  titre: string;
  // typeProjet: string;
  target: number;
  slug: string;
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

// const colorMatrix = new PIXI.filters.ColorMatrixFilter();
// const colorMatrixFalse = new PIXI.filters.ColorMatrixFilter();
// const colorMatrixTrue = new PIXI.filters.ColorMatrixFilter();
// colorMatrix.blackAndWhite(true);
// colorMatrixFalse.blackAndWhite;
// colorMatrixTrue.blackAndWhite(true);

const widthSprite = 380;
const heightSprite = 570;

const StageNoSSR = ({
  image,
  titre,
  slug,
  target,
}: LastWorkType): JSX.Element => {
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
    }
  }, []);

  useEffect(() => {
    const titleLink = document.querySelectorAll(".test-title");

    titleLink.forEach((el) => {
      el.addEventListener("mouseenter", function () {
        console.log(titleLink, "testtitle");
        const tl = gsap.timeline();
        console.log(refImg.current, "logimg");

        if (target === 1) {
          tl.to(displacementSpriteRef.current.scale, {
            x: 0,
            y: 0,
            ease: "Expo.easeInOut",
            duration: 1,
          }).to(refImg.current, {
            // pixi: {
            //   colorMatrixFilter: [colorMatrixFalse],
            // },
          });
        }
      });
    });
  }, []);

  useTick((delta) => setX((x) => x + 4 * delta));
  useTick((delta) => setY((y) => y + 2));

  // const mouseEnter = () => {
  //   const tl = gsap.timeline();
  //   tl.to(displacementSpriteRef.current.scale, {
  //     x: 0,
  //     y: 0,
  //     ease: "Expo.easeInOut",
  //     duration: 1,
  //   }).to(refImg.current, {
  //     pixi: {
  //       colorMatrixFilter: colorMatrixFalse,
  //     },
  //   });
  //   const canvas = document.querySelectorAll("canvas");
  //   canvas.forEach((el) => {
  //     el.setAttribute("data-cursor-label", "Voir le projet");
  //   });
  // };

  const mouseLeave = () => {
    const tl = gsap.timeline();
    tl.to(displacementSpriteRef.current.scale, {
      x: 4 * 0.3,
      y: 2,
      ease: "Expo.easeInOut",
      duration: 1,
    }).to(refImg.current, {
      // pixi: {
      //   colorMatrixFilter: colorMatrixTrue,
      // },
    });
    const canvas = document.querySelectorAll("canvas");
    canvas.forEach((el) => {
      el.removeAttribute("data-cursor-label");
    });
  };

  // const onClick = () => {
  //   window.location.href = "/projets/" + slug;
  //   console.log("click");
  // };

  useEffect(() => {
    const SliderItem = document.querySelectorAll(".inner-work");
    SliderItem.forEach((el) => el.remove());
  }, []);

  const container = document.querySelector("#wrapWorks");
  const windowWidth = container.clientWidth;

  const style = new PIXI.TextStyle({
    align: "center",
    fontFamily: '"Gallient", sans-serif',
    fontSize: 80,
    fill: ["#ffffff"],
    wordWrap: true,
    wordWrapWidth: windowWidth,
  });

  return (
    <>
      <Sprite x={x} y={y} image="smoke2.jpg" ref={displacementSpriteRef} />
      {renderFilter && (
        <>
          <Filters
            displacement={{
              construct: [displacementSpriteRef.current],
            }}
          >
            <Sprite
              ref={refImg}
              width={380}
              height={570}
              x={windowWidth / 2 - 190}
              image={image.url}
              mask={mask.current}
              interactive={true}
              // mouseover={mouseEnter}
              // mouseout={mouseLeave}
              // blendMode={PIXI.BLEND_MODES.ADD}
              // filters={[colorMatrix]}
              // click={onClick}
              name={"sprite" + target}
            ></Sprite>
          </Filters>
          <Text
            data-cursor-label="Voir le projet"
            text={titre.toUpperCase()}
            y={570 / 2}
            x={windowWidth / 2}
            anchor={0.5}
            style={style}
          />
        </>
      )}
    </>
  );
};

const wrapped = ({ image, titre, slug, target }: LastWorkType): JSX.Element => {
  const pixiSet = {
    options: {
      backgroundColor: 0x171717,
      backgroundAlpha: 0,
      autoResize: true,
      antialias: true,
      roundPixels: true,
      resolution: window.devicePixelRatio || 1,
    },
  };
  const container = document.querySelector("#wrapWorks");
  const windowWidth = container.clientWidth;
  console.log(windowWidth, "width");

  const windowHeight = window.innerHeight;
  console.log(windowHeight, "height");

  return (
    <>
      <Stage width={windowWidth} height={570} {...pixiSet}>
        <Container>
          <StageNoSSR image={image} titre={titre} slug={slug} target={target} />
        </Container>
      </Stage>
    </>
  );
};

export default wrapped;
