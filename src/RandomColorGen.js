export default function getRandomColor() {
    // Hue is a degree on the color wheel (from 0 to 360)
    // 0 (or 360) is red, 120 is green, 240 is blue
    const hue = Math.floor(Math.random() * 360);

    // Saturation is a percentage value; 100% is the full color
    // Set a range from 50% to 100% to avoid too pastel colors
    const saturation = Math.floor(Math.random() * 50) + 50;

    // Lightness is a percentage; 0% is black, 100% is white
    // Set a range from 40% to 60% to avoid too bright or too dark colors
    const lightness = Math.floor(Math.random() * 20) + 40;

    // Return a CSS HSL string
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}