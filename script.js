document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // 1. Scroll-based Navbar Class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 2. Active Link Highlighting on Scroll
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 3. Hamburger Menu Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
        
        // Close menu when a link is clicked (on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // 4. Contact/Feedback Form Tabs Toggling
    const tabBtns = document.querySelectorAll('.form-tab-btn');
    const formPanes = document.querySelectorAll('.form-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            formPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetPane = document.getElementById(`${targetTab}-pane`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // 5. Star Rating System
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('feedback-rating');
    
    starBtns.forEach(star => {
        star.addEventListener('click', (e) => {
            e.preventDefault();
            const ratingValue = star.getAttribute('data-value');
            if (ratingInput) {
                ratingInput.value = ratingValue;
            }
            
            // Highlight stars up to clicked one
            starBtns.forEach(s => {
                const sValue = s.getAttribute('data-value');
                if (parseInt(sValue) <= parseInt(ratingValue)) {
                    s.style.color = '#eab308'; // filled star yellow
                } else {
                    s.style.color = '#e2e8f0'; // empty star light grey
                }
            });
        });
        
        // Add basic hover styling helpers
        star.addEventListener('mouseenter', () => {
            const ratingValue = star.getAttribute('data-value');
            starBtns.forEach(s => {
                const sValue = s.getAttribute('data-value');
                if (parseInt(sValue) <= parseInt(ratingValue)) {
                    s.style.borderColor = '#eab308';
                }
            });
        });
    });
    
    // 6. Form Submission Handlers (Demo Simulation)
    const contactForm = document.getElementById('contact-form-el');
    const feedbackForm = document.getElementById('feedback-form-el');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertBox = document.getElementById('contact-alert');
            
            // Show sending status
            const btn = contactForm.querySelector('button[type="submit"]');
            const origText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = origText;
                
                alertBox.className = 'form-alert success';
                alertBox.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We will get back to you shortly.';
                contactForm.reset();
                
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertBox = document.getElementById('feedback-alert');
            
            // Show submitting status
            const btn = feedbackForm.querySelector('button[type="submit"]');
            const origText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = origText;
                
                alertBox.className = 'form-alert success';
                alertBox.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your valuable feedback! We appreciate your support.';
                feedbackForm.reset();
                
                // Reset stars
                starBtns.forEach(s => {
                    s.style.color = '#e2e8f0';
                });
                if (ratingInput) ratingInput.value = '5';
                
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }
});
