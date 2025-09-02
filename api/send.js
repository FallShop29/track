export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ==== GANTI BAGIAN INI ====
  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";  // 👉 masukkan token bot kamu di sini
  const CHAT_ID = "7600526426";      // 👉 masukkan chat_id kamu di sini
  // ===========================

  const { text } = req.body;

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
          disable_web_page_preview: false,
        }),
      }
    );

    const result = await telegram.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
        }
