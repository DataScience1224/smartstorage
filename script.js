document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("All fields are required.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find((user) => user.email === email);

        if (userExists) {
            alert("User with this email already exists.");
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        document.getElementById("registrationForm").reset();

        // Redirect to addstorageitems page
        window.location.href = "addstorageitems.html";
    });

document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Both email and password are required.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find((user) => user.email === email);

        if (!user) {
            alert("User not found. Please register first.");
            return;
        }

        if (user.password !== password) {
            alert("Incorrect password.");
            return;
        }

        alert("Login successful!");

        // Redirect to addstorageitems page
        window.location.href = "addstorageitems.html";
    });

// Toggle between registration and login sections
function toggleSection() {
    const registrationSection = document.getElementById("registrationSection");
    const loginSection = document.getElementById("loginSection");

    if (registrationSection.style.display === "none") {
        registrationSection.style.display = "block";
        loginSection.style.display = "none";
    } else {
        registrationSection.style.display = "none";
        loginSection.style.display = "block";
    }
}

// Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme in localStorage
let currentTheme = localStorage.getItem("theme") || "light";
applyTheme(currentTheme);

// Toggle theme between dark and light
themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme); // Save theme preference
});

function applyTheme(theme) {
    const logoText = document.getElementById("logoText");
    const nameLabel = document.getElementById("nameLabel");
    const emailLabel = document.getElementById("emailLabel");
    const passwordLabel = document.getElementById("passwordLabel");

    if (theme === "dark") {
        // Apply dark background and white text
        body.style.backgroundColor = "#333";
        body.style.color = "#000";
        themeToggle.textContent = "Light Theme";

        // Ensure text elements are visible on dark background
        logoText.style.color = "#blue";
        nameLabel.style.color = "#000";
        emailLabel.style.color = "#000";
        passwordLabel.style.color = "#000";
    } else {
        // Apply light background and dark text
        body.style.backgroundColor = "#d1ccd0";
        body.style.color = "#000";
        themeToggle.textContent = "Dark Theme";

        // Ensure text elements are visible on light background
        logoText.style.color = "#blue";
        nameLabel.style.color = "#000";
        emailLabel.style.color = "#000";
        passwordLabel.style.color = "#000";
    }
}

// Font Size Adjustment Logic
const increaseFontButton = document.getElementById("increaseFont");
const decreaseFontButton = document.getElementById("decreaseFont");
let currentFontSize = parseInt(localStorage.getItem("fontSize")) || 16;

// Apply the saved font size
document.body.style.fontSize = currentFontSize + "px";

// Increase font size
increaseFontButton.addEventListener("click", () => {
    currentFontSize += 2;
    document.body.style.fontSize = currentFontSize + "px";
    localStorage.setItem("fontSize", currentFontSize); // Save font size preference
});

// Decrease font size
decreaseFontButton.addEventListener("click", () => {
    if (currentFontSize > 10) {
        // Set a minimum font size
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + "px";
        localStorage.setItem("fontSize", currentFontSize); // Save font size preference
    }
});

const screenReaderBtn = document.getElementById("screenReaderBtn");

// Function to read aloud content
function readAloud(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// Function to simulate screen reader mode
screenReaderBtn.addEventListener("click", () => {
    const logoText = document.getElementById("logoText").innerText;
    const addStorageHeader = document.querySelector("h2").innerText;
    const description = document.querySelector("p").innerText;
    const itemsList = Array.from(document.querySelectorAll("#itemList li"))
        .map((item) => item.innerText)
        .join(", ");

    // Read aloud the text content
    readAloud(
        `You are on the Smart Storage page. ${logoText}. ${addStorageHeader}. ${description}. Current items: ${itemsList}`,
    );
});

const accessibilityBtn = document.getElementById("accessibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const highContrastToggle = document.getElementById("highContrastToggle");
const increaseTextToggle = document.getElementById("increaseTextToggle");

// Toggle Accessibility Panel visibility
accessibilityBtn.addEventListener("click", () => {
    accessibilityPanel.style.display =
        accessibilityPanel.style.display === "none" ? "block" : "none";
});

// Toggle High Contrast Mode
highContrastToggle.addEventListener("click", () => {
    const body = document.body;

    // Toggle between high contrast and default
    if (body.classList.contains("high-contrast")) {
        body.classList.remove("high-contrast");
    } else {
        body.classList.add("high-contrast");
    }
});

// Toggle Larger Text Mode
increaseTextToggle.addEventListener("click", () => {
    const body = document.body;

    // Toggle between larger text and default
    if (body.classList.contains("larger-text")) {
        body.classList.remove("larger-text");
    } else {
        body.classList.add("larger-text");
    }
});
