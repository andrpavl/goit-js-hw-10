import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { createCountryListMarkup, createCountryMarkup, clearInput } from "./markups";
export {countryList, countryInfo};

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
            countryList.innerHTML = '';
        } else {
            countryList.innerHTML = createCountryListMarkup(countries);
            countryInfo.innerHTML = '';
        }
    })
    .catch(error => console.log(error));
    clearInput()     
}