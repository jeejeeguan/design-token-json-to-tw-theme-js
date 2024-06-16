const fs = require("fs");

const tokenPath = "./TailwindCSS.Mode1.tokens.json";
const presetPath = "./jihu-design-css-preset.js";

function convertTokenToPreset(token) {
  const colors = {};
  for (const [colorName, shades] of Object.entries(token.colors)) {
    if (shades.$value) {
      // Handle single color values like white, black, transparent
      colors[colorName] = shades.$value;
    } else {
      // Handle color shades
      colors[colorName] = {};
      for (const [shade, value] of Object.entries(shades)) {
        colors[colorName][shade] = value.$value;
      }
    }
  }

  const screens = {};
  for (const [screen, value] of Object.entries(token.screens)) {
    screens[screen] = `${value.$value}px`;
  }

  const borderRadius = {};
  for (const [radius, value] of Object.entries(token.borderRadius)) {
    borderRadius[radius] = `${value.$value}px`;
  }

  const borderWidth = {};
  for (const [width, value] of Object.entries(token.borderWidth)) {
    borderWidth[width] = `${value.$value}px`;
  }

  const maxWidth = {};
  for (const [width, value] of Object.entries(token.maxWidth)) {
    maxWidth[width] = `${value.$value}px`;
  }

  const opacity = {};
  for (const [level, value] of Object.entries(token.opacity)) {
    opacity[level] = value.$value / 100;
  }

  const spacing = {};
  for (const [space, value] of Object.entries(token.spacing)) {
    spacing[space] = `${value.$value}px`;
  }

  const fontSize = {};
  for (const [size, value] of Object.entries(token.fontSize)) {
    fontSize[size] = `${value.$value}px`;
  }

  const fontFamily = {};
  for (const [family, value] of Object.entries(token.fontFamily)) {
    fontFamily[family] = value.$value.split(", ");
  }

  const fontWeight = {};
  for (const [weight, value] of Object.entries(token.fontWeight)) {
    fontWeight[weight] = value.$value;
  }

  return `export const theme = {
    colors: ${JSON.stringify(colors, null, 2)},
    screens: ${JSON.stringify(screens, null, 2)},
    borderRadius: ${JSON.stringify(borderRadius, null, 2)},
    borderWidth: ${JSON.stringify(borderWidth, null, 2)},
    maxWidth: ${JSON.stringify(maxWidth, null, 2)},
    opacity: ${JSON.stringify(opacity, null, 2)},
    spacing: ${JSON.stringify(spacing, null, 2)},
    fontSize: ${JSON.stringify(fontSize, null, 2)},
    fontFamily: ${JSON.stringify(fontFamily, null, 2)},
    fontWeight: ${JSON.stringify(fontWeight, null, 2)}
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
