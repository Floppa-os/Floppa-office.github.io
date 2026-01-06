// История вывода
const output = document.getElementById('output');

// Список доступных команд
const commands = {
    help: () => {
        return `
Доступные команды:
  help          - Показать список команд
  clear         - Очистить экран
  ls            - Показать все сохранённые данные
  rm <target>   - Удалить данные (target: text, spreadsheet, presentation, db, all)
  info          - Информация о системе
  version       - Версия Floppa Office
  reset         - Полный сброс (подтверждение)
  floppa        - Шлёпа
`;
    },
    clear: () => {
        output.innerHTML = '';
        return '';
    },
    ls: () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key).length + ' символов';
        }
        return JSON.stringify(data, null, 2);
    },
    floppa: () => {
    return `
┌──────────────────────────────┐
│    ███████  ███████         │
│   ██     ██ ██    ██        │
│   ██        ██    ██        │
│    ██████   ███████         │
│        ██   ██              │
│   ██     ██ ██              │
│    ███████ ██              │
└──────────────────────────────┘
   Floppa Office — ваш офис в браузере
`;
},

    info: () => {
        return `
Floppa Office v1.8
Платформа: Приложение HTML
Хранилище: localStorage
Текущая дата: ${new Date().toLocaleString()}
`;
    },
    version: () => 'Floppa Office 1.8 (Build 20260106)',
    rm: (target) => {
        if (!target) return 'Ошибка: укажите цель (text, spreadsheet, presentation, db, all)';

        switch (target) {
            case 'text':
                localStorage.removeItem('floppaText');
                return 'Текстовые данные удалены.';
            case 'spreadsheet':
                localStorage.removeItem('floppaSpreadsheet');
                return 'Данные таблиц удалены.';
            case 'presentation':
                localStorage.removeItem('floppaPresentation');
                return 'Презентация удалена.';
            case 'db':
                localStorage.removeItem('floppaDB');
                return 'База данных удалена.';
            case 'all':
                Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
                return 'Все данные удалены!';
            default:
                return `Неизвестная цель: ${target}. Используйте: text, spreadsheet, presentation, db, all`;
        }
    },
    reset: () => {
        const confirm = window.confirm('Вы уверены? Это удалит ВСЕ данные Floppa Office!');
        if (confirm) {
            Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
            return 'Система сброшена до заводских настроек.';
        } else {
            return 'Сброс отменён.';
        }
    }
};

// Выполнение команды
function executeCommand() {
    const input = document.getElementById('command-input');
    const command = input.value.trim().toLowerCase();
    input.value = '';

    if (!command) return;

    const [cmd, ...args] = command.split(' ');
    const arg = args.join(' ');

    let response = '';

    if (commands[cmd]) {
        response = commands[cmd](arg);
    } else {
        response = `Неизвестная команда: ${cmd}. Введите 'help' для списка.`;
    }

    // Вывод результата
    if (response) {
        const line = document.createElement('div');
        line.innerHTML = `<span class="terminal-prompt">$</span> ${command}<br><pre>${response}</pre>`;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
}

// Очистка экрана
function clearOutput() {
    output.innerHTML = '';
}

// Обработка Enter
document.getElementById('command-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        executeCommand();
    }
});
