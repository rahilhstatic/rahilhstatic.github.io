document.querySelectorAll('#home-btn, email-btn').forEach(btn => {
  btn.addEventListener('mouseup', () => btn.blur());
  btn.addEventListener('touchend', () => btn.blur());
});

document.getElementById('year').textContent = new Date().getFullYear();

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  document.querySelectorAll(".showcase img").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImg.src = img.src;
      modalImg.alt = img.alt;

      // Reset animation
      modalImg.style.animation = "none";
      void modalImg.offsetWidth;
      modalImg.style.animation = null;
    });
  });

  // Close when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Close with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("show");
    }
  });
  
 