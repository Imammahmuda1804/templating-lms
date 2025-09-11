document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById("profile-button");
  const profileDropdown = document.getElementById("profile-dropdown");
  const profileContainer = document.getElementById("profile-container");

  if (profileButton) {
    profileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      profileDropdown.classList.toggle("hidden");
    });
  }

  window.addEventListener('click', (event) => {
                if (categoryContainer && !categoryContainer.contains(event.target)) {
                    categoryDropdown.classList.add('hidden');
                }
                if (profileContainer && !profileContainer.contains(event.target)) {
                    profileDropdown.classList.add('hidden');
                }
            });
  // Logika untuk Dropdown Kategori
  const categoryButton = document.getElementById("category-button");
  const categoryDropdown = document.getElementById("category-dropdown");
  const categoryContainer = document.getElementById("category-container");

  if (categoryButton) {
    categoryButton.addEventListener("click", (event) => {
      event.stopPropagation();
      categoryDropdown.classList.toggle("hidden");
    });
  }

  window.addEventListener("click", (event) => {
    if (categoryContainer && !categoryContainer.contains(event.target)) {
      categoryDropdown.classList.add("hidden");
    }
  });

  // Inisialisasi Slider Kategori Teratas
  const categoriesSwiper = new Swiper(".top-categories-slider", {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 24,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: ".top-categories-next",
      prevEl: ".top-categories-prev",
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });

  // Inisialisasi Slider Kursus Populer
  const coursesSwiper = new Swiper(".popular-courses-slider", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 24,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: ".popular-courses-next",
      prevEl: ".popular-courses-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });

  // Inisialisasi Slider Mentor Teratas
  const mentorsSwiper = new Swiper(".top-mentors-slider", {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 24,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: ".top-mentors-next",
      prevEl: ".top-mentors-prev",
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
  });

  // Logika Animasi saat Scroll dan Counter
  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Hanya animasikan sekali
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    scrollObserver.observe(el);
  });

  const statsSection = document.getElementById("stats-section");
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
          observer.unobserve(statsSection); // Hanya animasikan counter sekali
        }
      });
    },
    { threshold: 0.5 }
  );

  if (statsSection) {
    counterObserver.observe(statsSection);
  }
});
