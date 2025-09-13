    // Data soal
        const quizData = [
            {
                id: 1,
                question: "Apa prinsip utama dalam desain grafis?",
                options: [
                    "Keseimbangan, Kontras, Hierarki, Pengulangan, Kedekatan",
                    "Warna, Font, Gambar",
                    "Ukuran, Bentuk, Tekstur"
                ],
                answer: 0
            },
            {
                id: 2,
                question: "Fungsi utama pengulangan dalam desain adalah?",
                options: [
                    "Membuat desain lebih ramai",
                    "Menciptakan kesatuan visual",
                    "Menambah warna"
                ],
                answer: 1
            },
            {
                id: 3,
                question: "Apa yang dimaksud dengan hierarki dalam desain grafis?",
                options: [
                    "Pengelompokan elemen berdasarkan warna",
                    "Pengaturan elemen berdasarkan tingkat kepentingan",
                    "Penggunaan font yang berbeda"
                ],
                answer: 1
            },
            {
                id: 4,
                question: "Prinsip kontras digunakan untuk?",
                options: [
                    "Menonjolkan elemen penting",
                    "Menyamakan semua elemen",
                    "Menghilangkan warna"
                ],
                answer: 0
            },
            {
                id: 5,
                question: "Kedekatan dalam desain bertujuan untuk?",
                options: [
                    "Mengelompokkan elemen yang saling terkait",
                    "Memisahkan semua elemen",
                    "Menambah efek visual"
                ],
                answer: 0
            }
        ];

        // State Kuis
        let currentQuestionIndex = 0;
        let userAnswers = [];

        // Fungsi untuk memulai atau mengulang kuis
        function initializeQuiz() {
            currentQuestionIndex = 0;
            userAnswers = new Array(quizData.length).fill(null);
            renderCurrentQuestion();
        }

        // Fungsi untuk merender pertanyaan saat ini
        function renderCurrentQuestion() {
            const questionContainer = document.getElementById('quizQuestionContainer');
            const navContainer = document.getElementById('quizNav');
            const quizCount = document.getElementById('quizCount');
            const quizScore = document.getElementById('quizScore');

            // Reset styles for the question container
            questionContainer.className = 'min-h-[15rem]';

            // Bersihkan konten sebelumnya
            questionContainer.innerHTML = '';
            navContainer.innerHTML = '';
            quizScore.innerHTML = ''; 

            const item = quizData[currentQuestionIndex];
            quizCount.textContent = `Soal ${currentQuestionIndex + 1} dari ${quizData.length}`;

            // Buat elemen pertanyaan
            const qDiv = document.createElement('div');
            qDiv.innerHTML = `
                <label class="block font-medium text-gray-800 mb-4 text-lg">${item.question}</label>
                <div class="space-y-3">
                    ${item.options.map((opt, i) => `
                        <label class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors duration-200 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400">
                            <input type="radio" name="q_option" value="${i}" class="mr-4 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" ${userAnswers[currentQuestionIndex] === i ? 'checked' : ''}>
                            <span class="text-gray-700">${opt}</span>
                        </label>
                    `).join('')}
                </div>
            `;
            questionContainer.appendChild(qDiv);

            // Simpan jawaban pengguna saat mereka memilih
            const radioButtons = questionContainer.querySelectorAll('input[name="q_option"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    userAnswers[currentQuestionIndex] = parseInt(e.target.value);
                });
            });
            
            // Render tombol navigasi
            // Tombol "Sebelumnya"
            if (currentQuestionIndex > 0) {
                const prevBtn = document.createElement('button');
                prevBtn.type = 'button';
                prevBtn.className = 'bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all';
                prevBtn.textContent = 'Sebelumnya';
                prevBtn.onclick = () => {
                    currentQuestionIndex--;
                    renderCurrentQuestion();
                };
                navContainer.appendChild(prevBtn);
            } else {
                 // Placeholder untuk menjaga tombol selanjutnya di kanan
                navContainer.appendChild(document.createElement('div'));
            }

            // Tombol "Selanjutnya" atau "Submit"
            if (currentQuestionIndex < quizData.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.type = 'button';
                nextBtn.className = 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all';
                nextBtn.textContent = 'Selanjutnya';
                nextBtn.onclick = () => {
                    currentQuestionIndex++;
                    renderCurrentQuestion();
                };
                navContainer.appendChild(nextBtn);
            } else {
                const submitBtn = document.createElement('button');
                submitBtn.type = 'button';
                submitBtn.className = 'bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all';
                submitBtn.textContent = 'Lihat Hasil';
                submitBtn.onclick = handleQuizSubmit;
                navContainer.appendChild(submitBtn);
            }
        }

        // Fungsi untuk menghitung dan menampilkan hasil
        function handleQuizSubmit() {
            let score = 0;
            quizData.forEach((item, index) => {
                if (userAnswers[index] === item.answer) {
                    score++;
                }
            });

            const questionContainer = document.getElementById('quizQuestionContainer');
            const navContainer = document.getElementById('quizNav');
            const quizScore = document.getElementById('quizScore');
            const quizCount = document.getElementById('quizCount');
            
            quizCount.textContent = "Kuis Selesai!";
            navContainer.innerHTML = '';
            quizScore.innerHTML = ''; 

            // Tambahkan class untuk centering dan masukkan hasil ke dalam questionContainer
            questionContainer.className = 'min-h-[15rem] flex flex-col items-center justify-center';
            questionContainer.innerHTML = `
                <div class="bg-slate-50 p-6 rounded-lg text-center">
                     <h4 class="text-2xl font-bold text-gray-800">Nilai Anda:</h4>
                     <p class="text-5xl font-bold text-blue-600 my-3">${score} / ${quizData.length}</p>
                     <p class="text-gray-600 mb-6">${score >= (quizData.length / 2) ? 'Kerja bagus! Pemahaman Anda sudah baik.' : 'Terus belajar dan jangan ragu untuk mengulang materi.'}</p>
                     <button id="restartQuizBtn" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                        Ulangi Kuis
                     </button>
                </div>
            `;

            document.getElementById('restartQuizBtn').addEventListener('click', initializeQuiz);
        }

        document.addEventListener('DOMContentLoaded', () => {
            // --- LOGIKA UNTUK DROPDOWN ---
            const categoryButton = document.getElementById('category-button');
            const categoryDropdown = document.getElementById('category-dropdown');
            const categoryContainer = document.getElementById('category-container');
            if (categoryButton) {
                categoryButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    categoryDropdown.classList.toggle('hidden');
                });
            }

            const profileButton = document.getElementById('profile-button');
            const profileDropdown = document.getElementById('profile-dropdown');
            const profileContainer = document.getElementById('profile-container');
            if (profileButton) {
                profileButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    profileDropdown.classList.toggle('hidden');
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

            // --- LOGIKA UNTUK MEMULAI KUIS ---
            const startQuizBtn = document.getElementById('startQuizBtn');
            const quizSection = document.getElementById('quiz-section');
            const startQuizContainer = document.getElementById('startQuizContainer');

            if (startQuizBtn) {
                startQuizBtn.addEventListener('click', () => {
                    startQuizContainer.classList.add('hidden');
                    quizSection.classList.remove('hidden');
                    initializeQuiz();
                });
            }
        });