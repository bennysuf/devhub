import { useEffect, useState } from "react";

export default function NotFound() {
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    setTimeout(() => {
      setLoading("404 page not found");
    }, 500);
  }, []);

  return <h1 style={{ textAlign: "center", marginTop: "3%" }}>{loading}</h1>;
}
