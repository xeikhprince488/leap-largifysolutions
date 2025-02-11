import type { jsPDF } from "jspdf"

export async function setupUrduFont(doc: jsPDF) {
  try {
    const fontData = await getUrduFont()
    doc.addFont(fontData, "NafeesNastaleeq", "normal", "Identity-H")
    doc.setFont("NafeesNastaleeq", "normal")
    doc.setR2L(true) // Enable right-to-left for Urdu
    return true
  } catch (error) {
    console.error("Error setting up Urdu font:", error)
    return false
  }
}

export function renderUrduText(doc: jsPDF, text: string, x: number, y: number, options: { maxWidth?: number } = {}) {
  try {
    doc.setFont("NafeesNastaleeq", "normal")
    doc.setR2L(true)
    doc.text(text, x, y, { ...options, align: "right" })
    doc.setR2L(false)
    return true
  } catch (error) {
    console.error("Error rendering Urdu text:", error)
    doc.setFont("helvetica", "normal")
    doc.text("[Urdu text]", x, y)
    return false
  }
}

async function getUrduFont(): Promise<string> {
  // Replace with your actual implementation to fetch Urdu font data
  const response = await fetch("/path/to/urdu-font.ttf");
  if (!response.ok) {
    throw new Error("Failed to fetch Urdu font");
  }
  const fontData = await response.text();
  return fontData;
}

