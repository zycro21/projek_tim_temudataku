import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { dummyTestimoniBootcamp } from "../data/dummyTestimoniBootcamp";

export function TestimoniBootcampSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 4, spacing: 16 },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 16 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 16 },
        },
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    []
  );

  return (
    <section className="bg-white py-20 px-6 md:px-16" id="testimoni-bootcamp">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-0 md:max-w-md">
            Apa Kata Alumni Tentang Bootcamp di TemuDataku?
          </h2>
          <p className="text-gray-600 text-base max-w-xl">
            Dari yang bingung arah, sampai berani ambil peluang—ini kata alumni
            soal pengalaman mereka di TemuDataku.
          </p>
        </div>

        {/* Carousel dengan Navigasi */}
        <div className="relative">
          {/* Tombol navigasi kiri */}
          <button
            onClick={() => slider.current?.prev()}
            className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 z-10 bg-white border shadow p-2 rounded-full"
          >
            <span className="text-xl">‹</span>
          </button>

          {/* Carousel */}
          <div ref={sliderRef} className="keen-slider">
            {dummyTestimoniBootcamp.map((alumni) => (
              <div key={alumni.id} className="keen-slider__slide">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="flex items-center gap-3 px-4 py-4">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{alumni.name}</h4>
                      <p className="text-xs text-gray-500">{alumni.role}</p>
                      <p className="text-xs text-gray-500">{alumni.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol navigasi kanan */}
          <button
            onClick={() => slider.current?.next()}
            className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-10 bg-white border shadow p-2 rounded-full"
          >
            <span className="text-xl">›</span>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({
            length: slider.current?.track.details.slides.length || 0,
          }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === idx ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
