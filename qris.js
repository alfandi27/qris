function closeModalFunction() {
        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            qrModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
 closeModal.addEventListener('click', closeModalFunction);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Countdown function
    function startCountdown(expiredDate) {
        const countDownDate = new Date(expiredDate).getTime();        
        const x = setInterval(function() {
            const d = new Date();
            const log = d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
            const now = new Date(log).getTime();
            const distance = countDownDate - now;
                
            if (distance < 0) {
                clearInterval(x);
                handleExpired();
                return;
            }
            
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const timerElement = document.getElementById("exp");
            
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            // Add urgency effect when time is running out
            if (minutes === 0 && seconds <= 30) {
                timerElement.parentElement.classList.add('danger');
            }
        }, 1000);
    }

    // Handle expired payment
    function handleExpired() {
        isExpired = true;
        const expiredOverlay = document.getElementById('expiredOverlay');
        const statusBadge = document.getElementById('statusBadge');
        
        expiredOverlay.style.display = 'flex';
        
        statusBadge.textContent = "Kadaluarsa";
        statusBadge.classList.add('danger');
    }

    // Show success animation
    function showSuccess() {
        const successOverlay = document.getElementById('successOverlay');
        const statusBadge = document.getElementById('statusBadge');
        
        successOverlay.style.display = 'flex';
        
        statusBadge.textContent = "Pembayaran Berhasil";
        statusBadge.classList.add('success');
    }

    // Show success animation with SweetAlert
    function showSuccessAnimation() {
        Swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil!',
            text: 'Terima kasih atas pembayaran Anda',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

// Format currency
    function formatCurrency(element) {
        const value = element.textContent;
        const formattedValue = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
        
        element.textContent = formattedValue;
    }

    // Convert CRC16
    function convertCRC16(str) {
        let crc = 0xFFFF;
        const strlen = str.length;

        for (let c = 0; c < strlen; c++) {
            crc ^= str.charCodeAt(c) << 8;
            for (let i = 0; i < 8; i++) {
                if (crc & 0x8000) {
                    crc = (crc << 1) ^ 0x1021;
                } else {
                    crc = crc << 1;
                }
            }
        }
        let hex = crc & 0xFFFF;
        hex = ("000" + hex.toString(16).toUpperCase()).slice(-4);
        return hex;
    }
