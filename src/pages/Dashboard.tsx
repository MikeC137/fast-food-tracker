import PageNav from "@/components/PageNav";

function Dashboard() {
  const now = new Date();
  const monthYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="min-h-screen">
      <PageNav />
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 p-4 sm:p-8 md:p-16 mt-4 sm:mt-8 md:mt-12 mx-4 sm:mx-8 md:mx-14 bg-zinc-900 rounded-lg">
        <div>
          <h2 className="text-zinc-300 font-['Inter',sans-serif] font-bold text-xl sm:text-2xl">
            Dashboard
          </h2>
          <h3 className="text-zinc-500 text-sm sm:text-base">{monthYear}</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base">
            + Add Expense
          </button>
          <button className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base">
            Adjust Budget
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
