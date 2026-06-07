import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

export default function AddTaskPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="blob blob1" />
      <div className="blob blob2" />

      {/* Navbar */}
      <div className="glass-nav">
        <h1>TaskFlow</h1>

        <button onClick={() => navigate('/')}>
          Back
        </button>
      </div>

      {/* Content */}
      <div className="center">
        <div className="glass-card wide">
          <h2>➕ Create New Task</h2>
          <TaskForm />
        </div>
      </div>

      <style>{`
        .page-wrapper {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #0f172a, #1e293b, #0b1220);
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .blob {
          position: absolute;
          width: 400px;
          height: 400px;
          filter: blur(90px);
          opacity: 0.6;
          z-index: 0;
        }

        .blob1 {
          background: radial-gradient(circle, #6366f1, transparent 60%);
          top: -120px;
          left: -120px;
        }

        .blob2 {
          background: radial-gradient(circle, #22d3ee, transparent 60%);
          bottom: -150px;
          right: -150px;
        }

        .glass-nav {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .glass-nav h1 {
          color: white;
          font-size: 28px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-nav button {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border: none;
          color: white;
          padding: 10px 18px;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .glass-nav button:hover {
          transform: translateY(-2px);
        }

        .center {
          display: flex;
          justify-content: center;
          margin-top: 60px;
          position: relative;
          z-index: 2;
        }

        .glass-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 30px;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .wide {
          width: 650px;
        }

        h2 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}