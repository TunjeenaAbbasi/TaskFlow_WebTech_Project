export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav
      style={{
        background: '#ffffff',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#4f46e5',
        }}
      >
        TaskFlow
      </h1>

      <button
        onClick={logout}
        style={{
          background: '#ef4444',
          color: 'white',
          padding: '12px 20px',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}