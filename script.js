



const slider = document.getElementById("slider");
const slides = Array.from(slider.children);
const slideCount = slides.length;


slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
});

let currentIndex = 0;
const slideWidth = slides[0].offsetWidth + 40; 
const speed = 2; 

function animateSlider() {
    currentIndex += speed;

    if (currentIndex >= slideWidth * slideCount) {
        currentIndex = 0;
    }

    slider.style.transform = `translateX(-${currentIndex}px)`;
    requestAnimationFrame(animateSlider);
}

animateSlider();


window.addEventListener("resize", () => {
    
    const newWidth = slides[0].offsetWidth + 40;
    currentIndex = 0;
    slider.style.transform = `translateX(0px)`;
});



const container = document.getElementById("cardsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumbersDiv = document.getElementById("pageNumbers");


const cardsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(cards.length / cardsPerPage);


function displayCards(page) {
    container.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToShow = cards.slice(start, end);

    cardsToShow.forEach(card => {
        container.innerHTML += `
            <div class="text-center">
                <img src="${card.img}" alt="${card.name}" class="w-[20vw] mx-auto">
                <div class="grid grid-rows-4 bg-cards font-tet p-2 text-white text-left h-80 border-l-2 border-r-2 border-b-2 border-[#7B2CBF]">
                    <h3 class="text-[25px]">${card.name}</h3>
                    <div class="flex flex-col gap-2 h-[60px]">
                        <p class="w-[90%] font-display">${card.description}</p>
                        <span>1/100</span>
                    </div>
                    <p class="flex items-end pb-2">${card.price} €</p>
                    <div class="flex justify-between h-[50px]">
                        <button class="bg-btn hover:bg-purple-500 px-2 py-1 rounded-lg font-tet">
                            Ajouter au panier
                        </button>
                        <button class="rounded-lg bg-btn2 px-4 hover:bg-gray-400 transition">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="w-5 h-5 opacity-70">
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    updatePaginationButtons();
}


function updatePaginationButtons() {
    
    pageNumbersDiv.innerHTML = "";

    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `px-3 py-1 rounded ${i === currentPage ? "bg-btn" : "bg-btn2"}`;
        btn.addEventListener("click", () => {
            currentPage = i;
            displayCards(currentPage);
        });
        pageNumbersDiv.appendChild(btn);
    }

    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}


prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCards(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayCards(currentPage);
    }
});


displayCards(currentPage);



