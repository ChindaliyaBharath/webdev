const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut

        })
        .to(".boundingelem", {
            y: 0,
            // opacity: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: .2

        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut

        })
}

var timeout;

function circleAnim() {
    // define default scale value
    var xscale = .5;
    var yscale = .5;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        // var xdiff = dets.clientX - xprev;
        // var ydiff = dets.clientY - yprev;
        this.clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientX - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = this.setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`;
        }, 100);

    });
}

circleAnim();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mouseover", function(dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    });
};

circleMouseFollower();
firstPageAnim();



document.querySelectorAll(".elem").forEach(function(elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        })

    });
});


document.querySelectorAll(".elem").forEach(function(elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = rotate - details.clientX;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),

        })

    });
});