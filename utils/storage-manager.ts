import type { SavedPaper } from "@/types/saved-papers"
import useSavedPapersStore from "@/store/saved-papers"
import { compress, decompress } from "@/utils/compression"

const STORAGE_PREFIX = "saved-papers-storage"
const MAX_PAPERS = 5
const PAPER_EXPIRY = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

interface StorageStats {
  totalSize: number
  paperCount: number
  oldestPaper?: SavedPaper
  newestPaper?: SavedPaper
}

export class StorageManager {
  static async clearOldData(): Promise<void> {
    const now = Date.now()
    const keysToRemove: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        try {
          const item = localStorage.getItem(key)
          if (item) {
            const data = JSON.parse(item) as SavedPaper
            if (now - new Date(data.createdAt).getTime() > PAPER_EXPIRY) {
              keysToRemove.push(key)
            }
          }
        } catch (error) {
          console.error("Error parsing stored item:", error)
          keysToRemove.push(key)
        }
      }
    }

    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key)
        // Also remove from store if it exists
        const paperId = key.replace(STORAGE_PREFIX + "-", "")
        useSavedPapersStore.getState().removePaper(paperId)
      } catch (error) {
        console.error("Error removing item:", error)
      }
    })
  }

  static async compressPDFData(pdfData: string): Promise<string> {
    try {
      // Remove data URI prefix if present
      const base64Data = pdfData.replace(/^data:application\/pdf;base64,/, "")
      // Compress the data
      return await compress(base64Data)
    } catch (error) {
      console.error("Error compressing PDF data:", error)
      return pdfData
    }
  }

  static async decompressPDFData(compressedData: string): Promise<string> {
    try {
      const decompressedData = await decompress(compressedData)
      return `data:application/pdf;base64,${decompressedData}`
    } catch (error) {
      console.error("Error decompressing PDF data:", error)
      return compressedData
    }
  }

  static getStorageStats(): StorageStats {
    let totalSize = 0
    let paperCount = 0
    let oldestPaper: SavedPaper | undefined
    let newestPaper: SavedPaper | undefined

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        const item = localStorage.getItem(key)
        if (item) {
          totalSize += item.length
          paperCount++

          try {
            const paper = JSON.parse(item) as SavedPaper
            if (!oldestPaper || new Date(paper.createdAt) < new Date(oldestPaper.createdAt)) {
              oldestPaper = paper
            }
            if (!newestPaper || new Date(paper.createdAt) > new Date(newestPaper.createdAt)) {
              newestPaper = paper
            }
          } catch (error) {
            console.error("Error parsing paper:", error)
          }
        }
      }
    }

    return { totalSize, paperCount, oldestPaper, newestPaper }
  }

  static manageStorage(): void {
    const { papers } = useSavedPapersStore.getState()
    const totalPapers = Object.values(papers).reduce(
      (acc, paperArray) => acc + (paperArray as unknown as SavedPaper[]).length,
      0,
    )

    if (totalPapers > MAX_PAPERS) {
      // Sort papers by creation date, oldest first
      const sortedPapers = Object.values(papers).flat() as unknown as SavedPaper[]
      sortedPapers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

      // Remove oldest papers until we're at or below the limit
      while (sortedPapers.length > MAX_PAPERS) {
        const oldestPaper = sortedPapers.shift()
        if (oldestPaper) {
          useSavedPapersStore.getState().removePaper(oldestPaper.id)
          localStorage.removeItem(STORAGE_PREFIX + "-" + oldestPaper.id)
        }
      }
    }
  }

  static async savePaper(paper: SavedPaper): Promise<boolean> {
    try {
      // Manage storage before saving
      this.manageStorage()

      const key = STORAGE_PREFIX + "-" + paper.id
      localStorage.setItem(key, JSON.stringify(paper))

      // Add to store
      useSavedPapersStore.getState().addPaper(paper)
      return true
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        // Try clearing old data first
        await this.clearOldData()
        try {
          localStorage.setItem(STORAGE_PREFIX + "-" + paper.id, JSON.stringify(paper))
          useSavedPapersStore.getState().addPaper(paper)
          return true
        } catch (retryError) {
          console.error("Failed to save paper after clearing space:", retryError)
          return false
        }
      }
      console.error("Failed to save paper:", error)
      return false
    }
  }

  static getAllPapers(): SavedPaper[] {
    const papers: SavedPaper[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        try {
          const item = localStorage.getItem(key)
          if (item) {
            papers.push(JSON.parse(item))
          }
        } catch (error) {
          console.error("Error parsing paper:", error)
        }
      }
    }
    return papers
  }

  static removePaper(id: string): boolean {
    try {
      localStorage.removeItem(STORAGE_PREFIX + "-" + id)
      useSavedPapersStore.getState().removePaper(id)
      return true
    } catch (error) {
      console.error("Error removing paper:", error)
      return false
    }
  }

  static clearAllPapers(): void {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    useSavedPapersStore.getState().clearPapers()
  }
}

