/**
 * Custom cursor elements — dot + trailing outline ring.
 * Logic handled by useCustomCursor hook in App.
 */
export default function CustomCursor() {
  return (
    <div aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-outline" />
    </div>
  );
}
