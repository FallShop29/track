export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // Ganti dengan milik kamu
  const CHAT_ID = "7600526426"; // Ganti dengan milik kamu

  try {
    const { text } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML", // Gunakan HTML biar bisa format bold, link
        disable_web_page_preview: true
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error("Telegram API error:", result);
      return res.status(500).json({ error: "Failed to send message", telegram: result });
    }

    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error("Send error:", error);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}
