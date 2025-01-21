const fs = require("fs");

const fontPath = "./NotoNastaliqUrdu-Regular.ttf";
const fontData = fs.readFileSync(fontPath, "base64");

fs.writeFileSync("fontBase64.txt", fontData);
console.log("Base64 data saved to fontBase64.txt");
