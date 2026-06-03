"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="signal" className="px-6 bg-surface-container-lowest" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[700px] mx-auto">
        {/* Section header */}
        <div className="mb-12 reveal">
          <p className="text-primary-container mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {"> ESTABLISHING CONNECTION..."}
          </p>
          <h2 className="text-headline-lg text-on-surface neon-glow-subtle" style={{ fontFamily: "var(--font-display)" }}>
            Transmit a Signal
          </h2>
          <p className="text-body-lg text-on-surface-variant mt-3">
            Send a transmission through the rift. All communications are encrypted and monitored by Hawkins Lab security protocols.
          </p>
        </div>

        {/* Terminal prompt */}
        <div className="mb-8 reveal">
          <p className="text-on-surface-variant opacity-60" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
            {"> Awaiting transmission..."}
          </p>
          <p className="text-on-surface-variant opacity-40" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
            {"> Secure channel open on frequency 47.3 MHz"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 reveal">
          <div>
            <label className="block mb-2 text-on-surface-variant" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              OPERATIVE NAME
            </label>
            <input type="text" className="void-input" placeholder="ENTER DESIGNATION..."
              value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required />
          </div>

          <div>
            <label className="block mb-2 text-on-surface-variant" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              SIGNAL FREQUENCY (EMAIL)
            </label>
            <input type="email" className="void-input" placeholder="ENTER FREQUENCY..."
              value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required />
          </div>

          <div>
            <label className="block mb-2 text-on-surface-variant" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              TRANSMISSION
            </label>
            <textarea className="void-textarea" placeholder="ENCODE YOUR MESSAGE..."
              value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} required />
          </div>

          <button type="submit"
            className="bg-primary-container text-on-primary-container px-8 py-4 w-full transition-all duration-300 flicker-btn cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(227,24,55,0.3)",
              border: "none",
            }}>
            {submitted ? "✓ TRANSMISSION SENT" : "TRANSMIT SIGNAL →"}
          </button>

          {submitted && (
            <p className="text-center text-primary-container" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em" }}>
              {"> Signal received. Hawkins Lab will respond within 24-48 hours."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
