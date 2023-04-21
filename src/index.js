import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY))

function onCountrySearch() {
    const dataInput = input.value.trim();
    if(!dataInput){
        clearInput();
        return
    }
    fetchCountries(dataInput)
    .then(countries => {
        if(countries.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if(countries.length === 1) {
            countryInfo.innerHTML = createCountryMarkup(countries);
            createCountryListMarkup.innerHTML = '';
        } else {
            countryList.innerHTML = createCountryListMarkup(countries);
            createCountryMarkup.innerHTML = '';
        }
    })
    .catch(error => console.log(error));
    clearInput()     
}


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
    createCountryListMarkup.innerHTML = '';
    createCountryMarkup.innerHTML = '';
}