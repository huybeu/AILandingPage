const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn AI cho khoá học 'Tư Duy Chiến Lược & Quản Trị AI Cho Lãnh Đạo Doanh Nghiệp' của diễn giả Lê Công Năng.

Thông tin:
- Học phí: 490.000đ (ưu đãi từ 3.600.000đ)
- 180 phút, 5 phần học thực chiến
- Bonus: 6 Giám Đốc AI cá nhân hoá (Marketing, Sales, HR, Pháp chế, Chiến lược, Trợ lý CEO)
- Đối tượng: CEO, Chủ doanh nghiệp, Giám đốc
- Liên hệ: 0931 722 777 | lecongnang03@gmail.com
- Thanh toán: MB Bank 9996469999 - LÊ CÔNG NĂNG

Lê Công Năng: Chủ tịch WonderTour & VEF Global, diễn giả nhiều trường đại học, chuyên gia AI xuất hiện trên VTV1, VTV2, VTV3, VOV, báo chí uy tín, kết nối doanh nhân 15+ quốc gia.

Trả lời ngắn gọn, thân thiện bằng tiếng Việt. Khuyến khích đăng ký và liên hệ hotline khi phù hợp.`;

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-8),
    }),
  });

  const data = await res.json();
  const errMsg = data.error && (typeof data.error === 'string' ? data.error : data.error?.message);
  return data.content?.[0]?.text || errMsg || 'Xin lỗi, lỗi kết nối. Vui lòng gọi 0931 722 777!';
}
