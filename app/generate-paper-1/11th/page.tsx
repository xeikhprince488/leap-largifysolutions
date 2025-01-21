import { Sidebar } from "@/components/sidebar"
import { SubjectCard } from "@/components/subject-card"

const subjects = [
  {
    title: "Biology",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/biology"
  },
  {
    title: "Chemistry",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/chemistry"
  },
  {
    title: "Physics",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/physics"
  },
  {
    title: "Math",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/math"
  },
  {
    title: "English",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/english"
  },

  {
    title: "Computer",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/islamyat"
  },
  {
    title: "Urdu",
    titleUrdu: "اردو لازمی",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/urdu"
  },
  {
    title: "Tarjuma Tul Quran",
    // titleUrdu: "اسلامیات لازمی",
    grade: "9th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/tarjumaquran"
  },
  {
    title: "Islamyat",
    titleUrdu: "اسلامیات",
    grade: "11th",
    // imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/11th/urdu"
  }
]

export default function EleventhGradeSubjectsPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Subject - 11th Grade</h1>
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

