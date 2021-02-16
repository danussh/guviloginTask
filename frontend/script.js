var url = "http://localhost:4040/"
var str=""

// login user

async function loginUser() {
    let email = document.getElementById("loginemail").value
    let password = document.getElementById("loginpassword").value
    localStorage.setItem("email", email);
    localStorage.getItem("email")


    try {
        let result = await fetch(url + "login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        let resultData = await result.json()
        if(resultData.message ==="login successful")
        {
            
            window.location.href="profile.html"
        }
        else if(resultData.message==="Email not found")
        {
            alert("Email Not Registered")
        }else
        {
            alert("Password Did not match")
        }
    } catch (error) {
        console.log(error)
    }

}
///////////////////////////////////////////////////////////////////

// signup user
async function signupUser() {
    if(document.getElementById("firstname").value ==""){
        alert("Name Required")
    }else if(document.getElementById("age").value==""){
        alert("Age Required")
    }
    else if(document.getElementById("contact").value==""){
        alert("contact Required")
    }
    else if(document.getElementById("signupemail").value==""){
        alert("Email Required")
    }else if(document.getElementById("password").value==""){
        alert("password Required")
    }
    else{
    let name = document.getElementById("firstname").value
    let age = document.getElementById("age").value
    let contact = document.getElementById("contact").value
    let email = document.getElementById("signupemail").value
    let password = document.getElementById("password").value
    try {
        let result = await fetch(url + "register", {
            method: "POST",
            body: JSON.stringify({ name, age, contact, email, password }),
            headers: {
                "content-type": "application/json"
            },
        })
        let resultData = await result.json();
        if(resultData.message==="registration successful"){
            alert("Registration Sucessfull")
            window.location.href="index.html"
        }
    } catch (error) {
        console.log(console.error())
    }
}
}
//////////////////////////////////////////////////////////////////

