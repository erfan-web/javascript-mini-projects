const box = document.getElementById("box")

function moveBox() {
    const maxX = window.innerWidth - box.offsetWidth;
    const maxY = window.innerHeight - box.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + "px";
    box.style.top = randomY + "px";
}
box.addEventListener("mouseenter", moveBox);
box.addEventListener("click", () => {
    alert("Hooray! You caught it");
})