/* ===================================================================
   Laced by P — site interactions
=================================================================== */

// 1. Navbar background changes once you scroll past the hero
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// 2. Mobile menu open/close
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
// Close the menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// 3. Booking form -> opens the visitor's email app with details filled in.
//    >>> CHANGE THIS to your real business email <<<
const YOUR_EMAIL = "hello@lacedbyp.com";

const form = document.getElementById("bookForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const subject = `Booking Request — ${data.get("service") || "Appointment"}`;
  const body =
    `Hi P, I'd like to book an appointment.\n\n` +
    `Name: ${data.get("name") || "-"}\n` +
    `Phone: ${data.get("phone") || "-"}\n` +
    `Service: ${data.get("service") || "-"}\n` +
    `Preferred date: ${data.get("date") || "-"}\n` +
    `Preferred time: ${data.get("time") || "-"}\n` +
    `Notes: ${data.get("notes") || "-"}\n`;

  window.location.href =
    `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// 4. Footer year stays current automatically
document.getElementById("year").textContent = new Date().getFullYear();
