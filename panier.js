let cart = JSON.parse(localStorage.getItem("cart")) || [];
let collection = JSON.parse(localStorage.getItem("collection")) || [];

const container = document.getElementById("cartContainer");
const totalDiv = document.getElementById("cartTotal");

document.addEventListener("DOMContentLoaded", () => {
      const btn = document.getElementById("menu-btn");
      const menu = document.getElementById("menu");
      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    });

function renderCart() {
    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-white text-lg">Votre panier est vide.</p>`;
        totalDiv.textContent = "";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("text-center", "bg-cards", "p-4", "rounded-lg", "flex", "flex-col", "items-center");

        cardDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="w-full max-w-[200px] mx-auto mb-2">
            <h3 class="text-lg font-bold mb-1">${item.name}</h3>
            <p class="mb-2">Prix: ${item.price} €</p>
            <p class="mb-2">Quantité: ${item.quantity}</p>
            <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 w-full mt-2">
                <button class="delete-btn bg-red-600 hover:bg-red-500 px-3 py-1 rounded" data-id="${item.id}">Supprimer</button>
                <button class="buy-btn bg-green-600 hover:bg-green-500 px-3 py-1 rounded" data-id="${item.id}">Acheter</button>
            </div>
        `;

        total += item.price * item.quantity;
        container.appendChild(cardDiv);
    });

    totalDiv.textContent = `Total: ${total.toFixed(2)} €`;

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });

    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            buyItem(id);
        });
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function buyItem(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index === -1) return;

    const item = cart[index];
    collection.push(item);
    localStorage.setItem("collection", JSON.stringify(collection));

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`✅ Vous avez acheté ${item.name} !`);

    renderCart();
}

renderCart();
