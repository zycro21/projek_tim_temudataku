import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const projectsAlumni = [
  {
    title: "Analisis Sentimen Masyarakat terhadap Kesehatan Publik",
    description:
      "Proyek ini menganalisis data sosial media untuk melihat opini publik terkait kebijakan kesehatan.",
    authors: "Jane Doe, Alan Smith",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "Prediksi Ketersediaan Air Bersih dengan Machine Learning",
    description:
      "Proyek ini memprediksi pasokan air bersih berdasarkan data cuaca dan populasi.",
    authors: "Lisa Wang, David Kim",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "Prediksi Ketersediaan Air Bersih dengan Machine Learning",
    description:
      "Proyek ini memprediksi pasokan air bersih berdasarkan data cuaca dan populasi.",
    authors: "Lisa Wang, David Kim",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "Prediksi Ketersediaan Air Bersih dengan Machine Learning",
    description:
      "Proyek ini memprediksi pasokan air bersih berdasarkan data cuaca dan populasi.",
    authors: "Lisa Wang, David Kim",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  // Tambah lebih banyak jika perlu
];

export default function SubSection8() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.5,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.25, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 2.75, spacing: 24 },
      },
    },
  });

  return (
    <div className="max-w-full overflow-hidden px-4">
      {/* Title */}
      <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
        <span className="text-lg font-bold">▶</span>
        <h3 className="text-lg font-semibold">
          8. Intip Karya Alumni dari bootcamp ini!
        </h3>
      </div>

      {/* Deskripsi */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Slider */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider max-w-full">
          {projectsAlumni.map((project, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-white rounded-xl shadow-md p-4 min-w-[280px] max-w-[320px]"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="rounded-lg mb-3 h-40 w-full object-cover"
              />
              <h4 className="font-semibold text-sm mb-1">{project.title}</h4>
              <p className="text-xs text-gray-600 mb-2">
                {project.description}
              </p>
              <p className="text-xs font-medium text-gray-500 mb-3">
                👤 {project.authors}
              </p>
              <button className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition">
                Jelajahi Proyek
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
