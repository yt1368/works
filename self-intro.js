let openBtn = document.querySelector(".open-btn");
let biography = document.querySelector(".biography");
let closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click",function(){
    biography.classList.add("x");
})

openBtn.addEventListener("click",function(){
    biography.classList.remove("x");
})