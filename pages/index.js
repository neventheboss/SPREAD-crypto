import { useEffect, useState } from "react";

export default function Home() {
  const [paradex, setParadex] = useState(null);
  const [lighter, setLighter] = useState(null);
  const [spread, setSpread] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPrices() {
    try {
      const resP = await fetch("/api/paradex");
      const resL = await fetch("/api/lighter");
      const priceP = (await resP.json()).price;
      const priceL = (await resL.json()).price;
      setParadex(priceP);
      setLighter(priceL);
      setSpread(Math.abs(priceP - priceL));
      setError(null);
    } catch (e) {
      setError("Erreur d'accès API !");
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Segoe UI", margin: "20px" }}>
      <h1>Spread BTC Paradex vs Lighter</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ fontSize: "22px", margin: "15px 0" }}>Paradex: <b>{paradex || "..."}</b></div>
      <div style={{ fontSize: "22px", margin: "15px 0" }}>Lighter: <b>{lighter || "..."}</b></div>
      <div style={{ fontSize: "25px", margin: "20px 0" }}>
        Spread: <span style={{ color: spread > 0 ? "red" : "green" }}>{spread !== null ? spread : "..."}</span>
      </div>
    </div>
  );
}
