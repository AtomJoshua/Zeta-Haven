import { useState } from "react";
import { MapPin, ArrowRight, X, Info } from "lucide-react"; 

// Adjust these paths if needed based on your folder structure
import bedroom from "../media/bedroom.jpg";
import livingroom from "../media/apt1.jpg";
import apt1 from "../media/apt1.jpg";
import kitchen from "../media/dining.jpg";

export default function VirtualTourSection() {
  
  const apartments = [
    {
      id: 1,
      name: "Deluxe Cozy Apartment",
      location: "84 Kwame Nkrumah Crescent, Asokoro, Abuja.",
      price: "From ₦150,000",
      description: "A spacious 2-bedroom suite in the heart of Asokoro. Ideal for networking with Abuja elites, featuring a fully equipped kitchen and a stylish, work-friendly living area.",
      image: apt1, 
    },
    // {
    //   id: 2,
    //   name: "Royal Asokoro Loft",
    //   location: "Asokoro, Abuja",
    //   price: "₦250,000 / night",
    //   description: "Luxury defined. This loft features a private cinema, italian marble finishings, and 24/7 concierge.",
    //   image: livingroom,
    // },
    // {
    //   id: 3,
    //   name: "Victoria Island Executive",
    //   location: "Victoria Island, Lagos",
    //   price: "₦120,000 / night",
    //   description: "Perfect for business travelers. High-speed fiber internet, ergonomic workspace, and city views.",
    //   image: kitchen,
    // },
    // {
    //   id: 4,
    //   name: "Banana Island Haven",
    //   location: "Ikoyi, Lagos",
    //   price: "₦450,000 / night",
    //   description: "Exclusive privacy. Featuring a private pool, 4 bedrooms, and direct access to the waterfront.",
    //   image: bedroom,
    // },
  ];

  const [activeId, setActiveId] = useState(apartments[0].id);
  const [showInfo, setShowInfo] = useState(true);

  const activeApartment = apartments.find((apt) => apt.id === activeId);

  return (
    <section className="w-full bg-linear-to-b from-[#E0F2FE] to-white pt-16 pb-24">
      
      <div className="max-w-5xl mx-auto text-center mb-12 px-4">
        <h2 className="font-playfair font-dancing text-3xl md:text-[56px] leading-tight text-[#1E3A8A]">
          Explore Our Available Apartments
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Click an image to view apartment details.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="relative group w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
          <img
            src={activeApartment.image}
            alt={activeApartment.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onClick={() => setShowInfo(!showInfo)}
          />

          <div 
            className={`
              absolute bottom-0 left-0 right-0 md:right-auto md:bottom-8 md:left-8 md:w-[450px]
              bg-white/95 backdrop-blur-md p-6 md:rounded-xl shadow-lg border-t-4 border-[#1E3A8A]
              transition-all duration-500 ease-in-out transform
              ${showInfo ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="bg-[#E0F2FE] text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-red-500">
                <X size={18} />
              </button>
            </div>

            <h3 className="font-playfair text-2xl text-[#1E3A8A] mb-1">
              {activeApartment.name}
            </h3>
            
            {/* --- FIX START: CLICKABLE ADDRESS RESTORED --- */}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeApartment.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-500 text-sm mb-3 hover:text-[#1E3A8A] hover:underline transition-colors w-fit group-addr"
            >
              <MapPin size={14} className="mr-1 group-addr-hover:text-[#1E3A8A]" />
              {activeApartment.location}
            </a>
            {/* --- FIX END --- */}

            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {activeApartment.description}
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-[#1E3A8A]">{activeApartment.price}</span>
              
              <a href="/request" className="flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] hover:underline">
                Book Now <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          {!showInfo && (
            <button 
              onClick={() => setShowInfo(true)}
              className="absolute bottom-8 left-8 bg-white text-[#1E3A8A] p-3 rounded-full shadow-lg hover:bg-[#E0F2FE] transition"
            >
              <Info size={24} />
            </button>
          )}
        </div>

        <div className="mt-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 md:gap-6 md:justify-center min-w-max px-2">
            {apartments.map((apt) => (
              <button
                key={apt.id}
                onClick={() => {
                  setActiveId(apt.id);
                  setShowInfo(true);
                }}
                className={`
                  relative w-[140px] h-[100px] md:w-[200px] md:h-[140px] rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-300 transform hover:-translate-y-1
                  ${activeId === apt.id 
                    ? "ring-4 ring-[#1E3A8A] shadow-xl scale-105" 
                    : "opacity-70 hover:opacity-100 grayscale hover:grayscale-0"}
                `}
              >
                <img 
                  src={apt.image} 
                  alt={apt.name} 
                  className="w-full h-full object-cover"
                />
                {activeId === apt.id && (
                  <div className="absolute inset-0 bg-[#1E3A8A]/10 mix-blend-multiply" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}