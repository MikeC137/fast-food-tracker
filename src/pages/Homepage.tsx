import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <PageNav />
      <h1 className="mx-auto max-w-2xl text-center pt-10 text-3xl md:text-4xl text-zinc-300 text-balance font-['Inter',sans-serif] font-bold">
        Take Control of Your
        <br />
        Fast Food Spending
      </h1>
      <h3 className="text-zinc-400 mx-auto max-w-2xl text-center p-5 font-['Inter',sans-serif]">
        Track every meal, Set budgets, analyze spending patterns, and make
        smarter choices about your fast food expenses.
      </h3>
      <button></button>
    </div>
  );
}

export default Homepage;
