import {
  Container,
  Sprite,
  Stage,
  useApp,
  withFilters,
  withPixiApp,
} from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { utils, filters } from "pixi.js";
import * as PIXI from "pixi.js";

const Filters = withFilters(Container, {
  displacement: filters.DisplacementFilter,
});

const img = document.querySelector(".thumb");
const imgSrc = img.getAttribute("src");
img.classList.add("d-none");

function StageNoSSR() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const displacementSpriteRef = useRef(null);
  const [renderFilter, setRenderFilter] = useState(false);
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
      animate();
    }
  }, []);

  function animate() {
    setX((x) => x + 4);
    setY((y) => y + 2);
    requestAnimationFrame(animate);
  }
  return (
    <Container>
      <Sprite x={x} y={y} image="smoke.png" ref={displacementSpriteRef} />
      {renderFilter && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef.current],
          }}
        >
          {/* <Sprite width={420} height={250} image="/images/img-intro.jpg" /> */}
          <Sprite width={420} height={250} image={imgSrc} />
        </Filters>
      )}
    </Container>
  );
}

const wrapped = () => {
  return (
    <Stage width={420} height={500}>
      <StageNoSSR />
    </Stage>
  );
};

export default wrapped;
