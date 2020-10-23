gsap.registerPlugin(ScrollTrigger);
const video = document.querySelector("video");
const parentVideo = video.parentElement;
const main = document.querySelector("#main");
const logo = document.querySelector("#logo");
// const blockquote = document.querySelector(".blockquote");
// console.log(logo);

//HEADER Section
let getFirstChild;
const linkMenuParent = document.querySelector(".nav-item"); //Parent
const links = [...document.body.querySelectorAll(".nav-link-opt")];
const langs = [...document.body.querySelectorAll(".lang")];

//navBar
const socialContainer = document.querySelector(".social-container");
const navBar = document.querySelector(".navbar");

class App {
    constructor() {
        this.init();
        this.navBar();

    }
    init() {
        video.addEventListener("ended", () => {
            this.showAndHide(parentVideo, main);
        });
    }
    showAndHide(h, s) {
        gsap.to(h, {
            duration: 0.5,
            opacity: 0,
            ease: Power1.easeOuteaseOut,
            onComplete: () => {
                //Quienes Somos
                h.remove();
                gsap.to("#heroH1, #heroH2", 2, {
                    opacity: 1,
                    stagger: 0.5,
                    scale: 1,
                    ease: Elastic.easeOut.config(1, 1),
                    delay: .5,
                });
            },
        });
        gsap.to(s, {
            duration: 0.8,
            display: "block",
            opacity: 1,
            visibility: "visible",
            delay: 0.2,
            ease: Power1.easeInOut,
            onComplete: (e) => {
                //Animated Quote Section
                gsap.set('.blockquote', {
                    autoAlpha: 0,
                    scale: 1.4,
                })
                gsap.to(".blockquote", {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: "#quoteBlock",
                        // markers: true,
                        toggleActions: "restart",
                        // start: "-=100",
                        end: "-=300",
                        scrub: true,
                    },
                });
                //Animated QUIENES SOMOS? Section
                gsap.set('.animateBox', {
                    y: -80,
                    autoAlpha: 0
                })
                gsap.to('.animateBox', {
                    autoAlpha: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: "#whoWeAre",
                        // markers: true,
                        toggleActions: "restart",
                        start: "-=400",
                        end: "-=200",
                        scrub: true,
                    },

                })
            },
        });
    }

    navBar() {
        window.addEventListener("scroll", function(e) {
            e.preventDefault();
            e.stopPropagation();
            // console.log(window.scrollY);
            if (window.pageYOffset > 0) {
                socialContainer.classList.add("fixed-bottom");
                navBar.classList.add("fixed-top");
                logo.classList.add("resizeLogo");
            } else {
                socialContainer.classList.remove("fixed-bottom");
                navBar.classList.remove("fixed-top");
                logo.classList.remove("resizeLogo");
            }
        });

        //ACTIVE CLASS ADD/REMOVE
        getFirstChild = linkMenuParent.firstChild.classList.add("active");
        links.map((x) => {
            x.addEventListener("click", (e) => {
                e.preventDefault();
                for (let link in links) {
                    links[link].classList.remove("active");
                }
                x.classList.add("active");
                console.log(x);
                if (x.innerText === "Concreto") {
                    alert("test");
                }
            });
        });

        //MULTI LANGUAGE
        fetch("../assets/js/lang.json", {})
            .then((response) => response.json())
            .then((data) => {
                // debugger;
                langs.map((e) => {
                    e.addEventListener("click", function(e) {
                        e.preventDefault();
                        console.log(e.currentTarget);
                        if (e.currentTarget.getAttribute("data-language") === "esp") {
                            console.log('Espanol');
                            window.location.hash = "esp";
                            heroH1.innerText = data.quieneSomos.title;
                            heroH2.innerText = data.quieneSomos.par1;
                            quote.innerHTML = data.quieneSomos.quoteEs;
                            whoWeAreArticle.innerHTML = data.quieneSomos.whoWeAreArticleEs;
                            concreteBoxLeft.innerHTML = data.concreto.boxLeftEs;
                            concreteBoxRightTitle.innerHTML = data.concreto.concreteBoxRightTitleEs;
                            concretoTitle.innerHTML = data.concreto.concretoTitleEs;
                        } else {
                            console.log('English');
                            window.location.hash = "eng";
                            heroH1.innerText = data.whoWeAre.title;
                            heroH2.innerText = data.whoWeAre.par1;
                            quote.innerHTML = data.whoWeAre.quoteEn;
                            whoWeAreArticle.innerHTML = data.whoWeAre.whoWeAreArticleEn;
                            concreteBoxLeft.innerHTML = data.concrete.boxLeftEn;
                            concreteBoxRightTitle.innerHTML = data.concrete.concreteBoxRightTitleEn;
                            concretoTitle.innerHTML = data.concrete.concretoTitleEn;

                        }
                    });
                });
            });
    }

}
//Load Global Function
let loadGlobalFunction = () => (window.start = new App());
loadGlobalFunction();

$('.videoModal').on('hide.bs.modal', function(e) {
    var $if = $(e.delegateTarget).find('video');
    var src = $if.attr("src");
    $if.css('opacity', '1');
    $if.attr("src", 'files/img/video/video_macro.mp4');
    $if.attr("src", src);
});