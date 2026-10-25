import { useEffect, useState } from "react";
import { site } from "../../data/site";

/** Live open/closed pill, computed in India time. */
export default function OpenNow() {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = now.getDay();
      const h = now.getHours() + now.getMinutes() / 60;
      const openDay = (site.openDays as readonly number[]).includes(day);
      const open = openDay && h >= site.openHour && h < site.closeHour;
      let label = "Open now · till 9 pm";
      if (!open) {
        if (day === 0) label = "Closed Sundays · back Monday 10 am";
        else if (h < site.openHour) label = "Opens today at 10 am";
        else label = day === 6 ? "Closed · opens Monday 10 am" : "Closed · opens tomorrow 10 am";
      }
      setState({ open, label });
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  if (!state) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-display text-base font-bold">
      <span className={`h-2.5 w-2.5 rounded-full ${state.open ? "bg-green-600" : "bg-tomato"}`} />
      {state.label}
    </span>
  );
}
