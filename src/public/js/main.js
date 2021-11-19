
// active navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if(document.documentElement.scrollTop  > 20){
        nav.classList.add("scroll-on");
    }else{
        nav.classList.remove("scroll-on");
    }
}

// nav hide 
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function(a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})


var now = new Date();

// now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
// document.getElementById('reserva').value = now.toISOString().slice(0,16);

console.log(now.toISOString())
console.log(now.toISOString().slice(0,16))

document.getElementById('reserva').min = now.toISOString().slice(0,16);