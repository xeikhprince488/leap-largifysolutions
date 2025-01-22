import type { jsPDF } from "jspdf"

export async function loadUrduFont(doc: jsPDF): Promise<void> {
  const fontName = "NotoNastaliqUrdu"
  const fontUrl = "/NotoNastaliqUrdu-Regular.ttf"

  try {
    const response = await fetch(fontUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const fontData = new Uint8Array(arrayBuffer)

    const fontBase64 = btoa(String.fromCharCode.apply(null, fontData as unknown as number[]))
    doc.addFileToVFS(fontUrl, fontBase64)
    doc.addFont(fontUrl, fontName, "normal")

    console.log("Urdu font loaded successfully")
  } catch (error) {
    console.error("Error loading Urdu font:", error)
    throw error
  }
}

