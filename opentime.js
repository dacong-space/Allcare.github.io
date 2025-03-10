const data = [
    { id: '123456', hours: '20 hr/week', language: 'Chinese', state: 'Active' },
    { id: '234567', hours: '36 hr/week', language: 'Chinese', state: 'close' },
    { id: '345678', hours: '13 hr/week', language: 'English', state: 'Pending' },
    { id: '456789', hours: '40 hr/week', language: 'Chinese', state: 'Active' },
    { id: '567890', hours: '20 hr/week', language: 'Chinese', state: 'Pending' }
];

// 显示加载提示
function showLoader() {
    document.getElementById('loader').classList.add('active');
}

// 隐藏加载提示
function hideLoader() {
    document.getElementById('loader').classList.remove('active');
}

function populateTable() {
    showLoader();
    const tableBody = document.getElementById('statusTable').getElementsByTagName('tbody')[0];

    // Sort data based on state (Active > Pending > Close)
    data.sort((a, b) => {
        const stateOrder = { 'Active': 1, 'Pending': 2, 'close': 3 };
        return stateOrder[a.state] - stateOrder[b.state];
    });

    tableBody.innerHTML = ""; // 清空现有的表格内容
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

        // 根据状态赋予不同的颜色类
        if (item.state.toLowerCase() === 'active') {
            stateCell.classList.add('state-active');
        } else if (item.state.toLowerCase() === 'pending') {
            stateCell.classList.add('state-pending');
        } else if (item.state.toLowerCase() === 'close') {
            stateCell.classList.add('state-close');
        }

        row.appendChild(stateCell);
        tableBody.appendChild(row);
    });

    hideLoader();
}

// 按列排序
function sortTable(columnIndex) {
    const table = document.getElementById('statusTable');
    const rows = Array.from(table.rows).slice(1); // 排除表头
    const ascending = table.rows[0].cells[columnIndex].classList.toggle('asc');
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        if (ascending) {
            return cellA.localeCompare(cellB);
        } else {
            return cellB.localeCompare(cellA);
        }
    });

    rows.forEach(row => table.appendChild(row));
}

// 搜索过滤
function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const stateFilter = document.getElementById('stateFilter').value.toLowerCase();
    
    const filteredData = data.filter(item => {
        const searchMatch = item.id.toLowerCase().includes(searchInput) ||
                            item.hours.toLowerCase().includes(searchInput) ||
                            item.language.toLowerCase().includes(searchInput);
        
        const stateMatch = stateFilter ? item.state.toLowerCase() === stateFilter : true;

        return searchMatch && stateMatch;
    });

    populateFilteredTable(filteredData);
}

// 根据过滤后的数据填充表格
function populateFilteredTable(filteredData) {
    const tableBody = document.getElementById('statusTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // 清空表格
    filteredData.forEach(item => {
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

        if (item.state.toLowerCase() === 'active') {
            stateCell.classList.add('state-active');
        } else if (item.state.toLowerCase() === 'pending') {
            stateCell.classList.add('state-pending');
        } else if (item.state.toLowerCase() === 'close') {
            stateCell.classList.add('state-close');
        }

        row.appendChild(stateCell);
        tableBody.appendChild(row);
    });
}

// 初始化页面加载时的数据
window.onload = function() {
    populateTable();
};
