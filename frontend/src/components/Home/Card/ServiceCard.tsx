
interface ServiceCardProps {
  title: string;
  coverImage: string;
  regularPrice?: number;
  discountPrice: number;
  duration: number;
  features: string[];
}

export default function ServiceCard({
  title,
  coverImage,
  regularPrice,
  discountPrice,
  duration,
  features,
}: ServiceCardProps) {
  return (
    <div 
      className="w-full max-w-[608px] rounded-lg overflow-hidden shadow-sm bg-white"
      style={{ height: "767px" }}
    >
      {/* Cover Image */}
      <div className="w-full h-[355px]">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-[32px] font-semibold text-[#0E1115] mb-4">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center mb-6">
          {regularPrice && (
            <p className="text-[16px] font-semibold text-[#737373] line-through mr-2">
              Rp {regularPrice.toLocaleString('id-ID')}
            </p>
          )}
          <p className="text-[24px] font-semibold text-[#000000]">
            Rp {discountPrice.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <img 
              src="/img/Home/ic_checklist_mentoring_section.png" 
              alt="Check" 
              className="w-5 h-5 mr-2"
            />
            <p className="text-[14px] text-[#000000]">
              Mentoring {duration} menit
            </p>
          </div>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <img 
                src="/img/Home/ic_checklist_mentoring_section.png" 
                alt="Check" 
                className="w-5 h-5 mr-2"
              />
              <p className="text-[14px] text-[#000000]">
                {feature}
              </p>
            </div>
          ))}
        </div>
        
        {/* Button */}
        <button className="w-full py-3 bg-[#0CA678] text-white font-medium rounded-md hover:bg-[#08916C] transition-colors">
          Ikuti Sesi
        </button>
      </div>
    </div>
  );
}