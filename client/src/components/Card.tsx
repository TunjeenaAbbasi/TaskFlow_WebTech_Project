import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow:
          '0 10px 30px rgba(0,0,0,.1)',
      }}
    >
      {children}
    </div>
  );
}