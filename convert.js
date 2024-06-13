const fs = require("fs");

const tokenPath = "./TailwindCSS.Mode 1.tokens.json";
const presetPath = "./jihu-design-css-preset.js";

function convertTokenToPreset(token) {
  const colors = {};
  for (const [colorName, shades] of Object.entries(token.colors)) {
    colors[colorName] = {};
    for (const [shade, value] of Object.entries(shades)) {
      colors[colorName][shade] = value.$value;
    }
  }

  return `export const theme = {
  colors: ${JSON.stringify(colors, null, 2)}
};`;
}

fs.readFile(tokenPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading token file:", err);
    return;
  }

  const token = JSON.parse(data);
  const preset = convertTokenToPreset(token);

  fs.writeFile(presetPath, preset, "utf8", (err) => {
    if (err) {
      console.error("Error writing preset file:", err);
      return;
    }

    console.log("Preset file has been updated.");
  });
});
