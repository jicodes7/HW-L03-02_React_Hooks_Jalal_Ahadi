import { useEffect, useState } from "react";

const fallbackUsers = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
  { id: 3, name: "Clementine Bauch", email: "clementine@example.com" },
];

export default function UserCrud() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setUsers(data.slice(0, 6)))
      .catch(() => setUsers(fallbackUsers))
      .finally(() => setLoading(false));
  }, []);

  function addUser(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setUsers((current) => [
      ...current,
      { id: Date.now(), name: name.trim(), email: email.trim() },
    ]);
    setName("");
    setEmail("");
  }

  function deleteUser(id) {
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          تمرین ۱
        </span>
        <h2 className="mt-3 text-2xl font-black">CRUD ساده کاربران با useState</h2>
      </div>

      <form onSubmit={addUser} className="mb-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام کاربر"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="ایمیل"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <button className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">
          افزودن کاربر
        </button>
      </form>

      {loading ? (
        <p className="text-slate-500">در حال دریافت کاربران...</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {users.map((user) => (
            <article key={user.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(user.id)}
                className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-100"
              >
                حذف
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
