export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/40 rounded-full animate-float" />
      <div
        className="absolute top-1/3 left-1/4 w-3 h-3 bg-accent/40 rounded-full animate-float-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/30 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-5 h-5 bg-accent/30 rounded-full animate-float-slow"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}
