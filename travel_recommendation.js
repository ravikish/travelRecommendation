document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results');

    // Clear the previous results.
    resultsContainer.innerHTML = '';

    if (query.length === 0) {
        return; // If query is empty, do nothing.
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const filtered = [];
            // Filter for countries
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query)) {
                        filtered.push(city);
                    }
                });
            });

            // Filter for temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(query)) {
                    filtered.push(temple);
                }
            });

            // Filter for beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(query)) {
                    filtered.push(beach);
                }
            });

            // Display the filtered results in cards
            filtered.forEach(destination => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${destination.imageUrl}" alt="${destination.name}" class="card-img">
                    <div class="card-content">
                        <h3>${destination.name}</h3>
                        <p>${destination.description}</p>
                    </div>`;
                resultsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function search() {
    // Trigger the input event to perform the search
    const inputEvent = new Event('input');
    document.getElementById('search-input').dispatchEvent(inputEvent);
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
}

// Function to display local time
function displayLocalTime() {
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localTime = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('local-time').textContent = `Current time in New York: ${localTime}`;
}

// Call the displayLocalTime function and update it every second
displayLocalTime();
setInterval(displayLocalTime, 1000);
