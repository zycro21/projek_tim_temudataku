// src/components/Home/Card/TestimoniCard.tsx

interface TestimoniCardProps {
    testimoni: string;
    photo: string;
    name: string;
    job: string;
  }
  
  export default function TestimoniCard({
    testimoni,
    photo,
    name,
    job,
  }: TestimoniCardProps) {
    return (
      <div 
        className="bg-white rounded-lg p-6 shadow-sm"
        style={{ width: "392px", height: "348px" }}
      >
        {/* Testimoni Text */}
        <p className="text-[var(--text-primary)] mb-8 leading-relaxed">
          "{testimoni}"
        </p>
  
        {/* User Info */}
        <div className="flex items-center mt-auto">
          {/* User Photo */}
          <div className="w-[46px] h-[46px] rounded-full overflow-hidden mr-3">
            <img 
              src={photo} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* User Details */}
          <div>
            <h3 className="text-[var(--text-primary)] font-medium">
              {name}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm">
              {job}
            </p>
          </div>
        </div>
      </div>
    );
  }