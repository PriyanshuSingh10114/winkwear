import React, { useEffect, useState } from "react";
import "./DescriptionBox.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const DescriptionBox = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);

  const token = localStorage.getItem("auth-token");

  /* ---------------- FETCH DATA ---------------- */
  const loadReviews = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BACKEND_URL}/reviews/${product.id}`
    );
    setReviews(res.data);
  };

  const loadRating = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BACKEND_URL}/rating/${product.id}`
    );
    setAvgRating(res.data.avgRating || 0);
    setCount(res.data.count || 0);
  };

  useEffect(() => {
    if (activeTab === "reviews" && product?.id) {
      loadReviews();
      loadRating();
    }
  }, [activeTab, product]);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const submitReview = async () => {
    if (!token) {
      toast.warn("Login required to submit review");
      return;
    }

    if (!rating || !comment.trim()) {
      toast.error("Please add rating and comment");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/addreview`,
        {
          productId: product.id,
          rating,
          comment,
        },
        {
          headers: { "auth-token": token },
        }
      );

      toast.success("Review submitted");
      setRating(0);
      setComment("");
      loadReviews();
      loadRating();
    } catch (err) {
      toast.error(err.response?.data?.message || "Already reviewed");
    }
  };

  return (
    <div className="descriptionbox">
      {/* TABS */}
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${
            activeTab === "reviews" ? "active" : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({count})
        </div>
      </div>

      {/* CONTENT */}
      <div className="descriptionbox-content">
        {activeTab === "description" && (
          <div className="descriptionbox-description">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="descriptionbox-reviews">
            <h3>⭐ {avgRating.toFixed(1)} / 5</h3>

            {/* STAR INPUT */}
            <div className="star-input">
              {[...Array(5)].map((_, i) => {
                const value = i + 1;
                return (
                  <FaStar
                    key={value}
                    size={22}
                    color={value <= (hover || rating) ? "#ffc107" : "#444"}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(value)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </div>

            {/* COMMENT */}
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={submitReview}>Submit Review</button>

            {/* REVIEW LIST */}
            <div className="review-list">
              {reviews.length === 0 && <p>No reviews yet.</p>}

              {reviews.map((r) => (
                <div className="review-card" key={r._id}>
                  <strong>{r.userName}</strong>
                  <div>
                    {[...Array(r.rating)].map((_, i) => (
                      <FaStar key={i} size={14} color="#ffc107" />
                    ))}
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
