function go(){
    user_name=document.getElementById("user_name").value;
    if (user_name === "") {
        alert("Please enter a username!");
    }else{
    localStorage.setItem("user_name",user_name);
    window.location="funny.html";
    }
}