import React, { useState } from 'react';
import { PaperDetailsForm, PaperDetails } from './PaperDetailsForm';
import { generatePDF } from '../utils/generate-pdf';
import { Question } from '@/types/questions';
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Metadata {
  grade: string;
  subject: string;
  chapter: string[];
}

export function PaperGenerator({ questions, metadata }: { questions: Question[], metadata: Metadata }) {
  const [showForm, setShowForm] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleGeneratePDF = async (paperDetails: PaperDetails) => {
    setGeneratingPDF(true);
    try {
      const success = await generatePDF(questions, metadata, paperDetails);
      if (success) {
        toast({
          title: "Success",
          description: "PDF generated successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate PDF.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "An error occurred while generating the PDF.",
        variant: "destructive",
      });
    }
    setGeneratingPDF(false);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)} disabled={generatingPDF}>
          {generatingPDF ? 'Generating PDF...' : 'Generate PDF'}
        </Button>
      )}
      {showForm && (
        <PaperDetailsForm onSubmit={handleGeneratePDF} />
      )}
    </div>
  );
}
