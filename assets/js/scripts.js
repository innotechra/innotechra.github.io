// TechWiser X JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const targetElement = document.getElementById(target);

                el.classList.toggle('is-active');
                targetElement.classList.toggle('is-active');
            });
        });
    }

    // Countdown Timer for UK Region Page
    const countdownDate = new Date('June 18, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
        if (minutesElement) minutesElement.textContent = minutes;
        if (secondsElement) secondsElement.textContent = seconds;
    }

    // Update countdown every second if countdown elements exist
    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Duplicate sponsor logos for infinite scroll effect
    const sponsorTrack = document.querySelector('.sponsor-track');
    if (sponsorTrack) {
        const sponsorItems = sponsorTrack.innerHTML;
        sponsorTrack.innerHTML += sponsorItems;
    }

    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation
    document.querySelectorAll('.box, .card, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation highlighting
    const currentLocation = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentLocation) && currentLocation !== '') {
            link.classList.add('is-active');
        }
    });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-danger');
                } else {
                    input.classList.remove('is-danger');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Console welcome message
    console.log('%c Welcome to TechWiser X 2026! ', 'background: #00d1b2; color: white; font-size: 16px; padding: 10px;');
});

// Handle external link tracking (optional)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        // Add analytics or tracking code here if needed
        console.log('External link clicked:', e.target.href);
    }
});

// Add loading state to buttons on click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('button') && !e.target.classList.contains('navbar-burger')) {
        const originalText = e.target.textContent;
        e.target.classList.add('is-loading');
        
        setTimeout(() => {
            e.target.classList.remove('is-loading');
        }, 500);
    }
});
