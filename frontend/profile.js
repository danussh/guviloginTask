//display data on profile 

showdata();
function showdata() {
    var email = localStorage.email
  fetch(`http://localhost:4040/login/${email}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      var td=document.createElement('td')
      td.setAttribute("class","tdata");
      td.innerHTML=`${data.name}`
      document.getElementById("data").append(td)
      var td=document.createElement('td')
      td.setAttribute("class","tdata");
      td.innerHTML=`${data.age}`
      document.getElementById("data").append(td)
      var td=document.createElement('td')
      td.setAttribute("class","tdata");
      td.innerHTML=`${data.contact}`
      document.getElementById("data").append(td)
      var td=document.createElement('td')
      td.setAttribute("class","tdata");
      td.innerHTML=`${data.email}`
      document.getElementById("data").append(td);  
      document.getElementById("data").append(td)

    });
}
//update
async function update() {
    var email = localStorage.email
    fetch(`http://localhost:4040/login/${email}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
  var id = data._id
  let name=document.getElementById("name").value;
  console.log(name)
  let age=document.getElementById("age").value;
  let contact=document.getElementById("contact").value;
    fetch(`http://localhost:4040/register/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, age, contact }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
       alert("Updated");
       location.reload()
    });
    });
}
////////////////////////////////////////////////////////////////////

function logout(){
    window.location.href="index.html"
}
