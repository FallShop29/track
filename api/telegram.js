export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  const botToken = '8427844482:AAHHXCP_psaehlBnm8SHBEEFvhTehYw2gEY'; // Ganti kalau perlu
  const chatId = '7600526426'; // Ganti kalau perlu

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });

    const data = await response.json();
    if (!data.ok) {
      return res.status(400).json({ ok: false, error: data.description });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
