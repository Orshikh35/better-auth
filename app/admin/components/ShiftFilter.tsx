// components/ShiftFilter.tsx
type Props = {
    active: number | "all";
    onChange: (v: number | "all") => void;
  };
  
  export default function ShiftFilter({ active, onChange }: Props) {
    return (
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onChange("all")}
          className={`px-3 py-1 rounded ${
            active === "all" ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          Бүх ээлж
        </button>
  
        {Array.from({ length: 11 }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`px-3 py-1 rounded ${
                active === n ? "bg-green-600 text-white" : "bg-white"
              }`}
            >
              {n}-р ээлж
            </button>
          );
        })}
      </div>
    );
  }
  