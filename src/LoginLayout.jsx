import React, { useState } from 'react';
import { Link } from "react-router-dom";
export default function LoginComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { name, email });
    // Ajoutez votre logique de connexion ici
  };

  return (
    <div className="login-container">
      {/* Partie gauche - Image principale */}
      <div className="left-section">
        <div className="image-container">
          <img 
            src="public\images\left-image.png" 
            alt="Health Priority" 
            className="main-image"
          />
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="right-section">
        <div className="form-wrapper">
          {/* Logo en haut */}
          <div className="logo-top">
            <img 
              src="public\images\logo.png" 
              alt="Logo" 
              className="logo-image"
            />
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input-field"
                required
              />
            </div>

            <Link to="/lang">
            <button type="submit" className="login-button">
              Login
            </button>
          </Link>
          </form>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          display: flex;
          height: 100vh;
          width:100vw;
          
          font-family: 'Montserrat', 'Segoe UI', system-ui, sans-serif;
          background: #0a0e27;
        }

        /* Partie gauche */
        .left-section {
          flex: 1;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          
          position: relative;
          border-right: 3px solid;
          border-image: linear-gradient(to bottom, #ff6b9d, #00d9ff) 1;
          overflow: hidden;
        }

        .image-container {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Partie droite */
        .right-section {
          flex: 1;
          background: linear-gradient(135deg, #0f1535 0%, #1a2040 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          position: relative;
        }

        .right-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, rgba(0, 217, 255, 0.05) 0%, transparent 60%);
        }

        .form-wrapper {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          animation: slideInRight 0.8s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .logo-top {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInDown 1s ease-out 0.3s backwards;
        }

        .logo-image {
          max-width: 120px;
          height: auto;
          display: inline-block;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          position: relative;
          animation: fadeInUp 0.8s ease-out backwards;
        }

        .input-group:nth-child(1) {
          animation-delay: 0.4s;
        }

        .input-group:nth-child(2) {
          animation-delay: 0.5s;
        }

        .input-field {
          width: 100%;
          padding: 18px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-field:focus {
          outline: none;
          border-color: #00d9ff;
          background: rgba(0, 217, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(0, 217, 255, 0.1),
                      0 8px 24px rgba(0, 217, 255, 0.2);
          transform: translateY(-2px);
        }

        .login-button {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #00d9ff 0%, #00a3cc 100%);
          border: none;
          border-radius: 12px;
          color: #0a0e27;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 8px 24px rgba(0, 217, 255, 0.3);
          animation: fadeInUp 0.8s ease-out 0.6s backwards;
        }

        .login-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 217, 255, 0.4);
          background: linear-gradient(135deg, #00f0ff 0%, #00b8e6 100%);
        }

        .login-button:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 217, 255, 0.3);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .login-container {
            flex-direction: column;
          }

          .left-section {
            border-right: none;
            border-bottom: 3px solid;
            border-image: linear-gradient(to right, #ff6b9d, #00d9ff) 1;
            min-height: 40vh;
            padding: 40px 30px;
          }

          .right-section {
            padding: 40px 30px;
          }

          .main-title {
            font-size: clamp(2.5rem, 10vw, 4rem);
          }
        }

        @media (max-width: 480px) {
          .left-section,
          .right-section {
            padding: 30px 20px;
          }

          .form-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}