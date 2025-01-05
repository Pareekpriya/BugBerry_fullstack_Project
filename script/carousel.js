
const images = document.querySelectorAll(".carousel img");
let current =0;

setInterval(()=>{
    images[current].style.display = 'none';
    current = (current+1) % images.length;
    images[current].style.display = 'block';
},3000);