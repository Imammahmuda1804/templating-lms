document.addEventListener("DOMContentLoaded", () => {
  // --- Logika untuk Menu Mobile Dropdown ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      // Toggle menu visibility
      mobileMenu.classList.toggle("hidden");
      
      // Toggle icons
      hamburgerIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });
  }

  // --- Logika untuk Dropdown Profil dengan Animasi ---
  const profileButton = document.getElementById("profile-button");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (profileButton) {
    profileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const isHidden = profileDropdown.classList.contains("hidden");
      if (isHidden) {
        profileDropdown.classList.remove("hidden");
        setTimeout(() => {
          profileDropdown.style.opacity = '1';
          profileDropdown.style.transform = 'scale(1)';
        }, 10);
      } else {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.transform = 'scale(0.95)';
        setTimeout(() => {
            profileDropdown.classList.add("hidden");
        }, 200);
      }
    });
  }

  // Menutup dropdown jika klik di luar elemen
  window.addEventListener("click", () => {
    if (profileDropdown && !profileDropdown.classList.contains("hidden")) {
      profileDropdown.style.opacity = '0';
      profileDropdown.style.transform = 'scale(0.95)';
      setTimeout(() => {
        profileDropdown.classList.add("hidden");
      }, 200);
    }
  });


  // --- INISIALISASI SEMUA SLIDER ---
  if (typeof Swiper !== 'undefined') {
    const categoriesSwiper = new Swiper(".top-categories-slider", {
      loop: false,
      spaceBetween: 16,
      centerInsufficientSlides: true,
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 16 },
        768: { slidesPerView: 4, spaceBetween: 16 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
      },
    });

    const coursesSwiper = new Swiper(".popular-courses-slider", {
      loop: false,
      spaceBetween: 24,
      centerInsufficientSlides: true,
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      },
    });

    const mentorsSwiper = new Swiper(".top-mentors-slider", {
      loop: false,
      spaceBetween: 24,
      centerInsufficientSlides: true,
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  }

  // --- LOGIKA ANIMASI & COUNTER --- 
  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    scrollObserver.observe(el);
  });

  const statsSection = document.getElementById("stats-section");
  if (statsSection) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = document.querySelectorAll(".counter-value");
            counters.forEach((counter) => {
              if (counter.classList.contains("animated")) return;
              counter.classList.add("animated");

              const target = +counter.getAttribute("data-target");
              let count = 0;

              const updateCount = () => {
                const increment = target / 100;
                if (count < target) {
                  count = Math.ceil(count + increment);
                  counter.innerText = count.toLocaleString() + "+";
                  requestAnimationFrame(updateCount);
                } else {
                  counter.innerText = target.toLocaleString() + "+";
                }
              };
              updateCount();
            });
            observer.unobserve(statsSection);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(statsSection);
  }
});

