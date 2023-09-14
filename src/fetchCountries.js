import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return resp.json();
  });
}
