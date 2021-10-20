const nav = document.querySelector("#nav")
const marker = document.querySelector(".marker")
const menus = document.querySelectorAll(".nav__menu > li > a")
const sections = document.querySelectorAll(".section-flag");
const overlay = document.querySelector("#overlay")
const bigPhoto = document.querySelector(".gallery__big_photo")
const thumbnails = document.querySelectorAll(".box_gallery li")
const body = document.querySelector("body");



// 갤러리 오버레이 이벤트
thumbnails.forEach(item => {
    item.addEventListener("click",(e)=>{
        e.preventDefault();
        body.classList.add("scroll_hidden")
        overlay.style.display = "block";
        const photo = item.lastElementChild
        console.log(photo);
        bigPhoto.src = photo.href;
        });
        overlay.addEventListener("click", function (e) {
            this.style.display = "none";
            body.classList.remove("scroll_hidden")
    })
})

// nav의 인디케이터(marker)의 길이와 위치를 맞추는 함수
function indicator(e) {
    marker.style.left = e.offsetLeft+e.offsetWidth-e.offsetWidth/2+"px";
    marker.style.width = e.offsetWidth+"px";
}

// 스크롤 위치에 따라 해당하는 nav 메뉴의 색깔이 바뀜
window.addEventListener("scroll", ()=> {
    let current="";
    
    sections.forEach(section => {
        const sectionTop = window.pageYOffset + section.getBoundingClientRect().top
        const sectionHeight = section.clientHeight;
        if(window.pageYOffset >= sectionTop - sectionHeight/3) {
            current = section.getAttribute("id");
        }
    })

    menus.forEach(menu => {
        menu.classList.remove("current-menu");
        const href = menu.getAttribute("href").substr(1);
        if(href === current){
            menu.classList.add("current-menu")
            indicator(menu);
        }
    })
})

// 프로필 스크롤 애니메이션
window.addEventListener("scroll", ()=> {
    const profile = document.querySelector("#profile")
    const contact = document.querySelector("#contact")
    const profileTop = window.pageYOffset + profile.getBoundingClientRect().top
    const contactTop = window.pageYOffset + contact.getBoundingClientRect().top
    const profileHeight = profile.clientHeight;
    const contactHeight = contact.clientHeight;
    if(window.pageYOffset >= profileTop - profileHeight/3) {
        document.querySelector(".greeting").classList.add("focus-in-expand");
        document.querySelector(".profile__introduction").classList.add("tracking-in-contract");
    } if(window.pageYOffset >= contactTop - contactHeight/3) {
        document.querySelector(".choco-img").classList.add("slide-in-left");
        document.querySelector(".box_contact > .category-title").classList.add("slide-in-left");
        document.querySelector(".contact__address").classList.add("rotate-in-2-br-cw");

    }
})



// 스크롤 시 내비게이션 컨테이너가 생기는 이벤트
window.addEventListener("scroll", function(){
    nav.classList.toggle("nav_fixed",window.scrollY > 0);
})

VanillaTilt.init(document.querySelectorAll(".gallery__thumbnail")), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 1
};
// VanillaTilt.init(document.querySelectorAll(".box_profile")), {
//     max: 35,
//     speed: 200,
//     glare: true,
//     perspective:100,
//     "max-glare": 1
// };