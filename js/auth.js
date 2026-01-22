function login() {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
}
localStorage.setItem("username", document.getElementById("loginEmail").value);
localStorage.setItem("loggedIn", "true");
