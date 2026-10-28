export default function SectionTitle({ title, subtitle, center = false, as: Tag = "h2" }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <Tag className="text-2xl font-bold text-blue-900 sm:text-3xl">{title}</Tag>
      {subtitle && (
        <p className={`mt-2 max-w-2xl text-slate-600 sm:text-lg ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
