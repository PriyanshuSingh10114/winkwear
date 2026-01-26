import "./CreatorPicks.css";
import creator_1 from "../Assets/creator_1.webp";
import creator_2 from "../Assets/creator_2.webp";
import creator_3 from "../Assets/creator_3.webp";
const CreatorPicks = () => {
  const picks = [
    {
      img: creator_1,
      name: "Ariana Style",
      item: "Street Oversized Jacket",
      bio: "Urban fashion creator known for bold layers and oversized silhouettes.",
      socials: "@ariana.style",
      lookDesc:
        "Ariana pairs oversized jackets with chunky boots for a strong streetwear aesthetic.",
    },
    {
      img: creator_2,
      name: "Mia Luxe",
      item: "Minimal Black Dress",
      bio: "Luxury minimalist influencer focusing on clean silhouettes.",
      socials: "@mialuxe",
      lookDesc:
        "Her signature black dress look is timeless, elegant, and always on-trend and always a show stealer for everyone present around.",
    },
    {
      img: creator_3,
      name: "Nova Trends",
      item: "Autumn Knitwear",
      bio: "Seasonal trend expert curating warm, cozy, textured styles.",
      socials: "@nova.trends",
      lookDesc:
        "Nova blends soft-knit sweaters with earthy tones for the perfect autumn vibe. Designed for comfort, warmth, and effortless style.",
    },
  ];

  return (
    <div className="creator-section">
      <h1>Creator / Influencer Picks</h1>
      <hr />

      <div className="creator-grid">
        {picks.map((c, i) => (
          <div className="creator-card" key={i}>
            <img src={c.img} alt={c.name} />

            <div className="creator-content">
              <h3>{c.name}</h3>
              <p className="creator-item">{c.item}</p>

              <p className="creator-bio">{c.bio}</p>
              <p className="creator-social">{c.socials}</p>

              <p className="creator-desc">{c.lookDesc}</p>

              <button className="follow-btn">Follow +</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorPicks;
