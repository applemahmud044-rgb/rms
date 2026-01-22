const cartItemsDiv = document.getElementById("cartItems");
const totalDiv = document.getElementById("totalPrice");

fetch("data/foods.json")
    .then(res => res.json())
    .then(foods => showCart(foods));

function showCart(foods) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "Cart is empty";
        totalDiv.textContent = "";
        return;
    }

    const grouped = {};
    cart.forEach(id => grouped[id] = (grouped[id] || 0) + 1);

    let total = 0;
    cartItemsDiv.innerHTML = "";

    Object.entries(grouped).forEach(([id, qty]) => {
        const food = foods.find(f => f.id == id);
        if (!food) return;

        const itemTotal = food.price * qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "bg-white p-3 mb-2 rounded shadow flex justify-between items-center";

        div.innerHTML = `
      <div>
        <b>${food.title}</b><br>
        Price: BDT ${food.price} × ${qty}
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeQty(${food.id}, -1)" class="px-2 bg-gray-300">−</button>
        <span>${qty}</span>
        <button onclick="changeQty(${food.id}, 1)" class="px-2 bg-gray-300">+</button>
        <button onclick="removeItem(${food.id})" class="text-red-500">✖</button>
      </div>
    `;

        cartItemsDiv.appendChild(div);
    });

    totalDiv.textContent = `Total: BDT ${total}`;
}

function changeQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (delta === 1) cart.push(id);
    else {
        const index = cart.indexOf(id);
        if (index > -1) cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function checkout() {
    window.location.href = "checkout.html";
}