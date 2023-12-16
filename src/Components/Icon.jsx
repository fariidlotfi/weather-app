import "./Icon.css";

export default function Icon(params) {
  const { title, number, children } = params;

  return (
    <div className="icon-box">
      {children}
      <div className="icon-data">
        <p className="icon-title">{title}</p>
        <p className="icon-number">{number}</p>
      </div>
    </div>
  );
}
