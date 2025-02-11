export async function loadUrduFont(doc: any) {
    try {
      // First try loading from public directory
      const fontUrl = "/fonts/Jameel-Noori-Nastaleeq.ttf"
      const response = await fetch(fontUrl)
  
      if (!response.ok) {
        throw new Error(`Font not found at ${fontUrl}`)
      }
  
      const fontData = await response.arrayBuffer()
      const uint8Array = new Uint8Array(fontData)
      const base64String = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
  
      // Add the font to the PDF document
      doc.addFileToVFS("Jameel-Noori-Nastaleeq.ttf", btoa(base64String))
      doc.addFont("Jameel-Noori-Nastaleeq.ttf", "Jameel-Noori-Nastaleeq", "normal")
  
      // Set default font settings for Urdu text
      doc.setFont("Jameel-Noori-Nastaleeq")
  
      return true
    } catch (error) {
      console.error("Failed to load Urdu font:", error)
      return false
    }
  }
  
  