// ==============================
// SAFE DONATION HANDLER
// ==============================
const donationForm = document.getElementById('donationForm');
if (donationForm) {
  donationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const amount = document.getElementById('donationAmount').value * 100;

    const handler = PaystackPop.setup({
      key: 'pk_test_144b15e8615f9c388772721de3eecf32596131b0',
      email,
      amount,
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [{ display_name: "Full Name", variable_name: "full_name", value: name }]
      },
      callback: function(response) {
        alert('Donation successful! Reference: ' + response.reference);
        donationForm.reset();
      },
      onClose: function() {
        alert('Donation window closed.');
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
    showAccountBtn.textContent = bankDetails.classList.contains('show') ? 'Hide Account Details' : 'View Account Details';
  });
}

// ==============================
// OFFLINE FORM SUBMISSION
// ==============================
const offlineForm = document.getElementById('offlineForm');
if (offlineForm) {
  offlineForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('offlineName').value;
    const email = document.getElementById('offlineEmail').value;
    const amount = document.getElementById('offlineAmount').value;
    const message = document.getElementById('offlineMessage').value;

    if (name && email && amount) {
      alert(`Thank you, ${name}! Your offline donation of ₦${amount} has been noted.\nMessage/Reference: ${message}`);
      offlineForm.reset();
      if(bankDetails) bankDetails.classList.remove('show');
      if(showAccountBtn) showAccountBtn.textContent = 'View Account Details';
    }
  });
}

// ==============================
// BACK TO TOP BUTTON
// ==============================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) backToTopBtn.style.display = 'block';
    else backToTopBtn.style.display = 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// ==============================
// COUNTER ANIMATION - WHY DONATE
// ==============================
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;

  const updateCount = () => {
    const increment = Math.ceil(target / 200); // speed factor
    count += increment;
    if(count > target) count = target;
    counter.innerText = count.toLocaleString();
    if(count < target) requestAnimationFrame(updateCount);
  }

  // Animate only when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});
