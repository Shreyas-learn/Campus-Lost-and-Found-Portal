document.getElementById("foundForm")?.addEventListener("submit", async function(e){

  e.preventDefault()

  const formData = new FormData(this)

  await fetch("/api/reportFound",{
    method:"POST",
    body:formData
  })

  alert("Found item submitted!")

})



document.getElementById("lostForm")?.addEventListener("submit", async function(e){

  e.preventDefault()

  const data = {
    title: this.title.value,
    description: this.description.value,
    category: this.category.value,
    location_lost: this.location_lost.value,
    date_lost: this.date_lost.value
  }

  await fetch("/api/reportLost",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })

  alert("Lost item submitted!")

})



let allItems = []


if(document.getElementById("itemsContainer")){

  fetch("/api/foundItems")
  .then(res => res.json())
  .then(data => {

    allItems = data
    displayItems(allItems)

  })

}



function displayItems(data){

  const container = document.getElementById("itemsContainer")
  container.innerHTML = ""

  data.forEach(item => {

    const div = document.createElement("div")
    div.className = "card"

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><b>Location:</b> ${item.location_found}</p>

      <p>
        <b>Status:</b> 
        ${
          item.returned 
          ? '<span style="color:red;">Returned</span>' 
          : '<span style="color:green;">Available</span>'
        }
      </p>

      ${
        item.image 
        ? `<img src="/uploads/itemImages/${item.image}" />` 
        : `<p>No Image</p>`
      }

      ${
        item.returned 
        ? '' 
        : `<button onclick="claimItem('${item._id}')">Claim</button>`
      }
    `

    container.appendChild(div)

  })

}



function filterItems(type){

  let filtered = allItems

  if(type === "available"){
    filtered = allItems.filter(i => !i.returned)
  }

  if(type === "returned"){
    filtered = allItems.filter(i => i.returned)
  }

  displayItems(filtered)

}



function claimItem(id){

  const name = prompt("Enter your name:")
  const message = prompt("Why is this yours?")

  if(!name || !message){
    alert("All fields required")
    return
  }

  fetch("/api/claimItem",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      item_id: id,
      claimed_by: name,
      message: message
    })
  })
  .then(()=> alert("Claim submitted!"))

}

if(document.getElementById("matchContainer")){

  fetch("/api/match")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("matchContainer")

    data.forEach(pair => {

      const div = document.createElement("div")
      div.className = "card"

      div.innerHTML = `
        <h3>Lost Item</h3>
        <p>${pair.lost.title}</p>

        <h3>Found Item</h3>
        <p>${pair.found.title}</p>

        ${
          pair.found.image
          ? `<img src="/uploads/itemImages/${pair.found.image}" />`
          : ""
        }
      `

      container.appendChild(div)

    })

  })

}

if(document.getElementById("claimsContainer")){

  fetch("/api/claims")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("claimsContainer")

    data.forEach(claim => {

      const div = document.createElement("div")
      div.className = "card"

      div.innerHTML = `
        <p><b>Item ID:</b> ${claim.item_id}</p>
        <p><b>Claimed By:</b> ${claim.claimed_by}</p>
        <p><b>Message:</b> ${claim.message}</p>
        <p><b>Status:</b> ${claim.status}</p>

        <button onclick="approveClaim('${claim._id}')">Approve</button>
        <button onclick="rejectClaim('${claim._id}')">Reject</button>
      `

      container.appendChild(div)

    })

  })

}
function approveClaim(id){

  fetch("/api/approveClaim",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({claim_id:id})
  })
  .then(()=> alert("Approved"))

}

function rejectClaim(id){

  fetch("/api/rejectClaim",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({claim_id:id})
  })
  .then(()=> alert("Rejected"))

}