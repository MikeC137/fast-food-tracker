import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  const navigate = useNavigate();

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
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-zinc-300 bg-blue-600 font-['Inter',sans-serif] font-bold hover:text-white hover:bg-blue-800 p-2 rounded-lg transition-colors"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/history")}
          className="text-zinc-300 border-1 border-solid border-zinc-800 font-['Inter',sans-serif] font-bold hover:text-white hover:bg-green-700 p-2 rounded-lg transition-colors"
        >
          View History
        </button>
      </div>
      <h2 className="text-zinc-300 font-['Inter',sans-serif] font-bold text-center p-15">
        Everything You Need To Track Your Spending
      </h2>
    </div>
  );
}

export default Homepage;
