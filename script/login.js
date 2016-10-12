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

function logIn() {
    var http = new XMLHttpRequest();
    var login = document.getElementById('username');
    var passwd = document.getElementById('password');
    http.onreadystatechange = function() {
        var res = JSON.parse(http.response);
        if (http.readyState == 4 && http.status == 200) {
            if (res === "No no no no no") {
                addClass(login, "input-error");
                addClass(passwd, "input-error");
                alert("Incorrent username or password");
            } else {
                removeClass(login, "input-error");
                removeClass(passwd, "input-error");
                document.getElementById('login').innerHTML = res.firstname + " <a href=\"#\" onclick='logout()'>LOGOUT</a>";

            }

        }
    };
    http.open("POST", "php/login.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (login.value && passwd.value) {
        http.send("login=" + login.value + "&passwd=" + passwd.value);
    }
}