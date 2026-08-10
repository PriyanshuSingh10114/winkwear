import { useState, useEffect } from "react";
import blog_1 from "../Assets/Fashion_Blog-1.webp";
import blog_2 from "../Assets/Fashion_Blog-2.webp";
import blog_3 from "../Assets/Fashion_Blog-3.webp";
import "./FashionBlog.css";

const FashionBlog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  /* 🔒 Lock background scroll when modal opens */
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPost]);

  const posts = [
    {
      title: "Top 10 Winter Essentials",
      image: blog_1,
      desc:
        "From cozy knits to bold jackets — here’s everything you need this winter.",
      fullContent: `
Winter fashion isn’t just about staying warm — it’s about staying stylish while doing it.

Must-Have Essentials:
• Chunky Knit Sweaters  
• Longline Wool Coats  
• Leather Boots  
• Thermal Basics  
• Scarves & Beanies  

Winter 2025 is about comfort meeting premium aesthetics.`,
      author: "Sophie Turner",
      date: "December 02, 2025",
      tags: ["Winter Wear", "Trending", "Fashion Tips"],
    },
    {
      title: "How To Build Your Capsule Wardrobe",
      image: blog_2,
      desc: "Minimal, stylish, powerful. Build a wardrobe that always works.",
      fullContent: `
A capsule wardrobe means fewer clothes, higher versatility.

Core Pieces:
• White Shirt  
• Tailored Pants  
• Neutral Blazers  
• Premium Denim  
• Neutral Tees  

Timeless fashion always wins.`,
      author: "Emily Carter",
      date: "November 22, 2025",
      tags: ["Minimalism", "Wardrobe", "Style Guide"],
    },
    {
      title: "2025 Trend Forecast",
      image: blog_3,
      desc: "What’s coming next? We break down 2025 fashion trends.",
      fullContent: `
2025 blends futuristic silhouettes with earthy tones.

Key Trends:
• Metallic Accents  
• Tech Fabrics  
• Sustainable Materials  
• Vintage Revival  

Innovation meets nostalgia.`,
      author: "Liam Anderson",
      date: "October 15, 2025",
      tags: ["Trends", "2025", "Runway"],
    },
  ];

  return (
    <div className="blog-section">
      <h2>Fashion Blog</h2>
      <hr />

      {/* BLOG GRID */}
      <div className="blog-grid">
        {posts.map((post, index) => (
          <div className="blog-card" key={index}>
            <img src={post.image} alt={post.title} loading="lazy" />
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p className="meta">
                By {post.author} • {post.date}
              </p>
              <p>{post.desc}</p>

              <div className="tags">
                {post.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <button onClick={() => setSelectedPost(post)}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              loading="lazy"
            />

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
