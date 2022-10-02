import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./app.css";
import App from "./app.svelte";
import "mapbox-gl/dist/mapbox-gl.css";

window.mapboxgl.accessToken =
  "pk.eyJ1IjoibW9ub2R5bGUiLCJhIjoiY2w4cTY3bGdpMGNxZjN3cHI2ZHUzdXg3ZCJ9.KoA-Sg5maiWEuh4suYgjWg";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
