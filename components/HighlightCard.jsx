export default function HighlightCard({ icon, title, text, id, dataAnimate, animationDelay, getAnimationClass }) {
  return (
    <div
      id={id}
      data-animate={dataAnimate}
      className={`p-6 rounded-xl bg-white shadow-md text-center ${getAnimationClass(id)}`}
      style={{ transitionDelay: animationDelay }}
    >
      <div className="text-[#3f552f] mb-2 text-3xl transition-colors duration-300 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#0a160d] mb-2">{title}</h3>
      <p className="text-sm text-[#0a160d]">{text}</p>
    </div>
  );
}
