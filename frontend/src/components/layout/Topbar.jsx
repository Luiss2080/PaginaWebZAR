export default function Topbar() {
  return (
    <div className="bg-primary text-white w-full py-2">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        <span className="flex items-center gap-2">
          📦 FREE SHIPPING ON ALL ORDERS OVER $150
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-2">
          🔥 NEW DROPS EVERY FRIDAY
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-2">
          ★ 10,000+ FIVE STAR REVIEWS
        </span>
      </div>
    </div>
  )
}
