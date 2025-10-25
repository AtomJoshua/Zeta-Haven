// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#A7C7E7] text-white py-10 mt-20 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#F3D19C] font-medium">
            Zeta Limited Suites
          </span>
          . All rights reserved.
        </p>

        {/* <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[#F3D19C] hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#F3D19C] hover:text-white transition-colors text-sm"
          >
            Terms of Service
          </a>
        </div> */}
      </div>
    </footer>
  );
}
