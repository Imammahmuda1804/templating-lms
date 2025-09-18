// --- DATA DUMMY ---
const courseDetails = {
  name: "Belajar Desain UI/UX dari Dasar hingga Mahir",
  description:
    "Kursus komprehensif untuk menjadi desainer produk digital yang siap berkarir di industri.",
  thumbnail: "https://placehold.co/192x128/3b82f6/white?text=Course",
  students: 1824,
  mentor: {
    name: "Jane Cooper",
    role: "Senior UI/UX Designer di TechCorp",
  },
  benefits: [
    "Sertifikat kelulusan terverifikasi",
    "Akses materi kursus selamanya",
    "Grup diskusi privat dengan mentor",
    "Studi kasus dunia nyata",
    "Feedback proyek akhir personal",
  ],
  has_batches: true,
};

const courseBatches = [
  {
    id: 1,
    name: "Batch September 2025",
    startDate: "2025-09-20",
    endDate: "2025-12-20",
    status: "Tersedia",
  },
  {
    id: 2,
    name: "Batch Oktober 2025",
    startDate: "2025-10-20",
    endDate: "2026-01-20",
    status: "Tersedia",
  },
  {
    id: 3,
    name: "Batch Agustus 2025",
    startDate: "2025-08-20",
    endDate: "2025-11-20",
    status: "Penuh",
  },
];

const pricingOptions = [
  {
    id: 1,
    name: "Basic Plan",
    duration: "30 hari",
    price: 299000,
    popular: false,
  },
  {
    id: 2,
    name: "Premium Plan",
    duration: "90 hari",
    price: 599000,
    popular: true,
  },
  {
    id: 3,
    name: "Pro Plan",
    duration: "Selamanya",
    price: 999000,
    popular: false,
  },
];

