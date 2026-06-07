// import { Component, ReactNode } from 'react';
// import React, { Component, ReactNode } from 'react';
import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '48px 40px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💥</div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '10px',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '8px',
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred in the application.
            </p>
            {this.state.message && (
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--danger)',
                  background: '#e53e3e11',
                  border: '1px solid #e53e3e33',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  marginBottom: '24px',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.message}
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
