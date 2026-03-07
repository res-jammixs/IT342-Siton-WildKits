import { Badge } from "@/components/ui/badge";

const categories = [
  { label: "All", value: "all", emoji: "🏷️" },
  { label: "Textbooks", value: "textbooks", emoji: "📚" },
  { label: "Electronics", value: "electronics", emoji: "💻" },
  { label: "Uniforms", value: "uniforms", emoji: "👔" },
  { label: "Lab Equipment", value: "lab", emoji: "🔬" },
  { label: "Art Supplies", value: "art", emoji: "🎨" },
  { label: "Gadgets", value: "gadgets", emoji: "📱" },
  { label: "Furniture", value: "furniture", emoji: "🪑" },
  { label: "Sports", value: "sports", emoji: "⚽" },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (value: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
            selected === cat.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
