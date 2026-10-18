import { useLocation } from "react-router-dom";
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
  );
};

export default NotFound;
