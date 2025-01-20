'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'

interface HeaderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (details: {
    class: string
    paperNo: string
    date: string
    timeAllowed: string
    subject: string
    totalMarks: string
    day: string
    syllabus: string
  }) => Promise<void>
  loading?: boolean
}

export function HeaderDetailsDialog({
  open,
  onOpenChange,
  onSubmit,
  loading = false
}: HeaderDetailsDialogProps) {
  const [details, setDetails] = useState({
    class: "9th",
    paperNo: "",
    date: new Date().toISOString().split('T')[0],
    timeAllowed: "40 min",
    subject: "Biology",
    totalMarks: "50",
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    syllabus: "CHAP 1 Introduction to Biology"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(details)
    } catch (error) {
      console.error('Error submitting details:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Paper Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={details.class}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, class: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paperNo">Paper No.</Label>
                  <Input
                    id="paperNo"
                    value={details.paperNo}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, paperNo: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={details.date}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, date: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timeAllowed">Time Allowed</Label>
                  <Input
                    id="timeAllowed"
                    value={details.timeAllowed}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, timeAllowed: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={details.subject}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    value={details.totalMarks}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, totalMarks: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Input
                    id="day"
                    value={details.day}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, day: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="syllabus">Syllabus</Label>
                  <Input
                    id="syllabus"
                    value={details.syllabus}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, syllabus: e.target.value }))
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate PDF
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

