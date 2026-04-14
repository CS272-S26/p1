// Popup recipe adder

const popup = document.getElementById("recipe-popup");
const closeBtn = document.getElementById("close-button");
const addButtons = document.querySelectorAll(".add-button");
console.log(closeBtn);
addButtons.forEach(button => {
    button.addEventListener("click", () => {
        popup.classList.remove("hidden");
    })
})

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

