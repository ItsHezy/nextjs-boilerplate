"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type ContactFormProps = {
  email: string;
  inputClass: string;
};

export function ContactForm({ email, inputClass }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    form.reset();
    setIsSubmitted(true);
  }

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-white/74"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Your name"
            onChange={() => setIsSubmitted(false)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-white/74"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="your@email.com"
            onChange={() => setIsSubmitted(false)}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-white/74"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-y`}
            placeholder="Tell me a little about your business and what you need."
            onChange={() => setIsSubmitted(false)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full border border-[#4ea7ff]/20 bg-[#4ea7ff] px-6 py-3 text-sm font-medium text-[#04111f] shadow-[0_0_40px_rgba(78,167,255,0.22)] hover:-translate-y-0.5 hover:bg-[#78bbff]"
        >
          Send
        </button>
      </form>
      <p className="mt-5 text-sm text-white/48">
        Email:{" "}
        <a
          href={`mailto:${email}`}
          className="text-white/72 underline decoration-white/20 underline-offset-4 hover:text-[#9bd0ff]"
        >
          {email}
        </a>
      </p>
      <p aria-live="polite" className="mt-3 min-h-6 text-sm text-[#9bd0ff]">
        {isSubmitted
          ? "Thanks. For now, the fastest way to reach me is by email."
          : ""}
      </p>
    </div>
  );
}
