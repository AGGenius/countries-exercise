import { arrowIcon } from '../common/icons/theme-icons.js';
import { darkMode, darkmodeBtnListener} from '../js/script.js';

const mainContainer = document.getElementById('mainContainer');
const backBtn = document.getElementById('backBtn');

// Base object for the country to render.
const countryData = {
    flag: "",
    name: "",
    nativeName: "",
    population: "",
    region: "",
    subRegion: "",
    capital: "",
    topLevelDomain: "",
    currencies: [],
    languages: [],
    countryBorders: []
}

darkMode();
getBackEvent();
getCountries(JSON.parse(localStorage.getItem('country')));

// Function to control the back button to get to index webpage.
function getBackEvent() {
    arrowIcon(backBtn, '15px', 'black');

    backBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    })
}


// Almost the shame that one on scripts.js but simplier. We can add this to that one, but it will end
// way too convoluted.
function getCountries(variant) {
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
        setCountryData(data[0]);
        showContries();
    })
    .catch((error) => {
        console.log('error', error);
    })
}

// We give the values of the country we get to the object.
function setCountryData(country) {
    countryData.flag = country.flags.svg;
    countryData.name = country.name.common + '.';
    countryData.nativeName = Object.values(country.name.nativeName)[Object.keys(country.name.nativeName).length - 1].common + '.';
    countryData.population = country.population.toLocaleString() + '.';
    countryData.region = country.region + '.';
    countryData.subRegion = country.subRegion + '.';
    countryData.capital = country.capital + '.';
    countryData.topLevelDomain = country.tld;
    Object.values(country.currencies).forEach(element => countryData.currencies.push(' ' + element.name)); 
    countryData.currencies = countryData.currencies.join(', ') + '.'; 
    Object.values(country.languages).forEach(element => countryData.languages.push(' ' + element));
    countryData.languages = countryData.languages.join(', ') + '.';
    countryData.countryBorders = country.borders;  
}

// Function to render the country and the needed values. It has a nested function searchBorders and renderBorders
// to look for the borders of the country, as we only recieve a reference and we need the full name. Once it gets all, renders them
// with desired format.
function showContries() { 
    mainContainer.innerHTML = '';
 
    renderCountry();
    searchBorders(); 

    function renderCountry() {
        const countryCard = document.createElement('article');
        countryCard.className = 'countryBig';
 
        countryCard.innerHTML = `
        <img class='countryBig__flag' src=${countryData.flag} />
        <div class='data__wrap'>
            <p class='countryBig__text countryBig__text--name darkmode__text'><span class='darkmode__text'>${countryData.name}</span></p>
            <ul class='countryBig__list'>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Native Name:</span> ${countryData.nativeName}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Population:</span> ${countryData.population}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Region:</span> ${countryData.region}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Sub Region:</span> ${countryData.subRegion}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Capital:</span> ${countryData.capital}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Top Level Domain:</span> ${countryData.topLevelDomain}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Currencies:</span> ${countryData.currencies}</p>
                </li>
                <li>
                    <p class='countryBig__text darkmode__text'><span class='darkmode__text'>Languages:</span> ${countryData.languages}</p>
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
    }

    function searchBorders() {
        if (countryData.countryBorders) {
            let countryBorders = Object.values(countryData.countryBorders);

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
                countryData.countryBorders = data;
                renderBorders();
            })           
            .catch((error) => {
                console.log('Error', error);
            })

        } else {
            renderBorders('None');
        }
    }

    function renderBorders() {
        countryData.countryBorders.forEach(item => {
            const borderList = document.getElementById('borderList');
            const borderItem = document.createElement('li');
            borderItem.className = 'countryBig__borderCountries__text darkmode__text darkmode__background_L';
    
            borderItem.textContent = item[0].name.common;
    
            borderList.appendChild(borderItem);
        
            darkmodeBtnListener();
        })    
    }
}