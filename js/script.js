const nav = document.querySelector("#nav")
const marker = document.querySelector(".marker")
const menus = document.querySelectorAll(".nav__menu > li > a")
const sections = document.querySelectorAll(".section-flag");
const overlay = document.querySelector("#overlay")
const bigPhoto = document.querySelectorAll(".gallery__big_photo")
const thumbnails = document.querySelectorAll(".gallery__thumbnail")
const body = document.querySelector("body");
const slide = document.querySelector("#slide");
let slides = document.querySelectorAll("#slide>li")
let timerId=0;
let photoIndex=0;
const photoCount = bigPhoto.length;
const duration = 400;
let bullet = 0;

// bullet 생성하는 함수
function createBullets() {
    const bullets = document.createElement("ul");
    bullets.setAttribute("id","bullets");
    overlay.appendChild(bullets);
    slides.forEach(_slide => {
        let index = Array.prototype.indexOf.call(slides,_slide);
        const a = document.createElement("a");
        a.setAttribute("href","#");
        a.innerHTML=`"${index}"`;
        const li = document.createElement("li")
        li.appendChild(a);
        bullets.appendChild(li);
    })
    return bullet = document.querySelectorAll("#bullets > li > a");
}
createBullets();

// 갤러리 모달창 이벤트
thumbnails.forEach(item => {
    item.addEventListener("click",(e)=>{
        e.preventDefault();
        body.classList.add("scroll_hidden")
        overlay.style.display = "block";
        // 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
        for (let i=0; i<thumbnails.length; i++) {
            let thumbnail = thumbnails[i]
            var photo = thumbnail.lastElementChild;
            bigPhoto[i].src = photo.href
        };
        });
        document.querySelector("button.close").addEventListener("click", function (_e) {
            overlay.style.display = "none";
            body.classList.remove("scroll_hidden")
        
    })

})

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
        slide.removeAttribute("style");
    },duration)
    bullet.forEach(item=>{
        item.classList.remove("on")
    });
    bullet[photoIndex].classList.add("on");
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
    photoIndex --;
    photoIndex %= photoCount;
    slide.insertBefore(slide.lastElementChild,slide.firstChild);
    slide.style.left = "-100%";
    slide.style.transition = "0ms";
    window.setTimeout(function(){ 
        slide.style.left = 0;
        slide.style.transition = duration+"ms";
    },"200ms")
    bullet.forEach(item=>{
        item.classList.remove("on")
    });
    let index = photoIndex + bullet.length;
    index %= bullet.length;
    bullet[index].classList.add("on");
}

//bullet을 클릭하면 해당하는 번호의 이미지로 슬라이드 되는 함수
bullet.forEach((a,index)=>{
    a.addEventListener("click", function(e){
        e.preventDefault();
        // let index = Array.prototype.indexOf.call(bullet,a);
        const clickedIndex = index;
        let step = clickedIndex - photoIndex;
        photoIndex = clickedIndex;
        for (let i=0; i<bullet.length; i++) {
            bullet[i].classList.remove("on");
        }
        this.classList.add("on");
        slides = document.querySelectorAll("#slide>li");
        let slidesArr = [...slides];

        if (step>0) {
            let sliceSlides = slidesArr.slice(undefined,step);
            slide.style.transition = duration+"ms";
            slide.style.left=step * (-100)+"%";
            window.setTimeout(function(){ 
                slide.removeAttribute("style");
                slide.append(...sliceSlides);
            },duration)
        
        }else {
            sliceSlides = slidesArr.slice(step);
            slide.prepend(...sliceSlides);
            slide.style.left = step * 100 + "%";
            slide.style.transition = duration+"ms";
            window.setTimeout(function(){ 
                slide.style.left = 0;
                slide.style.transition = "0ms";
            },duration)
        }
    })
})
//썸네일 클릭하면 해당되는 사진으로 점프
thumbnails.forEach(item=>{
    item.addEventListener("click", function(e){
        e.preventDefault();
        let index = Array.prototype.indexOf.call(thumbnails,item);
        const clickedIndex = index;
        let step = clickedIndex - photoIndex;
        photoIndex = clickedIndex;
        for (let i=0; i<bullet.length; i++) {
            bullet[i].classList.remove("on");
        }
        bullet[index].classList.add("on");
        slides = document.querySelectorAll("#slide>li");
        let slidesArr = [...slides];

        if (step>0) {
            let sliceSlides = slidesArr.slice(undefined,step);
            slide.style.left=step * (-100)+"%";
            window.setTimeout(function(){ 
                slide.removeAttribute("style");
                slide.append(...sliceSlides);
            },duration)
        
        }else {
            sliceSlides = slidesArr.slice(step);
            slide.prepend(...sliceSlides);
            slide.style.left = 0;
        }
    })
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
        var height = document.body.clientHeight - (window.scrollY + window.innerHeight)
        const contactBox = document.getElementById("contact")
        
        if(window.pageYOffset >= sectionTop - sectionHeight/4) {
            current = section.getAttribute("id");
        }
        if(height <=contactBox.clientHeight/2) {
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
                if(window.pageYOffset >= boxTop - boxHeight*1.5) {
                    box.classList.add("slide-in-right");
                }
            })
        }
    })

    // 스크롤에 따라 해당하는 메뉴 밑에 인디케이터가 따라오는 함수
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

// 갤러리 바닐라 틸트
VanillaTilt.init(document.querySelectorAll(".gallery__thumbnail")), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 1
};

//이동
const workThumbs = document.querySelectorAll(".work__thumbnail");
workThumbs.forEach(thumb => {
    thumb.addEventListener("click", function(e){
        e.preventDefault();
        window.open(this.href);
        
    })
})
