const data = [
    { id: '123456', hours: '20 hr/week', language: 'Chinese', state: 'Active' },
    { id: '234567', hours: '36 hr/week', language: 'Chinese', state: 'close' },
    { id: '345678', hours: '13 hr/week', language: 'English', state: 'Pending' },
    { id: '456789', hours: '40 hr/week', language: 'Chinese', state: 'Active' },
    { id: '567890', hours: '20 hr/week', language: 'Chinese', state: 'Pending' }
];

function populateTable() {
    const tableBody = document.getElementById('statusTable').getElementsByTagName('tbody')[0];

    // Sort data based on state (Active > Pending > Close)
    data.sort((a, b) => {
        const stateOrder = { 'Active': 1, 'Pending': 2, 'close': 3 };
        return stateOrder[a.state] - stateOrder[b.state];
    });

    data.forEach(item => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const hoursCell = document.createElement('td');
        hoursCell.textContent = item.hours;
        row.appendChild(hoursCell);

        const languageCell = document.createElement('td');
        languageCell.textContent = item.language;
        row.appendChild(languageCell);

        const stateCell = document.createElement('td');
        stateCell.textContent = item.state;
        row.appendChild(stateCell);

        const statusCell = document.createElement('td');
        if (item.state.toLowerCase() === 'active') {
            statusCell.textContent = 'Valid';
            statusCell.classList.add('valid');
        } else {
            statusCell.textContent = 'Invalid';
            statusCell.classList.add('invalid');
        }
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}

window.onload = populateTable;
