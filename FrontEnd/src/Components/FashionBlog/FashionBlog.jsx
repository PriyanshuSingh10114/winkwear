import { useState } from "react";
import blog_1 from "../Assets/Fashion_Blog-1.png";
import blog_2 from "../Assets/Fashion_Blog-2.png";
import blog_3 from "../Assets/Fashion_Blog-3.png";
import "./FashionBlog.css";


const FashionBlog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      title: "Top 10 Winter Essentials",
      image: blog_1,
      desc:
        "From cozy knits to bold jackets — here’s everything you need this winter.",
      fullContent: `
Winter fashion isn’t just about staying warm — it’s about staying stylish while doing it.
This season, oversized scarves, wool-blend coats, and neutral layers dominate every top designer runway.
 
**Must-Have Essentials:**
• Chunky Knit Sweaters  
• Longline Wool Coats  
• High-Quality Leather Boots  
• Thermal Layering Basics  
• Textured Scarves & Beanies  
 
Pair warm earthy tones with minimal accessories for a clean luxury look. Winter 2025 is all about comfort meeting premium aesthetics.`,
      author: "Sophie Turner",
      date: "December 02, 2025",
      tags: ["Winter Wear", "Trending", "Fashion Tips"],
    },
    {
      title: "How To Build Your Capsule Wardrobe",
      image: blog_2,
      desc: "Minimal, stylish, powerful. Build a wardrobe that always works.",
      fullContent: `
A capsule wardrobe is the secret weapon of modern fashion lovers.  
The idea is simple — fewer clothes, but higher versatility.
 
**Core Pieces You Need:**
• A Classic White Shirt  
• Tailored Pants  
• One Black & One Beige Blazer  
• Premium Denim  
• Basic Tees In Neutral Shades  
 
Once you invest in timeless essentials, you’ll reduce decision fatigue and always look polished.
Capsule wardrobes also save space and promote smart fashion choices.`,
      author: "Emily Carter",
      date: "November 22, 2025",
      tags: ["Minimalism", "Wardrobe", "Style Guide"],
    },
    {
      title: "2025 Trend Forecast",
      image: blog_3,
      desc: "What’s coming next? We break down the hottest trends of 2025.",
      fullContent: `
Fashion in 2025 is taking bold leaps — futuristic silhouettes mixed with earthy neutral palettes.
Designers are blending technology with creativity like never before.
 
**Key Trends to Watch:**
• Metallic Accent Fits  
• Ultra-Comfort Tech Fabrics  
• Eco-Sustainable Materials  
• Vintage Revival — 90s but elevated  
 
Expect a mix of innovation and nostalgia dominating global runways next year.`,
      author: "Liam Anderson",
      date: "October 15, 2025",
      tags: ["Trends", "2025", "Runway Fashion"],
    },
  ];

  return (
    <div className="blog-section">
      <h1>Fashion Blog</h1>
      <hr />

      <div className="blog-grid">
        {posts.map((p, i) => (
          <div className="blog-card" key={i}>
            <img src={p.image} alt={p.title} />
            <div className="blog-content">
              <h2>{p.title}</h2>
              <p className="meta">
                By {p.author} • {p.date}
              </p>
              <p>{p.desc}</p>

              <div className="tags">
                {p.tags.map((t, idx) => (
                  <span key={idx}>{t}</span>
                ))}
              </div>

              <button onClick={() => setSelectedPost(p)}>Read More →</button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- MODAL POPUP ---------- */}
      {selectedPost && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedPost(null)}>
              ×
            </button>

            <img src={selectedPost.image} alt={selectedPost.title} />
            <h2>{selectedPost.title}</h2>

            <p className="meta">
              By {selectedPost.author} • {selectedPost.date}
            </p>

            <p className="full-article">{selectedPost.fullContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionBlog;
