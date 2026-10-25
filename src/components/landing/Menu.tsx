import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { formatPrice, groups, menu, type Dish } from "../../data/menu";
import { links } from "../../data/site";

type Group = (typeof groups)[number];
type Diet = "all" | "veg" | "nonveg";

export default function Menu({ compact = false }: { compact?: boolean }) {
  const [group, setGroup] = useState<Group>("All");
  const [diet, setDiet] = useState<Diet>("all");
  const [q, setQ] = useState("");

  const sections = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return menu
      .filter((s) => group === "All" || s.group === group)
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (d) =>
            (diet === "all" || (diet === "veg" ? !d.nonVeg : d.nonVeg)) &&
            (!needle || d.name.toLowerCase().includes(needle) || d.blurb?.toLowerCase().includes(needle)),
        ),
      }))
      .filter((s) => s.items.length);
  }, [group, diet, q]);

  const count = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-5 bg-cream/90 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10 md:top-[72px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <LayoutGroup id="menu-groups">
            <div className="flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Menu groups">
              {groups.map((g) => {
                const active = g === group;
                return (
                  <button
                    key={g}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setGroup(g)}
                    className={`relative isolate shrink-0 rounded-full px-5 py-2 font-display text-base font-bold transition-colors ${
                      active ? "text-yellow" : "text-ink hover:bg-yellow/60"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="menu-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-ink shadow-hard-sm"
                      />
                    )}
                    {g}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            <DietToggle value={diet} onChange={setDiet} />
            <label className="relative flex-1 md:w-56">
              <span className="sr-only">Search the menu</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dishes"
                className="w-full rounded-full border-2 border-ink bg-paper px-4 py-2 font-sans text-base outline-none placeholder:text-smoke focus:bg-yellow-soft"
              />
            </label>
          </div>
        </div>
      </div>

      <p className="mt-6 text-smoke">
        {count} dishes{q && ` matching "${q}"`}. Tap any dish to order it on WhatsApp.
      </p>

      <LayoutGroup>
        <motion.div layout className="mt-6 columns-1 gap-6 md:columns-2 xl:columns-3">
          <AnimatePresence mode="popLayout">
            {sections.map((s) => (
              <motion.section
                key={s.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="mb-6 break-inside-avoid rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard will-change-transform"
                id={s.id}
              >
                <header className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
                  <h3 className="font-display text-2xl font-extrabold">{s.title}</h3>
                  <span className="rotate-[-3deg] rounded-md bg-yellow px-2 py-0.5 font-display text-sm font-bold">
                    {s.group}
                  </span>
                </header>
                {s.note && <p className="mt-3 text-sm text-smoke">{s.note}</p>}
                <ul className="mt-2 divide-y divide-ink/10">
                  {s.items.map((d) => (
                    <DishRow key={d.name} d={d} />
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {count === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-ink/30 p-10 text-center">
          <p className="font-display text-2xl font-bold">Nothing called "{q}" here</p>
          <button
            onClick={() => {
              setQ("");
              setDiet("all");
              setGroup("All");
            }}
            className="mt-3 rounded-full bg-ink px-5 py-2 font-display font-bold text-yellow"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function DishRow({ d }: { d: Dish }) {
  return (
    <li>
      <a
        href={links.whatsapp(`Hi! I'd like to order ${d.name} (${formatPrice(d.price)}).`)}
        target="_blank"
        rel="noopener"
        className="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-yellow-soft"
      >
        <DietMark nonVeg={!!d.nonVeg} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold leading-tight">{d.name}</span>
            {d.star && (
              <span className="rounded-sm bg-tomato px-1.5 py-0.5 font-display text-[11px] font-bold leading-none text-paper">
                popular
              </span>
            )}
          </div>
          {d.blurb && <p className="mt-0.5 text-sm text-smoke">{d.blurb}</p>}
        </div>
        <span className="shrink-0 font-display text-lg font-bold tabular-nums">{formatPrice(d.price)}</span>
      </a>
    </li>
  );
}

function DietMark({ nonVeg }: { nonVeg: boolean }) {
  return (
    <span
      className={`mt-1.5 grid h-4 w-4 shrink-0 place-items-center border-2 ${nonVeg ? "border-tomato" : "border-green-700"}`}
      aria-label={nonVeg ? "Non-vegetarian" : "Vegetarian"}
      title={nonVeg ? "Non-veg" : "Veg"}
    >
      <span className={`h-2 w-2 rounded-full ${nonVeg ? "bg-tomato" : "bg-green-700"}`} />
    </span>
  );
}

function DietToggle({ value, onChange }: { value: Diet; onChange: (d: Diet) => void }) {
  const opts: { v: Diet; label: string }[] = [
    { v: "all", label: "All" },
    { v: "veg", label: "Veg" },
    { v: "nonveg", label: "Non-veg" },
  ];
  return (
    <div className="flex rounded-full border-2 border-ink bg-paper p-0.5" role="radiogroup" aria-label="Diet">
      {opts.map((o) => {
        const active = o.v === value;
        return (
          <button
            key={o.v}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.v)}
            className={`relative isolate rounded-full px-3 py-1.5 font-display text-sm font-bold ${active ? "text-paper" : "text-ink"}`}
          >
            {active && (
              <motion.span
                layoutId="diet-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className={`absolute inset-0 -z-10 rounded-full ${o.v === "nonveg" ? "bg-tomato" : o.v === "veg" ? "bg-green-700" : "bg-ink"}`}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
