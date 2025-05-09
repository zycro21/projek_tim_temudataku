// src/components/Home/FAQSection.tsx
import FAQCard from "./Card/FAQCard";

export default function FAQSection() {
  // Array of FAQ data
  const faqs = [
    {
      id: 1,
      question: "Apakah saya bisa belajar meskipun tidak memiliki background di data science?",
      answer: "Tidak perlu khawatir jika kamu belum memiliki background di data science. Program kami mencakup fondasi dasar hingga lanjutan, dan mentor akan menyesuaikan pembelajaran dengan kebutuhanmu."
    },
    {
      id: 2,
      question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan kursus?",
      answer: "Durasi kursus bervariasi tergantung program yang kamu pilih, mulai dari 1 bulan hingga 6 bulan. Kamu dapat belajar dengan kecepatan sendiri karena kami menyediakan akses ke materi pembelajaran seumur hidup."
    },
    {
      id: 3,
      question: "Apakah ada sertifikat setelah menyelesaikan kursus?",
      answer: "Ya, kami menyediakan sertifikat penyelesaian kursus yang dapat kamu gunakan untuk meningkatkan CV atau profil LinkedIn. Sertifikat diberikan setelah kamu menyelesaikan semua materi dan proyek akhir."
    },
    {
      id: 4,
      question: "Apakah saya bisa belajar secara fleksibel?",
      answer: "Tentu! Program kami dirancang dengan fleksibilitas tinggi. Kamu dapat mengakses materi kapan saja dan di mana saja. Selain itu, jadwal sesi mentoring juga dapat disesuaikan dengan ketersediaan waktumu."
    },
    {
      id: 5,
      question: "Apakah saya akan mendapatkan bimbingan langsung dari mentor?",
      answer: "Ya, kamu akan mendapatkan bimbingan langsung dari mentor yang berpengalaman di industri. Kamu dapat mengajukan pertanyaan, mendiskusikan proyek, dan mendapatkan feedback melalui sesi one-on-one atau group mentoring."
    }
  ];

  return (
    <section 
      className="w-full bg-[var(--background-primary)] py-[60px]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        {/* Section Title */}
        <h2 className="text-[32px] font-medium text-center text-[var(--text-primary)] mb-12">
          Frequently Asked Questions (FAQ)
        </h2>

        {/* FAQ Cards */}
        <div className="space-y-8">
          {faqs.map((faq) => (
            <FAQCard 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}