// SHA-256 Hash Function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// ---------------- REGISTER ----------------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const msg = document.getElementById("registerMessage");

        if (!username || !email || !password) {
            msg.style.color = "red";
            msg.textContent = "All fields are required.";
            return;
        }

        if (password.length < 8 || !/\d/.test(password)) {
            msg.style.color = "red";
            msg.textContent =
                "Password must be at least 8 characters and contain a number.";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(
            user => user.username === username || user.email === email
        );

        if (exists) {
            msg.style.color = "red";
            msg.textContent = "Username or Email already exists.";
            return;
        }

        const hashedPassword = await hashPassword(password);

        users.push({
            username,
            email,
            password: hashedPassword
        });

        localStorage.setItem("users", JSON.stringify(users));

        msg.style.color = "green";
        msg.textContent = "Registration Successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const loginUser = document.getElementById("loginUser").value.trim();
        const loginPassword = document.getElementById("loginPassword").value.trim();
        const msg = document.getElementById("loginMessage");

        if (!loginUser || !loginPassword) {
            msg.style.color = "red";
            msg.textContent = "Please fill all fields.";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const hashedPassword = await hashPassword(loginPassword);

        const user = users.find(
            u =>
                (u.username === loginUser || u.email === loginUser) &&
                u.password === hashedPassword
        );

        if (!user) {
            msg.style.color = "red";
            msg.textContent = "Invalid username/email or password.";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        window.location.href = "dashboard.html";
    });
}

// ---------------- DASHBOARD ----------------
if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        window.location.href = "index.html";
    } else {
        document.getElementById("welcomeUser").textContent =
            "Hello, " + user.username + "!";
    }
}

// ---------------- LOGOUT ----------------
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}
