// ページ共通パーツを読み込む
document.addEventListener("DOMContentLoaded", function() {
  includeHTML();
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
