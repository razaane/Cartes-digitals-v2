
const cards = [
    {id:1, name:"Sentinelle Cybernétique", description:"Une défenseuse avec le feux de tech.", img:"./images/card11.png", price:25.50, rarety:"épic"},
    {id:2, name:"Void Witch", description:"Une créature de pure énergie.", img:"./images/card2.png", price:25.50, rarety:"Commun"},
    {id:3, name:"Spectre de Néon", description:"Une entitée insaisissable quihante le réseau.", img:"./images/card3.png", price:25.50, rarety:"Lengendary"},
    
];


const userCollection = [1, 3, 5, 6, 12]; 

const container = document.getElementById("cardsContainerCollection");
const cardsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(userCollection.length / cardsPerPage);


function renderCollection(page){
    container.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const pageCards = userCollection.slice(start, end).map(id => cards.find(c => c.id === id));

    pageCards.forEach(c => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("text-center");

        cardDiv.innerHTML = `
            <img src="${c.img}" alt="${c.name}" class="w-[20vw] mx-auto">
            <div class="grid grid-rows-4 bg-cards font-tet p-2 text-white text-left h-80 border-l-2 border-r-2 border-b-2 border-[#7B2CBF]">
                <h3 class="text-[25px]">${c.name}</h3>
                <div class="flex flex-col gap-[20px] h-[60px]">
                    <p class="w-[80%] font-display">${c.description}</p>
                    <span>1/100</span>
                </div>
                <p class="flex items-end pb-[10px]">${c.rarety}</p>
                <div class="flex justify-between h-[50px]">
                    <button class="bg-btn hover:bg-purple-500 px-2 py-1 rounded-lg font-tet">
                        Voir détails
                    </button>
                    <button class="rounded-lg bg-btn2 px-4 hover:bg-gray-400 transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="w-5 h-5 opacity-70">
                    </button>
                </div>
            </div>
        `;
        container.appendChild(cardDiv);
    });

    updatePagination();
}


const prevBtn = document.getElementById("prevBtnCollection");
const nextBtn = document.getElementById("nextBtnCollection");
const pageNumbers = document.getElementById("pageNumbersCollection");

function updatePagination(){
    pageNumbers.innerHTML = "";
    for(let i=1; i<=totalPages; i++){
        const btn = document.createElement("button");
        btn.textContent = i;
        if(i === currentPage) btn.classList.add("font-bold", "underline");
        btn.addEventListener("click", ()=> {
            currentPage = i;
            renderCollection(currentPage);
        });
        pageNumbers.appendChild(btn);
    }
}

prevBtn.addEventListener("click", () => {
    if(currentPage > 1){
        currentPage--;
        renderCollection(currentPage);
    }
});
nextBtn.addEventListener("click", () => {
    if(currentPage < totalPages){
        currentPage++;
        renderCollection(currentPage);
    }
});


renderCollection(currentPage);
