let username = document.getElementById("username");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let message = document.getElementById("message");

loginBtn.onclick = function(){
if(username.value === ""){
username.style.border = "2px solid red";
message.innerHTML = "Please enter username";
return;
}

if(password.value === ""){
password.style.border = "2px solid red";
message.innerHTML = "Please enter password";
return;
}

localStorage.login = "true";
window.location.href = "1.html";
};

username.oninput = function(){
username.style.border = "1px solid #B8A06A";
message.innerHTML = "";
}

password.oninput = function(){
password.style.border = "1px solid #B8A06A";
message.innerHTML = "";
}
