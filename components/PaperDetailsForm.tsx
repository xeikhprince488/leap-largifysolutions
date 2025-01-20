import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export interface PaperDetails {
  paper: string;
  class: string;
  timeAllowed: string;
  day: string;
  syllabus: string;
}

interface PaperDetailsFormProps {
  onSubmit: (details: PaperDetails) => void;
}

export function PaperDetailsForm({ onSubmit }: PaperDetailsFormProps) {
  const [details, setDetails] = useState<PaperDetails>({
    paper: '',
    class: '',
    timeAllowed: '',
    day: '',
    syllabus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(details).every(value => value.trim() !== '')) {
      onSubmit(details);
    } else {
      toast({
        title: "Error",
        description: "All fields are required. Please fill in all the details.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="paper">Paper Name</Label>
        <Input
          id="paper"
          name="paper"
          value={details.paper}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="class">Class</Label>
        <Input
          id="class"
          name="class"
          value={details.class}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="timeAllowed">Time Allowed</Label>
        <Input
          id="timeAllowed"
          name="timeAllowed"
          value={details.timeAllowed}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="day">Day</Label>
        <Input
          id="day"
          name="day"
          value={details.day}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="syllabus">Syllabus</Label>
        <Input
          id="syllabus"
          name="syllabus"
          value={details.syllabus}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Generate PDF</Button>
    </form>
  );
}
