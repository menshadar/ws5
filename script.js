/*
   ЗАВДАННЯ 1: Поміняти місцями контент блоків «X» (1) та «Y» (5)
*/
document.addEventListener('DOMContentLoaded', () => {
    const block1 = document.getElementById('block-1');
    const block5 = document.getElementById('block-5');

    if (block1 && block5) {
        const content1 = block1.innerHTML;
        const content5 = block5.innerHTML;
        block1.innerHTML = content5;
        block5.innerHTML = content1;
    }
});

/* ЗАВДАННЯ 2: Площа паралелограма */
function task2CalcArea() {
    // Отримуємо значення, які ввів користувач
    const aInput = document.getElementById('parallelogram-a').value;
    const hInput = document.getElementById('parallelogram-h').value;
    
    const outputDiv = document.getElementById('task2-result');

    if (aInput && hInput) {
        const area = parseFloat(aInput) * parseFloat(hInput);
        outputDiv.innerHTML = `Площа = ${area}`;
    } else {
        alert("Будь ласка, введіть обидва числа!");
    }
}

/* ЗАВДАННЯ 3: Підрахунок слів + Cookies */
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function checkCookiesOnLoad() {
    const savedResult = getCookie('wordCountResult');
    const form = document.querySelector('#word-count-input')?.parentElement;

    if (savedResult) {
        if (form) form.style.display = 'none';
        const shouldDelete = confirm(`В cookies збережено: "${savedResult}".\nНатисніть ОК, щоб видалити дані.`);
        
        if (shouldDelete) {
            deleteCookie('wordCountResult');
           
            alert("Cookies видалено. Натисніть ОК для перезавантаження сторінки.");
            location.reload();
        } else {
            alert("Cookies залишено. Для появи форми потрібно перезавантажити сторінку і погодитись на видалення.");
        }
    }
}

function task3CountWords() {
    const text = document.getElementById('word-count-input').value;
    if (!text.trim()) {
        alert("Введіть текст!");
        return;
    }
    const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const msg = `Кількість слів: ${count}`;
    
    alert(msg);
    document.cookie = `wordCountResult=${msg}; path=/; max-age=86400`; // 1 день
    location.reload();
}

document.addEventListener('DOMContentLoaded', checkCookiesOnLoad);

/* ЗАВДАННЯ 4: mouseout + LocalStorage */
document.addEventListener('DOMContentLoaded', () => {
    const block2 = document.getElementById('block-2');
    const colorInput = document.getElementById('block2-color-picker');

    if (block2) {
        const savedColor = localStorage.getItem('block2BgColor');
        if (savedColor) {
            block2.style.background = savedColor;
            if(colorInput) colorInput.value = savedColor;
        }
        block2.addEventListener('mouseout', () => {
            if(colorInput) {
                const newColor = colorInput.value;
                block2.style.background = newColor;
                localStorage.setItem('block2BgColor', newColor);
            }
        });
    }
});

/* ЗАВДАННЯ 5: Редактор фону */
function task5BgImages() {
    const potentialIds = ['block-1', 'block-2', 'block-3', 'block-4', 'block-5'];
    const listContainer = document.getElementById('block-list');

    potentialIds.forEach(id => {
        const savedBg = localStorage.getItem(`bg_${id}`);
        const el = document.getElementById(id);
        if (savedBg && el) {
            el.style.backgroundImage = `url('${savedBg}')`;
            el.style.backgroundSize = 'cover';
        }
    });

    potentialIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.innerText.trim().length > 0) {
            const li = document.createElement('li');
            li.textContent = `Додати фон для: ${id.toUpperCase()}`;
            li.style.cursor = "pointer";
            li.style.color = "blue";
            li.style.textDecoration = "underline";
            li.style.marginBottom = "5px";
            
            li.onclick = () => {
                document.querySelectorAll('.bg-edit-form').forEach(f => f.remove());

                const formDiv = document.createElement('div');
                formDiv.className = 'bg-edit-form';
                formDiv.style.marginTop = '10px';
                formDiv.style.padding = '10px';
                formDiv.style.background = '#f0f0f0';
                formDiv.style.border = '1px solid #999';
                
                formDiv.innerHTML = `
                    <strong>Фон для ${id}:</strong><br>
                    <input type="text" placeholder="URL картинки" class="url-input" style="width:100%"><br>
                    <button class="save-btn" style="background:green; color:white; margin-top:5px;">Зберегти</button>
                    <button class="del-btn" style="background:red; color:white; margin-top:5px;">Видалити</button>
                `;
                el.appendChild(formDiv);

                const input = formDiv.querySelector('.url-input');
                
                formDiv.querySelector('.save-btn').onclick = (e) => {
                    e.stopPropagation(); 
                    const url = input.value;
                    if(url) {
                        el.style.backgroundImage = `url('${url}')`;
                        el.style.backgroundSize = 'cover';
                        localStorage.setItem(`bg_${id}`, url);
                        alert('Фон збережено!');
                        formDiv.remove(); 
                    }
                };

                formDiv.querySelector('.del-btn').onclick = (e) => {
                    e.stopPropagation();
                    el.style.backgroundImage = '';
                    localStorage.removeItem(`bg_${id}`);
                    alert('Фон видалено!');
                    formDiv.remove();
                };
            };
            
            listContainer.appendChild(li);
        }
    });
}

document.addEventListener('DOMContentLoaded', task5BgImages);