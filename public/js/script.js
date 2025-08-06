// This script allows you to copy message codes with a click
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-text").forEach(el => {
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(el.textContent).then(() => {
        alert("✅ Copied: " + el.textContent);
      });
    });
  });
});
