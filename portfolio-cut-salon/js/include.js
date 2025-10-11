// js/include.js
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`${file} が読み込めませんでした`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
        if (file.includes('header.html')) {
          // ヘッダー読み込み後にメニュー動作を初期化
          initMenu();
        }
      })
      .catch(err => console.error(err));
  });
});
