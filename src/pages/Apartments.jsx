import { useState } from "react";
import { MapPin, ArrowRight, X, Info, ChevronLeft, ChevronRight } from "lucide-react"; 

// Import all available apartment images
import apt1Main from "../media/living.jpg";
import bedroomImg from "../media/room2.png";
import diningImg from "../media/dine.jpg";

export default function Apartments() {
  
  const apartments = [
    {
      id: 1,
      name: "Deluxe Cozy Apartment",
      location: "84 Kwame Nkrumah Crescent, Asokoro, Abuja.",
      options: [
        { label: "1 Bedroom Access", price: "₦120,000" },
        { label: "Full 2 Bedroom Suite", price: "₦150,000" }
      ],
      images: [apt1Main, bedroomImg, diningImg],
      description: "A spacious 2-bedroom suite in the heart of Asokoro. Ideal for networking with Abuja elites. The apartment features a fully equipped modern kitchen, a stylish living area perfect for work or relaxation, and luxurious bedding to ensure a restful night's sleep. Enjoy 24/7 power and premium security.",
    },
    // Future listings...
  ];

  const [activeId, setActiveId] = useState(apartments[0].id);
  const [showInfo, setShowInfo] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeApartment = apartments.find((apt) => apt.id === activeId);

  // --- CAROUSEL HANDLERS ---
  const nextImage = (e) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prevIndex) => 
      prevIndex === activeApartment.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? activeApartment.images.length - 1 : prevIndex - 1
    );
  };
  // ---------------------------

  return (
    <section className="w-full bg-gradient-to-b from-[#F0F9FF] to-white pt-16 md:pt-20 pb-20 md:pb-32" id="apartments">
      
      <div className="max-w-5xl mx-auto text-center mb-8 md:mb-16 px-4">
        <h2 className="font-serif text-3xl md:text-[56px] leading-tight text-[#1E3A8A] mb-4 md:mb-6">
          Explore Our Collections
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Discover your perfect stay. Swipe or click arrows to view more photos.
        </p>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Tap the image to view full image.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* MAIN DISPLAY AREA */}
        <div className="relative group w-full h-[300px] md:h-[700px] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl bg-gray-900 border border-white/50">
          
          {/* LAYER 1: The Blurred Background (MOBILE ONLY via md:hidden) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60 transition-all duration-1000 md:hidden"
            style={{ backgroundImage: `url(${activeApartment.images[currentImageIndex]})` }}
          ></div>

          {/* LAYER 2: The Main Image */}
          {/* Mobile: object-contain (fits width). Desktop: object-cover (zooms to fill) */}
          <img
            src={activeApartment.images[currentImageIndex]}
            alt={`${activeApartment.name} view ${currentImageIndex + 1}`}
            className="relative w-full h-full object-contain md:object-cover z-10 transition-transform duration-1000 ease-in-out"
            onClick={() => setShowInfo(!showInfo)}
          />

          {/* LAYER 3: Subtle Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10 pointer-events-none" />

          {/* --- CAROUSEL CONTROLS --- */}
          {activeApartment.images.length > 1 && (
            <>
              {/* Arrows */}
              <button 
                onClick={prevImage}
                className="absolute top-[40%] md:top-1/2 left-4 md:left-6 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all z-20 border border-white/20 active:scale-95"
              >
                <ChevronLeft size={24} className="md:w-7 md:h-7" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute top-[40%] md:top-1/2 right-4 md:right-6 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all z-20 border border-white/20 active:scale-95"
              >
                <ChevronRight size={24} className="md:w-7 md:h-7" />
              </button>

              {/* Dots */}
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 transition-opacity duration-300 ${showInfo ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                {activeApartment.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ease-out ${index === currentImageIndex ? 'w-6 md:w-8 bg-white' : 'w-1.5 md:w-2 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* --- INFO OVERLAY CARD --- */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 
              md:top-0 md:bottom-0 md:left-auto md:right-0 md:w-[480px] md:h-auto
              
              max-h-[60%] md:max-h-none overflow-y-auto md:overflow-visible
              
              bg-white/90 md:bg-white/80 backdrop-blur-xl 
              p-6 md:p-10 
              shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.2)] md:shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.3)]
              border-t md:border-t-0 md:border-l border-white/50 
              
              transition-all duration-500 ease-in-out transform z-30
              flex flex-col justify-start md:justify-center
              
              ${showInfo ? "translate-y-0 md:translate-x-0 opacity-100" : "translate-y-full md:translate-y-0 md:translate-x-full opacity-0 pointer-events-none"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6 shrink-0">
              <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                Featured Residence
              </span>
              <button 
                onClick={() => setShowInfo(false)} 
                className="text-gray-500 hover:text-[#1E3A8A] bg-gray-100/50 p-1.5 rounded-full md:bg-transparent md:p-0"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            {/* Content */}
            <h3 className="font-serif text-2xl md:text-3xl text-[#1E3A8A] mb-2 md:mb-3 leading-tight">
              {activeApartment.name}
            </h3>
            
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeApartment.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-500 text-xs md:text-sm mb-4 md:mb-6 hover:text-[#1E3A8A] transition-colors w-fit font-medium shrink-0"
            >
              <MapPin size={14} className="mr-1.5 text-[#2563EB] md:w-4 md:h-4" />
              {activeApartment.location}
            </a>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light">
              {activeApartment.description}
            </p>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 md:p-5 mb-6 md:mb-8 border border-blue-100/50 shadow-sm shrink-0">
               {activeApartment.options.map((opt, index) => (
                 <div key={index} className="flex justify-between items-end py-2 md:py-3 border-b border-blue-100 last:border-0 last:pb-0 first:pt-0">
                    <span className="text-gray-700 text-sm md:text-base font-medium">{opt.label}</span>
                    <div className="text-right">
                      <span className="block font-bold text-[#1E3A8A] text-xl md:text-2xl leading-none">
                        {opt.price}
                      </span>
                      <span className="text-[10px] md:text-xs font-medium text-gray-400">/night</span>
                    </div>
                 </div>
               ))}
            </div>

            {/* CTA */}
            <div className="flex md:justify-start justify-center shrink-0 pb-2 md:pb-0">
              <a href="/request" className="flex items-center justify-center gap-2 md:gap-3 text-white bg-[#1E3A8A] w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-[#2563EB] transition-all shadow-lg hover:shadow-xl font-medium text-base md:text-lg active:scale-95">
                Book This Apartment <ArrowRight size={18} className="md:w-5 md:h-5"/>
              </a>
            </div>
          </div>
          
          {/* Info Toggle */}
          {!showInfo && (
            <button 
              onClick={() => setShowInfo(true)}
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/90 text-[#1E3A8A] px-4 py-3 md:p-4 rounded-full shadow-lg hover:bg-white transition-all z-30 animate-bounce md:animate-none flex items-center gap-2"
            >
              <span className="text-sm font-bold md:hidden">Click here for details</span>
              <Info size={24} className="md:w-7 md:h-7" />
            </button>
          )}
        </div>

        {/* THUMBNAILS BOTTOM */}
        <div className="mt-8 md:mt-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 md:gap-6 md:justify-center min-w-max px-2 md:px-4">
            {apartments.map((apt) => (
              <button
                key={apt.id}
                onClick={() => {
                  setActiveId(apt.id);
                  setShowInfo(true);
                  setCurrentImageIndex(0); 
                }}
                className={`
                  relative w-[130px] h-[90px] md:w-[220px] md:h-[150px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-300 transform active:scale-95
                  ${activeId === apt.id 
                    ? "ring-2 md:ring-[3px] ring-[#1E3A8A] shadow-xl scale-105" 
                    : "opacity-80 hover:opacity-100 grayscale hover:grayscale-0"}
                `}
              >
                <img 
                  src={apt.images[0]} 
                  alt={apt.name} 
                  className="w-full h-full object-cover"
                />
                {activeId === apt.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/40 to-transparent mix-blend-overlay" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}