/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/

// Mobile-specific enhancements
(function() {
    'use strict';

    // Mobile navigation enhancements
    function initMobileNav() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        navbarCollapse.classList.remove('show');
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth < 992 && 
                    !navbarToggler.contains(e.target) && 
                    !navbarCollapse.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                }
            });

            // Handle orientation change
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    if (window.innerWidth >= 992) {
                        navbarCollapse.classList.remove('show');
                    }
                }, 100);
            });
        }
    }

    // Mobile touch enhancements
    function initMobileTouch() {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .nav-link, .project-card');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Prevent zoom on double tap for buttons
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Mobile scroll optimizations
    function initMobileScroll() {
        // Smooth scroll for mobile
        if ('scrollBehavior' in document.documentElement.style) {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Add scroll indicator for mobile
        if (window.innerWidth < 768) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(135deg, #6366f1, #ec4899);
                transform: scaleX(0);
                transform-origin: left;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(scrollIndicator);

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = scrollTop / docHeight;
                scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
            });
        }
    }

    // Mobile performance optimizations
    function initMobilePerformance() {
        // Lazy load images for mobile
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Optimize animations for mobile
        if (window.innerWidth < 768) {
            // Reduce animation complexity on mobile
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .profile:hover,
                    .project-card:hover {
                        transform: none !important;
                    }
                    
                    .btn:hover,
                    .nav-link:hover {
                        transform: none !important;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mobile form enhancements
    function initMobileForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Add loading state to submit buttons
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                form.addEventListener('submit', function() {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                });
            }

            // Auto-resize textareas
            const textareas = form.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            });
        });
    }

    // Mobile viewport height fix
    function initMobileViewport() {
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    // Initialize all mobile enhancements
    function init() {
        initMobileNav();
        initMobileTouch();
        initMobileScroll();
        initMobilePerformance();
        initMobileForms();
        initMobileViewport();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(init, 250);
    });

})();