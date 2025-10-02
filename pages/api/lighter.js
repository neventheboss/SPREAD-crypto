export default async function handler(req, res) {
  try {
    const data = await fetch("https://api.lighter.xyz/public/markets/BTC").then(r => r.json());
    res.status(200).json({ price: parseFloat(data?.lastPrice || data?.price || 0) });
  } catch (e) {
    res.status(500).json({ error: "Lighter API error" });
  }
}
