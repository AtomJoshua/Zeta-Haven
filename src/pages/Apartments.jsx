import { useRef } from "react";
import { Bath, BedDouble, Car } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bedroom from "../media/bedroom.jpg";
import dining from "../media/dining.jpg";
import apt1 from "../media/apt1.jpg";
import aptvideo from "../media/aptvideo.mp4";

export default function Apartments() {
  const swiperRef = useRef(null);

  const apartment = {
    name: "Deluxe Cozy Apartment • Asokoro",
    price: "₦250,000 / night",
    images: [bedroom, apt1, dining, aptvideo],
    description:
      "A bright, coastal-inspired apartment in the heart of Asokoro — perfect for both business and leisure travelers. Enjoy a serene space with modern comforts.",
    amenities: [
      { icon: <BedDouble size={18} />, label: "2 Bedrooms" },
      { icon: <Bath size={18} />, label: "Private Baths" },
      { icon: <Car size={18} />, label: "Free Parking" },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#E0F2FE]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-playfair text-[#1E3A8A] mb-10 text-center">
          Our Apartments
        </h2>

        <div className="grid md:grid-cols-2 gap-6 bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Image / Video Carousel */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[480px]">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {apartment.images.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.endsWith(".mp4") ? (
                    <video
                      src={media}
                      controls
                      className="w-full h-full object-cover"
                      onPlay={() => swiperRef.current?.autoplay.stop()}
                      onPause={() => swiperRef.current?.autoplay.start()}
                      onEnded={() => swiperRef.current?.autoplay.start()}
                    />
                  ) : (
                    <img
                      src={media}
                      alt={`Apartment view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Apartment Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              {apartment.name}
            </h3>
            <p className="text-[#2563EB] mb-3 font-medium">{apartment.price}</p>
            <p className="text-gray-600 mb-5">{apartment.description}</p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {apartment.amenities.map((a, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-full text-[#1E3A8A]"
                >
                  {a.icon}
                  <span>{a.label}</span>
                </div>
              ))}
            </div>

            <a
              href="/request"
              className="inline-block text-center bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all w-full sm:w-auto"
            >
              Book This Suite
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
