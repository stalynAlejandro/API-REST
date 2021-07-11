function showPassword() {
    var x = document.getElementById("Password");
    var y = document.getElementById("hide2");
    var z = document.getElementById("hide1");

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";

    }
}

function showPasswordConfirmation() {
    var x = document.getElementById("PasswordConfirmation");
    var y = document.getElementById("hide4");
    var z = document.getElementById("hide3");

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";

    }
}

/*var email = document.forms["vform"]["email"];
var pass = document.forms["vform"]["password"];
var password_confirmation = document.forms["vform"]["confirmpassword"];

var email_error = document.getElementById("email_error");
var pass_error = document.getElementById("pass_error");

email.addEventListener("blur", emailVerify, true);
pass.addEventListener("blur", passVerify, true);

function Validate() {
    if (email.value == "") {
        email.style.border = "1px solid red";
        email_error.textContent = "Por favor, introduce tu email";
        email.focus();
        return false;
    }

    if (password.value == "") {
        password.style.border = "1px solid red";
        password_error.textContent = "Por favor, introduce tu email";
        password.focus();
        return false;
    }

    if (password.value != confirmpassword.value) {
        password.style.border = "1px solid red";
        confirmpassword.style.border = "1px solid red";
        pass_error.innerHTML = "Las contraseñas no coinciden";
        return false;
    }
}



function emailVerify() {
    if (email.value != "") {
        email.style.border = "1px solid blue";
        email_error_innerHTML = "";
        return true;
    }
}

function passVerify() {
    if (password.value != "") {
        password.style.border = "1px solid blue";
        password_error_innerHTML = "";
        return true;
    }
}*/
