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

const getRad = (n: number) => (Math.PI * n) / 180;

export const getDistanceFromMe = (
  coors: [number, number],
  loc?: [number, number]
) => {
  if (!loc) return null;
  const [lats, lons] = coors;
  const [latm, lonm] = loc;
  if (lats === latm && lons === lonm) return 0;
  const radlats = getRad(lats);
  const radlatm = getRad(latm);
  const theta = lons - lonm;
  const radtheta = getRad(theta);
  let dist =
    Math.sin(radlats) * Math.sin(radlatm) +
    Math.cos(radlats) * Math.cos(radlatm) * Math.cos(radtheta);
  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist *= 180 / Math.PI;
  dist *= 60 * 1.1515;
  const km = dist * 1.609344;
  if (km > 1) {
    return `${km.toFixed(2)} km`;
  }
  return `${Math.round(km * 1000)} km`;
};
