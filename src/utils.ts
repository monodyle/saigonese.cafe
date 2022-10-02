export const createColorPoint = (...color: number[]) => {
  const d = 48;
  const r = d / 2;
  const r2 = r ** 2;
  const bytesPerPixel = 4;

  const data = new Uint8Array(d * d * bytesPerPixel);

  for (let x = 0; x < d; x++) {
    for (let y = 0; y < d; y++) {
      if ((x - r) ** 2 + (y - r) ** 2 >= r2) continue;

      const offset = (y * d + x) * bytesPerPixel;
      for (let b = 0; b < bytesPerPixel; b++) data[offset + b] = color[b];
    }
  }
  return { width: d, height: d, data };
};
