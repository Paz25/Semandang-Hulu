export default function HighlightCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 px-4 py-6 bg-white rounded shadow-md">
      <div className="text-green-600 text-3xl">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}