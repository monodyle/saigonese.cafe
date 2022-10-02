import Fuse from "fuse.js";
import { writable } from "svelte/store";
import raw from "./data.json";

export interface CafeShop {
  coordinates: [number, number];
  properties: Record<string, string>;
}

export const rawData = Object.freeze(raw);
export const geo = Object.freeze({
  type: "FeatureCollection",
  features: Object.values(rawData).flatMap((i) => i.data.features as any[]),
});
export const shops = Object.freeze(
  geo.features.map(
    (i) => ({ ...i, coordinates: i.geometry.coordinates } as CafeShop)
  )
);
export const fuseByName = new Fuse(shops, {
  includeScore: false,
  keys: [["properties", "name"]],
});

export type Regions = keyof typeof rawData;

export const regions = Object.entries(rawData).map(([key, value]) => ({
  key,
  name: value.name,
}));

export const region = writable<Regions>("district-1");
export const filter = writable("all");
export const loc = writable<[number, number] | null>(null);
export const about = writable(false);
export const searchOpen = writable(false);
export const searchString = writable("");

export const cities = Object.entries(raw);

export const current = writable<CafeShop | null>(null);
