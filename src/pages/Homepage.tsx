import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { TrendingUp, PieChart, History, Smartphone } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

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
      <section className="container mx-auto px-4 py-15">
        <h2 className="text-zinc-300 font-['Inter',sans-serif] font-bold text-center">
          Everything You Need To Track Your Spending
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-5xl mx-auto">
          <FeatureCard
            title="Budget Tracking"
            description="Set monthly budgets and monitor your spending in real-time with
                visual progress indicators."
            icon={TrendingUp}
          />
          <FeatureCard
            title="Smart Analytics"
            description="Visualize your spending patterns with interactive charts and category breakdowns."
            icon={PieChart}
          />
          <FeatureCard
            title="Complete History"
            description="Access your full expense history with detailed records of every transaction."
            icon={History}
          />
          <FeatureCard
            title="Mobile Friendly"
            description="Track expenses on the go with a responsive design that works on any device."
            icon={Smartphone}
          />
        </div>
      </section>
    </div>
  );
}

export default Homepage;
