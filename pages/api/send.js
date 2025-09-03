// pages/api/send.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // Ganti ke token kamu
  const CHAT_ID = "7600526426"; // Ganti ke ID Telegram kamu

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text kosong" });
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      }),
    });

    const result = await telegramResponse.json();
    console.log("Telegram Response:", result);

    if (!result.ok) {
      return res.status(telegramResponse.status).json({ error: result.description });
    }

    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
