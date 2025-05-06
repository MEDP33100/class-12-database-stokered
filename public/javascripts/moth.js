gsap.registerPlugin(MotionPathPlugin); // still optional

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Loop through each moth
document.querySelectorAll(".moth").forEach((moth) => {
  const flap = moth.querySelector(".moth-flap");
  const src = moth.dataset.src;
  flap.style.backgroundImage = `url(${src})`;

  // Set initial position
  const startX = rand(0, window.innerWidth - 100);
  const startY = rand(0, window.innerHeight - 100);
  moth.style.left = `${startX}px`;
  moth.style.top = `${startY}px`;

  // === Flap effect (scaling + soft wiggle) ===
  gsap.to(flap, {
    scaleY: rand(1, 1.2),
    duration: 0.25,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  gsap.to(flap, {
    rotation: rand(-10, 10),
    duration: 0.4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  // flutter in wide randomized loops w/ rotation
  function flyInLoops() {
    const currentX = parseFloat(moth.style.left) || 0;
    const currentY = parseFloat(moth.style.top) || 0;

    const deltaX = rand(-300, 300);
    const deltaY = rand(-250, 250);

    let nextX = currentX + deltaX;
    let nextY = currentY + deltaY;

    // keep in bounds (dont fly offscreen)
    nextX = Math.max(0, Math.min(window.innerWidth - 100, nextX));
    nextY = Math.max(0, Math.min(window.innerHeight - 100, nextY));

    gsap.to(moth, {
      x: nextX - currentX,
      y: nextY - currentY,
      rotation: rand(-20, 20),
      duration: rand(4, 10),
      ease: "sine.inOut",
      onComplete: flyInLoops,
    });
  }

  flyInLoops();

  // glow trail
  setInterval(() => {
    const rect = moth.getBoundingClientRect();
    const trail = document.createElement("div");
    trail.className = "flying-glow";

    const x = rect.left + window.scrollX + 30;
    const y = rect.top + window.scrollY + 30;

    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
  }, 200 + rand(0, 300));
});
