const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            if (history.pushState) {
                history.pushState(null, null, this.getAttribute('href'));
            }
        }
    });
});

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const resultsList = document.getElementById('resultsList');

const lessons = [
    { title: "معرفی پایتون", link: "#intro" },
    { title: "نصب و شروع یادگیری پایتون", link: "Python-page/python-page.html#python-install-quickstart" },
    { title: "سینتکس پایتون", link: "Python-page/python-page.html#python-syntax" },
    { title: "کامنت ها", link: "Python-page/python-page.html#python-comments" },
    { title: "متغیرها", link: "Python-page/python-page.html#python-variables" },
    { title: "انواع داده‌ها", link: "Python-page/python-page.html#python-data-types" },
    { title: "اعداد", link: "Python-page/python-page.html#python-numbers" },
    { title: "تبدیل نوع", link: "Python-page/python-page.html#python-casting" },
    { title: "رشته‌ها یا strings", link: "Python-page/python-page.html#python-strings" },
    { title: "بولین‌ها", link: "Python-page/python-page.html#python-booleans" },
    { title: "عملگرها", link: "Python-page/python-page.html#python-operators" },
    { title: "لیست‌ها", link: "Python-page/python-page.html#python-lists" },
    { title: "تاپل‌ها", link: "Python-page/python-page.html#python-tuples" },
    { title: "مجموعه‌ها", link: "Python-page/python-page.html#python-sets" },
    { title: "دیکشنری‌ها", link: "Python-page/python-page.html#python-dictionaries" },
    { title: "دستورات شرطی if ... else", link: "Python-page/python-page.html#python-if-else" },
    { title: "دستور Match", link: "Python-page/python-page.html#python-match" },
    { title: "حلقه‌ While", link: "Python-page/python-page.html#python-while-loops" },
    { title: "حلقه‌ For", link: "Python-page/python-page.html#python-for-loops" },
    { title: "توابع در پایتون", link: "Python-page/python-page.html#python-functions" },
    { title: "تابع lambda", link: "Python-page/python-page.html#python-lambda" },
    { title: "گرفتن ورودی", link: "Python-page/python-page.html#python-user-input" },
    { title: "آرایه‌ها در پایتون", link: "Python-page/python-page.html#python-arrays" },
    { title: "شیءگرایی در پایتون", link: "Python-page/python-page.html#python-oop" },
    { title: "کلاس‌ها و اشیاء", link: "Python-page/python-page.html#python-classes-objects" },
    { title: "وراثت در پایتون", link: "Python-page/python-page.html#python-inheritance" },
    { title: "تکرارکننده‌ها", link: "Python-page/python-page.html#python-iterators" },
    { title: "Polymorphism در پایتون", link: "Python-page/python-page.html#python-polymorphism" },
    { title: "دامنه یا scope", link: "Python-page/python-page.html#python-scope" },
    { title: "مدیریت خطاها", link: "Python-page/python-page.html#python-try-except" },
    { title: "مدیریت فایل‌ها", link: "Python-page/python-page.html#python-file-handling" },
    { title: "توابع داخلی پایتون", link: "Python-page/python-page.html#python-builtin-functions" },
    { title: "کلمات کلیدی پایتون", link: "Python-page/python-page.html#python-keywords" },
    { title: "استثناهای داخلی پایتون", link: "Python-page/python-page.html#python-builtin-exceptions" },
    { title: "واژه‌نامه پایتون", link: "Python-page/python-page.html#python-glossary" },
    { title: "pip", link: "Python-page/python-page.html#python-pip" }
];

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
            
    if (searchTerm.length === 0) {
        searchResults.classList.remove('show-results');
        return;
    }
            
    const filteredLessons = lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm)
    );
            
    if (filteredLessons.length > 0) {
        resultsList.innerHTML = '';
        filteredLessons.forEach(lesson => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${lesson.link}">${lesson.title}</a>`;
            resultsList.appendChild(li);
        });
        searchResults.classList.add('show-results');
    } else {
        resultsList.innerHTML = '<li style="padding: 15px; text-align: center;">نتیجه‌ای یافت نشد</li>';
        searchResults.classList.add('show-results');
    }
});

document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target)) {
        searchResults.classList.remove('show-results');
    }
});
