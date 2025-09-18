    const transactionData = {
            id: 'TRX' + Date.now(),
            payment_date: new Date(),
            payment_method: 'Credit Card', // Ini akan dinamis dari callback Midtrans
            subtotal: 599000,
            tax: 65890,
            total: 664890,
            course: {
                name: 'Belajar Desain UI/UX dari Dasar hingga Mahir'
            },
            plan: {
                name: 'Premium Plan'
            }
        };

        // --- FUNGSI UTILITAS ---
        function formatRupiah(amount) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
        }
        function formatDate(date) {
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        
        // --- FUNGSI UNTUK MENGISI HALAMAN ---
        function populateSuccessData() {
            document.getElementById('transaction-id').textContent = transactionData.id;
            document.getElementById('payment-date').textContent = formatDate(transactionData.payment_date);
            document.getElementById('payment-method').textContent = transactionData.payment_method;
            document.getElementById('subtotal-amount').textContent = formatRupiah(transactionData.subtotal);
            document.getElementById('tax-amount').textContent = formatRupiah(transactionData.tax);
            document.getElementById('total-paid').textContent = formatRupiah(transactionData.total);
        }

        // --- INISIALISASI HALAMAN ---
        document.addEventListener('DOMContentLoaded', () => {
            populateSuccessData();

             // Dropdown Profile
            const profileButton = document.getElementById('profile-button');
            const profileDropdown = document.getElementById('profile-dropdown');
            if (profileButton) {
                profileButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('hidden');
                });
            }
            window.addEventListener('click', () => { 
                if (profileDropdown) profileDropdown.classList.add('hidden');
            });
        });