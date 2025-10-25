
        document.addEventListener('DOMContentLoaded', function () {
            const header = document.getElementById('header');
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');
            
            // Header scroll effect
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });

            // Hamburger Menu
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Modal Logic
            const modal = document.getElementById('guidelines-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body').querySelector('ul');
            const closeModalBtn = document.getElementById('close-modal-btn');

            document.querySelectorAll('.guidelines-button').forEach(button => {
                button.addEventListener('click', () => {
                    modalTitle.textContent = button.dataset.modalTitle;
                    const guidelines = button.dataset.modalContent.split('|');
                    modalBody.innerHTML = '';
                    guidelines.forEach(guideline => {
                        const li = document.createElement('li');
                        li.textContent = guideline;
                        modalBody.appendChild(li);
                    });
                    modal.classList.add('show');
                });
            });

            function closeModal() {
                modal.classList.remove('show');
            }
            closeModalBtn.addEventListener('click', closeModal);
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    closeModal();
                }
            });

            // Event Tab Logic
            const tabs = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    // Add active class to the clicked tab and its content
                    tab.classList.add('active');
                    const tabId = tab.dataset.tab;
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Banner Carousel Logic
            const slides = document.querySelectorAll('.slide');
            const nextBtn = document.querySelector('.next');
            const prevBtn = document.querySelector('.prev');
            const dotsContainer = document.querySelector('.carousel-dots');
            let currentSlide = 0;
            let slideInterval;

            function createDots() {
                if (!dotsContainer) return;
                slides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(i);
                    });
                    dotsContainer.appendChild(dot);
                });
            }

            function updateDots(index) {
                const dots = document.querySelectorAll('.dot');
                if (dots.length === 0) return;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }

            function goToSlide(slideIndex) {
                if (!slides.length) return;
                slides[currentSlide].classList.remove('active');
                currentSlide = (slideIndex + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
                updateDots(currentSlide);
                resetInterval();
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    goToSlide(currentSlide + 1);
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    goToSlide(currentSlide - 1);
                });
            }


            function startInterval() {
                slideInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 8000); // Change slide every 8 seconds
            }

            function resetInterval() {
                clearInterval(slideInterval);
                startInterval();
            }

            if (slides.length > 0) {
                createDots();
                // goToSlide(0); // This is handled by the 'active' class in HTML
                startInterval();

                const carousel = document.querySelector('.banner-carousel');
                carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
                carousel.addEventListener('mouseleave', startInterval);
            }

            // Scroll Reveal Animation
            const sections = document.querySelectorAll('.section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.01 });
            sections.forEach(section => observer.observe(section));

            // Scroll to Top Button
            const scrollToTopBtn = document.getElementById("scrollToTopBtn");
            window.onscroll = function () { scrollFunction() };
            function scrollFunction() {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    scrollToTopBtn.style.display = "block";
                } else {
                    scrollToTopBtn.style.display = "none";
                }
            }
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

        });
    
