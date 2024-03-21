import { getRegions, setListener, getCountries, searchCountry, regionSearch, darkMode} from '../js/script.js';

const mainContainer = document.getElementById('mainContainer');
const searchBar = document.getElementById('searchBar');
const regionSelect = document.getElementById('region');

const regions = [];

darkMode();
getRegions(regionSelect, regions);
setListener(mainContainer);
getCountries();
searchCountry(searchBar);
regionSearch(regionSelect, regions);