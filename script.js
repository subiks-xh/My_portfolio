const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealItems = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill");
const contactForm = document.querySelector(".contact-form");

const savedTheme = window.localStorage.getItem("portfolio-theme");
const preferredTheme =
  savedTheme ||
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

function setTheme(theme) {
  if (theme === "light") {
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "◑";
  } else {
    body.removeAttribute("data-theme");
    themeIcon.textContent = "◐";
  }

  window.localStorage.setItem("portfolio-theme", theme);
}

setTheme(preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const bar = entry.target.querySelector(".skill__bar span");
      const level = entry.target.getAttribute("data-level");
      bar.style.width = `${level}%`;
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

skillBars.forEach((skill) => skillObserver.observe(skill));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

// Contact form: support Formspree AJAX submit when configured, otherwise fallback to mailto
if (contactForm) {
  const formAction = contactForm.getAttribute('action') || '';
  const usesFormspree = contactForm.dataset.formspree === 'true' || formAction.includes('formspree.io');

  contactForm.addEventListener('submit', (event) => {
    if (usesFormspree && formAction) {
      event.preventDefault();
      const statusEl = contactForm.querySelector('.form-status');
      if (statusEl) statusEl.textContent = 'Sending…';

      fetch(formAction, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      })
        .then((res) => {
          if (res.ok) return res.json().catch(() => ({}));
          return res.json().then((data) => Promise.reject(data));
        })
        .then(() => {
          if (statusEl) statusEl.textContent = 'Thanks — your message was sent.';
          contactForm.reset();
        })
        .catch(() => {
          if (statusEl)
            statusEl.textContent = 'Sorry — something went wrong. Please try again or email me directly.';
        });
    } else {
      // Fallback: open user's mail client using mailto
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('_replyto') || formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`);
      const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:msubikshan2297@gmail.com?subject=${subject}&body=${bodyText}`;
    }
  });
}

if (!CSS.supports("backdrop-filter: blur(1px)")) {
  root.style.setProperty("--surface", "rgba(15, 23, 42, 0.94)");
}