// Global Variables
const colorApiUrl = "https://www.thecolorapi.com/"
const defaultColor = "ff5733"; // Example hex color
let chosenColor=""
let colorPalette = [];

// DOM Elements
    const colorForm = document.getElementById("color-form");
    const colorInput = document.getElementById("chosen-color");
    const modeSelect = document.getElementById("chosen-mode");
    const swatchesContainer = document.getElementById("swatches-container");
    const labelContainer = document.getElementById("label-container");

// Event Handlers
colorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  swatchesContainer.innerHTML = "";  
  labelContainer.innerHTML = "";  
    chosenColor=colorInput.value.replace("#", "");;
    renderColorData(chosenColor)
    renderPalette(chosenColor, modeSelect.value);
});

// Functions
function renderPalette(chosenColor, mode) {
  // Fetch the scheme and render once data arrives
  getColorScheme(chosenColor, mode)
    .then((data) => {
      if (!data || !data.colors) {
        console.error("No color scheme data returned");
        return;
      }
      const colors = data.colors;
      colorPalette = colors;
      renderSwatches(colorPalette);
      renderLabels(colorPalette);
    })
    .catch((error) => {
      console.error("Error in renderPalette:", error);
    });
}

function renderSwatches(colors) {
  for (let color of colors) {
        const swatch = document.createElement("div");
        swatch.style.zIndex = 0;
        swatch.id = `color-swatch-${color.hex.value}`;
        swatch.className = "color-swatch";
        swatch.style.backgroundColor = color.hex.value;
        swatch.title = `${color.name.value} (${color.hex.value})`;
        swatch.innerHTML = `<div class="color-swatch-hex"></div>`;
        swatch.addEventListener("click", () => {
            copyToClipboard(color.hex.value);
        });
        console.log(`Created swatch for ${color.name.value} with hex ${color.hex.value}`);
        swatchesContainer.appendChild(swatch);
    }
}
function renderLabels(colors) {
    for (let color of colors) {
        const label = document.createElement("div");
        label.className = "color-label";
        label.innerHTML = `${color.name.value} \n(${color.hex.value})`;
        labelContainer.appendChild(label);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied to clipboard: ${text}`);
    })
  }

function renderColorData(chosenColor) {
  getColorData(chosenColor)
    .then((colorData) => {
      if (!colorData) {
        console.error("No color data returned");
        return;
      }
      const chosenColorInfo = document.getElementById("chosen-color-info");
      chosenColorInfo.innerHTML = `
      <div id="chosen-color-info">
      ${colorData.name.value} - ${colorData.hex.value}
      </div>
      `;
    })
    .catch((error) => {
      console.error("Error rendering color data:", error);
    });
}

function getColorData(color) {
  return fetch(`https://www.thecolorapi.com/id?hex=${color}&format=json`)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
      console.error("Error fetching color data:", error);
      throw error;
    });
}

function getColorScheme(color, mode = "monochrome") {
  return fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&format=json`)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
      console.error("Error fetching color scheme:", error);
      throw error;
    });
}

