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
        if (modal) { // Check if modal exists
            modal.classList.remove('show');
        }
    }
    if (closeModalBtn) { // Check if close button exists
        closeModalBtn.addEventListener('click', closeModal);
    }
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
            const activeTabContent = document.getElementById(tabId);
            if(activeTabContent) { // Check if content exists
                 activeTabContent.classList.add('active');
            }
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
        dotsContainer.innerHTML = ''; // Clear existing dots first
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active'); // Use currentSlide
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
        if (dots[index]) { // Check if dot exists
            dots[index].classList.add('active');
        }
    }

    function goToSlide(slideIndex) {
        if (!slides.length || slides.length === 0) return; // Added check for empty slides
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
        // Clear existing interval before starting a new one
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 8000); // Change slide every 8 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    if (slides.length > 0) {
        createDots(); // Create dots initially
        // goToSlide(0); // This is handled by the 'active' class in HTML
        startInterval();

        const carousel = document.querySelector('.banner-carousel');
        if (carousel) { // Check if carousel exists
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startInterval);
        }
    }

    // Scroll Reveal Animation (Optional - keeping it simple for now)
    // const sections = document.querySelectorAll('.section');
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('visible');
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // }, { threshold: 0.1 }); // Adjusted threshold
    // sections.forEach(section => observer.observe(section));


    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if(scrollToTopBtn) { // Check if button exists
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
    }

    // ===== START: COUNTDOWN TIMER LOGIC =====
    function startCountdown() {
        const countDownDate = new Date("Dec 1, 2025 00:00:00").getTime();
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
             console.error("Countdown elements not found!");
             return; // Exit if elements are missing
        }

        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in elements
            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.getElementById("countdown-timer").innerHTML = "<div class='event-live'>Event is LIVE!</div>"; // Or some other message
            }
        }, 1000);
    }
    startCountdown(); // Start the countdown on page load
    // ===== END: COUNTDOWN TIMER LOGIC =====

});
