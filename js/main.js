//Example fetch using Open Brewey DB
let breweries = [];

document.querySelector('#state-btn').addEventListener('click', getByState);
document.querySelector('#city-btn').addEventListener('click', getByCity);

function displayBreweries(breweries) {
  let brew;

  for ( let i = 0; i < breweries.length; i++ ) {
    brew = breweries[i];

    document.querySelector(`#addy${i}`).style.border = "2px solid #ffd89b";

    document.querySelector(`#name${i}`).innerText = brew.name;
    document.querySelector(`#street${i}`).innerText = brew.street;
    document.querySelector(`#location${i}`).innerText = `${brew.city}, ${brew.state}  ${brew['postal_code']}`;
    document.querySelector(`#country${i}`).innerText = brew.country;
    document.querySelector(`#phone${i}`).innerText = brew.phone;
    document.querySelector(`#website${i}`).href = `${brew['website_url']}`;
    document.querySelector(`#website${i}`).innerText = `Visit website`;
  }
}

function getByState(){
  const choice = document.querySelector('input').value
  const formatted = formatInput(choice);
  // Gets breweries by state
  const url = `https://api.openbrewerydb.org/v1/breweries?by_state=${formatted}&per_page=20`
  console.log(url);

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        breweries = data;
        displayBreweries(breweries);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  
      
}

function getByCity(){
  const choice = document.querySelector('input').value
  const formatted = formatInput(choice);
  // Gets breweries by state
  const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${formatted}&per_page=20`
  console.log(url);

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        breweries = data;
        displayBreweries(breweries);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  
      
}

function formatInput(str) {
    const chars = str.trim().toLowerCase().split('');
    let formatted, index;

    if ( str.includes(' ') ) {
        index = chars.indexOf(' ');
        chars[index] = '_';
        formatted = chars.join('');
        
        return formatted;
    }

    formatted = chars.join('');
    
    return formatted;
}

