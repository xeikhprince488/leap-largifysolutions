import { Sidebar } from "@/components/sidebar"
import { SubjectCard } from "@/components/subject-card"

const subjects = [
  {
    title: "Biology",
    grade: "10TH",
    href: "/generate-paper-1/10th/biology"
  },
  {
    title: "Chemistry",
    grade: "10TH",
    href: "/generate-paper-1/10th/chemistry"
  },
  {
    title: "Physics",
    grade: "10TH",
    href: "/generate-paper-1/10th/physics"
  },
  {
    title: "Math",
    grade: "10TH",
    href: "/generate-paper-1/10th/math"
  },
  {
    title: "English",
    grade: "10TH",
    href: "/generate-paper-1/10th/english"
  },
  {
    title: "Computer",
    grade: "10TH",
    href: "/generate-paper-1/10th/islamyat"
  },
  {
    title: "Pakistan Studies",
    grade: "10TH",
    href: "/generate-paper-1/10th/pakstudy"
  },
  {
    title: "Tarjuma Tul Quran",
    grade: "9th",
    href: "/generate-paper-1/10th/tarjumaquran"
  },
  {
    title: "Urdu",
    titleUrdu: "اردو لازمی",
    grade: "10TH",
    href: "/generate-paper-1/10th/urdu"
  },
  {
    title: "islamyat",
    titleUrdu: "اسلامیات",
    grade: "10TH",
    href: "/generate-paper-1/10th/urdu"
  }
]

export default function TenthGradeSubjectsPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Subject - 10th Grade</h1>
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

