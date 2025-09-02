export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";   // sudah kamu ganti
  const CHAT_ID   = "-1002858675066";     // sudah kamu ganti

  try {
    const { text } = req.body || {};
    const message = text || "🔔 Test pesan dari API /send";

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        }),
      }
    );

    const result = await telegramRes.json();
    console.log("Telegram response:", result); // penting untuk debug

    if (!telegramRes.ok || !result.ok) {
      return res.status(telegramRes.status).json({ error: result });
    }

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
}
