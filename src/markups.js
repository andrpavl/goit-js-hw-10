import { countryInfo, countryList } from "./index";

function createCountryListMarkup(arr) {
    return arr
    .map(({flags: {svg}, name: {official}}) =>
    `<li><img class = "list-img" src="${svg}" alt="${official}"><p class = "country-list-name">${official}</p></li>`
    ).join('')        
}

function createCountryMarkup(arr) {
    return arr
    .map(({name: {official}, capital, population, flags: {svg}, languages}) => 
    `<div class="country-card"><img width="500" height="300" src="${svg}" alt="${official}"><h2>${official}</h2>
    <p><b>Population:</b> ${population}</p>
    <p><b>Language:</b> ${Object.values(languages)}</p>
    <p><b>Capital:</b> ${capital}</p></div>
    `).join('')
}

function clearInput() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

export {createCountryListMarkup, createCountryMarkup, clearInput};