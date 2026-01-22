const popularContainer = document.getElementById("popularContainer");
const foodContainer = document.getElementById("foodContainer");
const showMoreBtn = document.getElementById("showMoreBtn");
const searchInput = document.getElementById("searchInput"); // navbar search
const priceFilter = document.getElementById("priceFilter"); // optional
const userBox = document.getElementById("userBox");

let allFoods = [];
let visibleCount = 8;

// Load foods
fetch("data/foods.json")
    .then(res => res.json())
    .then(data => {
        allFoods = data;
        renderFoods();
        renderPopularFoods();
    });

// --------------------
// User display
// --------------------
const username = localStorage.getItem("username");
if (username && userBox) userBox.textContent = `Hi, ${username}`;

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// --------------------
// Reusable card renderer
// --------------------
function renderFoodCards(foods) {
    foodContainer.innerHTML = "";

    foods.forEach(food => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition";

        card.innerHTML = `
      <img src="${food.image}" class="w-full h-40 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">${food.title}</h3>
        <p class="text-sm text-gray-600">${food.description}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="font-bold text-red-500">BDT ${food.price}</span>
          <button onclick="orderNow(${food.id})"
            class="bg-red-500 text-white px-3 py-1 rounded">
            Order Now
          </button>
        </div>
      </div>
    `;

        foodContainer.appendChild(card);
    });
}

// --------------------
// Main menu rendering
// --------------------
function renderFoods() {
    const foodsToShow = allFoods.slice(0, visibleCount);
    renderFoodCards(foodsToShow);

    if (visibleCount >= allFoods.length) {
        showMoreBtn.style.display = "none";
    } else {
        showMoreBtn.style.display = "block";
    }
}

// --------------------
// Popular section
// --------------------
function renderPopularFoods() {
    if (!popularContainer) return;

    popularContainer.innerHTML = "";
    const popularFoods = allFoods.filter(food => food.popular === true);

    popularFoods.forEach(food => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition";

        card.innerHTML = `
      <img src="${food.image}" class="w-full h-40 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">${food.title}</h3>
        <p class="text-sm text-gray-600">${food.description}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="font-bold text-red-500">BDT ${food.price}</span>
          <button onclick="orderNow(${food.id})"
            class="bg-red-500 text-white px-3 py-1 rounded">
            Order Now
          </button>
        </div>
      </div>
    `;

        popularContainer.appendChild(card);
    });
}

// --------------------
// Show more
// --------------------
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
        visibleCount += 12;
        renderFoods();
    });
}

// --------------------
// Order now → cart
// --------------------
function orderNow(foodId) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "auth.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(foodId);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
}

// --------------------
// Search & filter (navbar safe)
// --------------------
if (searchInput) searchInput.addEventListener("input", filterFoods);
if (priceFilter) priceFilter.addEventListener("change", filterFoods);

function filterFoods() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";

    // If empty → normal view
    if (!query && (!priceFilter || priceFilter.value === "all")) {
        visibleCount = 8;
        renderFoods();
        return;
    }

    let filtered = allFoods.filter(food =>
        food.title.toLowerCase().includes(query)
    );

    if (priceFilter) {
        if (priceFilter.value === "low") filtered = filtered.filter(f => f.price < 500);
        if (priceFilter.value === "high") filtered = filtered.filter(f => f.price >= 500);
    }

    showMoreBtn.style.display = "none";
    renderFoodCards(filtered);
}