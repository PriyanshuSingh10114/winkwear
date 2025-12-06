import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sofia M.",
      text:
        "The quality is unreal. Every piece feels premium, and the fit made me feel confident instantly. Wink & Wear is now my top fashion pick!",
      rating: 5,
      purchase: "Oversized Knit Set"
    },
    {
      name: "Aarav S.",
      text:
        "Fast delivery, perfect packaging, and the styles are super modern. I've already recommended Wink & Wear to all my friends!",
      rating: 5,
      purchase: "Urban Street Jacket"
    },
    {
      name: "Neha K.",
      text:
        "The matte dark theme and premium textures match my aesthetic perfectly. High-quality fashion at great pricing!",
      rating: 4,
      purchase: "Nightfall Luxe Dress"
    }
  ];

  return (
    <div className="testimonials-section">
      <h1>What Our Customers Say</h1>
      <hr />

      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <div key={i} className="testimonials-card">
            
            <div className="testimonial-header">
              <div>
                <h3>{r.name} <span className="verified">✔</span></h3>
                <p className="purchase">Purchased: {r.purchase}</p>
              </div>
            </div>

            <p className="testimonial-text">“{r.text}”</p>

            <div className="rating">
              {Array(r.rating)
                .fill(1)
                .map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
