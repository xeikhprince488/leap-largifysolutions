import pako from "pako"

export async function compress(data: string): Promise<string> {
  try {
    const binaryString = atob(data)
    const charArray = binaryString.split("").map((x) => x.charCodeAt(0))
    const byteArray = new Uint8Array(charArray)
    const compressed = pako.deflate(byteArray)
    const compressedBase64 = btoa(String.fromCharCode.apply(null, compressed as unknown as number[]))
    return compressedBase64
  } catch (error) {
    console.error("Compression error:", error)
    return data
  }
}

export async function decompress(compressedData: string): Promise<string> {
  try {
    const binaryString = atob(compressedData)
    const charArray = binaryString.split("").map((x) => x.charCodeAt(0))
    const byteArray = new Uint8Array(charArray)
    const decompressed = pako.inflate(byteArray)
    const decompressedString = String.fromCharCode.apply(null, decompressed as unknown as number[])
    return btoa(decompressedString)
  } catch (error) {
    console.error("Decompression error:", error)
    return compressedData
  }
}

