
import { useState, type FormEvent } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Languages,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "./components/button";
type Assignment = {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  done: boolean;
};

type Page =
  | "dashboard"
  | "subjects"
  | "schedule"
  | "assignments"
  | "grades"
  | "users";

type Role = "student" | "instructor" | "admin";

const courses = [
  { id: "web", ar: "تطوير تطبيقات الويب", en: "Web Development", code: "IT301" },
  { id: "networks", ar: "شبكات الحاسوب", en: "Computer Networks", code: "IT302" },
  { id: "database", ar: "قواعد البيانات", en: "Database Systems", code: "IT303" },
  { id: "ai", ar: "مبادئ الذكاء الاصطناعي", en: "Introduction to AI", code: "IT304" },
];

const initialAssignments: Assignment[] = [
  { id: 1, title: "إنشاء صفحة ويب باستخدام React", course: "web", dueDate: "2026-11-05", done: false },
  { id: 2, title: "حل تمارين الشبكات", course: "networks", dueDate: "2026-11-08", done: false },
  { id: 3, title: "مراجعة أساسيات قواعد البيانات", course: "database", dueDate: "2026-10-28", done: true },
];

export default function App() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [role, setRole] = useState<Role>("student");
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("web");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const ar = language === "ar";

  const t = {
    app: ar ? "جامعتي" : "Jamiati",
    subtitle: ar ? "بوابتك الجامعية" : "Your University Portal",
    dashboard: ar ? "الرئيسية" : "Dashboard",
    subjects: ar ? "المواد الدراسية" : "Subjects",
    schedule: ar ? "الجدول الدراسي" : "Schedule",
    assignments: ar ? "الواجبات" : "Assignments",
    grades: ar ? "الدرجات" : "Grades",
    users: ar ? "إدارة المستخدمين" : "User Management",
    welcome: ar ? "مرحبًا بك في جامعتي 👋" : "Welcome to Jamiati 👋",
    overview: ar ? "تابع دراستك ومهامك من مكان واحد." : "Manage your studies and tasks in one place.",
    total: ar ? "إجمالي الواجبات" : "Total assignments",
    pending: ar ? "واجبات غير مكتملة" : "Pending assignments",
    completed: ar ? "واجبات مكتملة" : "Completed assignments",
    courseCount: ar ? "المواد الدراسية" : "Subjects",
    recent: ar ? "الواجبات الدراسية" : "Study assignments",
    add: ar ? "إضافة واجب" : "Add assignment",
    edit: ar ? "تعديل الواجب" : "Edit assignment",
    newAssignment: ar ? "واجب جديد" : "New assignment",
    title: ar ? "اسم الواجب" : "Assignment title",
    course: ar ? "المادة الدراسية" : "Subject",
    due: ar ? "تاريخ التسليم" : "Due date",
    save: ar ? "حفظ" : "Save",
    cancel: ar ? "إلغاء" : "Cancel",
    search: ar ? "ابحث عن واجب..." : "Search assignments...",
    done: ar ? "مكتمل" : "Completed",
    notDone: ar ? "غير مكتمل" : "Pending",
    toggle: ar ? "تغيير الحالة" : "Toggle status",
    deleteConfirm: ar ? "هل أنت متأكد من حذف هذا الواجب؟" : "Delete this assignment?",
    noAssignments: ar ? "لا توجد واجبات مطابقة." : "No matching assignments.",
    required: ar ? "أدخل اسم الواجب وتاريخ التسليم." : "Enter a title and due date.",
    student: ar ? "طالب" : "Student",
    instructor: ar ? "مدرس" : "Instructor",
    admin: ar ? "مسؤول" : "Admin",
    day: ar ? "اليوم" : "Day",
    time: ar ? "الوقت" : "Time",
    room: ar ? "القاعة" : "Room",
    demo: ar ? "بيانات تجريبية" : "Demo data",
  };

  const courseName = (id: string) => {
    const item = courses.find((c) => c.id === id);
    return item ? (ar ? item.ar : item.en) : id;
  };

  const resetForm = () => {
    setTitle("");
    setCourse("web");
    setDueDate("");
    setEditingId(null);
    setError("");
  };

  // CREATE: add an assignment
  // UPDATE: edit an existing assignment
  const saveAssignment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !dueDate) {
      setError(t.required);
      return;
    }

    if (editingId !== null) {
      setAssignments((items) =>
        items.map((item) =>
          item.id === editingId
            ? { ...item, title: title.trim(), course, dueDate }
            : item
        )
      );
    } else {
      setAssignments((items) => [
        {
          id: Date.now(),
          title: title.trim(),
          course,
          dueDate,
          done: false,
        },
        ...items,
      ]);
    }

    resetForm();
    setModalOpen(false);
    setPage("assignments");
  };

  const startEditing = (item: Assignment) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCourse(item.course);
    setDueDate(item.dueDate);
    setError("");
    setModalOpen(true);
  };

  // DELETE: remove an assignment
  const deleteAssignment = (id: number) => {
    if (!window.confirm(t.deleteConfirm)) return;
    setAssignments((items) => items.filter((item) => item.id !== id));
  };

  const toggleAssignment = (id: number) => {
    setAssignments((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // READ: show and search assignments
  const filteredAssignments = assignments.filter((item) =>
    `${item.title} ${courseName(item.course)}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const completedCount = assignments.filter((item) => item.done).length;
  const pendingCount = assignments.length - completedCount;

  const bg = dark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800";
  const panel = dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white";
  const muted = dark ? "text-slate-400" : "text-slate-500";
  const field = `w-full rounded-xl border px-3 py-2.5 outline-none focus:border-cyan-500 ${
    dark
      ? "border-slate-600 bg-slate-900 text-white"
      : "border-slate-200 bg-white text-slate-800"
  }`;

  const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { id: "subjects", label: t.subjects, icon: BookOpen },
    { id: "schedule", label: t.schedule, icon: CalendarDays },
    { id: "assignments", label: t.assignments, icon: ClipboardList },
    { id: "grades", label: t.grades, icon: GraduationCap },
    ...(role === "admin" ? [{ id: "users" as Page, label: t.users, icon: Users }] : []),
  ];

  return (
    <div dir={ar ? "rtl" : "ltr"} className={`min-h-screen ${bg}`}>
      <div className="flex min-h-screen">
        <aside className={`hidden w-64 shrink-0 border-e p-5 md:flex md:flex-col ${panel}`}>
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500 p-3 text-white">
              <GraduationCap size={27} />
            </div>
            <div>
              <h1 className="text-xl font-black text-cyan-600">{t.app}</h1>
              <p className={`text-xs ${muted}`}>{t.subtitle}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    page === item.id
                      ? "bg-cyan-500 text-white"
                      : dark
                        ? "text-slate-300 hover:bg-slate-700"
                        : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className={`mt-auto rounded-2xl p-4 ${dark ? "bg-slate-700" : "bg-cyan-50"}`}>
            <GraduationCap className="mb-2 text-cyan-600" size={25} />
            <p className="text-sm font-bold">{ar ? "واصل تقدمك!" : "Keep progressing!"}</p>
            <p className={`mt-1 text-xs ${muted}`}>
              {ar ? "نظّم واجباتك وتابع إنجازك." : "Organize your assignments."}
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className={`sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 md:px-8 ${panel}`}>
            <div>
              <h2 className="text-lg font-extrabold">{t.app}</h2>
              <p className={`text-xs ${muted}`}>{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Role"
                value={role}
                onChange={(event) => {
                  const next = event.target.value as Role;
                  setRole(next);
                  if (next !== "admin" && page === "users") setPage("dashboard");
                }}
                className={`rounded-xl border px-2 py-2 text-xs ${field}`}
              >
                <option value="student">{t.student}</option>
                <option value="instructor">{t.instructor}</option>
                <option value="admin">{t.admin}</option>
              </select>

              <button
                onClick={() => setLanguage(ar ? "en" : "ar")}
                className={`rounded-xl border p-2.5 ${dark ? "border-slate-700 hover:bg-slate-700" : "border-slate-200 hover:bg-slate-100"}`}
                title="Change language"
              >
                <Languages size={18} />
              </button>

              <button
                onClick={() => setDark(!dark)}
                className={`rounded-xl border p-2.5 ${dark ? "border-slate-700 hover:bg-slate-700" : "border-slate-200 hover:bg-slate-100"}`}
                title="Change theme"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl p-4 md:p-8">
            {page === "dashboard" && (
              <>
                <section className="mb-7 rounded-3xl bg-gradient-to-l from-blue-700 via-cyan-600 to-cyan-400 p-6 text-white md:p-9">
                  <p className="mb-2 text-sm text-cyan-50">{t.demo}</p>
                  <h2 className="text-2xl font-black md:text-3xl">{t.welcome}</h2>
                  <p className="mt-3 max-w-xl text-sm text-white/85">{t.overview}</p>

                  {/* shadcn/ui Button */}
                  <Button
                    onClick={() => {
                      resetForm();
                      setModalOpen(true);
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-cyan-700 hover:bg-cyan-50"
                  >
                    <Plus size={18} />
                    {t.add}
                  </Button>
                </section>

                <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: t.total, value: assignments.length, icon: ClipboardList },
                    { label: t.pending, value: pendingCount, icon: CalendarDays },
                    { label: t.completed, value: completedCount, icon: CheckCircle2 },
                    { label: t.courseCount, value: courses.length, icon: BookOpen },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className={`rounded-2xl border p-5 ${panel}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className={`text-sm ${muted}`}>{stat.label}</p>
                            <p className="mt-3 text-3xl font-black">{stat.value}</p>
                          </div>
                          <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600">
                            <Icon size={24} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>

                <section className={`rounded-2xl border p-5 ${panel}`}>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-extrabold">{t.recent}</h3>
                    <button onClick={() => setPage("assignments")} className="text-sm font-bold text-cyan-600">
                      {ar ? "عرض الكل" : "View all"}
                    </button>
                  </div>
                  <AssignmentRows
                    items={assignments.slice(0, 3)}
                    ar={ar}
                    dark={dark}
                    courseName={courseName}
                    onToggle={toggleAssignment}
                    onEdit={startEditing}
                    onDelete={deleteAssignment}
                    role={role}
                    labels={t}
                  />
                </section>
              </>
            )}

            {page === "assignments" && (
              <section className={`rounded-2xl border p-5 ${panel}`}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black">{t.assignments}</h2>
                    <p className={`mt-1 text-sm ${muted}`}>
                      {ar ? "أضف واجباتك وعدّلها أو احذفها." : "Create, edit, and delete assignments."}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      resetForm();
                      setModalOpen(true);
                    }}
                    className="gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
                  >
                    <Plus size={18} />
                    {t.add}
                  </Button>
                </div>

                <div className="relative mb-5">
                  <Search className={`absolute top-3 ${ar ? "right-3" : "left-3"} ${muted}`} size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t.search}
                    className={`${field} ${ar ? "pr-10" : "pl-10"}`}
                  />
                </div>

                <AssignmentRows
                  items={filteredAssignments}
                  ar={ar}
                  dark={dark}
                  courseName={courseName}
                  onToggle={toggleAssignment}
                  onEdit={startEditing}
                  onDelete={deleteAssignment}
                  role={role}
                  labels={t}
                />
                {filteredAssignments.length === 0 && (
                  <p className={`py-8 text-center text-sm ${muted}`}>{t.noAssignments}</p>
                )}
              </section>
            )}

            {page === "subjects" && (
              <>
                <h2 className="mb-2 text-2xl font-black">{t.subjects}</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {courses.map((item) => (
                    <div key={item.id} className={`rounded-2xl border p-5 ${panel}`}>
                      <div className="mb-4 rounded-2xl bg-cyan-50 p-3 text-cyan-700 w-fit">
                        <BookOpen size={24} />
                      </div>
                      <h3 className="font-extrabold">{ar ? item.ar : item.en}</h3>
                      <p className={`mt-2 text-sm ${muted}`}>{item.code}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {page === "schedule" && (
              <section className={`rounded-2xl border p-5 ${panel}`}>
                <h2 className="mb-5 text-xl font-black">{t.schedule}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="p-3 text-start">{t.day}</th>
                        <th className="p-3 text-start">{t.time}</th>
                        <th className="p-3 text-start">{t.course}</th>
                        <th className="p-3 text-start">{t.room}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item, index) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="p-3">{ar ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء"][index] : ["Sunday", "Monday", "Tuesday", "Wednesday"][index]}</td>
                          <td className="p-3">{`${8 + index}:00 - ${9 + index}:00`}</td>
                          <td className="p-3">{ar ? item.ar : item.en}</td>
                          <td className="p-3">{`R${index + 1}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {page === "grades" && (
              <section className={`rounded-2xl border p-5 ${panel}`}>
                <h2 className="mb-5 text-xl font-black">{t.grades}</h2>
                {courses.map((item, index) => (
                  <div key={item.id} className={`mb-3 rounded-xl p-4 ${dark ? "bg-slate-900" : "bg-slate-50"}`}>
                    <div className="mb-2 flex justify-between gap-3">
                      <span>{ar ? item.ar : item.en}</span>
                      <span className="font-bold text-cyan-600">{[85, 92, 78, 88][index]}%</span>
                    </div>
                    <div className={`h-2 overflow-hidden rounded-full ${dark ? "bg-slate-700" : "bg-slate-200"}`}>
                      <div className="h-full rounded-full bg-cyan-500" style={{ width: `${[85, 92, 78, 88][index]}%` }} />
                    </div>
                  </div>
                ))}
              </section>
            )}

            {page === "users" && role === "admin" && (
              <section className={`rounded-2xl border p-5 ${panel}`}>
                <h2 className="mb-3 text-xl font-black">{t.users}</h2>
                <p className={muted}>
                  {ar
                    ? "هذه صفحة تجريبية. صلاحيات المستخدمين الحقيقية تحتاج إلى الخادم."
                    : "Demo page. Real user permissions require server integration."}
                </p>
              </section>
            )}

            {role === "instructor" && (
              <p className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900">
                {ar
                  ? "وضع المدرس تجريبي؛ إدارة الطلاب تحتاج إلى ربط قاعدة البيانات."
                  : "Instructor mode is a demo; student management requires database integration."}
              </p>
            )}
          </div>
        </main>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
              resetForm();
            }
          }}
        >
          <section className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl ${dark ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">{editingId !== null ? t.edit : t.newAssignment}</h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                className="rounded-xl p-2 hover:bg-slate-100"
                aria-label={ar ? "إغلاق" : "Close"}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveAssignment}>
              <label className="mb-2 block text-sm font-bold">{t.title}</label>
              <input
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={ar ? "اكتب اسم الواجب" : "Enter assignment title"}
                className={field}
              />

              <label className="mb-2 mt-4 block text-sm font-bold">{t.course}</label>
              <select value={course} onChange={(event) => setCourse(event.target.value)} className={field}>
                {courses.map((item) => (
                  <option key={item.id} value={item.id}>{ar ? item.ar : item.en}</option>
                ))}
              </select>

              <label className="mb-2 mt-4 block text-sm font-bold">{t.due}</label>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className={field}
              />

              {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

              <div className="mt-6 flex gap-3">
                <Button type="submit" className="flex-1 bg-cyan-600 text-white hover:bg-cyan-700">
                  {t.save}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                >
                  {t.cancel}
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

type AssignmentRowsProps = {
  items: Assignment[];
  ar: boolean;
  dark: boolean;
  courseName: (id: string) => string;
  onToggle: (id: number) => void;
  onEdit: (item: Assignment) => void;
  onDelete: (id: number) => void;
  role: Role;
  labels: Record<string, string>;
};

function AssignmentRows({
  items,
  ar,
  dark,
  courseName,
  onToggle,
  onEdit,
  onDelete,
  role,
  labels,
}: AssignmentRowsProps) {
  const muted = dark ? "text-slate-400" : "text-slate-500";

  if (items.length === 0) {
    return <p className={`py-6 text-center text-sm ${muted}`}>{labels.noAssignments}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <article
          key={item.id}
          className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4 ${
            dark ? "border-slate-700 bg-slate-900/70" : "border-slate-100 bg-slate-50"
          }`}
        >
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <button
              onClick={() => onToggle(item.id)}
              title={labels.toggle}
              aria-label={labels.toggle}
              className={`mt-1 shrink-0 ${item.done ? "text-emerald-500" : muted}`}
            >
              <CheckCircle2 size={22} />
            </button>

            <div className="min-w-0">
              <h3 className={`break-words font-bold ${item.done ? "text-slate-400 line-through" : dark ? "text-white" : "text-slate-800"}`}>
                {item.title}
              </h3>
              <p className={`mt-1 text-xs ${muted}`}>{courseName(item.course)}</p>
              <p className={`mt-1 text-xs ${muted}`}>{labels.due}: {item.dueDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
              item.done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {item.done ? labels.done : labels.notDone}
            </span>

            {role === "student" && (
              <>
                <button
                  onClick={() => onEdit(item)}
                  title={ar ? "تعديل" : "Edit"}
                  aria-label={ar ? "تعديل الواجب" : "Edit assignment"}
                  className="rounded-lg p-2 text-blue-500 hover:bg-blue-100"
                >
                  <Pencil size={17} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  title={ar ? "حذف" : "Delete"}
                  aria-label={ar ? "حذف الواجب" : "Delete assignment"}
                  className="rounded-lg p-2 text-rose-500 hover:bg-rose-100"
                >
                  <Trash2 size={17} />
                </button>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
