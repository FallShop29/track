export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ======= CONFIG =======
  // Set environment variables di Vercel / server:
  // BOT_TOKEN  => token bot Telegram (contoh: 123456:ABC-DEF...)
  // CHAT_ID    => chat id tujuan
  const BOT_TOKEN = process.env.BOT_TOKEN || "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";
  const CHAT_ID   = process.env.CHAT_ID   || "7600526426";
  // ======================

  const { text } = req.body ?? {};

  if (!text) {
    return res.status(400).json({ error: "Missing text in body" });
  }

  try {
    const telegram = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: false
        })
      }
    );

    const result = await telegram.json(); // Telegram returns JSON with `ok` field
    if (!telegram.ok) {
      return res.status(500).json(result);
    }
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
