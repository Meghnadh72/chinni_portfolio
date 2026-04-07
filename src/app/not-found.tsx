import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-8xl md:text-9xl text-accent mb-4">404</h1>
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
        Frame Not Found
      </h2>
      <p className="text-foreground/60 text-base max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist. Perhaps it was moved or the URL
        was mistyped.
      </p>
      <Link
        href="/"
        className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
