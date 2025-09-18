const quizId = 1;
        const userId = 123;
        const passingScore = 70;

        const quizData = [
            { id: 101, question: "Apa prinsip utama dalam desain grafis?", options: [{id: 201, text:"Keseimbangan, Kontras, Hierarki, ..."}, {id: 202, text:"Warna, Font, Gambar"}, {id: 203, text:"Ukuran, Bentuk, Tekstur"}], answer_option_id: 201 },
            { id: 102, question: "Fungsi utama pengulangan dalam desain adalah?", options: [{id: 204, text:"Membuat desain lebih ramai"}, {id: 205, text:"Menciptakan kesatuan visual"}, {id: 206, text:"Menambah warna"}], answer_option_id: 205 },
            { id: 103, question: "Apa itu hierarki dalam desain?", options: [{id: 207, text:"Pengelompokan elemen berdasarkan warna"}, {id: 208, text:"Pengaturan elemen berdasarkan tingkat kepentingan"}, {id: 209, text:"Penggunaan font yang berbeda"}], answer_option_id: 208 },
        ];

        let currentQuestionIndex = 0;
        let userAnswers = {};
        let quizStartTime;

        function initializeQuiz() {
            quizStartTime = new Date();
            currentQuestionIndex = 0;
            userAnswers = {};
            document.getElementById('startQuizContainer').classList.add('hidden');
            document.getElementById('quiz-section').classList.remove('hidden');
            renderCurrentQuestion();
        }

        function renderCurrentQuestion() {
            const questionContainer = document.getElementById('quizQuestionContainer');
            const navContainer = document.getElementById('quizNav');
            const quizCount = document.getElementById('quizCount');
            
            questionContainer.className = 'min-h-[15rem]';
            questionContainer.innerHTML = '';
            navContainer.innerHTML = '';
            
            const item = quizData[currentQuestionIndex];
            quizCount.textContent = `Soal ${currentQuestionIndex + 1} dari ${quizData.length}`;
            
            const qDiv = document.createElement('div');
            qDiv.innerHTML = `<label class="block font-medium text-gray-800 mb-4 text-lg">${item.question}</label><div class="space-y-3">${item.options.map(opt => `<label class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400"><input type="radio" name="q_${item.id}" value="${opt.id}" class="mr-4 h-4 w-4 text-blue-600" ${userAnswers[item.id] === opt.id ? 'checked' : ''}><span class="text-gray-700">${opt.text}</span></label>`).join('')}</div>`;
            questionContainer.appendChild(qDiv);

            questionContainer.querySelectorAll(`input[name="q_${item.id}"]`).forEach(radio => {
                radio.addEventListener('change', (e) => userAnswers[item.id] = parseInt(e.target.value));
            });
            
            if (currentQuestionIndex > 0) {
                const prevBtn = document.createElement('button');
                prevBtn.textContent = 'Sebelumnya';
                prevBtn.className = 'bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100';
                prevBtn.onclick = () => { currentQuestionIndex--; renderCurrentQuestion(); };
                navContainer.appendChild(prevBtn);
            } else { navContainer.appendChild(document.createElement('div')); }

            if (currentQuestionIndex < quizData.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Selanjutnya';
                nextBtn.className = 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700';
                nextBtn.onclick = () => { currentQuestionIndex++; renderCurrentQuestion(); };
                navContainer.appendChild(nextBtn);
            } else {
                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Lihat Hasil';
                submitBtn.className = 'bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold';
                submitBtn.onclick = handleQuizSubmit;
                navContainer.appendChild(submitBtn);
            }
        }

        async function handleQuizSubmit() {
            const endTime = new Date();
            let score = 0;
            quizData.forEach(item => { if (userAnswers[item.id] === item.answer_option_id) score++; });
            const finalScore = Math.round((score / quizData.length) * 100);

            const payload = {
                user_id: userId,
                quiz_id: quizId,
                start_time: quizStartTime.toISOString(),
                end_time: endTime.toISOString(),
                score: finalScore,
                passed: finalScore >= passingScore,
                answers: Object.keys(userAnswers).map(questionId => ({
                    question_id: parseInt(questionId),
                    question_option_id: userAnswers[questionId]
                }))
            };

            console.log("Mengirim data ke backend:", payload);

            const questionContainer = document.getElementById('quizQuestionContainer');
            document.getElementById('quizNav').innerHTML = '';
            document.getElementById('quizCount').textContent = "Kuis Selesai!";
            questionContainer.className = 'min-h-[15rem] flex flex-col items-center justify-center';
            questionContainer.innerHTML = `<div class="bg-slate-50 p-6 rounded-lg text-center"><h4 class="text-2xl font-bold text-gray-800">Nilai Anda:</h4><p class="text-5xl font-bold ${payload.passed ? 'text-green-600' : 'text-red-600'} my-3">${finalScore}</p><p class="text-gray-600 mb-6">${payload.passed ? 'Selamat, Anda lulus!' : 'Coba lagi untuk hasil lebih baik.'}</p><button id="restartQuizBtn" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Ulangi Kuis</button></div>`;
            document.getElementById('restartQuizBtn').addEventListener('click', initializeQuiz);
            
            loadQuizHistory();
        }

        async function loadQuizHistory() {
            const historyListContainer = document.getElementById('quizHistoryList');
            historyListContainer.innerHTML = `<p class="text-gray-500 italic">Memuat riwayat...</p>`;
            
            // Simulasi data riwayat
            const dummyHistoryData = [
                { id: 1, score: 80, passed: true, created_at: "2025-09-15T10:30:00Z" },
                { id: 2, score: 66, passed: false, created_at: "2025-09-16T14:00:00Z" }
            ];
            setTimeout(() => renderHistory(dummyHistoryData), 500);
        }
        
        function renderHistory(historyData) {
            const historyListContainer = document.getElementById('quizHistoryList');
            if (historyData.length === 0) {
                 historyListContainer.innerHTML = `<p class="text-gray-500 italic">Belum ada riwayat pengerjaan.</p>`;
                 return;
            }
            historyListContainer.innerHTML = historyData.map(attempt => {
                const date = new Date(attempt.created_at);
                const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const statusClass = attempt.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                const statusText = attempt.passed ? 'Lulus' : 'Gagal';

                return `
                    <div class="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p class="font-bold text-gray-800">Nilai: <span class="text-blue-600">${attempt.score}</span></p>
                            <p class="text-sm text-gray-500">${formattedDate}</p>
                        </div>
                        <div class="flex items-center gap-4">
                           <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${statusText}</span>
                           <button onclick="showHistoryDetail(${attempt.id})" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md">Lihat Detail</button>
                        </div>
                    </div>`;
            }).join('');
        }

        async function showHistoryDetail(attemptId) {
            console.log(`Fetching details for attempt ID: ${attemptId}`);
            const modal = document.getElementById('historyDetailModal');
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `<p class="text-gray-500 italic">Memuat detail...</p>`;
            modal.classList.remove('hidden');
            const dummyDetailedData = {
                attempt_id: 1,
                answers: [
                    { question_id: 101, question_text: "Apa prinsip utama dalam desain grafis?", selected_option_id: 201, correct_option_id: 201 },
                    { question_id: 102, question_text: "Fungsi utama pengulangan dalam desain adalah?", selected_option_id: 204, correct_option_id: 205 },
                    { question_id: 103, question_text: "Apa itu hierarki dalam desain?", selected_option_id: 208, correct_option_id: 208 },
                ]
            };

            setTimeout(() => {
                modalContent.innerHTML = dummyDetailedData.answers.map((ans, index) => {
                    const question = quizData.find(q => q.id === ans.question_id);
                    return `
                        <div class="mb-6 pb-6 border-b last:border-b-0">
                            <p class="font-semibold text-gray-800 mb-3">${index + 1}. ${ans.question_text}</p>
                            <div class="space-y-2">
                                ${question.options.map(opt => {
                                    let indicatorClass = 'border-gray-200';
                                    if (opt.id === ans.selected_option_id && opt.id === ans.correct_option_id) {
                                        indicatorClass = 'border-green-500 bg-green-50'; // Jawaban benar
                                    } else if (opt.id === ans.selected_option_id && opt.id !== ans.correct_option_id) {
                                        indicatorClass = 'border-red-500 bg-red-50'; // Jawaban salah
                                    } else if (opt.id === ans.correct_option_id) {
                                        indicatorClass = 'border-green-500 bg-green-50'; // Jawaban benar (jika pilihan salah)
                                    }
                                    return `<div class="p-3 rounded-lg border ${indicatorClass}">${opt.text}</div>`;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('');
            }, 500);
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Dropdown logic
            const categoryButton = document.getElementById('category-button');
            if (categoryButton) { categoryButton.addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('category-dropdown').classList.toggle('hidden'); }); }
            const profileButton = document.getElementById('profile-button');
            if (profileButton) { profileButton.addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('profile-dropdown').classList.toggle('hidden'); }); }
            window.addEventListener('click', () => { 
                document.getElementById('category-dropdown')?.classList.add('hidden');
                document.getElementById('profile-dropdown')?.classList.add('hidden');
            });

            // Quiz & Modal logic
            document.getElementById('startQuizBtn').addEventListener('click', initializeQuiz);
            document.getElementById('closeModalBtn').addEventListener('click', () => document.getElementById('historyDetailModal').classList.add('hidden'));
            document.getElementById('historyDetailModal').addEventListener('click', (e) => {
                if(e.target.id === 'historyDetailModal') document.getElementById('historyDetailModal').classList.add('hidden');
            });
            loadQuizHistory();

            // Footer Visibility Logic
            const mainContent = document.getElementById('main-content');
            const footer = document.getElementById('page-footer');

            const checkFooterVisibility = () => {
                if (!mainContent || !footer) return;
                const scrollBuffer = 15;
                const isAtBottom = mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - scrollBuffer;
                const isScrollable = mainContent.scrollHeight > mainContent.clientHeight;
                
                if (isScrollable) {
                     if (isAtBottom) {
                        footer.classList.remove('opacity-0', 'invisible');
                        footer.classList.add('opacity-100', 'visible');
                    } else {
                        footer.classList.add('opacity-0', 'invisible');
                        footer.classList.remove('opacity-100', 'visible');
                    }
                } else {
                    // Jika konten tidak bisa di-scroll, langsung tampilkan footer
                    footer.classList.remove('opacity-0', 'invisible');
                    footer.classList.add('opacity-100', 'visible');
                }
            };
            
            if (mainContent) {
                mainContent.addEventListener('scroll', checkFooterVisibility);
                // Cek juga saat ukuran window berubah
                new ResizeObserver(checkFooterVisibility).observe(mainContent);
                // Cek saat pertama kali load
                checkFooterVisibility();
            }
        });