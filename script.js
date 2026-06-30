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
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ===================================================================
   3. Booking flow:  service  ->  pick a day  ->  pick a time
   ------------------------------------------------------------------
   EDIT these two settings to match how you work:
=================================================================== */

// Which weekdays you take appointments. 0=Sunday ... 6=Saturday.
// Example below = Tuesday through Saturday.
const AVAILABLE_WEEKDAYS = [2, 3, 4, 5, 6];

// Your appointment times (shown after a day is picked).
const TIME_SLOTS = [
  "9:00 AM", "10:30 AM", "12:00 PM",
  "1:30 PM", "3:00 PM", "4:30 PM",
];

// --- element references ---
const serviceSelect = document.getElementById("serviceSelect");
const bookingStep = document.getElementById("bookingStep");
const calTitle = document.getElementById("calTitle");
const calGrid = document.getElementById("calGrid");
const calPrev = document.getElementById("calPrev");
const calNext = document.getElementById("calNext");
const slotsWrap = document.getElementById("slotsWrap");
const slotsEl = document.getElementById("slots");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Midnight today — used to block past days
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

// Which month the calendar is currently showing
let viewYear = TODAY.getFullYear();
let viewMonth = TODAY.getMonth();

// Show the calendar step only after a service is chosen
serviceSelect.addEventListener("change", () => {
  const chosen = serviceSelect.value !== "";
  bookingStep.hidden = !chosen;
  if (chosen) renderCalendar();
});

// Month navigation
calPrev.addEventListener("click", () => { viewMonth--; fixMonth(); renderCalendar(); });
calNext.addEventListener("click", () => { viewMonth++; fixMonth(); renderCalendar(); });

function fixMonth() {
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
}

// Is this date bookable? (not in the past, and on an available weekday)
function isAvailable(dateObj) {
  if (dateObj < TODAY) return false;
  return AVAILABLE_WEEKDAYS.includes(dateObj.getDay());
}

function renderCalendar() {
  calTitle.textContent = `${MONTHS[viewMonth]} ${viewYear}`;
  calGrid.innerHTML = "";

  // Don't let people page back before the current month
  calPrev.disabled =
    viewYear === TODAY.getFullYear() && viewMonth === TODAY.getMonth();

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Blank cells so day 1 lands under the right weekday
  for (let i = 0; i < firstWeekday; i++) {
    const blank = document.createElement("span");
    blank.className = "cal-cell empty";
    calGrid.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(viewYear, viewMonth, d);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-cell";
    cell.textContent = d;

    if (isAvailable(dateObj)) {
      cell.classList.add("available");
      cell.addEventListener("click", () => selectDay(dateObj, cell));
    } else {
      cell.classList.add("disabled");
      cell.disabled = true;
    }
    calGrid.appendChild(cell);
  }
}

function selectDay(dateObj, cell) {
  calGrid.querySelectorAll(".cal-cell").forEach((c) => c.classList.remove("selected"));
  cell.classList.add("selected");

  // Store a friendly date string for the email, e.g. "Saturday, June 14, 2026"
  dateInput.value = dateObj.toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  timeInput.value = "";   // reset any previously chosen time
  renderSlots();
}

function renderSlots() {
  slotsEl.innerHTML = "";
  TIME_SLOTS.forEach((slot) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot";
    btn.textContent = slot;
    btn.addEventListener("click", () => {
      slotsEl.querySelectorAll(".slot").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      timeInput.value = slot;
    });
    slotsEl.appendChild(btn);
  });
  slotsWrap.hidden = false;
}

/* ===================================================================
   4. Submitting -> opens the visitor's email app with details ready.
   >>> CHANGE THIS to your real business email <<<
=================================================================== */
const YOUR_EMAIL = "hello@lacedbyp.com";

const form = document.getElementById("bookForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!dateInput.value) {
    alert("Please pick an available day.");
    return;
  }
  if (!timeInput.value) {
    alert("Please choose an available time.");
    return;
  }

  const data = new FormData(form);
  const subject = `Booking Request — ${data.get("service") || "Appointment"}`;
  const body =
    `Hi P, I'd like to book an appointment.\n\n` +
    `Name: ${data.get("name") || "-"}\n` +
    `Phone: ${data.get("phone") || "-"}\n` +
    `Service: ${data.get("service") || "-"}\n` +
    `Day: ${data.get("date") || "-"}\n` +
    `Time: ${data.get("time") || "-"}\n` +
    `Notes: ${data.get("notes") || "-"}\n`;

  window.location.href =
    `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// 5. Footer year stays current automatically
document.getElementById("year").textContent = new Date().getFullYear();
