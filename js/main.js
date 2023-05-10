"use strict";

import 'regenerator-runtime/runtime';

// 1. połączenie HTML z JS
// 2. dodać event listener na kliknięcie buttona
// 3. na kliknięcie pobierz dane
// 4. zupdatuj url o zapytanie użytkownika
// 5. wyświetl wynik

const showResult = (result) => {
  const { i: image, l: label } = result;
  output.innerHTML += `
    <br />
    <p>${label}</p>
    <img alt="${label}" src="${image.imageUrl}" width="500">
    <hr/>
  `
}

const getData = async (searchValue) => {
  const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(searchValue)}`

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const { d: data } = result;
    data.forEach(showResult);
  } catch (error) {
    console.error(error);
  }
}


const search = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const output = document.querySelector('#js-output');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '756ab52cf2msh6e63525a3677824p175c96jsn658e8fc788bd',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

searchButton.addEventListener("click", async () => {
  const inputValue = search.value;
  output.innerHTML = "";
  await getData(inputValue);
  search.value = "";
})


// Async / Await z promisami


// const getUserData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("1. get user data");
//       resolve({ name: "Jan" });
//     }, 600)
//   })
// }
//
// const registerUser = (user) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`2. register user: ${user.name}`);
//       resolve({name: user.name, id: 83783738});
//     }, 400)
//   })
// }
//
// const sendEmail = (registeredUser) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`3. send confirmation email to ${registeredUser.name} with id ${registeredUser.id}`);
//       resolve();
//     }, 500)
//   })
// }
//
// getUserData()
//   .then((user) => registerUser(user))
//   .then((registeredUser) => sendEmail(registeredUser))
//   .then(() => {
//     console.log("end!");
// })
//
// async function myAsyncFunction() {
//   const user = await getUserData();
//   const registeredUser = await registerUser(user);
//   await sendEmail(registeredUser);
//   console.log("end!");
// }
//
// myAsyncFunction();
