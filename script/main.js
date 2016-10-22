var user = null;
var response = null;
var login_form = document.getElementById("login_form");
var logout_text = document.getElementById("logout_text");
var login_name = document.getElementById("login_name");
var username = document.getElementById('username');
var password = document.getElementById('password');
var lastImage = 0;
var pahe = 0;
whoami();
changePage(window.location.hash);

function addClass(el, className) {
    if (!el.classList.contains(className)) {
        el.classList.add(className);
    }
}

function removeClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);
    }
}

function login(usernameValue, passwordValue) {
    if (usernameValue === undefined) {
        usernameValue = username.value;
    }
    if (passwordValue === undefined) {
        passwordValue = password.value;
    }
    username.value = "";
    password.value = "";

    ajaxPost(
        "php/login.php",
        "login=" + usernameValue + "&passwd=" + passwordValue,
        function(response) {
            user = JSON.parse(response);
            if (!user) {
                addClass(username, "input-error");
                addClass(password, "input-error");
                document.getElementById("login_error").style.display = "flex";
            } else {
                showLogout();
				changePage("");
            }
            ShowHideButton();
        });
}

function whoami() {
    ajaxPost("php/whoami.php", null, function(response) {
        user = JSON.parse(response);
        if (!user) {
            showLogin();
        } else {
            showLogout();
        }
    });
}

function logout() {
    ajaxPost("php/logout.php", null, function(response) {
        user = JSON.parse(response);
        if (!user) {
            showLogin();
			changePage("");
        } else {
            console.log("Oh no");
        }
        ShowHideButton();
    });
}

function showLogin() {
    login_form.style.display = "flex";
    logout_text.style.display = "none";
}

function showLogout() {
    login_name.innerHTML = user.firstname.toUpperCase();
    login_form.style.display = "none";
    logout_text.style.display = "flex";
}

function ajaxPost(url, send, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.response);
        }
    };
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(send);
}

function loadPartial(page, callback) {
    ajaxPost(page, null, function(response) {
        if (response) {
            document.getElementById('main').innerHTML = response;
            if (callback !== undefined) {
                callback();
            }
        } else {
            console.log("Oh no. Could not load page " + page);
            alert("Oh no. Could not load page " + page);
        }
    });
}

function changePage(url) {
    if (window.stream && window.stream.getTracks().length === 1) {
        stream.getTracks()[0].stop();
    }
    if (url === "" || url === "#/" || url === "#") {
		console.log("Home");
        loadPartial("home.html", function() {
            ShowHideButton();
			pahe = 0;
            getImages();
        });
        history.replaceState(null, null, "#");
        return;
    }
    if (url.match(/#\/confirm\/.+/)) {
        var uri = 'uri=' + url.substring(url.indexOf('confirm/') + 8);
        ajaxPost("php/confirm.php", uri, function(response) {
            var result = JSON.parse(response);
            if (JSON.parse(result)) {
                loadPartial("confirmed.html");
            } else {
                loadPartial("confirm_error.html");
            }
        });
        loadPartial("confirming.html");
    }
    if (url.match(/#\/reset\/?.*/)) {
		if (url.match(/#\/reset\/.+/)) {
			loadPartial("reset_password.html");
		} else {
			loadPartial("reset.html");
		}
    } else {
        switch (url) {
            case "#/register":
                {
                    loadPartial("create_user.html");
                    break;
                }
            case "#/capture":
                {
                    loadPartial("capture.html", setupWebcam);
                    break;
                }
            case "#/check_email":
                {
                    loadPartial("check_email.html");
                    break;
                }
            case "#/check_email_reset":
                {
                    loadPartial("check_email_reset.html");
                    break;
                }
            case "#/reset_success":
                {
                    loadPartial("reset_success.html");
                    break;
                }
			case "#/now_what":
				{
					loadPartial("now_what.html");
					break;
				}
            default:
                {
                    loadPartial("404.html");
                }
        }
    }
}

window.onhashchange = function() {
    changePage(window.location.hash);
};

function ShowHideButton() {
    document.getElementById('add-button').style.display = (user) ? "flex" : "none";
}