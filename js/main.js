document.addEventListener("DOMContentLoaded", () => {
    // ==============================
    // SAFE DONATION HANDLER (PAYSTACK)
    // ==============================
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ensure PaystackPop is loaded before calling setup
            if (typeof PaystackPop === 'undefined') {
                alert('Payment gateway failed to load. Please try refreshing the page.');
                return;
            }

            const name = document.getElementById('donorName').value;
            const email = document.getElementById('donorEmail').value;
            // Use parseFloat for potential non-integer amounts, multiply by 100 for kobo/cents
            const amount = parseFloat(document.getElementById('donationAmount').value) * 100;

            const handler = PaystackPop.setup({
                // IMPORTANT: Replace with your actual LIVE public key when deploying
                key: 'pk_test_144b15e8615f9c388772721de3eecf32596131b0', 
                email,
                amount,
                currency: 'NGN',
                ref: 'EJPEEF_' + Math.floor(Math.random() * 1000000000 + 1), // Better unique reference
                metadata: {
                    custom_fields: [{ display_name: "Full Name", variable_name: "full_name", value: name }]
                },
                callback: function(response) {
                    alert('Donation successful! Reference: ' + response.reference);
                    // You would typically send the response.reference to your server here 
                    // to verify the payment status for security.
                    donationForm.reset();
                },
                onClose: function() {
                    console.log('Donation window closed by user.');
                }
            });
            handler.openIframe();
        });
    }

    // ==============================
    // OFFLINE DONATION TOGGLE
    // ==============================
    const showAccountBtn = document.getElementById('showAccountBtn');
    const bankDetails = document.getElementById('bankDetails');
    if (showAccountBtn && bankDetails) {
        showAccountBtn.addEventListener('click', () => {
            bankDetails.classList.toggle('show');
            showAccountBtn.textContent = bankDetails.classList.contains('show') 
                ? 'Hide Account Details' 
                : 'View Account Details';
        });
    }

    // ==============================
    // OFFLINE FORM SUBMISSION
    // ==============================
    const offlineForm = document.getElementById('offlineForm');
    if (offlineForm) {
        offlineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('offlineName').value.trim();
            const email = document.getElementById('offlineEmail').value.trim();
            const amount = document.getElementById('offlineAmount').value.trim();
            const message = document.getElementById('offlineMessage').value.trim();

            if (name && email && amount) {
                // IMPORTANT: In a real application, you would send this data to your server/CRM 
                // via fetch() or XMLHttpRequest instead of just an alert.
                alert(`Thank you, ${name}! Your offline donation of ₦${amount} has been noted. We will check our bank records for your transfer.\nMessage/Reference: ${message}`);
                offlineForm.reset();
                if(bankDetails) bankDetails.classList.remove('show');
                if(showAccountBtn) showAccountBtn.textContent = 'View Account Details';
            } else {
                alert('Please fill in your Name, Email, and Amount for your offline donation.');
            }
        });
    }

    // ==============================
    // BACK TO TOP BUTTON
    // ==============================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        // You can remove the default style setting here if CSS handles the initial state
        // backToTopBtn.style.display = 'none'; 

        const toggleVisibility = () => {
            // Use class manipulation for CSS transitions
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        // Call once to set initial state if page is loaded scrolled
        toggleVisibility(); 

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==============================
    // COUNTER ANIMATION - WHY DONATE
    // IMPROVED: Simplified updateCount function
    // ==============================
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        const duration = 1500; // 1.5 seconds
        const start = performance.now();

        const step = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * target);
            
            counter.innerText = currentCount.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        requestAnimationFrame(step);
    };

    counters.forEach(counter => {
        // Set initial value to 0 to ensure it's visible before animation
        counter.innerText = '0'; 

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });

    // ==============================
    // MOBILE HAMBURGER MENU TOGGLE
    // ==============================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open'); // animate hamburger into X
        });
    }

    // ==============================
    // COOKIE CONSENT HANDLER
    // IMPROVED: Consolidated checks
    // ==============================
    const cookieBanner = document.querySelector(".cookie-banner");
    
    if (cookieBanner) {
        const acceptBtn = cookieBanner.querySelector("button");

        // Only show if the banner exists AND cookies haven't been accepted
        if (localStorage.getItem("cookiesAccepted") !== "true") {
            cookieBanner.classList.add('visible'); // Use class for showing/hiding
        }

        if (acceptBtn) {
            acceptBtn.addEventListener("click", () => {
                cookieBanner.classList.remove('visible');
                localStorage.setItem("cookiesAccepted", "true");
            });
        }
    }
});