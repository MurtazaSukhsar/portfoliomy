document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.project-card, .service-card, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Gallery Logic ---
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-img');
    const nextBtn = document.getElementById('next-img');
    const currentIdxText = document.getElementById('current-idx');
    const totalIdxText = document.getElementById('total-idx');

    let currentImages = [];
    let currentIndex = 0;

    function openGallery(images) {
        currentImages = images;
        currentIndex = 0;
        updateGallery();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Disable scroll
    }

    function updateGallery() {
        modalImg.src = currentImages[currentIndex];
        currentIdxText.textContent = currentIndex + 1;
        totalIdxText.textContent = currentImages.length;
        
        // Hide nav buttons if only one image
        if (currentImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    // Event listeners for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const imagesData = card.getAttribute('data-images');
        if (imagesData) {
            const images = JSON.parse(imagesData);
            card.querySelector('.project-image').addEventListener('click', () => {
                openGallery(images);
            });
        }
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateGallery();
    };

    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateGallery();
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') closeBtn.click();
        }
    });
});
