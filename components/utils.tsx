// Map number x from range [a, b] to [c, d]
const map = (x: number, a: number, b: number, c: number, d: number) =>
  ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (ev: any) => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

export { map, lerp, clamp, getMousePos };
