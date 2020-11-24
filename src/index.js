
document.addEventListener('DOMContentLoaded', () => {
    const URL = "http://localhost:3000/dogs"
    const form = document.getElementById("dog-form")
    const table = document.getElementById("table-body")

    const getDogs = () => {
        fetch(URL)
        .then(res => res.json())
        .then(json => getAllDogs(json))
    }

    const getAllDogs = (dogs) => {
        dogs.forEach((dog) => {
            getDog(dog)
        })
    }

    function getDog(dog) {
        let tableRow = document.createElement("tr")
        tableRow.id = dog.id

        let name = document.createElement("td")
        name.innerText = dog.name

        let breed = document.createElement("td")
        breed.innerText = dog.breed

        let sex = document.createElement("td")
        sex.innerText = dog.sex

        let edit = document.createElement("td")

        let btn = document.createElement("button")
        btn.innerText = "Edit"
        btn.addEventListener("click", () => {
        editDog(dog)
        })

        edit.appendChild(btn)
        tableRow.append(name, breed, sex, edit)
        table.appendChild(tableRow)

    }

    function editDog(dog) {
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex 
        form.dataset.id = dog.id  
    }
    form.addEventListener("submit", updateDog)

    function updateDog(ev) {
        ev.preventDefault()
        let dogID = ev.target.dataset.id
        const name = ev.target.name.value
        const breed =ev.target.breed.value
        const sex = ev.target.sex.value
    
        const attr = {
            "name": name,
            "breed": breed,
            "sex": sex
        }

        let options = {
            method: "PATCH",
            headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
            },
            body: JSON.stringify(attr)
        }

        fetch(URL + `/${dogID}` , options)
        .then(res => res.json)
        .then(json => {
            table.innerText = ""
            getDogs()
        })
    }

    getDogs()
})
