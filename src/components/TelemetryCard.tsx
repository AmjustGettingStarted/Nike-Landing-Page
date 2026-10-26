interface TelemetryCardProps {
  className?: string;
}

/** Glass data panel (originally from the Aerospace Performance section). */
export function TelemetryCard({ className = "" }: TelemetryCardProps) {
  return (
    <div
      className={`w-full max-w-[340px] p-5 md:p-6 rounded-xl border border-white/10 bg-[#050505]/55 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ${className}`}
      id="telemetry-display-panel"
    >
      <div className="flex items-end justify-between mb-4">
        <span className="font-serif italic text-brand-orange text-6xl md:text-7xl leading-none tracking-tighter">
          78%
        </span>
        <div className="w-[120px] md:w-[140px] h-[55px] opacity-90">
          <svg viewBox="0 0 289 138" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M22.5 48.7306C39.7833 48.7306 49.34 54.94 63.1667 69.2965C76.9933 83.653 86.55 110.5 103.833 110.5C121.117 110.5 130.673 84.2876 144.5 59.2856C158.327 34.2837 167.883 19.5573 185.167 19.5573C202.45 19.5573 208.55 57.6673 225.833 57.6673C243.117 57.6673 249.217 19.5 266.5 19.5"
              stroke="#DA3A16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <h3 className="font-sans font-bold text-white text-xs tracking-widest uppercase mb-1">
        Next-Gen Cushioning Architecture
      </h3>
      <p className="font-sans text-white/50 text-[11px] leading-relaxed">
        Impact Absorption &amp; Energy Return Dynamics Matrix
      </p>
      <div className="mt-4 pt-4 border-t border-white/10 flex gap-6 text-[10px] font-mono text-white/40">
        <div>
          <span className="block text-brand-orange font-bold uppercase">Speed Vectors</span>
          <span className="text-white font-medium">9.81 M/S² Active</span>
        </div>
        <div>
          <span className="block text-brand-orange font-bold uppercase">Thermo-Fit</span>
          <span className="text-white font-medium">Optimized 34°C</span>
        </div>
      </div>
    </div>
  );
}
