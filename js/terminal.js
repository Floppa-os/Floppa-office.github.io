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
    mathcalc: () => {
    return `<div class="math-calculator">
  <h3>Математический калькулятор [Floppa Math v1.0]</h3>
  <div class="calc-input">
    <input type="text" id="math-input" placeholder="Введите выражение (например: 2 + 2, sqrt(16), sin(pi/2))">
    <button onclick="calculateMath()">=</button>
  </div>
  <div id="math-result" class="calc-result">
    <!-- Результат будет выведен сюда -->
  </div>
  <div class="calc-help">
    <strong>Поддерживаемые операции:</strong><br>
    + − * / ^ (возведение в степень)<br>
    sqrt(x), sin(x), cos(x), tan(x), log(x) (натуральный логарифм)<br>
    pi, e<br>
    Скобки: ( )
  </div>
</div>`;
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
// Функция для вычисления математического выражения
function calculateMath() {
    const input = document.getElementById('math-input').value;
    const resultDiv = document.getElementById('math-result');


    try {
        // Заменяем pi и e на числовые значения
        let expr = input
            .replace(/pi/gi, Math.PI)
            .replace(/e/gi, Math.E);

        // Вычисляем выражение с помощью Function
        const result = new Function('return ' + expr)();

        resultDiv.innerHTML = `<strong>Результат:</strong> ${result}`;
    } catch (error) {
        resultDiv.innerHTML = `<strong>Ошибка:</strong> Некорректное выражение. Проверьте синтаксис.`;
    }
}
