let navOut = false;
let navRecent = false;
let blinkInterval;

$(document).ready(function () {
    prepContent();
    resetNav();
    carousel();
})

let opening = true;

/* Begin background carousel */
function carousel() {
    $(".carousel").carousel({
        interval: 7500,
        pause: false,
        ride: "carousel"
    })
}

/* Hide content containers on load */
function prepContent() {
    for (let i = 1; i < 5; i++) {
        document.getElementById("left-" + i).style.display = "none";
        document.getElementById("right-" + i).style.display = "none";
    }
}

/* Emulate login on Authenticate */
function emulateLogin(username) {
    if (username == "") {
        username = "Agent";
    }
    blinkText("#welcome", "", "$CMD: WELCOME BACK, " + username);
    document.getElementById("container").style.opacity = "1";
    document.getElementById("login").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("login").style.display = "none";
    }, 500);
}

/* Set navbar active */
/* function styleNav(num) {
    resetNav();
    document.getElementsByClassName("nav-link")[num - 1].classList.add("active");
} */

/* Remove active on all navbar links */
function resetNav() {
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("nav-link")[i].classList.remove("active");
        document.getElementsByClassName("nav-item")[i].classList.remove("padding");
    }
}

/* Animate content transitions */
function containerOpen(num) {
    if (navRecent == false) {
        navRecent = true;
        navOut = false;

        clearInterval(blinkInterval);
        resetNav();
        navBlink(num);

        // styleNav(num);
        document.getElementsByClassName("welcome")[0].style.opacity = "0";

        setTimeout(() => {
            document.getElementsByClassName("welcome")[0].style.display = "none";
        }, 500);

        if (screen.width < 400) {
            document.getElementsByClassName("nav-item")[num - 1].classList.add("padding");
            setTimeout(() => {
                document.getElementById("navbar-toggler").click();
            }, 500);
            navOut = true;
        }

        setTimeout(() => {
            switch (num) {
                case 1:
                    animateMercs(0);
                    break;
                case 2:
                    animateMercs(6);
                    break;
                case 3:
                    animateMercs(12);
                    break;
                case 4:
                    animateMercs(18);
                    break;
            }
        }, 1400);

        for (let i = 1; i < 5; i++) {
            animateContent(i, 0, 0, "-10vw", "-50vw", "none");
        }

        setTimeout(() => {
            if (screen.width >= 400) {
                animateContent(num, 1, 1, 0, 0, "block");
            } else {
                animateContent(num, 0, 1, 0, 0, "block");
            }
        }, 525);

        setTimeout(() => {
            navRecent = false;
        }, 525);
    }
}

/* Animate merc rows */
function animateMercs(num) {
    let timer = 0;
    for (let i = num; i < num + 5; i++) {
        setTimeout(() => {
            document.getElementsByClassName("profile")[i].style.opacity = "0.2";
            setTimeout(() => {
                document.getElementsByClassName("profile")[i].style.opacity = "1";
            }, 300);
        }, timer);
        timer += 100;
    }
}

/* Animate nav item blink */
function navBlink(num) {
    document.getElementsByClassName("nav-link")[num - 1].classList.add("active");
    setTimeout(() => {
        document.getElementsByClassName("nav-link")[num - 1].classList.remove("active");
    }, 500);
    blinkInterval = setInterval(() => {
        document.getElementsByClassName("nav-link")[num - 1].classList.add("active");
        setTimeout(() => {
            document.getElementsByClassName("nav-link")[num - 1].classList.remove("active");
        }, 500);
    }, 1000);
}

/* Execute content transition animations */
function animateContent(containerNum, leftOpacityNum, rightOpacityNum, leftNum, rightNum, display) {
    $("#left-" + containerNum).fadeTo(500, leftOpacityNum).animate(
        { "left": leftNum },
        {
            duration: 500, queue: false, easing: 'easeInOutQuart', complete: function () {
                document.getElementById("left-" + containerNum).style.display = display; /* This sets a block to either "display: none" or "display: block" */
                $("#right-" + containerNum).fadeTo(500, rightOpacityNum).animate(
                    { "right": rightNum },
                    {
                        duration: 500, queue: false, easing: 'easeInOutQuart', complete: function () {
                            document.getElementById("right-" + containerNum).style.display = display; /* This sets a block to either "display: none" or "display: block" */
                        }
                    }
                );
            }
        }
    );
}

/* Animate welcome text */
function blinkText(object, string, text) {
    var i = 0;
    var displayStringOn = string + "_";
    var displayStringOff = string + "&nbsp;";
    var interval = setInterval(function () {
        $(object).html(displayStringOn);
        var timeout = setTimeout(function () {
            $(object).html(displayStringOff);
        }, 500);
        i++;
        if (i == 3 && opening == true) {
            opening = false;
            clearInterval(interval);
            clearTimeout(timeout);
            $(object).html("");
            writeText(text);
        }
    }, 1000);
}

function writeText(text) {
    $("#welcome").append(text[0]);
    i = 1;
    var interval = setInterval(function () {
        $("#welcome").append(text[i]);
        i++;
        if (i == text.length) {
            clearInterval(interval);
            blinkText("#subwelcome", "");
        }
    }, 50);
}

/* Change mercenary card content */
function cardSet(name) {
    document.getElementById("merc-card").innerHTML = "<i class='fas fa-fingerprint'></i> " + name;
    document.getElementById("card-header").innerHTML = "<img  src='images/mercs/" + name + "-large.png' />"
}

/* Custom nav animation */
function animateNav() {
    if (navOut == false) {
        let timer = 0;
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                document.getElementsByClassName("nav-link")[i].style.opacity = "0.2";
                setTimeout(() => {
                    document.getElementsByClassName("nav-link")[i].style.opacity = "1";
                }, 300);
            }, timer);
            timer += 100;
        }

        setTimeout(() => {
            flashNav();
            setTimeout(() => {
                flashNav();
            }, 100);
        }, 1000);
        navOut = true;
    } else {
        navOut = false;
    }
}

function flashNav() {
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("nav-link")[i].style.visibility = "hidden";
        setTimeout(() => {
            document.getElementsByClassName("nav-link")[i].style.visibility = "visible";
        }, 50);
    }
}