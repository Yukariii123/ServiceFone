// ==========================================
// NOMBOR WHATSAPP KEDAI ABE LOH
// Masukkan nombor telefon tanpa tanda '+' atau '-'
// ==========================================
const WHATSAPP_NUMBER = "60199394002"; 

// ==========================================
// TOAST NOTIFICATION (iOS STYLE PUSH)
// ==========================================
function showToast(message) {
    const toastBox = document.getElementById('toast-box');
    if (!toastBox) return; 
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #000; font-size: 16px;"></i> ${message}`;
    
    toastBox.appendChild(toast);
    
    // Auto buang lepas 3.5 saat
    setTimeout(() => { toast.remove(); }, 3500);
}

// ==========================================
// HANTAR BORANG KE WHATSAPP (FIXED)
// ==========================================
function sendToWhatsApp() {
    const deviceType = document.getElementById('deviceType').value;
    const serviceType = document.getElementById('serviceType').value;
    const modelName = document.getElementById('modelName').value;

    if (deviceType === "" || serviceType === "" || modelName.trim() === "") {
        showToast("Sila isi semua maklumat peranti!");
        return;
    }

    // Format WhatsApp yang Kemas & Profesional
    let message = "🛠️ *ABE LOH FIX - SEBUT HARGA*\n";
    message += "---------------------------------\n";
    message += `📱 *Peranti:* ${deviceType}\n`;
    message += `🏷️ *Model:* ${modelName}\n`;
    message += `⚠️ *Masalah:* ${serviceType}\n`;
    message += "---------------------------------\n\n";
    message += "Hi Abe Loh, boleh saya tahu anggaran harga untuk pembaikan masalah di atas?";

    // Encode URL supaya 'enter' dan simbol tak rosak
    const encodedMessage = encodeURIComponent(message);
    
    // PENTING: Kod ini akan bersihkan nombor dari sebarang 'space' tersembunyi
    const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    
    showToast("Membuka WhatsApp...");
    setTimeout(() => {
        // Guna api.whatsapp.com yang lebih stabil berbanding wa.me
        window.open(`https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`, '_blank');
    }, 600);
}

// ==========================================
// ANIMASI SKROL (ULTRA-SMOOTH STAGGER)
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Khas Untuk Kotak Bento
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Khas Untuk Senarai Servis Kapsul
    const servicePills = document.querySelectorAll('.service-pill');
    servicePills.forEach((pill, index) => {
        pill.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(pill);
    });

    // Perhatikan elemen lain
    const otherElements = document.querySelectorAll('.reveal:not(.bento-card):not(.service-pill)');
    otherElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// RUN BILA WEB LOAD
// ==========================================
window.onload = function() {
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
};