// Глобальные переменные
let databases = {}; // { tableName: [{row}, {row}, ...] }
let currentTable = 'users';

// Инициализация при загрузке
window.onload = function() {
    loadDatabases();
    renderTablesList();
    displayTable(currentTable);
};

// Загрузить БД из localStorage
function loadDatabases() {
    const saved = localStorage.getItem('floppaDB');
    if (saved) {
        try {
            databases = JSON.parse(saved);
        } catch (e) {
            console.error('Ошибка загрузки БД:', e);
            databases = { users: [{ ID: 1, Имя: 'Иван', Email: 'ivan@example.com' }] };
        }
    } else {
        // Начальная БД
        databases = { 
            users: [
                { ID: 1, Имя: 'Иван', Email: 'ivan@example.com' },
                { ID: 2, Имя: 'Мария', Email: 'maria@example.com' }
            ]
        };
    }
}

// Сохранить БД в localStorage
function saveDatabases() {
    try {
        localStorage.setItem('floppaDB', JSON.stringify(databases));
        document.getElementById('dbStatus').textContent = 'База данных сохранена!';
        document.getElementById('dbStatus').style.color = 'green';
    } catch (e) {
        document.getElementById('dbStatus').textContent = 'Ошибка сохранения БД!';
        document.getElementById('dbStatus').style.color = 'red';
    }
}

// Отобразить список таблиц
function renderTablesList() {
    const tablesList = document.getElementById('tablesList');
    tablesList.innerHTML = '';
    Object.keys(databases).forEach(tableName => {
        const item = document.createElement('div');
        item.className = 'table-item' + (tableName === currentTable ? ' active' : '');
        item.textContent = tableName;
        item.setAttribute('data-table', tableName);
        item.onclick = () => selectTable(tableName);
        tablesList.appendChild(item);
    });
}

// Выбрать таблицу
function selectTable(tableName) {
    currentTable = tableName;
    renderTablesList();
    displayTable(tableName);
}