// --- FUNGSI UTILITAS ---
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// --- FUNGSI RENDER & UPDATE ---
function renderCourseDetails() {
  const container = document.getElementById("course-details-container");
  if (!container) return;

  const benefitsHTML = courseDetails.benefits
    .map(
      (benefit) => `
                <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span>${benefit}</span>
                </li>
            `
    )
    .join("");

  container.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <img src="${
                      courseDetails.thumbnail
                    }" alt="Course Thumbnail" class="w-full md:w-48 h-auto object-cover rounded-lg"/>
                    <div class="flex-1">
                        <h1 class="text-2xl font-bold mb-2">${
                          courseDetails.name
                        }</h1>
                        <p class="text-gray-600 mb-4">${
                          courseDetails.description
                        }</p>
                        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                                <b>${courseDetails.students.toLocaleString(
                                  "id-ID"
                                )}</b> Siswa
                            </div>
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" /></svg>
                                <b>${courseDetails.mentor.name}</b> (${
    courseDetails.mentor.role
  })
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 border-t border-gray-200 pt-4">
                    <h3 class="font-semibold text-gray-800 mb-3">Manfaat yang Anda Dapatkan:</h3>
                    <ul class="space-y-2 text-gray-600">${benefitsHTML}</ul>
                </div>
            `;
}

function renderBatchOptions() {
  const container = document.getElementById("batch-options");
  if (!container) return;
  container.innerHTML = courseBatches
    .map(
      (batch) => `
                <div class="relative">
                    <input type="radio" id="batch_${
                      batch.id
                    }" name="batch" value="${batch.id}" class="peer sr-only" ${
        batch.status === "Penuh" ? "disabled" : ""
      }>
                    <label for="batch_${
                      batch.id
                    }" class="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
        batch.status === "Penuh"
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : "hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50"
      }">
                        <div class="flex-1">
                            <h4 class="font-semibold text-lg">${batch.name}</h4>
                            <p class="text-sm ${
                              batch.status === "Penuh"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }">Mulai: ${formatDate(batch.startDate)}</p>
                        </div>
                        <span class="text-sm font-semibold py-1 px-3 rounded-full ${
                          batch.status === "Penuh"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }">${batch.status}</span>
                    </label>
                </div>
            `
    )
    .join("");
}

function renderPricingOptions() {
  const container = document.getElementById("pricing-options");
  if (!container) return;
  container.innerHTML = pricingOptions
    .map(
      (plan) => `
                <div class="relative">
                    <input type="radio" id="plan_${
                      plan.id
                    }" name="pricing" value="${plan.id}" class="peer sr-only">
                    <label for="plan_${
                      plan.id
                    }" class="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all">
                        <div class="flex-1">
                            <div class="flex items-start justify-between">
                                <h4 class="font-semibold text-lg">${
                                  plan.name
                                }</h4>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-blue-600">${formatRupiah(
                                      plan.price
                                    )}</div>
                                    <div class="text-sm text-gray-600">${
                                      plan.duration
                                    }</div>
                                </div>
                            </div>
                        </div>
                    </label>
                    ${
                      plan.popular
                        ? '<div class="absolute -top-2 -right-2 gradient-main text-white px-3 py-1 rounded-full text-xs font-semibold">Populer</div>'
                        : ""
                    }
                </div>
            `
    )
    .join("");
}

function updateOrderSummary() {
  const selectedBatchEl = document.querySelector('input[name="batch"]:checked');
  const selectedPlanEl = document.querySelector(
    'input[name="pricing"]:checked'
  );
  const payButton = document.getElementById("pay-button");

  const selectedBatchId = selectedBatchEl
    ? parseInt(selectedBatchEl.value)
    : null;
  const selectedPlanId = selectedPlanEl ? parseInt(selectedPlanEl.value) : null;

  const selectedBatch = selectedBatchId
    ? courseBatches.find((b) => b.id === selectedBatchId)
    : null;
  const selectedPlan = selectedPlanId
    ? pricingOptions.find((p) => p.id === selectedPlanId)
    : null;

  document.getElementById("selected-batch-name").textContent = selectedBatch
    ? selectedBatch.name
    : "-";
  document.getElementById("selected-plan-name").textContent = selectedPlan
    ? selectedPlan.name
    : "-";

  const isReadyToPay =
    selectedPlan && (!courseDetails.has_batches || selectedBatch);

  if (isReadyToPay) {
    const tax = Math.round(selectedPlan.price * 0.11);
    const total = selectedPlan.price + tax;

    document.getElementById("plan-price").textContent = formatRupiah(
      selectedPlan.price
    );
    document.getElementById("tax-amount").textContent = formatRupiah(tax);
    document.getElementById("total-amount").textContent = formatRupiah(total);
    payButton.textContent = `Bayar ${formatRupiah(total)}`;
    payButton.disabled = false;
    payButton.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    document.getElementById("plan-price").textContent = "Rp 0";
    document.getElementById("tax-amount").textContent = "Rp 0";
    document.getElementById("total-amount").textContent = "Rp 0";
    payButton.textContent = courseDetails.has_batches
      ? "Pilih Batch & Paket"
      : "Pilih Paket";
    payButton.disabled = true;
    payButton.classList.add("opacity-50", "cursor-not-allowed");
  }
}

// --- INISIALISASI HALAMAN ---
document.addEventListener("DOMContentLoaded", () => {
  renderCourseDetails();

  if (!courseDetails.has_batches) {
    document.getElementById("batch-selection-container").style.display = "none";
    document.getElementById("summary-batch-row").style.display = "none";
  } else {
    renderBatchOptions();
    const batchOptionsContainer = document.getElementById("batch-options");
    if (batchOptionsContainer) {
      batchOptionsContainer.addEventListener("change", updateOrderSummary);
    }
  }

  renderPricingOptions();
  updateOrderSummary();

  const pricingOptionsContainer = document.getElementById("pricing-options");
  if (pricingOptionsContainer) {
    pricingOptionsContainer.addEventListener("change", updateOrderSummary);
  }

  // Dropdown Profile
  const profileButton = document.getElementById("profile-button");
  const profileDropdown = document.getElementById("profile-dropdown");
  if (profileButton) {
    profileButton.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("hidden");
    });
  }
  window.addEventListener("click", () => {
    if (profileDropdown) profileDropdown.classList.add("hidden");
  });
});

// Tombol Bayar
const payButton = document.getElementById("pay-button");
if (payButton) {
  payButton.addEventListener("click", function () {
    if (this.disabled) return;

    // 1. Kumpulkan data untuk disimpan
    const selectedBatchEl = document.querySelector(
      'input[name="batch"]:checked'
    );
    const selectedPlanEl = document.querySelector(
      'input[name="pricing"]:checked'
    );
    const selectedBatchId = selectedBatchEl
      ? parseInt(selectedBatchEl.value)
      : null;
    const selectedPlanId = selectedPlanEl
      ? parseInt(selectedPlanEl.value)
      : null;
    const selectedBatch = selectedBatchId
      ? courseBatches.find((b) => b.id === selectedBatchId)
      : null;
    const selectedPlan = selectedPlanId
      ? pricingOptions.find((p) => p.id === selectedPlanId)
      : null;

    const tax = Math.round(selectedPlan.price * 0.11);
    const total = selectedPlan.price + tax;

    const transactionDetailsForSuccessPage = {
      transaction_id: "TRX" + Date.now(),
      payment_date: new Date().toISOString(),
      payment_method: "Midtrans",
      subtotal: selectedPlan.price,
      tax: tax,
      total: total,
      course: { name: courseDetails.name },
      plan: { name: selectedPlan.name },
      batch: selectedBatch,
    };

    // 2. Simpan data ke sessionStorage
    sessionStorage.setItem(
      "transactionData",
      JSON.stringify(transactionDetailsForSuccessPage)
    );

    // 3. Langsung arahkan ke halaman sukses (untuk testing UI)
    console.log("Navigasi langsung ke payment_success.html untuk testing.");
    window.location.href = "./payment-success.html";
  });
}
