var user = null;
var response = null;
var login_form = document.getElementById("login_form");
var logout_text = document.getElementById("logout_text");
var login_name = document.getElementById("login_name");
var username = document.getElementById('username');
var password = document.getElementById('password');
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

function login() {
    ajaxPost(
		"php/login.php",
		"login=" + username.value + "&passwd=" + password.value,
		function(response) {
			user = JSON.parse(response);
			if (!user) {
		        addClass(username, "input-error");
		        addClass(password, "input-error");
		        document.getElementById("login_error").style.display = "flex";
		    } else {
		        showLogout();
		    }
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
		} else {
			console.log("Oh no");
		}
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

function loadPartial(page) {
	ajaxPost(page, null, function(response) {
		if (response) {
			document.getElementById('main').innerHTML = response;
		} else {
			console.log("Oh no. Could not load page " + page);
			alert("Oh no. Could not load page " + page);
		}
	});
}

function changePage(url) {
	switch (url) {
		case "#" : {
			loadPartial("index_page.html");
			break;
		}
		case "#/register" : {
			loadPartial("create_user.html");
			break;
		}
		case "#home" : {
			break;
		}
		default : {
			loadPartial("404.html");
		}
	}
}

window.onhashchange = function() {
	changePage(window.location.hash);
};