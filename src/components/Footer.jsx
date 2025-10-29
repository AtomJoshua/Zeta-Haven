// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white py-6 text-center mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Zeta Limited Suites. All rights reserved.
      </p>
    </footer>
  );
}
