document.addEventListener("DOMContentLoaded", function() {

    const notificationContainer = document.getElementById('notification-container');

    function showNotification(msg) {
        const notification = document.createElement('div');
        notification.className = 'notification';

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => closeNotification(notification));
        notification.appendChild(closeButton);

        const message = document.createElement('span');
        message.textContent = msg;
        notification.appendChild(message);

        notificationContainer.prepend(notification);

        notification.style.height = 'auto';

        const startTime = Date.now();
        const duration = 3000;

        const startTimer = (timeLeft) => {
            return setTimeout(() => {
                if (notificationContainer.contains(notification)) {
                    closeNotification(notification);
                }
            }, timeLeft);
        };

        let timer = startTimer(duration);

        notification.addEventListener('mouseenter', () => {
            clearTimeout(timer);
        });

        notification.addEventListener('mouseleave', () => {
            const elapsedTime = Date.now() - startTime;
            const timeLeft = duration - elapsedTime;

            if (timeLeft > 0) {
                timer = startTimer(timeLeft);
            } else {
                closeNotification(notification);
            }
        });
    }

    function closeNotification(notification) {
        notification.style.animation = 'slide-out 0.5s forwards';
        notification.addEventListener('animationend', () => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        });
    }

    document.querySelectorAll('input[type="submit"]').forEach(button => {
        button.addEventListener('click',(e)=>{
            e.preventDefault();
            showNotification("Static website! Submission won't work");
        });
    });

    document.querySelectorAll('nav li a').forEach(href=>{
        href.addEventListener('click',function(e){
            document.querySelector('#menu').checked=false;
        });
    });

    // Create the map
    var map = L.map('map', {
        center: [0, 0],
        zoom: 3 // Adjust the initial zoom level
    });

    // Add the custom tile layer - where land is grey and water is black
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        minZoom: 1,
        noWrap: true // Prevent horizontal wrapping
    }).addTo(map);

    // Define a custom red icon
    var redIcon = L.icon({
        iconUrl: './img/coro.png', // URL to the red marker icon
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
    });

    // Update map with data from data.json
    function updateMap() {
        fetch("/data.json")
        .then(response => response.json())
        .then(data => {
            // Add markers based on data from data.json
            data.data.forEach((element, index) => {
                setTimeout(() => {
                    var latitude = element.latitude;
                    var longitude = element.longitude;
                    var name = element.name;
                    var infected = element.infected;
                    var dead = element.dead;
                    var recovered = element.recovered;
                    var sick = element.sick;
                    var lastUpdated = element.lastUpdated.slice(0,10);
                    
                    console.log("Latitude:", latitude, "Longitude:", longitude); // Log coordinates
                    
                    // Mark on the map with red icon
                    var marker = L.marker([latitude, longitude], { icon: redIcon }).addTo(map);
                    console.log("Marker added:", marker); // Log marker addition
                    
                    // Add popup with name and other details
                    marker.bindPopup(`<b>${name}</b><br>Infected: ${infected}<br>Deaths: ${dead}<br>Sicks: ${sick}<br>Recovered: ${recovered}<br><em>&nbsp&nbsp&nbsp&nbsp&nbspLast Updated: ${lastUpdated}</em>`);
                }, index * 5); // Delay each marker by 2 seconds (2000 milliseconds)
            });
        }) 
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    // Add markers based on data from data.json
    updateMap();
});
