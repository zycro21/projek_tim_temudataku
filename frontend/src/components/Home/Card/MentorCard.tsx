// src/components/Home/Card/MentorCard.tsx

interface MentorCardProps {
    name: string;
    photo: string;
    workplace: string;
    experience: number;
    tools: string[];
  }
  
  export default function MentorCard({
    name,
    photo,
    workplace,
    experience,
    tools,
  }: MentorCardProps) {
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-sm"
        style={{ width: "392px", height: "532.69px" }}
      >
        {/* Mentor Photo */}
        <div style={{ height: "311.69px" }}>
          <img 
            src={photo} 
            alt={`${name} - Mentor`}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Mentor Info */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-[20px] font-semibold text-[var(--text-primary)] mb-4">
            {name}
          </h3>
  
          {/* Workplace */}
          <div className="flex items-center mb-3">
            <img 
              src="/img/Home/ic_work_mentor.png" 
              alt="Workplace" 
              className="w-5 h-5 mr-2"
            />
            <p className="text-[var(--text-secondary)] text-sm">
              Data Sciencetist di {workplace}
            </p>
          </div>
  
          {/* Experience */}
          <div className="flex items-center mb-3">
            <img 
              src="/img/Home/ic_work_time_mentor.png" 
              alt="Experience" 
              className="w-5 h-5 mr-2"
            />
            <p className="text-[var(--text-secondary)] text-sm">
              {experience} Tahun Sebagai Data Sciencetist
            </p>
          </div>
  
          {/* Tools */}
          <div className="flex items-center mb-6">
            <img 
              src="/img/Home/ic_tools_mentor.png" 
              alt="Tools" 
              className="w-5 h-5 mr-2"
            />
            <p className="text-[var(--text-secondary)] text-sm">
              {tools.join(", ")}
            </p>
          </div>
  
          {/* View Profile Link */}
          <a 
            href="#" 
            className="text-[var(--primary-base)] hover:underline text-sm"
          >
            Lihat Profil Lengkap
          </a>
        </div>
      </div>
    );
  }