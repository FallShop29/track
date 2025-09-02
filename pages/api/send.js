export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ganti dengan BOT_TOKEN & CHAT_ID Anda
  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";
  const CHAT_ID = "7600526426";

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // kirim ke Telegram
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,               // isi pesan
          parse_mode: "HTML", // pakai HTML biar aman (Markdown gampang error)
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await telegramRes.json();

    if (!telegramRes.ok) {
      console.error("Telegram API error:", result);
      return res.status(telegramRes.status).json(result);
    }

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
}
