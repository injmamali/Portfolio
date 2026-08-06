/* =====================================
   Loading Screen
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.visibility = "hidden";

    }, 3000);

});


/* =====================================
   Custom Cursor
===================================== */

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursor2.style.left = (e.clientX - 20) + "px";
    cursor2.style.top = (e.clientY - 20) + "px";

});


/* =====================================
   Typing Animation
===================================== */

const words = [

    "Frontend Developer",
    "UI Designer",
    "JavaScript Developer",
    "Freelancer",
    "Creative Coder"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.querySelector(".typing");

function typeEffect(){

    let current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;

        }

    }

    else{

        typing.textContent = current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 50 : 120);

}

typeEffect();


/* =====================================
   Counter Animation
===================================== */

const counters = document.querySelectorAll(".counter");

const runCounter = () => {

    counters.forEach(counter=>{

        const target = +counter.dataset.target;

        const update = ()=>{

            let value = +counter.innerText;

            const increment = Math.ceil(target / 100);

            if(value < target){

                counter.innerText = value + increment;

                setTimeout(update,20);

            }

            else{

                counter.innerText = target;

            }

        };

        update();

    });

};

let counterStarted = false;

window.addEventListener("scroll",()=>{

    const stats = document.querySelector(".stats");

    if(!stats) return;

    const top = stats.getBoundingClientRect().top;

    if(top < window.innerHeight-100 && !counterStarted){

        counterStarted = true;

        runCounter();

    }

});


/* =====================================
   Mobile Menu
===================================== */

const menuBtn = document.getElementById("menu");

const nav = document.querySelector("nav");

menuBtn.onclick = ()=>{

    nav.classList.toggle("active");

};

document.querySelectorAll("nav a").forEach(link=>{

    link.onclick = ()=>{

        nav.classList.remove("active");

    };

});
/* =====================================
   Dark / Light Mode
===================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


/* =====================================
   Scroll To Top Button
===================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================
   Fade Reveal Animation
===================================== */

const fadeItems = document.querySelectorAll(
    ".about, .stats, .skills, .projects, .timeline, .certificate, .contact"
);

fadeItems.forEach(item => {

    item.classList.add("fade-up");

});

function revealAnimation() {

    fadeItems.forEach(item => {

        const position = item.getBoundingClientRect().top;

        if (position < window.innerHeight - 120) {

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealAnimation);

revealAnimation();


/* =====================================
   Active Navigation
===================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =====================================
   Cursor Hover Effect
===================================== */

const hoverItems = document.querySelectorAll(
    "a, button, .btn, .project-card, .skill-card, .info-card"
);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor2.style.transform = "scale(1.8)";
        cursor2.style.borderColor = "#6d5cff";

    });

    item.addEventListener("mouseleave", () => {

        cursor2.style.transform = "scale(1)";
        cursor2.style.borderColor = "#00d9ff";

    });

});


/* =====================================
   Smooth Scroll
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* =====================================
   Header Shadow On Scroll
===================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================
   Contact Form EmailJS
========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        emailjs.send(
            "service_j5vb8wn",
            "template_3viv8zl",
            {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
        )
        .then(function () {

            alert("✅ Message Sent Successfully!");

            contactForm.reset();

        })
        .catch(function (error) {

            console.error(error);

            alert("❌ Failed to send message.");

        });

    });

}

/* =====================================
   Console Message
===================================== */

console.log("%c🚀 Portfolio Developed by Inzmaam",
"color:#00d9ff;font-size:18px;font-weight:bold;");