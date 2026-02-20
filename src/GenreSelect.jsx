import "./LanguageSelect.css";
import flagEN from "./assets/images/male.png";
import flagFR from "./assets/images/female.png";
import logo from "./assets/images/logo.png";
import { Link } from "react-router-dom";


const LanguageSelect = () => {
  const handleLanguage = (lang) => {
  
  };

  return (
    <div className="lang-container">
      <button className="back-btn">←</button>

      <div className="lang-card">
        {/* Logo */}
        <div className="logo">
  <img src={logo} alt="Logo" className="logo-img" />
</div>


        <h3>Genre?</h3>
<Link to="/chat">
        {/* English */}
        <button className="lang-btn" onClick={() => handleLanguage("en")}>
          <img src={flagEN} alt="English" className="flag" />
          <span>Male</span>
        </button>
        </Link>
<Link to="/chat">
        {/* French */}
        <button className="lang-btn" onClick={() => handleLanguage("fr")}>
          <img src={flagFR} alt="French" className="flag" />
          <span>Female</span>
        </button>
</Link>
        {/* Arabic */}
       
      </div>
    </div>
  );
};

export default LanguageSelect;
