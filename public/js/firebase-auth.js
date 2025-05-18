// public/js/firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// ✅ Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyABnIftBwih3DbrVhrnpMMnMw1pqlB0_So",
  authDomain: "customer-management-d9ad8.firebaseapp.com",
  projectId: "customer-management-d9ad8",
  storageBucket: "customer-management-d9ad8.firebasestorage.app",
  messagingSenderId: "389287597627",
  appId: "1:389287597627:web:1dee8e121fb0fa3883ee1e",
  measurementId: "G-E3VYSVMFJ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔁 Form Switching Logic
window.toggleForms = function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('formTitle');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.innerText = 'Login';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.innerText = 'Register';
    }
};

// 🔐 Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = 'dashboard.html')
        .catch(err => alert("Login Failed: " + err.message));
});

// 📝 Register
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            // Store to MySQL
            fetch("php/save_user.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebase_uid: userCred.user.uid,
                    name: name,
                    email: email
                })
            });
            window.location.href = "dashboard.html";
        })
        .catch(err => alert("Registration Failed: " + err.message));
});
