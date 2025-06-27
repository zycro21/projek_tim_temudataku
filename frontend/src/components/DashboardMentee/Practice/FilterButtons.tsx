"use client"

interface FilterOption {
  id: string
  label: string
}

interface FilterButtonsProps {
  options: FilterOption[]
  selected: string
  onChange: (value: string) => void
}

export default function FilterButtons({ options, selected, onChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === option.id
              ? "bg-emerald-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
