export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // Ganti sesuai
  const CHAT_ID = "7600526426"; // Ganti sesuai
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text kosong" });

    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" })
    });
    const result = await telegramRes.json();
    console.log("Telegram API response:", result);

    if (!result.ok) return res.status(telegramRes.status).json({ error: result.description });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
