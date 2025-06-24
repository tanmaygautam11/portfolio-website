// Navbar SPA logic
function setActiveNav(hash) {
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));
  let nav = document.querySelector(`.nav-link[href="${hash}"]`);
  if (nav) nav.classList.add("active");
}

// Smooth scroll and nav highlight
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const hash = this.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 75,
        behavior: "smooth",
      });
      setActiveNav(hash);
      // Close nav on mobile
      document.querySelector(".nav-links").classList.remove("open");
    }
  });
});

// Scrollspy for nav highlight
window.addEventListener("scroll", () => {
  const sections = ["#home", "#skills", "#work", "#contact"];
  let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
  let offset = 90;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = document.querySelector(sections[i]);
    if (sec && sec.offsetTop - offset <= scrollPos) {
      setActiveNav(sections[i]);
      break;
    }
  }
});

// Mobile nav toggle
document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});

// Fade-in animation for sections on scroll
function fadeInOnScroll() {
  document.querySelectorAll(".fade-in").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      section.style.animationPlayState = "running";
    }
  });
}
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("DOMContentLoaded", fadeInOnScroll);

// Typewriter effect in hero
function typewriterInit() {
  const el = document.querySelector(".typewriter");
  if (!el) return;
  const arr = JSON.parse(el.getAttribute("data-text").replace(/'/g, '"'));
  let idx = 0,
    char = 0,
    forward = true;
  function next() {
    let txt = arr[idx];
    if (forward) {
      char++;
      if (char > txt.length) {
        forward = false;
        setTimeout(next, 1100);
        return;
      }
    } else {
      char--;
      if (char < 0) {
        forward = true;
        idx = (idx + 1) % arr.length;
        setTimeout(next, 350);
        return;
      }
    }
    el.textContent = txt.slice(0, char);
    setTimeout(next, forward ? 70 : 35);
  }
  next();
}
window.addEventListener("DOMContentLoaded", typewriterInit);

// Contact form validation and fake submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const response = document.getElementById("formResponse");
  response.textContent = "";
  response.className = "";
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  if (!name || !email || !message) {
    response.textContent = "Please fill all fields.";
    response.className = "form-error";
    return;
  }
  setTimeout(() => {
    response.textContent = "Thank you! Your message has been sent.";
    response.className = "form-success";
    this.reset();
  }, 800);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
