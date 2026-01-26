import "./CustomerSpotlight.css";
import cs_1 from "../Assets/customer_gallery-1.webp";

const CustomerSpotlight = () => {
  return (
    <div className="spotlight-section">
      <div className="spotlight-single">
        <img src={cs_1} alt="Customer Spotlight Gallery" />
      </div>
    </div>
  );
};

export default CustomerSpotlight;
