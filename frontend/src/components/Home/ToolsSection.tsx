// src/components/Home/ToolsSection.tsx

export default function ToolsSection() {
    // Data untuk tools
    const tools = [
      {
        id: 1,
        name: "TensorFlow",
        image: "/img/Home/IconTools/ic_tensorflow.png"
      },
      {
        id: 2,
        name: "NumPy",
        image: "/img/Home/IconTools/ic_numpy.png"
      },
      {
        id: 3,
        name: "Pandas",
        image: "/img/Home/IconTools/ic_pandas.png"
      },
      {
        id: 4,
        name: "Scikit Learn",
        image: "/img/Home/IconTools/ic_scikit_learn.png"
      },
      {
        id: 5,
        name: "Seaborn",
        image: "/img/Home/IconTools/ic_seaborn.png"
      }
    ];
  
    return (
      <section 
        className="w-full bg-white flex flex-col items-center justify-center"
        style={{ height: "538px" }}
      >
        <div className="max-w-[1440px] w-full px-4 sm:px-6 md:px-[60px] lg:px-[100px] flex flex-col items-center">
          {/* Title */}
          <p 
            className="text-[#243A77] font-medium text-base mb-2"
            style={{ marginTop: "60px" }}
          >
            Tools
          </p>
          
          {/* Subtitle */}
          <h2 
            className="text-[#0E1115] font-medium text-[32px] leading-tight text-center mb-[60px]"
            style={{ marginTop: "8px" }}
          >
            Kuasai Tools dibidang<br />
            Data Science
          </h2>
          
          {/* Tool logos */}
          <div 
            className="w-full flex justify-between items-center"
            style={{ marginBottom: "60px", height: "225px" }}
          >
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-center px-2">
                <img 
                  src={tool.image} 
                  alt={`${tool.name} logo`} 
                  className="h-auto w-auto object-contain max-h-16 md:max-h-[80px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }