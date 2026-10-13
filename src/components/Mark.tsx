export function Mark() {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    {[0, 90, 180, 270].map(rotation => <path key={rotation} transform={`rotate(${rotation} 16 16)`} d="M17 2 22 10 17 15 14 12Z" />)}
  </svg>
}
