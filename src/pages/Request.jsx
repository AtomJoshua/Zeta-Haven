import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// --- SCALABILITY AREA: Add new apartments here ---
const listings = [
  {
    id: 1,
    name: "Deluxe Cozy Apartment, Asokoro",
    options: [
      { label: "1 Bedroom Access (₦120,000/night)", value: "1 Bedroom" },
      { label: "Full 2 Bedroom Access (₦150,000/night)", value: "2 Bedrooms" },
    ],
  },
  // Future Example:
  // {
  //   id: 2,
  //   name: "Seaside Villa, Lekki",
  //   options: [
  //     { label: "Standard Room (₦80k)", value: "Standard" },
  //     { label: "Master Suite (₦150k)", value: "Master" }
  //   ]
  // }
];
// -------------------------------------------------

export default function Request() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  
  // State for the scalable dropdowns
  const [selectedApartmentId, setSelectedApartmentId] = useState("");
  const [availableOptions, setAvailableOptions] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  // Handle Apartment Selection
  const handleApartmentChange = (e) => {
    const aptId = Number(e.target.value);
    setSelectedApartmentId(aptId);
    
    // Find the apartment data to populate the second dropdown
    const selectedApt = listings.find((apt) => apt.id === aptId);
    setAvailableOptions(selectedApt ? selectedApt.options : []);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_0bv8r28",
        "template_soq11oe",
        form.current,
        "21PZYOtFePiNDkFUH"
      )
      .then(
        () => {
          emailjs.sendForm(
            "service_0bv8r28",
            "template_rx7kykj",
            form.current,
            "21PZYOtFePiNDkFUH"
          );
          setSent(true);
          setLoading(false);
          form.current.reset();
          setCheckin("");
          setCheckout("");
          setSelectedApartmentId(""); // Reset dropdowns
          setAvailableOptions([]);
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setLoading(false);
        }
      );
  };

  const handleCheckinChange = (e) => {
    const value = e.target.value;
    setCheckin(value);
    if (checkout && value > checkout) {
      setCheckout("");
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#E0F2FE] py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-5xl font-allura text-center text-[#1E3A8A] mb-6">
          Booking Request
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Fill out the form below to book your stay. We’ll get back to you soon.
        </p>

        {!sent ? (
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
              />
            </div>

            {/* Phone & Guests */}
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
              />
              <select
                name="guests"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
              >
                <option value="">Number of Guests</option>
                <option value="1 guest">1 Guest</option>
                <option value="2 guests">2 Guests</option>
                <option value="3 guests">3 Guests</option>
                <option value="4+ guests">4+ Guests</option>
              </select>
            </div>

            {/* --- SCALABLE APARTMENT SELECTION --- */}
            <div className="grid sm:grid-cols-2 gap-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              {/* Dropdown 1: Select Property */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Property</label>
                <select
                  name="apartment_name" // Ensure this variable exists in your EmailJS template
                  required
                  onChange={handleApartmentChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition bg-white"
                >
                  <option value="">Select Property...</option>
                  {listings.map((apt) => (
                    // We render the NAME as the option text, but ID as value to look up options
                    <option key={apt.id} value={apt.id}>
                      {apt.name}
                    </option>
                  ))}
                </select>
                {/* Hidden Input to send actual Name to EmailJS (since value is ID) */}
                <input 
                  type="hidden" 
                  name="apartment" 
                  value={listings.find(l => l.id === selectedApartmentId)?.name || ''} 
                />
              </div>

              {/* Dropdown 2: Select Room Type (Dynamic) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Room Option</label>
                <select
                  name="room_type" // Ensure this variable exists in your EmailJS template
                  required
                  disabled={!selectedApartmentId} // Disable if no property selected
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">
                    {selectedApartmentId ? "Select Option..." : "Select Property First"}
                  </option>
                  {availableOptions.map((opt, index) => (
                    <option key={index} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* ------------------------------------ */}

            {/* Dates */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="checkin" className="block text-sm font-medium mb-2 text-gray-700">
                  Check-in Date
                </label>
                <input
                  id="checkin"
                  type="date"
                  name="checkin"
                  required
                  value={checkin}
                  onChange={handleCheckinChange}
                  min={today}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
                />
              </div>

              <div>
                <label htmlFor="checkout" className="block text-sm font-medium mb-2 text-gray-700">
                  Check-out Date
                </label>
                <input
                  id="checkout"
                  type="date"
                  name="checkout"
                  required
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  min={checkin || today}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
                />
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              rows="4"
              placeholder="Additional requests or questions..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
            ></textarea>

            {/* Caution Fee Agreement */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <input
                type="checkbox"
                id="cautionFee"
                required
                className="mt-1 w-4 h-4 accent-[#2563EB] cursor-pointer"
              />
              <label htmlFor="cautionFee" className="text-sm text-gray-700 leading-relaxed">
                I understand that a <span className="font-semibold text-[#1E3A8A]">50% refundable caution fee </span>
                is required before my booking is confirmed.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white py-3 rounded-lg font-medium shadow-lg transition-all"
            >
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl text-[#1E3A8A] font-semibold mb-3">
              Request Sent Successfully!
            </h3>
            <p className="text-gray-600">
              We’ll get back to you shortly with availability details.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setSelectedApartmentId("");
                setAvailableOptions([]);
              }}
              className="mt-6 bg-linear-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Send Another Request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}