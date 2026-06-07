import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const login = () => {
    if (user === 'admin' && pass === '1234') {
      localStorage.setItem('user', user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="background-blobs" />

      <div className="glass-card">
        <div className="header">
          <h1>TaskFlow</h1>
          <p>Organize. Track. Deliver.</p>
        </div>

        <div className="input-group">
          <div className="input-box">
            <span className="icon">👤</span>
            <input
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button onClick={login}>Sign In</button>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .login-wrapper {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(135deg, #0f172a, #1e293b, #0b1220);
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .background-blobs {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #6366f1, transparent 60%);
          top: -100px;
          left: -100px;
          filter: blur(80px);
          animation: float 6s ease-in-out infinite;
        }

        .background-blobs::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #22d3ee, transparent 60%);
          bottom: -150px;
          right: -150px;
          filter: blur(80px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .glass-card {
          width: 360px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          color: white;
          text-align: center;
          z-index: 2;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header p {
          margin-top: 8px;
          font-size: 13px;
          opacity: 0.7;
        }

        .input-group {
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 12px;
          transition: 0.3s;
        }

        .input-box:hover {
          border-color: rgba(99, 102, 241, 0.6);
        }

        .input-box:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .icon {
          margin-right: 8px;
          opacity: 0.7;
        }

        input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 14px;
        }

        button {
          margin-top: 10px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: white;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
}