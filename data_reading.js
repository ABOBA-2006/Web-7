let resultBlock = document.getElementById("results");
resultBlock.style.display = 'flex';

const getEventFromLocalStorage = (index) => {
    const events = JSON.parse(localStorage.getItem('events')) || {};
    const event = events[index-1];

    if (event) {
        console.log(`Event retrieved from localStorage:`, event);
        document.getElementById("ID").innerHTML = "ID: " + event.index;
        document.getElementById("description").innerHTML = event.description;
        document.getElementById("local_storage_time").innerHTML = "LocalStorage: " + event.timestamp;
    } else {
        console.error('Event not found in localStorage.');
    }
};

const getEventFromServer = (index) => {
    fetch(`server_handling.php?index=${index}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.event) {
                document.getElementById("server_time").innerHTML = "Server: " + data.event.timestamp;
                console.log(`Event retrieved from server:`, data.event);
            } else {
                console.error('Event not found on the server.');
            }
        })
        .catch(err => {
            console.error('Error retrieving event from server:', err);
        });
};