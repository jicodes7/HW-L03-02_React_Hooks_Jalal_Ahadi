import UserCrud from "./components/UserCrud";
import ImageGallery from "./components/ImageGallery";

export default function App() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm font-semibold text-indigo-600">React Hooks Homework</p>
          <h1 className="mt-1 text-3xl font-black">تمرین React Hooks</h1>
          <p className="mt-2 text-sm text-slate-500">
            تمرین useState برای CRUD کاربران و useEffect برای گالری تصاویر API
          </p>
        </header>

        <UserCrud />
        <ImageGallery />
      </div>
    </main>
  );
}
