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


function bulletClassReset() {
    bullet.forEach(a => {
        a.classList.remove("on")
    })

}
function bulletIndex() {
    let index = photoIndex + bullet.length;
    index %= bullet.length;
    bullet[index].classList.add("on");
}
// bullet 생성하는 함수
function createBullets() {
    const bullets = document.createElement("ul");
    bullets.setAttribute("id","bullets");
    overlay.appendChild(bullets);
    slides.forEach((slide,index) => {
        const a = document.createElement("a");
        a.setAttribute("href","#");
        a.innerHTML=`${index}`;
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
            var photo = thumbnails[i].lastElementChild;
            bigPhoto[i].src = photo.href
        };
        });
        document.querySelector("button.close").addEventListener("click", ()=> {
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
    bulletClassReset();
    bulletIndex()
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
    },duration/2)
    bulletClassReset();
    bulletIndex()
}
function sliceSlides(step) {
    // 클릭할 때마다 순서가 바뀌는 slides들 업뎃
    slides = document.querySelectorAll(".slides>li");
    let currentSlides = [...slides];
    if (step > 0) {
      // 이미지 슬라이드 step의 수 만큼 앞에서 자른다
      let sliceSlides = currentSlides.slice(undefined, step);
      slide.style.transition = duration + "ms";
      slide.style.left = step * -100 + "%";
      window.setTimeout(() => {
        slide.removeAttribute("style");
        // 잘린 슬라이드들 맨 뒤로 집어넣기..
        slide.append(...sliceSlides);
      });
    } else {
      sliceSlides = currentSlides.slice(step);
      // 잘린 슬라이드들 맨 앞으로 집어넣기
      slide.prepend(...sliceSlides);
      slide.style.left = step * 100 + "%";
      slide.style.transition = duration + "ms";
      window.setTimeout(() => {
        slide.removeAttribute("style");
      }, duration);
    }
}
//bullet을 클릭하면 해당하는 번호의 이미지로 슬라이드 되는 함수
bullet.forEach((a,index)=>{
    a.addEventListener("click", function(e){
        e.preventDefault();
        const clickedIndex = index;
        let step = clickedIndex - photoIndex;
        photoIndex = clickedIndex;
        bulletClassReset();
        this.classList.add("on");
        slides = document.querySelectorAll("#slide>li");
        let slidesArr = [...slides];

        if (step>0) {
            let sliceSlides = slidesArr.slice(undefined,step);
            slide.style.transition = duration+"ms";
            slide.style.left=step * -100+"%";
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
thumbnails.forEach((item,index)=>{
    item.addEventListener("click", function(e){
        e.preventDefault();
        const clickedIndex = index;
        let step = clickedIndex - photoIndex;
        photoIndex = clickedIndex;
        bulletClassReset();
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
    marker.style.left = e.offsetLeft+"px";
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
            if(matchMedia("screen and (max-width: 757px)").matches) {
                document.querySelector(".contact__address").classList.add("rotate-mobile");
            }else {
                document.querySelector(".contact__address").classList.add("rotate-in-2-br-cw");
            }
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
        const href = menu.getAttribute("href").substring(1);
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
