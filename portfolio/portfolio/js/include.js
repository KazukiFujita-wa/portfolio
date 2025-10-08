// ページ共通パーツを読み込む
// --- 共通パーツ読込 ---
document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;

        // ヘッダー読み込み完了後にイベントを紐付け
        if (file.includes("header.html")) {
          setTimeout(() => {
            const menuBtn = document.getElementById("menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            if (menuBtn && mobileMenu) {
              menuBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
              });
            }
          }, 100); // 少し待ってから実行（DOM反映のため）
        }
      })
      .catch(err => console.error("Include error:", err));
  });
});

function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`File not found: ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => console.error(err));
  });
}
