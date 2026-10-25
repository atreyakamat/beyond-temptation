import { useReducedMotion } from "framer-motion";

/**
 * Hero backdrop: cocoa base, chocolate-drip edge, and a slowly drifting field of
 * hand-drawn food doodles (burger, fries, shake, pizza, coffee, brownie, donut).
 * Pure CSS motion, no cursor interaction.
 */
export default function Backdrop() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#2A1510_0%,#140A06_50%,#000_100%)]" />

      <DoodleDefs />

      {/* two tiled layers drifting at different speeds for depth */}
      <div className={`doodle-field doodle-field-a ${reduce ? "" : "animate-drift-a"}`}>
        <Tile seed={0} />
        <Tile seed={0} />
      </div>
      <div className={`doodle-field doodle-field-b ${reduce ? "" : "animate-drift-b"}`}>
        <Tile seed={1} />
        <Tile seed={1} />
      </div>

      {/* chocolate drip, like the menu card */}
      <svg className="absolute -top-1 left-0 w-full text-[#3B1F14]" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0 0h1440v38c-30 0-40 46-70 46s-30-30-60-30-26 58-56 58-28-44-58-44-30 24-60 24-22-52-52-52-32 36-62 36-30-20-60-20-24 62-54 62-30-50-60-50-26 28-56 28-30-40-60-40-28 54-58 54-30-30-60-30-26 44-56 44-30-62-60-62-28 30-58 30-30-24-60-24-24 50-54 50-30-40-60-40-26 20-56 20-30-58-60-58-28 38-58 38-30-16-60-16-24 50-54 50-30-50-60-50-26 20-56 20-30-28-60-28V0Z"
        />
      </svg>

      {/* vignette so the headline stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_65%,rgba(0,0,0,0.55),transparent_70%)]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}

/** One row-tile of doodles; the field repeats it twice and translates by one tile width. */
function Tile({ seed }: { seed: number }) {
  const order = seed ? ["pizza", "coffee", "shake", "donut", "burger", "brownie", "fries"] : ["burger", "fries", "shake", "pizza", "coffee", "donut", "brownie"];
  return (
    <div className="doodle-tile">
      {Array.from({ length: 3 }).map((_, row) =>
        order.map((id, col) => {
          const rot = ((row * 7 + col * 13 + seed * 5) % 30) - 15;
          const size = 96 + ((row * 5 + col * 3 + seed) % 4) * 18;
          return (
            <svg
              key={`${row}-${col}`}
              className="doodle"
              style={{ width: size, height: size, transform: `rotate(${rot}deg)`, marginTop: row % 2 ? 40 : 0 }}
            >
              <use href={`#dd-${id}`} />
            </svg>
          );
        }),
      )}
    </div>
  );
}

/** Line-art symbols. Stroke only, so they read as chalk doodles on the cocoa background. */
function DoodleDefs() {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <symbol id="dd-burger" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M12 26c0-10 9-16 20-16s20 6 20 16H12Z" />
            <path d="M22 16l1 2M31 13v2M40 16l-1 2" />
            <path d="M10 32h44M11 38c6 0 6 4 12 4s6-4 12-4 6 4 12 4 5-4 8-4" />
            <path d="M14 44h36v4c0 4-4 6-18 6S14 52 14 48v-4Z" />
          </g>
        </symbol>
        <symbol id="dd-fries" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M18 30 14 56h36l-4-26" />
            <path d="M22 30V14M29 30V9M36 30V12M43 30V16M26 30l-4-12M39 30l5-14" />
            <path d="M16 30h32M20 40c4 2 8 2 12 0s8-2 12 0" />
          </g>
        </symbol>
        <symbol id="dd-shake" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M20 24h24l-3 32H23l-3-32Z" />
            <path d="M18 24c4-10 24-10 28 0" />
            <path d="M24 20c2-6 6-8 8-14M40 20c-2-5-4-7-6-11" />
            <path d="M36 22 44 6M23 34h18M24 42h16" />
          </g>
        </symbol>
        <symbol id="dd-pizza" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M8 16c16-8 32-8 48 0L32 58 8 16Z" />
            <path d="M10 20c14-6 30-6 44 0" />
            <circle cx="24" cy="28" r="3" /><circle cx="36" cy="30" r="3" /><circle cx="30" cy="42" r="3" />
          </g>
        </symbol>
        <symbol id="dd-coffee" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M14 26h30v12c0 8-6 14-15 14s-15-6-15-14V26Z" />
            <path d="M44 30h6c4 0 6 3 6 6s-2 6-6 6h-6" />
            <path d="M24 18c0-4 4-4 4-8M32 18c0-4 4-4 4-8" />
            <path d="M12 56h36" />
          </g>
        </symbol>
        <symbol id="dd-donut" viewBox="0 0 64 64">
          <g {...s}>
            <circle cx="32" cy="34" r="20" /><circle cx="32" cy="34" r="7" />
            <path d="M14 30c6 6 10-2 16 2s10-4 16 0 6 6 10-2" />
            <path d="M22 22l2 3M40 20l-2 3M28 46l2-3M42 42l-3-2" />
          </g>
        </symbol>
        <symbol id="dd-brownie" viewBox="0 0 64 64">
          <g {...s}>
            <path d="M14 26 32 18l18 8v16l-18 8-18-8V26Z" />
            <path d="M14 26l18 8 18-8M32 34v16" />
            <path d="M26 10c0-3 3-3 3-6M34 10c0-3 3-3 3-6M30 12c0-2 2-2 2-4" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
