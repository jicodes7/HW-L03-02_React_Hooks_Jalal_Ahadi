import { useEffect, useState } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadImages(pageNumber, append = false) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=9`
      );
      if (!response.ok) throw new Error("خطا در دریافت تصاویر");
      const data = await response.json();
      setImages((current) => (append ? [...current, ...data] : data));
    } catch (err) {
      setError(err.message || "خطا در دریافت تصاویر");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImages(1);
  }, []);

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(nextPage, true);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            تمرین ۲
          </span>
          <h2 className="mt-3 text-2xl font-black">گالری تصاویر با API</h2>
          <p className="mt-1 text-sm text-slate-500">
            دریافت داده با fetch و useEffect، نگهداری تصاویر با useState
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image) => (
          <figure key={`${image.id}-${image.download_url}`} className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={`https://picsum.photos/id/${image.id}/600/400`}
              alt={`تصویر از ${image.author}`}
              className="h-44 w-full object-cover md:h-56"
              loading="lazy"
            />
            <figcaption className="p-3 text-xs text-slate-500">
              Photographer: {image.author}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={loadMore}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
        </button>
      </div>
    </section>
  );
}
