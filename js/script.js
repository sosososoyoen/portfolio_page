const nav = document.querySelector("#nav")
const marker = document.querySelector(".marker")
const menus = document.querySelectorAll(".nav__menu > li > a")
const sections = document.querySelectorAll(".section-flag");
const overlay = document.querySelector("#overlay")
const bigPhoto = document.querySelectorAll(".gallery__big_photo")
const thumbnails = document.querySelectorAll(".box_gallery li")
const body = document.querySelector("body");
const slide = document.querySelector("#slide");
const slides = document.querySelectorAll("#slide>li")
var timerId=0;
let photoIndex=0;
const photoCount = bigPhoto.length;
var duration = 400;


// 갤러리 모달창 이벤트
// thumbnails.forEach(item => {
//     item.addEventListener("click",(e)=>{
//         e.preventDefault();
//         body.classList.add("scroll_hidden")
//         overlay.style.display = "block";
//         const photo = item.lastElementChild
//         console.log(photo);
//         bigPhoto.src = photo.href;
//         });
//         overlay.addEventListener("click", function (e) {
//             this.style.display = "none";
//             body.classList.remove("scroll_hidden")
//     })
// })

// 슬라이드 버튼 클릭 이벤트
document.querySelector("#next_btn").addEventListener("click", nextSlideImage)
document.querySelector("#prev_btn").addEventListener("click", prevSlideImage)

// 다음 사진으로 슬라이드
function nextSlideImage() {
    photoIndex++;
    photoIndex %= photoCount;
    slide.style.left = "-100%";
    slide.style.transition = duration+"ms";
    window.setTimeout(function(){ 
        slide.appendChild(slide.firstElementChild);
        slide.style.transition = "0ms";
        slide.style.left = 0;
    },duration)
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
    photoIndex --;
    photoIndex %= photoCount;
    slide.style.left = "100%";
    slide.style.transition = duration+"ms";
    window.setTimeout(function(){ 
        slide.insertBefore(slide.lastElementChild,slide.firstChild);
        slide.style.transition = "0ms";
        slide.style.left = 0;
    },duration)
}
// bullet 생성하는 함수
const bullets = document.createElement("ul").setAttribute("id","bullets")
overlay.appendChild(bullets);
slides.forEach(slide,()=>{
    
})


// nav의 인디케이터(marker)의 길이와 위치를 맞추는 함수
function indicator(e) {
    marker.style.left = e.offsetLeft+e.offsetWidth-e.offsetWidth/2+"px";
    marker.style.width = e.offsetWidth+"px";
}

// 스크롤 위치에 따라 해당하는 nav 메뉴의 색깔이 바뀜 & 섹션 등장 애니메이션
window.addEventListener("scroll", ()=> {
    let current="";
    
    sections.forEach(section => {
        const sectionTop = window.pageYOffset + section.getBoundingClientRect().top
        const sectionHeight = section.clientHeight;
        // 스크롤 위치에 따라 해당하는 nav 메뉴의 색깔이 바뀜
        if(window.pageYOffset >= sectionTop - sectionHeight/3) {
            current = section.getAttribute("id");
        }
        // 섹션 등장 애니메이션
        if(current=="profile") {
            document.querySelector(".greeting").classList.add("focus-in-expand");
            document.querySelector(".profile__introduction").classList.add("tracking-in-contract");
        }
        if(current=="contact") {
            document.querySelector(".choco-img").classList.add("slide-in-left");
            document.querySelector(".box_contact > .category-title").classList.add("slide-in-left");
            document.querySelector(".contact__address").classList.add("rotate-in-2-br-cw");
        }
        if(current=="work"){
            const boxes = document.querySelectorAll(".box_work")
            boxes.forEach(box=>{
                const boxTop = window.pageYOffset + box.getBoundingClientRect().top;
                const boxHeight = box.clientHeight;
                if(window.pageYOffset >= boxTop - boxHeight) {
                    box.classList.add("slide-in-right");
                }
            })
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