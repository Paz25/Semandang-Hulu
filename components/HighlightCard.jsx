export default function HighlightCard({ icon, title, text }) {
  return (
    <div className="group hover:bg-[#F2F8F2] hover:text-white flex flex-col items-center text-center gap-2 px-6 py-6 bg-white rounded shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#3f552f] hover:text-white">
      <div className="text-[#3f552f] text-3xl transition-colors duration-300">
        {icon}
      </div>
      <h4 className="font-semibold text-lg text-[#0a160d] transition-colors duration-300">
        {title}
      </h4>
      <p className="text-sm text-gray-600 transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}
