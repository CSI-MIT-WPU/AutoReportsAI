function Blog() {
  return (
    <div className="w-full py-16 space-y-5 px-40 flex flex-col items-center justify-center">
      <div className="space-y-3 text-center">
        <p className="text-sm tracking-wide">BLOG</p>
        <h2 className="text-5xl font-semibold">Latest Articles</h2>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-1 p-5 border border-slate-300 rounded-lg space-y-3">
          <div className="space-y-1">
            <img
              src="/dashboard.png"
              alt=""
              className="border border-slate-300 rounded-lg"
            />
            <p className="text-sm text-slate-500">August 29, 2024 (4w ago)</p>
          </div>
          <h3 className="font-semibold text-lg">Introducing AutoReportsAI</h3>
          <p className="text-base text-slate-800">
            Introducing AutoReportsAI, a cutting edge AI solution for modern
            businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
