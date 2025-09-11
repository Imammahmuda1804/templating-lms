document.addEventListener("DOMContentLoaded", () => {
        const categoryButton = document.getElementById("category-button");
        const categoryDropdown = document.getElementById("category-dropdown");
        const categoryContainer = document.getElementById("category-container");

        if (categoryButton) {
          // Tampilkan/sembunyikan dropdown saat tombol diklik
          categoryButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Mencegah event 'click' window di bawah
            categoryDropdown.classList.toggle("hidden");
          });
        }

        // Sembunyikan dropdown jika mengklik di luar area dropdown
        window.addEventListener("click", (event) => {
          if (categoryContainer && !categoryContainer.contains(event.target)) {
            categoryDropdown.classList.add("hidden");
          }
        });
        const heroImage = document.getElementById("hero-image");
        if (heroImage) {
          window.addEventListener("scroll", () => {
            const scrollPosition = window.pageYOffset;
            // Menggerakkan gambar ke atas dengan kecepatan 30% dari kecepatan scroll
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
          });
        }
        // --- Animasi Counter ---
        const statsSection = document.getElementById("stats-section");
        const counterObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              // Cek jika section terlihat di layar
              if (entry.isIntersecting) {
                const counters = document.querySelectorAll(".counter-value");
                counters.forEach((counter) => {
                  // Cek jika counter sudah dianimasikan
                  if (counter.classList.contains("animated")) return;
                  counter.classList.add("animated");

                  const target = +counter.getAttribute("data-target");
                  let count = 0;

                  const updateCount = () => {
                    const increment = target / 100; // Kecepatan animasi

                    if (count < target) {
                      count = Math.ceil(count + increment);
                      if (count > target) count = target;
                      counter.innerText = count.toLocaleString() + "+";
                      requestAnimationFrame(updateCount);
                    } else {
                      counter.innerText = target.toLocaleString() + "+";
                    }
                  };
                  updateCount();
                });
              }
            });
          },
          {
            threshold: 0.5, // Trigger saat 50% section terlihat
          }
        );

        if (statsSection) {
          counterObserver.observe(statsSection);
        }

        // --- Animasi saat Scroll ---
        const scrollObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in-up");
                // Opsional: berhenti mengamati setelah animasi selesai
                // scrollObserver.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1, // Trigger saat 10% elemen terlihat
          }
        );

        const elementsToAnimate = document.querySelectorAll(".scroll-animate");
        elementsToAnimate.forEach((el) => {
          scrollObserver.observe(el);
        });
      });

      