// ===== DOM References (grab once at start) =====
const header = document.querySelector("header");
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const body = document.body;

// Admin/Login/Message elements
const adminLoginForm = document.querySelector("#admin-login-form");
const adminSection = document.querySelector("#admin-section");
const contactForm = document.querySelector("#contact-form");
const userMessagesContainer = document.querySelector("#user-messages");
const themeToggleBtn = document.querySelector("#theme-toggle");

// ===== Sticky Header =====
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 120);
});

// ===== Menu Toggle =====
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("active");
};

// Reset menu on scroll
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("active");
};

// ===== Theme Toggle =====
themeToggleBtn.onclick = () => {
  body.classList.toggle("dark-theme");
};

// ===== Show Admin Login =====
function showAdminLogin() {
  adminLoginForm.style.display = "block";
  adminSection.style.display = "none";
}

// ===== Admin Authentication =====
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = this.querySelector("#admin-username").value;
    const password = this.querySelector("#admin-password").value;

    // Hard-coded credentials
    if (username === "admin" && password === "1234") {
      alert("Login Successful!");
      adminLoginForm.style.display = "none";
      adminSection.style.display = "block";
      displayUserMessages();
    } else {
      alert("Invalid Credentials!");
    }
  });
}

// ===== Contact Form Storage =====
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector("#name").value;
    const email = this.querySelector("#email").value;
    const message = this.querySelector("#message").value;

    // Build user message object
    const userMessage = {
      name,
      email,
      message,
      date: new Date().toLocaleString(),
    };

    // Get existing messages from localStorage
    let messages = JSON.parse(localStorage.getItem("tempDB")) || [];
    messages.push(userMessage);

    // Save updated list
    localStorage.setItem("tempDB", JSON.stringify(messages));

    alert("Message saved!");
    this.reset();
  });
}

// ===== Display User Messages =====
function displayUserMessages() {
  const messages = JSON.parse(localStorage.getItem("tempDB")) || [];

  if (userMessagesContainer) {
    userMessagesContainer.innerHTML = ""; // clear old
    if (messages.length === 0) {
      userMessagesContainer.innerHTML = "<p>No messages found.</p>";
      return;
    }

    messages.forEach((msg, index) => {
      const div = document.createElement("div");
      div.classList.add("message-card");
      div.innerHTML = `
        <h4>${msg.name} (${msg.email})</h4>
        <p>${msg.message}</p>
        <small>${msg.date}</small>
        <hr/>
      `;
      userMessagesContainer.appendChild(div);
    });
  }
}
