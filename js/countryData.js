import { moonIcon, arrowIcon } from '../common/icons/theme-icons.js';
import { darkMode, darkmodeBtnListener } from '../js/script.js';

const mainContainer = document.getElementById('mainContainer');
const backBtn = document.getElementById('backBtn');


darkMode();

getBackEvent();

getCountries(JSON.parse(localStorage.getItem('country')));

function getBackEvent() {
    arrowIcon(backBtn, '15px', 'black');

    backBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    })
}

function getCountries(variant, regions) {
    const baseLink = "https://restcountries.com/v3.1/";
    let link = baseLink + 'name/' + variant;

    fetch(link)
    .then((response) => {
        if(!response.ok) {
            console.log('error', response.status);
        } else {
            return response.json();
        }
    })
    .then((data) => {
        showContries(data);
    })
    .catch((error) => {
        console.log('error', error);
    })
}

function showContries(data) { 
    mainContainer.innerHTML = '';
    renderCountry(data);

    function renderCountry(country) {
        const countryCard = document.createElement('article');

        countryCard.className = 'countryBig';

        const name = country[0].name.common + '.';
        const nativeName = Object.values(country[0].name.nativeName)[Object.keys(country[0].name.nativeName).length - 1].common + '.';
        const population = country[0].population.toLocaleString() + '.';
        const region = country[0].region + '.';
        const subRegion = country[0].subregion + '.';
        const capital = country[0].capital + '.';
        const topLevelDomain = country[0].tld;
        let currencies = [];
        
        Object.values(country[0].currencies).forEach(element => {
            currencies.push(' ' + element.name);
        });    
        currencies = currencies.join() + '.';

        let languages = [];
        
        Object.values(country[0].languages).forEach(element => {
            languages.push(' ' + element);
        });
        languages = languages.join() + '.';

        countryCard.innerHTML = `
        <img class='countryBig__flag' src=${country[0].flags.svg} />
        <div class='data__wrap'>
            <p class='countryBig__text countryBig__text--name darkmode__text'><span class='darkmode__text'>${name}</span></p>
            <ul class='countryBig__list'>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Native Name:</span> ${nativeName}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Population:</span> ${population}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Region:</span> ${region}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Sub Region:</span> ${subRegion}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Capital:</span> ${capital}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Top Level Domain:</span> ${topLevelDomain}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Currencies:</span> ${currencies}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Languages:</span> ${languages}</p>
                </li>
            </ul>
            <div class='countryBig__borderCountries'>
                <ul id='borderList' class='countryBig__borderCountries__list'>
                    <li class='countryBig__borderCountries__text darkmode__text'><span class='darkmode__text'>Border Countries:</span></li>
                </ul>
            </div>
        </div>
        `;

        mainContainer.appendChild(countryCard);

        searchBorders();

        function searchBorders() {
            if (country[0].borders) {
                let countryBorders = Object.values(country[0].borders);

                const countryBordersUrl = countryBorders.map((item) => {
                    return 'https://restcountries.com/v3.1/alpha/' + item;
                });
    
                function getCountryName(url) {
                    return fetch(url)
                    .then((response) => {
                        if(!response.ok) {
                            console.log('Error', response.status);
                        } else {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        return data;
                    });
                }
        
                Promise.all(countryBordersUrl.map(getCountryName))
                .then((data) => {
                    Object.values(data);
    
                    data.forEach(item => {
                        renderBorders(item[0].name.common);
                    })
                })           
                .catch((error) => {
                    console.log('Error', error);
                })

            } else {
                renderBorders('None');
            }
        }

        function renderBorders(data) {
            const borderList = document.getElementById('borderList');
            const borderItem = document.createElement('li');
            borderItem.className = 'countryBig__borderCountries__text darkmode__text darkmode__background_L';

            borderItem.textContent = data;

            borderList.appendChild(borderItem);
        
            darkmodeBtnListener();
        }
    }
}