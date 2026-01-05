function saveText() {
    const text = document.getElementById('editor').value;
    if (text.trim() === '') {
        document.getElementById('status').textContent = 'Текст пуст!';
        document.getElementById('status').style.color = 'red';
        return;
    }

    // Сохраняем в LocalStorage (упрощённо)
    localStorage.setItem('floppaText', text);
    document.getElementById('status').textContent = 'Текст сохранён!';
    document.getElementById('status').style.color = 'green';
}

// При загрузке восстанавливаем текст
window.onload = function() {
    const savedText = localStorage.getItem('floppaText');
    if (savedText) {
        document.getElementById('editor').value = savedText;
    }
};
