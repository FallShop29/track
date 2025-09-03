export default async function handler(req, res) {
  // GANTI dengan token & chat_id yang benar
  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";
  const CHAT_ID   = "7600526426";

  const ua = req.headers["user-agent"] || "-";

  const text = [
    "✅ Ping dari halaman Vercel",
    `🖥 UA: ${ua}`,
    `⏰ ${new Date().toLocaleString("id-ID")}`
  ].join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    const result = await tg.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
