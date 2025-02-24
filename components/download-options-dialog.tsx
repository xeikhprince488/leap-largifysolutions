import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, FileIcon } from "lucide-react"

interface DownloadOptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectFormat: (format: "pdf" | "word") => void
}

export function DownloadOptionsDialog({ open, onOpenChange, onSelectFormat }: DownloadOptionsDialogProps): JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Download Format</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button variant="outline" className="flex flex-col items-center p-6" onClick={() => onSelectFormat("pdf")}>
            <FileText className="h-8 w-8 mb-2" />
            <span>PDF Format</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-6" onClick={() => onSelectFormat("word")}>
            <FileIcon className="h-8 w-8 mb-2" />
            <span>Word Format</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

