console.log(document);

// const heading = document.querySelector("h1");
// console.log(heading);

// const value = document.querySelector(".value");
// console.log(value);

// const button = document.querySelector("button");
// console.log(button);

// const div = document.querySelector(".stat");
// console.log(div);

// const hello = document.querySelector("hello");
// console.log(hello); // null is returned because there are no elements with the class hello.

// const buttons = document.querySelectorAll("button");
// console.log(buttons);

// const heading3List = document.querySelectorAll("h3");
// for (let element of heading3List.values()) {
//   console.log(element);
//  }

// // for (let i = 0; i < heading3List.length; i++) {
// //   const element = heading3List[i];
// //   console.log(element);
// // }

// const ratings = document.querySelectorAll("#rating");
// for (let rate of ratings.values()) {
//     console.log(rate);
// }

// const areas = document.querySelectorAll("#area");
// for (let i = 0; i < areas.length; i++) {
//     const element = areas[i];
//     console.log(element);
// }


const descriptions = document.querySelectorAll(".description-display");
for (let desc of descriptions.values()) {
    let content = desc.innerText;

    if (content.length > 250) {
        content = content.slice(0, 250);
        content = content + '<a href="#">...</a>';
    }
    desc.innerHTML = content;
  }


  const ratings = document.querySelectorAll(".rating-display .value");
  for (let rating of ratings) {
    let ratingValue = parseFloat(rating.innerText);
    if (ratingValue > 4.7) {
        rating.style.fontWeight = "high-rating";
        rating.style.color = "value";
    }
  }


  // create a DOM element
  // inform user how many parks are on webpage to visit
  //selec the parks on the page using PARK class as selector
  const parks = document.querySelectorAll(".parks-display"); // start by making a new variable to hold that info
  const numberParks = parks.length; //then create variable to hold the length of the class
  const newElement = document.createElement("div"); //this create the new element. should use DIV
  // now we have an empty element, but we have access to all the properties and methods
  // that were used to modify an element.
  // now set the text of this element with innerText property
  newElement.innerText = `${numberParks} exciting parks to visit`;
  
console.log(newElement.innerText); // 0 exicting parks to visit -- is logged


// we made changes to CSS file and added .header-statement { color and fontsize}

  newElement.classList.add("header-statement"); // now we can add the newElement inner text into that element

  const header = document.querySelector("header"); 
  //add the new  element to the DOM. select header element and the use appendChild method to add the
  // new element to the header
  header.appendChild(newElement);
  // now, we will see "0 exciting parks to visit" on the header under National parks.


  // =============== removing DOM elements ====================
/*
  const main = document.querySelector("main");
  const park = main.querySelector(".park-display");

  main.removeChild(park);
*/

// ================= event listeners ===========================

const firstBtn = document.querySelector("button"); // this selects a button on the page
// then we want to add the addEventListener method for this button

firstBtn.addEventListener("click", (event) => {
  console.log("You clicked the button", event.target);
})
// this will log 'you clicked button' when the button is pressed for the first one only!
// using event.target allows you to use the target info as a value.

// select all of the buttons for all the parks
const allBtns = document.querySelectorAll(".rate-button");

// iterate through the list of buttons and add an event handler
/*
allBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target.parentNode);
  });
  
}); */ 
// then you click any button, you will now see <button class="rate-button" title="add to Fav">
// it provides the additional information that we can use. 
// but, we get the same result regardless of the park we picked.
// to make it more specific for that park, add the parentNode.

// after adding the parentNode as a .notation, we now see <section class="park-display">
// section>div/button element

// we can manipulate the element in any way we want. 
// example:

// allBtns.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     const park = event.target.parentNode;
//     park.style.backgroundColor = "#c8e6c9";
//      // this now changes the webpage to have a green background after clicking the fav star.
//   });
// });

const favoriteButtonClickHandler = (event) => {
  const park = event.target.parentNode;
  park.style.backgroundColor = "#c8e6c9";
}



// ===== adding event listener to the sort/name ===========
/*
const nameSorter = document.querySelector("#name-sorter");
// create variable for the nameSorter link
// now add event listener

nameSorter.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("You clicked the name sorter");
});


// after creating this new event listener, upon clikcing the sort by name, it auto refreshes the page
// why? bc the default behavior of a link is to follow the link
// you can stop this from using preventDefault()  method of the event object.
// now when you click the name sort button, it will count in the console # of clicks. 

// now we want to have the button reorganize parks by name
// here is what we will do:
// 1. get the main element since that contains all the parks - line 163
// 2. get a NodeList of all the parks
// 3. then empty the main element, so we can rearrange after. page will be missing park info content

const main = document.querySelector("main");

const parksList = main.querySelectorAll(".park-display"); 

main.innerHTML = ""; // this emptys the main element, webpage is blank. then we need to sort array

// 4. create a new array to hold the NodeList using array.from() method
const parksArray = Array.from(parksList);
*/ 
// 5. now we need to use sort() method to have in alphabetical order, parkA<parkB
const sortByName = (parkA, parkB) => { // write a function that defines how to sort the parks
  const parkAName = parkA.querySelector("h2").innerText; // use h2 since parks are the innerText of
  const parkBName = parkB.querySelector("h2").innerText; // h2 element.
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  }else {
    return 0;
  };
};
/*
// 6. now we need to iterate over the sorted array and append each park element BACK to the main element that we emptied
parksArray.forEach((park) => {
  main.appendChild(park);
})
*/ // commenting out this portion bc there is a better way to refractor code. see below for new way

const nameSorterClickHandler = (event) => { // function for handing the nameSorter click
  event.preventDefault();

  const main = document.querySelector("main"); // 1. get the main element
  const parksList = main.querySelectorAll(".park-display"); // 2. get the list of parks
  main.innerHTML = ""; // 3. empty the main element
  const parksArray = Array.from(parksList); // 4. create an array from the parksList
  parksArray.sort(sortByName); //sort the array with function above on 173
  parksArray.forEach((park) => { // insert each park into the DOM
    main.appendChild(park);
  });

};
// select the name-sorter link
//const nameSorter = document.querySelector("#name-sorter");

//nameSorter.addEventListener("click", nameSorterClickHandler); // finally add event listener

// ========================= sort parks by rating - DO THIS =================================.


const sortByRating = (rateA, rateB) => {
  const rateAName = parseFloat(rateA.querySelector(".rating-display > .value").innerText);
  const rateBName = parseFloat(rateB.querySelector(".rating-display > .value").innerText);

  return rateBName - rateAName;
};

const ratingSorterClickHandler = (event) => {
  event.preventDefault();

  const main = document.querySelector("main");
  const parksList = main.querySelectorAll(".park-display");
  main.innerHTML = "";
  const parksArray = Array.from(parksList);
  parksArray.sort(sortByRating);

  parksArray.forEach((park) => {
    main.appendChild(park);
  });

};

const main = () => {
  const nameSorter = document.querySelector("#name-sorter");
  nameSorter.addEventListener("click", nameSorterClickHandler);

  const ratingSorter = document.querySelector("#rating-sorter");
  ratingSorter.addEventListener("click", ratingSorterClickHandler);
   const allBtns = document.querySelectorAll(".rate-button");
   allBtns.forEach((btn) => {
     btn.addEventListener("click", favoriteButtonClickHandler);
  });
};
window.addEventListener("DOMContentLoaded", main);


console.log("before!");

window.addEventListener("DOMContentLoaded", main);


console.log("after!");


// const ratingSorter = document.querySelector("#rating-sorter");
// ratingSorter.addEventListener("click", ratingSorterClickHandler);