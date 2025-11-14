const cards = [
    { id: 1, name: "Sentinelle Cybernétique", description: "Une défenseuse avec le feux de tech.", img: "./images/card11.png", price: 21.50, rarity: "rare" },
    { id: 2, name: "Void Witch", description: "Une créature de pure énergie.", img: "./images/card2.png", price: 25.50, rarity: "legendary" },
    { id: 3, name: "Spectre de Néon", description: "Une entitée insaisissable qui hante le réseau.", img: "./images/card3.png", price: 40.50, rarity: "commun" },
    { id: 4, name: "Chimère des Étoiles", description: "Une fusion de bêtes imprévisible.", img: "./images/card4.png", price: 50.00, rarity: "epic" },
    { id: 5, name: "Phénix Binaire", description: "Renaissant de ses cendres numériques.", img: "./images/card5.png", price: 25.50, rarity: "legendary" },
    { id: 6, name: "Golem de Quantum", description: "Un colosse instable, capable de manipuler la réalité.", img: "./images/card6.png", price: 14.50, rarity: "commun" },
    { id: 7, name: "Cyber Valkyrie", description: "Guerrière futuriste dotée d'une précision parfaite.", img: "./images/7.png", price: 18.90, rarity: "epic" },
    { id: 8, name: "Iron Mecha-X", description: "Un robot homme conçu pour écraser tout sur son passage.", img: "./images/8.png", price: 22.00, rarity: "rare" },
    { id: 9, name: "Tinin Spark", description: "Une petite créature rapide, pleine d'énergie instable.", img: "./images/9.png", price: 12.00, rarity: "common" },
    { id: 10, name: "Abyssal Beast", description: "Un monstre venu des profondeurs, dévorant tout.", img: "./images/10.png", price: 30.00, rarity: "legendary" },
    { id: 11, name: "Omega Droid", description: "Robot homme d'élite, programmé pour la perfection.", img: "./images/11.png", price: 27.50, rarity: "epic" },
    { id: 12, name: "Tinin Shadow", description: "Un autre tinin mystique capable de se fondre dans l'ombre.", img: "./images/12.png", price: 14.00, rarity: "rare" }
];
function getRarityColor(rarity) {
    switch (rarity) {
        case "commun": return "#999999";
        case "rare": return "#3B82F6";
        case "legendary": return "#F59E0B";
        case "epic": return "#A855F7";
        default: return "#FFFFFF";
    }
}
if (window.location.pathname.includes("/index.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
        const slider = document.getElementById("slider");
        const slides = [...slider.children];
        console.log(slides);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            slider.appendChild(clone);
        });

        let pos = 0;
        let speed = 0.8;
        let slideSetWidth = 0;

        const updateWidth = () => {
            slideSetWidth = slides.reduce((acc, slide) => acc + slide.offsetWidth + 24, 0);

        };

        updateWidth();
        console.log(slideSetWidth);
        window.addEventListener("resize", updateWidth);

        function animate() {
            pos -= speed;

            if (Math.abs(pos) >= slideSetWidth) pos = 0;
            slider.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(animate);

        }
        animate();

    });
}
if (window.location.pathname.includes("/MarketPage.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });

    const container = document.getElementById("cardsContainer");
    const cardsPerPage = 4;
    let currentPage = 1;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCards(page) {
        container.innerHTML = "";
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const pageCards = cards.slice(start, end);

        pageCards.forEach(c => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("flex", "flex-col", "items-center", "text-center");

            cardDiv.innerHTML = `
                <img src="${c.img}" alt="${c.name}" class="w-full max-w-[250px] mx-auto">
                <div class="grid grid-rows-4 bg-cards font-tet p-2 text-white text-left h-80 border-l-2 border-r-2 border-b-2 border-[#7B2CBF] w-full max-w-[250px]">
                    <h3 class="text-[25px] font-tet text-center">${c.name}</h3>
                    <div class="flex flex-col gap-[20px] h-[60px] text-center">
                        <p class="w-[100%] font-tet">${c.description}</p>
                        <span class="font-tet">1/100 - ${c.rarity}</span>
                    </div>
                    <p class="flex items-end pb-[10px] font-tet justify-center">${c.price} €</p>
                    <div class="flex justify-between h-[50px]">
                        <button class="bg-btn hover:bg-purple-500 px-2 py-1 rounded-lg font-tet add-cart-btn">Ajouter au panier</button>
                        <button class="rounded-lg bg-btn2 px-4 hover:bg-gray-400 transition fav-btn">❤️</button>
                    </div>
                </div>
                `;

            const favBtn = cardDiv.querySelector(".fav-btn");
            favBtn.addEventListener("click", () => {
                if (!favorites.some(f => f.id === c.id)) {
                    favorites.push(c);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    alert(`${c.name} ajouté aux favoris !`);
                } else {
                    alert(`${c.name} est déjà dans vos favoris.`);
                }
            });

            const cartBtn = cardDiv.querySelector(".add-cart-btn");
            cartBtn.addEventListener("click", () => {
                const existing = cart.find(item => item.id === c.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ ...c, quantity: 1 });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${c.name} ajouté au panier !`);
            });

            container.appendChild(cardDiv);
        });

        updatePagination();
    }

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageNumbers = document.getElementById("pageNumbers");

    function updatePagination() {
        pageNumbers.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("px-3", "py-1", "rounded");
            if (i === currentPage) btn.classList.add("bg-btn", "font-bold");
            else btn.classList.add("bg-btn2");

            btn.addEventListener("click", () => {
                currentPage = i;
                renderCards(currentPage);
            });
            pageNumbers.appendChild(btn);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCards(currentPage);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCards(currentPage);
        }
    });

    renderCards(currentPage);

}
if (window.location.pathname.includes("/GuidePage.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });
}
if (window.location.pathname.includes("/CollectionPage.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });
    const collectionContainer = document.getElementById("collectionContainer");
    let collection = JSON.parse(localStorage.getItem("collection")) || [];

    const filterBtns = document.querySelectorAll(".filter-btn");
    let currentFilter = "all";

    function renderCollection(filter = "all") {
        collectionContainer.innerHTML = "";

        let filtered = collection;
        if (filter !== "all") {
            filtered = collection.filter(c => c.rarity === filter);
        }

        if (filtered.length === 0) {
            collectionContainer.innerHTML = `<p class="col-span-full text-center text-white text-lg">Aucune carte trouvée pour ce filtre.</p>`;
            return;
        }

        filtered.forEach(c => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add(
                "text-center",
                "bg-cards",
                "p-4",
                "rounded-lg",
                "flex",
                "flex-col",
                "items-center",
                "justify-between"
            );

            cardDiv.innerHTML = `
            <img src="${c.img}" alt="${c.name}" class="w-full max-w-[200px] h-48 object-cover mb-2">
            <h3 class="text-lg font-tet font-bold mb-1">${c.name}</h3>
            <p class="mb-1 font-tet">${c.description || ''}</p>
            <p class="mb-2 font-tet">Quantité: ${c.quantity}</p>    
            <p class="mb-1 font-tet">${c.price} €</p>
            <p class="mb-2 font-tet font-bold" style="color: ${getRarityColor(c.rarity)};">${c.rarity}</p>
        `;

            collectionContainer.appendChild(cardDiv);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.replace("bg-btn", "bg-btn2"));

            btn.classList.replace("bg-btn2", "bg-btn");

            currentFilter = btn.dataset.filter;
            console.log(currentFilter);
            renderCollection(currentFilter);
        });
    });

    renderCollection(currentFilter);

}
if (window.location.pathname.includes("/FavoritesPage.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const container = document.getElementById("favoritesContainer");

    function renderFavorites() {
        container.innerHTML = "";

        if (favorites.length === 0) {
            container.innerHTML = `<p class="col-span-full text-center text-white text-lg">Vous n'avez aucun favori.</p>`;
            return;
        }

        favorites.forEach(card => {
            const div = document.createElement("div");
            div.classList.add("text-center", "bg-cards", "p-4", "rounded-lg", "flex", "flex-col", "justify-between", "items-center");

            div.innerHTML = `
            <img src="${card.img}" alt="${card.name}" class="w-full max-w-[200px] h-48 font-tet object-cover mb-2">
            <h3 class="text-lg font-tet font-bold mb-1">${card.name}</h3>
            <p class="mb-2 font-tet">${card.price} €</p>
            <button class="delete-btn bg-red-600 hover:bg-red-500 px-3 py-1 rounded " data-id="${card.id}">
                Supprimer
            </button>
        `;

            container.appendChild(div);
        });

        container.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.dataset.id);
                favorites = favorites.filter(c => c.id !== id);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                renderFavorites();
            });
        });
    }
    renderFavorites();

}
if (window.location.pathname.includes("/PanierPage.html")) {
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
            <img src="${item.img}" alt="${item.name}" class="w-full font-tet max-w-[200px] mx-auto mb-2">
            <h3 class="text-lg font-tet font-bold mb-1">${item.name}</h3>
            <p class="mb-2 font-tet">Prix: ${item.price} €</p>
            <p class="mb-2 font-tet">Quantité: ${item.quantity}</p>
            <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 w-full mt-2">
                <button class="delete-btn bg-red-600 hover:bg-red-500 font-tet px-3 py-1 rounded" data-id="${item.id}">Supprimer</button>
                <button class="buy-btn bg-green-600 hover:bg-green-500 font-tet px-3 py-1 rounded" data-id="${item.id}">Acheter</button>
            </div>
        `;

            total += item.price * item.quantity;
            container.appendChild(cardDiv);
        });

        totalDiv.textContent = `Total: ${total} €`;

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

        const item = cart[index];

        const existingItem = collection.find(el => el.id === item.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        } else {
            collection.push(item);
        }

        localStorage.setItem("collection", JSON.stringify(collection));

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`✅ Vous avez acheté ${item.name} !`);

        renderCart();
    }

    renderCart();

}
if (window.location.pathname.includes("/PlayPage.html")) {
    let afficherMydeck = JSON.parse(localStorage.getItem("collection")) || [];
    let turn = "jouer";
    document.addEventListener("DOMContentLoaded", () => {
        Cardsgame();
    });
    const mydeck = document.getElementById('mydeck');
    let laMain = document.getElementById("main");
    let cardMain;
    function Cardsgame() {
        mydeck.innerHTML = '';
        afficherMydeck.forEach(card => {
            let element = document.createElement('div');
            element.classList.add('flex', 'justify-center');
            element.innerHTML += `
                 <div class="w-[60%] border-2 border-[#7B2CBF] rounded-[20px] ">
                <img src="${card.img}" alt="${card.name}" class="rounded-[20px]">
                <div class="bg-cards rounded[20px] text-center ">
                    <h3 class="text-lg font-tet font-bold mb-1">${card.name}</h3>
                    <p class="font-tet font-bold" style="color: ${getRarityColor(card.rarity)};">${card.rarity}</p>
                </div>
                </div>
            `;
            mydeck.appendChild(element);
            element.addEventListener("click", () => {
                if (turn === "jouer") {
                    let laMainLength = laMain.children.length;
                    if (laMainLength < 5) {
                        card.quantity -= 1;
                        laMain.innerHTML += `
                        <div class="cardMain flex flex-col  w-[150px] h-[150px] border-2 border-[#7B2CBF] rounded-[20px] ">
                            <img src="${card.img}" alt="${card.name}" class="rounded-[20px] h-[100px]">
                            <div class="bg-cards rounded[20px] text-center ">
                                <h3 class="text-[14px] font-tet font-bold mb-1">${card.name}</h3>
                                <p class="font-tet font-bold" style="color: ${getRarityColor(card.rarity)};">${card.rarity}</p>
                            </div>
                        </div>
                    `;
                        cardMain = document.querySelectorAll(".cardMain");
                        cardMain.forEach(card => {
                            card.addEventListener("dragstart", () => {
                                card.classList.add("draggable");
                            })
                            card.addEventListener("dragend", () => {
                                card.classList.remove("draggable");
                            })
                        })
                        if (card.quantity < 1) {
                            afficherMydeck = afficherMydeck.filter(f => f.id != card.id);
                            Cardsgame();
                        }
                    } else {
                        alert("You can only have five cards !!");
                    }
                }
            })
        })
    }


    const popup = document.querySelector('.choix');
    const attack = document.querySelector('.attack');
    const defense = document.querySelector('.defense');

    function dragevent(e) {
        if (turn === 'jouer') {
            const draggingelmt = document.querySelector('.draggable');
            const target = e.currentTarget;
            let targetlength = target.children.length;
            if (targetlength > 0) {
                return
            }
            popup.classList.remove("hidden");
            attack.onclick = () => {
                turn = "adverse";
                e.preventDefault();
                target.appendChild(draggingelmt);
                popup.classList.add("hidden");
                target.classList.remove('border');
            }
            defense.onclick = () => {
                turn = "adverse";
                e.preventDefault();
                target.appendChild(draggingelmt);
                popup.classList.add("hidden");
                target.classList.remove('border');
                target.classList.add('rotate-90');
            }
        }
    }

    const endturn = document.querySelector('.endturn');
    const adversaire = document.querySelectorAll('.adversaire');
    let cpt = 0;
    endturn.addEventListener('click', () => {
            if (turn === "adverse") {
                turn = 'jouer';
            let def_ata = Math.floor(Math.random() * 2);
            const temp = adversaire[cpt];
            temp.innerHTML = `
                <div class="cardMain flex flex-col w-[150px] h-[150px] border-2 border-[#7B2CBF] rounded-[20px] ">
                    <img src="${afficherMydeck[cpt].img}" alt="${afficherMydeck[cpt].name}" class="rounded-[20px] h-[100px]">
                    <div class="bg-cards rounded[20px] text-center ">
                        <h3 class="text-[14px] font-tet font-bold mb-1">${afficherMydeck[cpt].name}</h3>
                        <p class="font-tet font-bold" style="color: ${getRarityColor(afficherMydeck[cpt].rarity)};">${afficherMydeck[cpt].rarity}</p>
                    </div>
                </div>
        `;
            temp.classList.remove('border')
            if (def_ata === 0) {
                temp.classList.add('rotate-90');
            }
            cpt++;
        }
    });
}



