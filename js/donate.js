// === DONATE.JS ===
document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTS ---
  const paystackBtn = document.getElementById("paystackBtn");
  const donorName = document.getElementById("donorName");
  const donorEmail = document.getElementById("donorEmail");
  const donationAmount = document.getElementById("donationAmount");

  const bankBtn = document.getElementById("bankBtn");
  const bankDetails = document.getElementById("bankDetails");
  const offlineForm = document.getElementById("offlineForm");

  const backToTop = document.getElementById("backToTop");

  // --- INITIAL STATE ---
  bankDetails.classList.remove("show");
  offlineForm.classList.remove("active");

  // --- PAYSTACK DONATION ---
  paystackBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!donorName.value || !donorEmail.value || !donationAmount.value) {
      alert("Please fill all required fields.");
      return;
    }

    const handler = PaystackPop.setup({
      key: "pk_test_144b15e8615f9c388772721de3eecf32596131b0", // Replace with your key
      email: donorEmail.value,
      amount: donationAmount.value * 100, // Naira to Kobo
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donorName.value
          }
        ]
      },
      callback: function (response) {
        alert("Payment successful! Reference: " + response.reference);
        document.getElementById("donationForm").reset();
      },
      onClose: function () {
        alert("Payment window closed.");
      }
    });

    handler.openIframe();
  });

  // --- OFFLINE DONATION TOGGLE ---
  bankBtn.addEventListener("click", () => {
    bankDetails.classList.toggle("show");
    offlineForm.classList.remove("active");
  });

  bankDetails.addEventListener("click", () => {
    offlineForm.classList.toggle("active");
  });

  // --- BACK TO TOP BUTTON ---
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
