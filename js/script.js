//функция задает фон хедеру
(function (){
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if(window.pageYOffset > 50){ //пролистнули от начала страницы на 50пх
            header.classList.add('header_active'); //classlist - лист, который содержит все классы данного элемента
        } else {
            header.classList.remove('header_active');
        }

    }
}());

//burger handler, открывает-закрывает бургер-меню

(function (){
   const burgerItem = document.querySelector('.burger');
   const menu = document.querySelector('.header__nav');
   const menuCloseItem = document.querySelector('.header__nav-close');
   burgerItem.addEventListener('click', () => { //обработчик событий по клику
       menu.classList.add('header__nav_active');
   });
   menuCloseItem.addEventListener('click', () => {
       menu.classList.remove('header__nav_active');
   });
}());

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        //в переменную записываем высоту хедера, чтобы регулировать расстояние, на которое нам нужно проскроллить до блока, чтобы хедер не наезжал на заголовок,
        // скрипт вычисляет высоту хедера и вычитает ее из того расстояния на которое нужно проскроллить
        //при случае, когда хедер будет не зафиксированным и должен оставаться сверху, надо удалить переменную headerElHeight везде, где используется
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t,b,c,d) { //обработчик скролла, отвечает за то как будет анимироваться скролл,
            // существуют еще ease-in ease-out linear и тд
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime){ //функция анимации
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () { //подвешивание обработчика событий на ссылки, чтобы по клику срабатывала функция smooth scroll
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());