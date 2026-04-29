const form = document.getElementById("request-form");
const requestList = document.getElementById("request-list");

function getRequests() {
    return JSON.parse(localStorage.getItem("recipeRequests")) || [];
}

function saveRequests(requests) {
    localStorage.setItem("recipeRequests", JSON.stringify(requests));
}

function loadRequests() {
    const requests = getRequests();
    requestList.replaceChildren();

    for (let request of requests) {
        const card = document.createElement("div");
        card.classList.add("request-card");

        const title = document.createElement("h3");
        title.textContent = request.name;

        const type = document.createElement("p");
        type.textContent = request.type;

        const notes = document.createElement("p");
        notes.textContent = request.notes;

        card.appendChild(title);
        card.appendChild(type);
        card.appendChild(notes);

        requestList.appendChild(card);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRequest = {
        name: document.getElementById("recipe-name").value,
        type: document.getElementById("recipe-type").value,
        notes: document.getElementById("recipe-notes").value
    };

    const requests = getRequests();
    requests.push(newRequest);
    saveRequests(requests);

    form.reset();
    // loadRequests();

    const msg = document.getElementById("confirmation-message");
    msg.textContent = "Thanks! Your request has been submitted.";
    msg.style.display = "block";

    // Time message appearance
    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);

});

//loadRequests();
