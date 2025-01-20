import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface QuestionData {
  id: number
  type: string
  english: string
  urdu: string
  options?: {
    english: string
    urdu: string
    value: string
  }[]
  correct?: string
  marks: number
}

interface QuestionProps {
  question: QuestionData
  onDelete: (id: number) => void
  type: 'mcq' | 'short' | 'long'
}

export function MCQQuestion({ question, onDelete, type }: QuestionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">English:</p>
        <p>{question.english}</p>
        <p className="font-semibold mt-2">Urdu:</p>
        <p>{question.urdu}</p>
        {question.options && (
          <div className="mt-4">
            <p className="font-semibold">Options:</p>
            <ul className="list-disc list-inside mt-2">
              {question.options.map((option, index) => (
                <li key={index}>
                  <span>{option.english}</span>
                  <span className="ml-2">({option.urdu})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={() => onDelete(question.id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export function ShortQuestion({ question, onDelete, type }: QuestionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">English:</p>
        <p>{question.english}</p>
        <p className="font-semibold mt-2">Urdu:</p>
        <p>{question.urdu}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={() => onDelete(question.id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export function LongQuestion({ question, onDelete, type }: QuestionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">English:</p>
        <p>{question.english}</p>
        <p className="font-semibold mt-2">Urdu:</p>
        <p>{question.urdu}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={() => onDelete(question.id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

