export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-surface-container-high bg-surface-container-lowest">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-primary-container font-bold text-[20px]" style={{
            fontFamily: "var(--font-display)",
            filter: "drop-shadow(0 0 8px rgba(227,24,55,0.6))",
          }}>
            THE VOID
          </span>
          <span className="text-on-surface-variant opacity-40" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
            v1.0.0
          </span>
        </div>

        <p className="text-on-surface-variant opacity-50 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} HAWKINS NATIONAL LABORATORY — ALL FILES CLASSIFIED
        </p>

        <div className="flex items-center gap-4">
          <span className="signal-indicator">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </span>
          <span className="text-on-surface-variant opacity-40" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
            SIGNAL ACTIVE
          </span>
        </div>
      </div>
    </footer>
  );
}
