import React from "react"
import { ChangeEvent } from "react"

interface UploadProps {
  onFileSelect: (file: File) => void
}

export const Upload: React.FC<UploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0])
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  )
}
