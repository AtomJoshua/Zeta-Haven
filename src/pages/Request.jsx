import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Request() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  // Get today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

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
          setSent(true);
          setLoading(false);
          form.current.reset();
          setCheckin("");
          setCheckout("");
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setLoading(false);
        }
      );
  };

  // Handle date logic
  const handleCheckinChange = (e) => {
    const value = e.target.value;
    setCheckin(value);

    // If checkout date is before the new checkin date, reset checkout
    if (checkout && value > checkout) {
      setCheckout("");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#E0F2FE] py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-playfair text-center text-[#1E3A8A] mb-6">
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

            {/* Apartment selection */}
            <select
              name="apartment"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
            >
              <option value="">Select Apartment</option>
              <option value="Deluxe Cozy Apartment, Asokoro">
                Deluxe Cozy Apartment, Asokoro
              </option>
            </select>

            {/* Dates */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="checkin"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
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
                <label
                  htmlFor="checkout"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white py-3 rounded-lg font-medium shadow-lg transition-all"
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
              onClick={() => setSent(false)}
              className="mt-6 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Send Another Request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
