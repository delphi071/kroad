export default function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-slide
      className="hero-slide relative shrink-0 snap-start overflow-y-auto overflow-x-hidden"
      style={{ width: "100vw", height: "100vh" }}
    >
      {children}
    </div>
  );
}
