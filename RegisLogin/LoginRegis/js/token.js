
        const form = document.getElementById('token-form');
        const tokenInput = document.getElementById('token-input');
        const messageDiv = document.getElementById('message');
        const submitButton = document.getElementById('submit-button');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = tokenInput.value;

            // Tampilkan pesan loading
            messageDiv.textContent = 'Verifikasi token...';
            messageDiv.className = 'visible';
            submitButton.disabled = true;

            // Simulasikan verifikasi token
            setTimeout(() => {
                // Contoh token yang valid
                if (token === '123456') {
                    messageDiv.textContent = 'Token berhasil diverifikasi! Anda sekarang dapat mengatur ulang kata sandi Anda.';
                    messageDiv.className = 'visible success';
                    // Di sini Anda akan mengarahkan pengguna ke halaman ganti kata sandi
                } else {
                    messageDiv.textContent = 'Token tidak valid. Silakan coba lagi.';
                    messageDiv.className = 'visible error';
                }
                submitButton.disabled = false;
            }, 2000); // Penundaan 2 detik untuk simulasi
        });