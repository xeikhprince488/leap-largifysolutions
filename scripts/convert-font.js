import fs from "fs"

const fontPath = "./Jameel Noori Nastaleeq Regular.ttf"
const fontBase64 = fs.readFileSync(fontPath).toString("base64")
console.log(fontBase64)

