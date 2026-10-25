import { useState } from "react";
import { motion } from "framer-motion";
import { links } from "../../data/site";
import { Magnetic } from "./motion";

const OCCASIONS = ["Birthday", "Get-together", "Farewell", "Team hangout", "Something else"];

/** Builds a WhatsApp message so the café gets a clean booking request. No backend. */
export default function EventBooking() {
  const [f, setF] = useState({ name: "", occasion: OCCASIONS[0], date: "", time: "", people: "6", notes: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const msg = `Hi Beyond Temptation! I'd like to book a table.
Name: ${f.name || "-"}
Occasion: ${f.occasion}
Date: ${f.date || "-"} at ${f.time || "-"}
People: ${f.people}
${f.notes ? "Notes: " + f.notes : ""}`.trim();

  const field = "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 font-sans text-base outline-none focus:bg-yellow-soft";
  const label = "block font-display text-sm font-bold";

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(links.whatsapp(msg), "_blank", "noopener");
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid gap-4 rounded-3xl border-2 border-ink bg-cream p-6 shadow-hard md:grid-cols-2 md:p-8"
    >
      <label className="md:col-span-2">
        <span className={label}>Your name</span>
        <input required value={f.name} onChange={set("name")} className={field} placeholder="Who's booking?" />
      </label>
      <label>
        <span className={label}>Occasion</span>
        <select value={f.occasion} onChange={set("occasion")} className={field}>
          {OCCASIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        <span className={label}>How many people</span>
        <input type="number" min={2} max={40} value={f.people} onChange={set("people")} className={field} />
      </label>
      <label>
        <span className={label}>Date</span>
        <input type="date" required value={f.date} onChange={set("date")} className={field} />
      </label>
      <label>
        <span className={label}>Time</span>
        <input type="time" required value={f.time} onChange={set("time")} className={field} />
      </label>
      <label className="md:col-span-2">
        <span className={label}>Anything else</span>
        <textarea rows={3} value={f.notes} onChange={set("notes")} className={field} placeholder="Cake? Decorations? Dietary stuff?" />
      </label>
      <div className="md:col-span-2">
        <Magnetic
          href={links.whatsapp(msg)}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-lg font-bold text-yellow shadow-hard-yellow"
        >
          Send booking on WhatsApp
        </Magnetic>
        <p className="mt-3 text-sm text-smoke">Opens WhatsApp with your details filled in. We confirm there. Closed Sundays.</p>
      </div>
    </motion.form>
  );
}
