import { ShieldCheck, BedDouble, RefreshCcw } from "lucide-react";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Welcome Section */}
      {/* <section className="py-20 text-center bg-[#E8F1F8]">
        <h2 className="text-3xl font-playfair text-[#2A7FBA] mb-6">
          Welcome to Zeta Limited Suites
        </h2>
        <p className="max-w-lg text-gray-700 mx-auto">
          Discover the perfect blend of luxury, privacy, and convenience in every stay.
        </p>
      </section> */}

      {/* Book With Confidence Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="font-allura text-3xl font-semibold text-[#2A7FBA] mb-12">
            Book with Confidence
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Amenities */}
            <div className="flex flex-col items-center p-6 bg-[#E8F1F8] rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-linear-to-r from-[#2A7FBA] to-[#6AB1E1] text-white rounded-full mb-4">
                <BedDouble size={30} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Get the amenities you want
              </h4>
              <p className="text-gray-600">
                Help your whole group feel at home with great extras and more space to spread out.
              </p>
            </div>

            {/* Flexibility */}
            <div className="flex flex-col items-center p-6 bg-[#E8F1F8] rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-linear-to-r from-[#2A7FBA] to-[#6AB1E1] text-white rounded-full mb-4">
                <RefreshCcw size={30} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Keep it flexible
              </h4>
              <p className="text-gray-600">
                Enjoy stays with flexible cancellation so you can easily re-book if your plans change.
              </p>
            </div>

            {/* Confidence */}
            <div className="flex flex-col items-center p-6 bg-[#E8F1F8] rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-linear-to-r from-[#2A7FBA] to-[#6AB1E1] text-white rounded-full mb-4">
                <ShieldCheck size={30} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Book with confidence
              </h4>
              <p className="text-gray-600">
                Rest assured knowing that our suites are verified and backed by trusted service standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
