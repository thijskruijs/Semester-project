import '../style.css'

// Open and close login form
const openFormButton = document.getElementById('login-button');
  const overlay = document.getElementById('overlay');

  openFormButton.addEventListener('click', () => {
    overlay.style.display = 'block';
  });

const closeFormButton = document.getElementById('close-form-button');
closeFormButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Register account
// https://api.noroff.dev/api/v1/auction/auth/register
// Auth token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzMCwibmFtZSI6InRoaWpzdmFudGtydWlqcyIsImVtYWlsIjoidGhpdmFuNDk3OTlAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImNyZWRpdHMiOjEwMDAsIndpbnMiOltdLCJpYXQiOjE2NzExNDg1MTN9.KXR4xDYk_nznJGC85MvIHM0ZsVnEhGW6CU72QbZiyto

const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email.endsWith("@stud.noroff.no")) {
    alert("Please register using a @stud.noroff.no account.");
    return;
  }

  if (password.length < 8) {
    alert("Please enter a password with at least 8 characters.");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzMCwibmFtZSI6InRoaWpzdmFudGtydWlqcyIsImVtYWlsIjoidGhpdmFuNDk3OTlAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImNyZWRpdHMiOjEwMDAsIndpbnMiOltdLCJpYXQiOjE2NzExNDg1MTN9.KXR4xDYk_nznJGC85MvIHM0ZsVnEhGW6CU72QbZiyto`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Your account was created successfully!");
      } else {
        alert("User already exists");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Account log in

async function login(email, password) {
  const response = await fetch("https://api.noroff.dev/api/v1/auction/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzMCwibmFtZSI6InRoaWpzdmFudGtydWlqcyIsImVtYWlsIjoidGhpdmFuNDk3OTlAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImNyZWRpdHMiOjEwMDAsIndpbnMiOltdLCJpYXQiOjE2NzExNDg1MTN9.KXR4xDYk_nznJGC85MvIHM0ZsVnEhGW6CU72QbZiyto`
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const LoginData = await response.json();
    localStorage.setItem('user', JSON.stringify(LoginData));
    location.reload();
    alert ("You have succesfully logged in. Please close this window")
  } else {
    alert ("Your email or password is incorrect, try again.");
  }
  
}

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");


loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const LogEmail = loginEmail.value;
  const LogPassword = loginPassword.value;

  try {
    const data = await login(LogEmail, LogPassword);
  } catch (error) {
    console.error(error);
  }
});

// User log out

document.getElementById("logout-button").addEventListener("click", logoutUser);

async function logoutUser() {
  localStorage.removeItem('user');
  location.reload();
  alert ("You have succesfully logged out.")
}

// Log in/log out buttons on navbar

const IsLoggedIn = localStorage.getItem('user');

if (IsLoggedIn) {
  document.getElementById('login-button').classList.add('hidden');
  document.getElementById('logout-button').classList.remove('hidden');
  document.getElementById('user-icon').classList.remove('hidden');
} else {
  document.getElementById('login-button').classList.remove('hidden');
  document.getElementById('logout-button').classList.add('hidden');
  document.getElementById('user-icon').classList.add('hidden');
}

// Most popular listings

fetch('https://api.noroff.dev/api/v1/auction/listings')
  .then(response => response.json())
  .then(data => {
    data.sort((a, b) => b._count.bids - a._count.bids);

    const topItems = data.slice(0, 14);

    const itemsHtml = topItems.map(item => `
      <div class="item">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <ul>
          ${item.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <p>Number of bids: ${item._count.bids}</p>
      </div>
    `).join('');

    // Insert the HTML string into the DOM
    document.querySelector('topListings').innerHTML = itemsHtml;
  });







