/** 
 * Antigravitasiya effekti o'rniga dinamik interaktivlik.
 * Bu yerda hozirda maxsus JS kodi talab qilinmaydi, 
 * chunki interaktivlik CSS (hover, transitions) orqali hal qilingan.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Lucide ikonlarini yuklash (garchi HTML da bo'lsa ham zaxira)
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const profileContainer = document.getElementById('profile-container');
    const imageUpload = document.getElementById('image-upload');
    const profileImg = document.getElementById('profile-img');

    // 1. Agar oldin rasm yuklangan bo'lsa, shuni ko'rsatish
    const savedImage = localStorage.getItem('profile_image');
    if (savedImage) {
        profileImg.src = savedImage;
    }

    // 2. Rasm ustiga bosilganda fayl tanlagichni yashirincha ochish
    if(profileContainer && imageUpload) {
        profileContainer.addEventListener('click', () => {
            imageUpload.click();
        });

        // 3. Foydalanuvchi fayl tanlaganda
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    // Saytdagi rasmni almashtirish
                    profileImg.src = base64Image;
                    // Browser xotirasida (LocalStorage) saqlab qolish
                    localStorage.setItem('profile_image', base64Image);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Aceternity Spotlight Hover Effekt
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
