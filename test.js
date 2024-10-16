document.addEventListener("DOMContentLoaded", function () {
    // Your existing script code here

    // Example: Theme Toggle Logic
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    let currentTheme = localStorage.getItem("theme") || "light";
    applyTheme(currentTheme);

    themeToggle.addEventListener("click", () => {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
    });

    function applyTheme(theme) {
        const logoText = document.getElementById("logoText");

        if (theme === "dark") {
            body.style.backgroundColor = "#333";
            body.style.color = "#000";
            themeToggle.textContent = "Light Theme";
            logoText.style.color = "#blue";
        } else {
            body.style.backgroundColor = "#d1ccd0";
            body.style.color = "#000";
            themeToggle.textContent = "Dark Theme";
            logoText.style.color = "#blue";
        }
    }

    // Font Size Adjustment Logic
    const increaseFontButton = document.getElementById("increaseFont");
    const decreaseFontButton = document.getElementById("decreaseFont");
    let currentFontSize = parseInt(localStorage.getItem("fontSize")) || 16;

    document.body.style.fontSize = currentFontSize + "px";

    increaseFontButton.addEventListener("click", () => {
        currentFontSize += 2;
        document.body.style.fontSize = currentFontSize + "px";
        localStorage.setItem("fontSize", currentFontSize);
    });

    decreaseFontButton.addEventListener("click", () => {
        if (currentFontSize > 10) {
            currentFontSize -= 2;
            document.body.style.fontSize = currentFontSize + "px";
            localStorage.setItem("fontSize", currentFontSize);
        }
    });

    // Screen Reader Mode
    const screenReaderBtn = document.getElementById("screenReaderBtn");
    const stopScreenReaderBtn = document.getElementById("stopScreenReaderBtn");

    // Function to read aloud content
    function readAloud(text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }

    // Function to stop screen reader
    function stopScreenReader() {
        window.speechSynthesis.cancel(); // Stop the current speech output
    }

    // Function to simulate screen reader mode
    screenReaderBtn.addEventListener("click", () => {
        const logoText = document.getElementById("logoText").innerText;
        const addStorageHeader = document.querySelector("h2").innerText;
        const description = document.querySelector("p").innerText;
        const itemsList = Array.from(document.querySelectorAll("option"))
            .map((item) => item.innerText)
            .join(", ");

        // Read aloud the text content
        readAloud(
            `You are on the Smart Storage page. ${logoText}. ${addStorageHeader}. ${description}. Current items: ${itemsList}`,
        );

        // Show the "Stop Screen Reader" button when screen reader starts
        stopScreenReaderBtn.style.display = "block";
    });

    // Stop the screen reader when the stop button is clicked
    stopScreenReaderBtn.addEventListener("click", () => {
        stopScreenReader(); // Stops the speech
        stopScreenReaderBtn.style.display = "none"; // Hide the stop button after stopping
    });

    //add storage items button functionality

    // Get elements
    const addItemBtn = document.getElementById("addItemBtn");
    const newItemInput = document.getElementById("newItem");
    const itemTableBody = document.querySelector("#itemTable tbody");

    // Initialize items from LocalStorage
    let items = JSON.parse(localStorage.getItem("storageItems")) || [];

    // Load items from LocalStorage on page load
    function loadItems() {
        items.forEach((item, index) => {
            addItemToTable(item, index);
        });
    }

    // Function to read aloud content using SpeechSynthesis
    function readAloud(text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }

    // Add new item
    addItemBtn.addEventListener("click", () => {
        const newItem = newItemInput.value.trim();

        if (newItem === "") {
            readAloud("Please enter an item name.");
            return;
        }

        // Add new item to the array and LocalStorage
        items.push(newItem);
        localStorage.setItem("storageItems", JSON.stringify(items));

        // Add item to the table
        addItemToTable(newItem, items.length - 1);

        // Voice feedback: Notify user that the item has been added
        readAloud(`Item "${newItem}" has been added.`);

        // Clear the input field
        newItemInput.value = "";
    });

    // Function to add item to the table
    // Function to add item to the table
    function addItemToTable(item, index) {
        const row = document.createElement("tr");

        // Create the item cell
        const itemCell = document.createElement("td");
        itemCell.textContent = item;
        row.appendChild(itemCell);

        // Create the remove button cell
        const actionCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Attach event listener to the remove button
        removeBtn.addEventListener("click", () => {
            removeItem(index);
        });

        // Create the Send Email button
        const emailBtn = document.createElement("button");
        emailBtn.textContent = "Send Email";
        emailBtn.classList.add("email-btn");

        // Attach event listener to the email button
        emailBtn.addEventListener("click", () => {
            alert(`Email for item "${item}" has been sent successfully!`);
        });

        actionCell.appendChild(removeBtn); // Add Remove button to action cell
        actionCell.appendChild(emailBtn); // Add Send Email button to action cell
        row.appendChild(actionCell);

        // Add the row to the table body
        itemTableBody.appendChild(row);
    }

    // Remove item from table and LocalStorage
    function removeItem(index) {
        const itemToRemove = items[index]; // Store the item name for voice feedback

        // Remove the item from the array
        items.splice(index, 1);

        // Update LocalStorage
        localStorage.setItem("storageItems", JSON.stringify(items));

        // Voice feedback: Notify user that the item has been removed
        readAloud(`Item "${itemToRemove}" has been removed.`);

        // Clear the table and reload items
        itemTableBody.innerHTML = "";
        loadItems();
    }

    const accessibilityBtn = document.getElementById("accessibilityBtn");

    let isHighContrast = false;

    // Toggle Accessibility Settings
    accessibilityBtn.addEventListener("click", () => {
        // Toggle high contrast mode
        if (!isHighContrast) {
            // Apply high contrast mode
            body.style.backgroundColor = "#000"; // Black background
            body.style.color = "#fff"; // White text
            accessibilityBtn.textContent = "Disable Accessibility Mode";
            isHighContrast = true;
        } else {
            // Reset to normal mode
            body.style.backgroundColor = ""; // Reset background
            body.style.color = ""; // Reset text color
            accessibilityBtn.textContent = "Enable Accessibility Mode";
            isHighContrast = false;
        }
    });

    // Load items when the page loads
    document.addEventListener("DOMContentLoaded", loadItems);
});
