//first select all of the HTML elements that will need to be manipulated and assign them to const variables.
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

//Declare a const variable named "url" and assign it a valid URL string as given in the openweathermap api documentation that was presented above and bookmarked.
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Trier&appid=2fca515f35a96678f2eca2aafa881bc1&units=imperial';


//Define an asynchronous function named "apiFetch()" that uses a try block to handle errors.

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();


//Build the displayResults function to output to the given HTML document.

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}