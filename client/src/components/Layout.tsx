import type { ReactNode } from 'react';

type Props = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function Layout({
  title,
  action,
  children,
}: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f1f5f9',
      }}
    >
      {/* Page Content */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '35px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            {title}
          </h2>

          {action}
        </div>

        {children}
      </div>
    </div>
  );
}