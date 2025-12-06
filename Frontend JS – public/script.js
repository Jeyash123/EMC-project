const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      message.style.color = "green";
      message.textContent = data.message;
      // here you could redirect: window.location.href = "/dashboard.html";
    } else {
      message.style.color = "red";
      message.textContent = data.message || "Login failed";
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Error connecting to server";
    console.error(err);
  }
});
