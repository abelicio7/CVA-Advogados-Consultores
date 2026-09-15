import { useEffect, useRef, useState } from "react";

import { STATS } from "@/data/site";

function useCountUp(target: number | null, start: boolean) {
  const [value, setValue] = useState(target ?? 0);

  useEffect(() => {
    if (!start || target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const from = target > 1000 ? target - 40 : 0;
    const duration = 1100;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);

  return value;
}

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number | null;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const current = useCountUp(value, start);
  return (
    <div className="px-2 py-8 text-center sm:py-10">
      <p className="font-display text-4xl text-foreground sm:text-5xl">
        {value === null ? suffix : current}
      </p>
      <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-label="A firma em números" className="border-b border-hairline bg-surface">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-10"
      >
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={start} />
        ))}
      </div>
    </section>
  );
}
