const submitHandler = (event) => {
    event.preventDefault(); // always need prevent default to stop behavior
    //console.log("The form was submitted");

    //const parkName = document.querySelector("#name-input").value; // this will get the data from the form
   //console.log(parkName); // this will show the name of park on console.

    const form = event.target;
    const formData = new FormData(form); 
    // create a new variable to hold the form data

    const errors = validateForm(formData)

    const errorElements = document.querySelectorAll(".error");
    for (let element of errorElements) {
        element.style.display = "none";
    }
    //const name = formData.get("name");
    //console.log(name);  

    Object.keys(errors).forEach((key) => {
        const errorElement = document.querySelector(`#${key}-form .error`);
        errorElement.innerHTML = errors[key];
        errorElement.style.display = "block";
    })

    // ===== adding the 'add park to dom' code =========

    if (!Object.keys(errors).length) {
        //create a new element
        const parkSection = document.createElement("section")

        //this will add the park class
        parkSection.classList.add("park-display");

        // now construst the innerHTML for the element
        const content = `
            <h2>${formData.get("name")}</h2>
            <div class="location-display">${formData.get("location")}</div>
            <div class="description-display">${formData.get("description")}</div>
            <button class="rate-button" title="Add to Favourites">&#9734;</button>
            <div class="stats">
            <div class="established-display stat">
                <h3>Established</h3>
                <div class="value">${moment(formData.get("established")).format(
                "MMMM D, YYYY"
                )}</div>
            </div>
            <div class="area-display stat">
                <h3>Area</h3>
                <div class="value">${formData.get("area")}</div>
            </div>
            <div class="rating-display stat">
                <h3>Rating</h3>
                <div class="value">${formData.get("rating")}</div>
            </div>
            </div>
            `;
            // create innerHTML to hold content variable
            parkSection.innerHTML = content;
            document.querySelector("main").appendChild(parkSection);
            }
};

const main = () => {
    const form = document.querySelector("#park-form")
    form.addEventListener("submit", submitHandler);
};

window.addEventListener("DOMContentLoaded", main);

function validateExists(value) {
    return value && value.trim();

}


function validateNumber(value) {
    return !isNaN(value);
}

function validateRange(value, min, max) {
    return value >= min && value <= max;
}

// its good practice to have all of the code to perform the validation in one function
// this would make code more readable

function validateForm(formData) { // function accepts the formData object containg the data from the form
    const errors = {};            // it then checks each one to ensure that some value was entered

    if (!validateExists(formData.get("name"))) {
        errors.name = "Please enter a name";
    }
    if (!validateExists(formData.get("location"))) {
        errors.name = "Please enter a location of the park";
    }
    if (!validateExists(formData.get("description"))) {
        errors.name = "Please enter a short description";
    }
    if (!validateExists(formData.get("established"))) {
        errors.name = "Please enter a date";
    }
    if (!validateExists(formData.get("area"))) {
        errors.name = "Please enter the area of the park";
    }
    if (!validateExists(formData.get("rating"))) {
        errors.rating = "Please enter a rating";
    } else {
        if (!validateNumber(formData.get("rating"))) {
            errors.rating = "Rating must be a number";
        } else {
            const rating = number.parseFloat(formData.get("rating"));
            if (!validateRange(rating, 1, 5)) {
                errors.rating = "Rating must be between 1 and 5 inclusive"
            }
        }
    }

    return errors;
} // this function gets called from submitHandler