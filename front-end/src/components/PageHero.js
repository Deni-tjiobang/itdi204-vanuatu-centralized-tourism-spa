import waterMusic from "../images/water_music.jpg";

function PageHero({ title, subtitle }) {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${waterMusic})` }}
    >
      <div className="page-hero-overlay"></div>
      <div className="page-hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHero;
