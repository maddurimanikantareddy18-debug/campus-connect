function Section({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default Section;