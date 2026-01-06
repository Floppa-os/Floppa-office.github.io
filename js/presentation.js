let slides = [
    { title: "Заголовок слайда", content: "Текст слайда...", notes: "" }
];
let currentSlideIndex = 0;

// Инициализация при загрузке
window.onload = function() {
    renderSlidesList();
    displayCurrentSlide();
};

// Отобразить список слайдов
function renderSlidesList() {
    const slidesList = document.getElementById('slidesList');
    slidesList.innerHTML = '';
    slides.forEach((slide, index) => {
        const item = document.createElement('div');
        item.className = 'slide-item' + (index === currentSlideIndex ? ' active' : '');
        item.textContent = `Слайд ${index + 1}`;
        item.setAttribute('data-index', index);
        item.onclick = () => selectSlide(index);
        slidesList.appendChild(item);
    });
}

// Показать текущий слайд
function displayCurrentSlide() {
    const slide = slides[currentSlideIndex];
    document.getElementById('slideTitle').textContent = slide.title;
    document.getElementById('slideContent').textContent = slide.content;
    document.getElementById('notes').value = slide.notes;
}

// Выбрать слайд из списка
function selectSlide(index) {
    currentSlideIndex = index;
    renderSlidesList();
    displayCurrentSlide();
}

// Добавить новый слайд
function addSlide() {
    slides.push({
        title: "Новый слайд",
        content: "Введите текст...",
        notes: ""
    });
    currentSlideIndex = slides.length - 1;
    renderSlidesList();
    displayCurrentSlide();
}

// Удалить текущий слайд
function deleteSlide() {
    if (slides.length === 1) {
        alert("Нельзя удалить единственный слайд!");
        return;
    }
    slides.splice(currentSlideIndex, 1);
    currentSlideIndex = Math.max(0, currentSlideIndex - 1);
    renderSlidesList();
    displayCurrentSlide();
}

// Сохранить презентацию в LocalStorage
function savePresentation() {
    try {
        localStorage.setItem('floppaPresentation', JSON.stringify(slides));
        document.getElementById('presentationStatus').textContent = 'Презентация сохранена!';
        document.getElementById('presentationStatus').style.color = 'green';
    } catch (e) {
        document.getElementById('presentationStatus').textContent = 'Ошибка сохранения!';
        document.getElementById('presentationStatus').style.color = 'red';
    }
}

// Автозагрузка сохранённой презентации (если есть)
const savedPresentation = localStorage.getItem('floppaPresentation');
if (savedPresentation) {
    try {
        slides = JSON.parse(savedPresentation);
        currentSlideIndex = 0;
        renderSlidesList();
        displayCurrentSlide();
    } catch (e) {
        console.error("Не удалось загрузить сохранённую презентацию:", e);
    }
}

// Сохранять изменения при редактировании
document.getElementById('slideTitle').addEventListener('input', function() {
    slides[currentSlideIndex].title = this.textContent;
});

document.getElementById('slideContent').addEventListener('input', function() {
    slides[currentSlideIndex].content = this.textContent;
});

document.getElementById('notes').
