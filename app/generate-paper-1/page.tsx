'use client'

import { Sidebar } from "@/components/sidebar";
import { SyllabusCard } from "@/components/syllabus-card";
import { useState, useEffect } from "react";
import { fetchQuestions } from "@/services/questions";
import { Question } from "@/types/questions";

const syllabusOptions = [
  { grade: "9TH", href: "/generate-paper-1/9th" },
  { grade: "10TH", href: "/generate-paper-1/10th" },
  { grade: "11TH", href: "/generate-paper-1/11th" },
  { grade: "12TH", href: "/generate-paper-1/12th" }
];

export default function GeneratePaperPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleFetchQuestions = async () => {
    try {
      const fetchedQuestions = await fetchQuestions("biology", "9th", ["CHAP 1 Introduction to Biology"], 10, "short");
      console.log('Fetched Questions:', fetchedQuestions); // Debugging line
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    console.log('Questions state updated:', questions); // Debugging line
  }, [questions]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Syllabus</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {syllabusOptions.map((option) => (
                <SyllabusCard
                  key={option.grade}
                  grade={option.grade}
                  href={option.href}
                />
              ))}
            </div>
            <button onClick={handleFetchQuestions} className="mt-8 p-2 bg-blue-500 text-white">
              Fetch Questions
            </button>
            <div className="mt-8">
              {questions.length === 0 ? (
                <p>No questions available</p>
              ) : (
                questions.map((question) => (
                  <div key={question.id} className="p-4 border rounded mb-4">
                    <h2 className="font-bold">{question.english}</h2>
                    <p>{question.urdu}</p>
                    {(question as any).options && (
                      <ul>
                        {(question as any).options.map((option: any, index: number) => (
                          <li key={index}>{option.english} / {option.urdu}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

