function Footer() {
  return (
    <footer className="text-zinc-400 pt-2 mt-auto bg-zinc-800 border-t border-zinc-700 text-center font-['Inter',sans-serif]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-zinc-300">FastFoodTracker © 2025</p>
          <a
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            href="https://github.com/MikeC137/fast-food-tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
