// Dán URL "Web app" của Google Apps Script vào đây sau khi triển khai.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3vIiaHscEtCfpsUt-q7kwgkiOI8z_Twis6_XNmHZ_Mnz9HBgguMNboItvqqsZ-D9k/exec";

const form = document.querySelector("#message-form");
const inputArea = document.querySelector("#message-input-area");
const status = document.querySelector("#form-status");
const button = document.querySelector("#send-button");

// Tạo ô nhập lời nhắn bằng JavaScript.
const messageLabel = document.createElement("label");
messageLabel.htmlFor = "message";
messageLabel.textContent = "Lời nhắn của bạn";

const messageInput = document.createElement("textarea");
messageInput.id = "message";
messageInput.name = "message";
messageInput.placeholder = "Viết điều bạn muốn nói với mình...";
messageInput.maxLength = 1000;
messageInput.required = true;

inputArea.append(messageLabel, messageInput);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.className = "";

  if (GOOGLE_SCRIPT_URL.includes("DAN_URL")) {
    status.textContent = "Chưa kết nối Google Trang tính. Hãy cập nhật GOOGLE_SCRIPT_URL trong script.js.";
    status.classList.add("error");
    return;
  }

  button.disabled = true;
  button.textContent = "Đang gửi...";
  status.textContent = "";

  const data = {
    name: document.querySelector("#sender-name").value.trim(),
    message: messageInput.value.trim()
  };

  try {
    // no-cors cho phép gửi đến Apps Script từ website tĩnh.
    // Apps Script vẫn nhận dữ liệu và lưu vào Sheet.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    form.reset();
    status.textContent = "Cảm ơn bạn! Lời nhắn đã được gửi.";
    status.classList.add("success");
  } catch (error) {
    status.textContent = "Không thể gửi lúc này. Vui lòng thử lại sau.";
    status.classList.add("error");
  } finally {
    button.disabled = false;
    button.innerHTML = 'Gửi lời nhắn <span aria-hidden="true">→</span>';
  }
});
