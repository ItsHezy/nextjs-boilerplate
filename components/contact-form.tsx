"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type ContactFormProps = {
  email: string;
  inputClass: string;
};

export function ContactForm({ email, inputClass }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    };

    setIsSubmitting(true);
    setFeedback("");
    setHasError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setIsSubmitted(false);
        setHasError(true);
        setFeedback(
          data?.message ??
            "Something went wrong. Please try again or email me directly.",
        );
        return;
      }

      form.reset();
      setIsSubmitted(true);
      setHasError(false);
      setFeedback(data?.message ?? "Thanks. Your message has been sent.");
    } catch {
      setIsSubmitted(false);
      setHasError(true);
      setFeedback(
        "Something went wrong. Please try again or email me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFieldChange() {
    setIsSubmitted(false);
    setHasError(false);
    setFeedback("");
  }

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website</label>
          <input
            id="companyWebsite"
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/46"
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
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/46"
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
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/46"
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
            onChange={handleFieldChange}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-[#78bfff]/30 bg-[#78bfff] px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] text-[#07111d] shadow-[0_0_40px_rgba(120,191,255,0.16)] hover:-translate-y-0.5 hover:bg-[#9cd0ff] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
      <p className="mt-6 text-sm text-white/44">
        Email:{" "}
        <a
          href={`mailto:${email}`}
          className="text-white/72 underline decoration-white/20 underline-offset-4 hover:text-[#b7deff]"
        >
          {email}
        </a>
      </p>
      <p
        aria-live="polite"
        className={`mt-3 min-h-6 text-sm ${
          hasError ? "text-[#ffb3b3]" : "text-[#b7deff]"
        }`}
      >
        {feedback ||
          (isSubmitted
            ? "Thanks. Your message has been sent."
            : "")}
      </p>
    </div>
  );
}
