export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // GANTI dengan token asli kamu
  const CHAT_ID = "7600526426"; // GANTI dengan chat_id kamu

  try {
    const { text } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const result = await response.json();
    if (!response.ok || !result.ok) {
      return res.status(500).json({ error: "Failed to send to Telegram", detail: result });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending to Telegram:", err);
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}
