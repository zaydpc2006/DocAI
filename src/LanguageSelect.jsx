import "./LanguageSelect.css";
import flagEN from "./assets/images/flag-en.png";
import flagFR from "./assets/images/flag-fr.png";
import flagAR from "./assets/images/flag-ar.png";
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


        <h3>LANGUES?</h3>
<Link to="/genre">
        {/* English */}
        <button className="lang-btn" onClick={() => handleLanguage("en")}>
          <img src={flagEN} alt="English" className="flag" />
          <span>ENGLISH</span>
        </button>
        </Link>
<Link to="/genre">
        {/* French */}
        <button className="lang-btn" onClick={() => handleLanguage("fr")}>
          <img src={flagFR} alt="French" className="flag" />
          <span>FRANCE</span>
        </button>
</Link>
<Link to="/genre">
        {/* Arabic */}
        <button className="lang-btn" onClick={() => handleLanguage("ar")}>
          <img src={flagAR} alt="Arabic" className="flag" />
          <span>ARABIC</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LanguageSelect;
