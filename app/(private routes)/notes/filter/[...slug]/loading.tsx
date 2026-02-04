export default function Loading() {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      style={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>Loading notes…</p>
    </div>
  );
}
