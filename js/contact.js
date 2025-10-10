document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Here you can integrate your backend or email API
    // For now, we'll simulate success:
    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    // Reset form
    contactForm.reset();
  });
});
