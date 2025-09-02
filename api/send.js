export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // ganti dengan token bot kamu
  const CHAT_ID = "7600526426";     // ganti dengan chat ID kamu
  const { text } = req.body;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: false
      })
    });

    const result = await telegramRes.json();
    console.log("Telegram result:", result);

    res.status(200).json({ status: "ok", telegramResult: result });

  } catch (err) {
    console.error("Error sending to Telegram:", err);
    res.status(500).json({ error: err.message });
  }
}
