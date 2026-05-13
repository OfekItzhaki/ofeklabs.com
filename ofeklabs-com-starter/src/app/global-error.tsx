'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#09090B', color: '#FAFAFA' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Something went wrong</h1>
          <p style={{ marginTop: '1rem', color: '#A1A1AA' }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', backgroundColor: '#3B82F6', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
