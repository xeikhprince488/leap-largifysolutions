import { Sidebar } from "@/components/sidebar"
import { SubjectCard } from "@/components/subject-card"

const subjects = [
  {
    title: "Biology",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/biology"
  },
  {
    title: "Chemistry",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/chemistry"
  },
  {
    title: "Physics",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/physics"
  },
  {
    title: "Math",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/math"
  },
  {
    title: "English",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/english"
  },

  {
    title: "Computer",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/islamyat"
  },
  {
    title: "Urdu",
    titleUrdu: "اردو لازمی",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/urdu"
  },
  {
    title: "Pak Study",
    // titleUrdu: "اسلامیات",
    grade: "12th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/pakstudy"
  },
  {
    title: "Tarjuma Tul Quran",
    // titleUrdu: "اسلامیات لازمی",
    grade: "9th",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/12th/tarjumaquran"
  },
]

export default function TwelfthGradeSubjectsPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Subject - 12th Grade</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.title}
                  {...subject}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

