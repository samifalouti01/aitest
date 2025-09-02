export function Logo({ brand = 'Brand' }: { brand?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-glow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" fill="currentColor"/>
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">{brand}</span>
    </div>
  );
}
