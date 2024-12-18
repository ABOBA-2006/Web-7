function saveToLocalStorage(index, timestamp, description) {
    const event = {
        index: index,
        timestamp: timestamp,
        description: description
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    console.log(`Saved to LocalStorage:`, event);
}

function sendToServer(index, timestamp, description) {
    const event = {
        index: index,
        timestamp: timestamp,
        description: description
    };

    fetch('server_handling.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Sent to server:`, data);
    })
    .catch(err => {
        console.error('Error sending to server:', err);
    });
}

function clearServerFile() {
    fetch('clear_file.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(err => console.error('Error clearing file:', err));
}