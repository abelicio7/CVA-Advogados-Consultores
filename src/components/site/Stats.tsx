import { STATS } from "@/data/site";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number | null;
  suffix: string;
  label: string;
}) {
  const displayValue = value === null ? suffix : `${value}${suffix}`;
  return (
    <div className="px-2 py-8 text-center sm:py-10">
      <p className="font-display text-4xl text-foreground sm:text-5xl">
        {displayValue}
      </p>
      <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="A firma em números" className="border-b border-hairline bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-10">
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}
