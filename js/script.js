import { moonIcon } from '/../common/icons/theme-icons.js';

// Intializes the localStorage for darl mode and then calls for DOM elements to change.
function darkMode() {
    if(localStorage.getItem('darkmode') === null) {
        localStorage.setItem('darkmode', JSON.stringify(false))
    }

    let darkmodeBtn;
    
    if(!darkmodeBtn) {  
        darkmodeBtn = document.getElementById('darkmodeBtn');
        moonIcon(darkmodeBtn, '13px', 'black');
    } 

    darkmodeBtnListener();
    getDarkmodeDomElements();
}

// Adds an event to the virtual button to change modes.
function darkmodeBtnListener() {
    darkmodeBtn.addEventListener('click', listener);

    function listener() {
        let darkModeState = JSON.parse(localStorage.getItem('darkmode'));
        darkModeState = !darkModeState;
        localStorage.setItem('darkmode', JSON.stringify(darkModeState));

        getDarkmodeDomElements();
    }
}

// Gets reference for all dom elements that need to change and stores them in a nested array.
function getDarkmodeDomElements() {
    const darkmodeBackDark = document.querySelectorAll('.darkmode__background_D');
    const darkmodeBackLight = document.querySelectorAll('.darkmode__background_L');
    const darkmodeBackText = document.querySelectorAll('.darkmode__text');
    const darkSelectors = [darkmodeBackDark, darkmodeBackLight, darkmodeBackText];

    changeState(darkSelectors);  
}

// Goes throug each element that needs to change and add/removes a class to change the CSS.
function changeState(domElementsList) {
    let darkModeState = JSON.parse(localStorage.getItem('darkmode'));

    if (domElementsList) {
        domElementsList.forEach((domElement) => {
            domElement.forEach((element) => {
                darkModeState ? element.classList.add('darkmode') : element.classList.remove('darkmode');
            })
        })
    }
}

// To get the regions of the world from the selector values.
function getRegions(regionSelect, regions) {
    if (regionSelect !== undefined) {
        const selectOptions = regionSelect.options;

        for (let i = 1; i < selectOptions.length; i++) {
            regions.push(selectOptions[i].value);
        }
    }
}

// Creates a listener on the parent of each country card to read for a click. Then sets a local storage value and links to the countryData webpage.
function setListener(domElement) {
    domElement.addEventListener('click', event => {
        const countryItem = event.target.closest('article');

        if(!countryItem) return;

        const countryName = countryItem.querySelector('.countryCard__text__name').innerText;

        localStorage.setItem('country', JSON.stringify(countryName));
        window.location.href = '../countryData.html';

        event.stopPropagation();
    })
}

// Function to get countries as needed. It changes the fetch link for default, region, and only one.
function getCountries(variant, regions) {
    const baseLink = "https://restcountries.com/v3.1/";
    let link;

    if(!variant) {
        link = baseLink + 'all';
    } else if (regions && regions.includes(variant)){
        link = baseLink + 'region/' + variant;
    } else {
        link = baseLink + 'name/' + variant;
    }

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

// This function renders the value obtained on getCountries.
function showContries(data) { 
    mainContainer.innerHTML = '';

    data.forEach(country => {
        renderCountry(country);
    });

    function renderCountry(country) {
        const countryCard = document.createElement('article');

        countryCard.className = 'countryCard darkmode__background_L';

        countryCard.innerHTML = `
        <img class='countryCard__flag' src=${country.flags.png} />
        <p class='countryCard__text countryCard__text__name darkmode__text' ><span>${country.name.common}</span></p>
        <p class='countryCard__text countryCard__text__population darkmode__text'><span>Population:</span> ${country.population.toLocaleString()}</p>
        <p class='countryCard__text countryCard__text__region darkmode__text'><span>Region:</span> ${country.region}</p>
        <p class='countryCard__text countryCard__text__capital darkmode__text'><span>Capital:</span> ${country.capital}</p>
        `
        mainContainer.appendChild(countryCard);
    }
 
    getDarkmodeDomElements();
}

// Function to control the search bar.
function searchCountry(searchBar) {
    searchBar.addEventListener('keydown', enterPress)

        function enterPress(input) {
            if (input.key === 'Enter') {
                const searchItem = searchBar.value.trim();
    
                getCountries(searchItem);
    
                searchBar.value = '';
            }
        } 
}

// Function to control the region select search.
function regionSearch(regionSelect, regions) {
    if(regionSelect) {
        let placeHolder = document.getElementById('placeHolder');

        regionSelect.addEventListener('change', () => {
            const regionVal = regionSelect.value;
    
            if (placeHolder !== '') {
                regionSelect.remove(placeHolder);
                placeHolder = '';
            }
            
            getCountries(regionVal, regions);
        })
    }   
}

export { getRegions, setListener, getCountries, searchCountry, regionSearch }
export { darkMode, getDarkmodeDomElements }