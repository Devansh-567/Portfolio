import { useLocation } from "react-router-dom";
<<<<<<< HEAD
import { lazy, Suspense, useEffect } from "react";
const Stage = lazy(() => import("@/stage/Stage"));

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "Page not found, Devansh Singh";
  }, [location.pathname]);
  return (
    <main>
      <div style={{ position: "fixed", inset: 0, background: "#120e0a" }} />
      <Suspense fallback={null}><Stage /></Suspense>
      <div className="lost">
        <h1>404</h1>
        <p className="lede">There is no page at {location.pathname}.</p>
        <a className="btn btn--solid" href="/" style={{ justifySelf: "center" }}>Return home</a>
      </div>
    </main>
=======
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
>>>>>>> origin/main
  );
};

export default NotFound;
