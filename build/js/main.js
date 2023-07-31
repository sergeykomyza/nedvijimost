
// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
$(document).ready(function () {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
});

// ================================================== СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const swiper = new Swiper('.objects__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
        el: '.objects .swiper-pagination',
        clickable: true,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.next-slide',
    },
    breakpoints: {
        // when window width is >= 480px
        769: {
          slidesPerView: 2
        },
        // when window width is >= 640px
        993: {
          slidesPerView: 4
        }
    }
});

const swiper2 = new Swiper('.steps__slider', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
        el: '.steps .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        // when window width is >= 480px
        769: {
          slidesPerView: 2
        },
        // when window width is >= 640px
        993: {
          slidesPerView: 4
        }
    }
});

const swiper3 = new Swiper('.reviews__slider', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
        el: '.reviews .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        // when window width is >= 480px
        769: {
          slidesPerView: 2
        },
        // when window width is >= 640px
        993: {
          slidesPerView: 3
        }
    }
});
// ================================================== 
const mMenuToggle = ()=> {
    document.querySelector('.js-mMenuToggle').addEventListener('click', function(){
        this.classList.toggle('active')
        document.querySelector('.header').classList.toggle('active')
    })
}

const headerScroll = () => {
    const header = document.querySelector('.header')
    // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
    $('.menu__link').click(function () {
        document.querySelector('.header').classList.remove('active')
        document.querySelector('.js-mMenuToggle').classList.remove('active')
        header.classList.remove('scroll')
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top - 140
        }, 1000);
    });
    // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
    function headerActiveToggle() {
        const scrollSize = window.pageYOffset
        scrollSize > 1 ? header.classList.add('scroll') : header.classList.remove('scroll')
    }
    window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
    window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
}

// ================================================== 
const quiz = () => {
    let steps = document.querySelectorAll('.quiz__box'),
        prev = document.querySelector('.quiz__prev'),
        next = document.querySelector('.quiz__next'),
        countSteps = 0,
        progressBox = document.querySelector('.quiz__progress'),
        progressLine = document.querySelector('.quiz__progressline'),
        countProgress = 0,
        countNum = document.querySelector('.quiz__count'),
        percent = 20

    next.setAttribute('disabled', 'disabled')
    
    function stepsCount(){

        steps.forEach(step => {                // перебираем блоки с выбором
            step.classList.remove('visible')   // скрываем все блоки
        })
        steps[countSteps].classList.add('visible') // показываем только один

        let checks = steps[countSteps].querySelectorAll('.label__radio') 

        checks.forEach(elem => { // перебираем input radio видимого блока
            elem.addEventListener('change', function(){  // событие изменения

                if( steps[countSteps].classList.contains('active') == false ){ // заполняем полосу
                    countProgress += percent
                    progressLine.style.width = countProgress + '%'
                }
                
                steps[countSteps].classList.add('active') // видимому блоку добавляем активный класс
                next.removeAttribute('disabled')  // кнопку next делаем активной

            })
            // в том случае если мы дойдя до конца начнем кликать назад, чтобы поменять выбор
            if( steps[countSteps].classList.contains('active') ){  // если у видимого блока стоит активный класс
                next.removeAttribute('disabled') // у кнопки next оставляем активность
            } else {
                next.setAttribute('disabled', 'disabled') // иначе, т.е если в этом блоке еще не выбирали ничего - кнопку next делаем неактивной пока не сделаем выбор
            }
        })

        countNum.innerText = steps[countSteps].dataset.step

        // прячем или показываем кнопки и прогрессбар
        if(countSteps == steps.length - 1){
            next.style.display = 'none'
            progressBox.style.display = 'none'
        } else {
            next.style.display = 'block'
        }
        if(countSteps == 0 || countSteps == steps.length - 1){
            prev.style.display = 'none'
        } else {
            prev.style.display = 'block'
        }

    }
    stepsCount()

    next.addEventListener('click', (e)=>{
        e.preventDefault()
        countSteps++
        stepsCount()
    })

    prev.addEventListener('click', (e)=>{
        e.preventDefault()
        countSteps--
        stepsCount()
    })

}

// ==================================================
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector),
        headBox = document.querySelector('.tabs-headbox');

function hideContent(){
    content.forEach(item => {
        item.style.display = 'none';
    });
    tab.forEach(item => {
        item.classList.remove(activeClass);
    });
}
if(document.documentElement.clientWidth < 992){
    document.addEventListener('click', function(e){
        document.querySelector('.tabs-headbox').classList.add('is-open')
        let itsOpenTab = e.target == document.querySelector('.tabs-headbox'),
        itsActiveHeader = document.querySelector('.tabs-headbox').classList.contains('is-open')
        if(itsActiveHeader && itsOpenTab){
            header.style.height = header.scrollHeight + 'px'
        } else if(!itsOpenTab){
            document.querySelector('.tabs-headbox').classList.remove('is-open')
            header.style.height = '50px'
        }
    })
}
    
function showContent(i){
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);
    if(document.documentElement.clientWidth < 992){
        let temp = tab[i]
        header.prepend(temp)
    }
}
    
header.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if( target &&
            (target.classList.contains(tabSelector.replace(/\./,"")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
            tab.forEach((item, i) => {
                if(target == item || target.parentNode == item){
                    hideContent();
                    showContent(i);
                }
            });
        }
});
  
hideContent();
showContent(0); // в скобках указываем индекс таба, который хотим видеть активным
    
}

// ================================================== 


const accordeons = (accordeonSelector) => {
    const accordeon = document.querySelector(accordeonSelector)

    const accItem = accordeon.querySelectorAll('.accordeon__item')

    accItem.forEach( item => { // перебираем все блоки аккордеона
    const accHeader = item.querySelector('.accordeon__header') // заголовок одного блока
    item.style.height = accHeader.scrollHeight + "px" // делаем высоту всего блока равной заголовку блока, таким образом скрывая контент блока
    item.className = 'accordeon__item closed' // присваиваем блоку класс closed
    item.addEventListener('click', toggle) // вешаем на блок вызов функции по клику
    });
    
    function toggle(e){
    let target = e.target
    e.preventDefault()
    const thisClass = this.className
    const itsAccHeader = target == this.querySelector('.accordeon__header') || this.querySelector('.accordeon__header').contains(target)
    const accHeader = this.querySelector('.accordeon__header')
    const accContent = this.querySelector('.accordeon__content')
    
    accItem.forEach( item => {
        const accHeader = item.querySelector('.accordeon__header')
        if(itsAccHeader){
        item.style.height = accHeader.scrollHeight + "px"
        item.className = 'accordeon__item closed'
        }
    });
    
    if(thisClass == "accordeon__item closed"){
        this.className = "accordeon__item opened"
        this.style.height = (accHeader.scrollHeight + accContent.scrollHeight) + "px"
    }
    }
    
}

accordeons('.accordeon');


// ================================================== 
const objects = () => {

    const objectsWrapper = document.querySelector('.objects__box') // место под вывод объектов 
    const popup = document.querySelector('.popup') // попап с подробной инфой по объекту

    // рендерим объекты
    function renderObjectsPreview(list){
        objectsWrapper.innerHTML = '';
        list.forEach(item => {
            let objectPreview = document.createElement('article')
            objectPreview.innerHTML = `
                <div class="object-preview" data-id="${item.id}">
                    <img class="object-preview__img" src="img/${item.mainImg}" alt="/">
                    <div class="object-preview__info">
                        <h6 class="object-preview__name">${item.objectName}</h6>
                        <div class="object-preview__datas"> 
                            <div class="object-preview__data"> <img class="object-preview__icon" src="img/icon-marker.svg" alt="/"><span class="object-preview__val">${item.position}</span></div>
                            <div class="object-preview__data"> <img class="object-preview__icon" src="img/icon-square.svg" alt="/"><span class="object-preview__val">${item.square}</span></div>
                            <div class="object-preview__data"> <img class="object-preview__icon" src="img/icon-home.svg" alt="/"><span class="object-preview__val">${item.type}</span></div>
                            <div class="object-preview__data"> <img class="object-preview__icon" src="img/icon-calendar.svg" alt="/"><span class="object-preview__val">${item.year}</span></div>
                        </div>
                        <div class="object-preview__price"> <span>${item.price}</span><a class="object-preview__more"><img src="img/icon-button.svg" alt="/"></a></div>
                    </div>
                </div>
            `
            objectsWrapper.appendChild(objectPreview)
        })
    }

    // рендерим попап с данными кликнутого объекта
    function renderPopup(i, list){
        popup.innerHTML = '';   // перед рендерингом очищаем содержимое от предыдущего вызова
        let popupContent = document.createElement('div')  // создаем элемент div
        popupContent.classList.add('popup__inner')   // присваиваем ему нужный класс
        /* 
            currObject - конкретный, вызванный по клику объект из файла json
            list это список объектов из файла json. В функции getPost() - это переменная data, т.е список объектов из файла json, полученный через запрос XMLHttpRequest()
            i это значение data-id кликнутого объекта в функции getPost() 
            Перебираем json файл с объектами и если значение data-id кликнутого объекта (i), совпадает со значением id
            объекта json (item.id), то именно этот объект помещаем в переменную currObject
        */  
        list.forEach(item => {
            if(i === item.id){
                let currObject = item
                popupContent.innerHTML = ` 
                    <button class="popup__close js-popupClose"><img src="img/icon-close.svg" alt="/"/></button>
                    <div class="popup__body">
                        <div class="object">
                            <div class="object-gallery">
                                <figure class="object-gallery__fullimg"> <img src="img/${currObject.mainImg}" alt="/"/></figure>
                                <div class="object-gallery__items">
                                    ${currObject.gallery.map(elem => '<img class="object-gallery__item" src="img/'+ elem +'" src="/">').join('')}
                                </div>
                            </div>
                            <div class="object-info">
                                <h6 class="object-info__name">${currObject.objectName}</h6>
                                <div class="object-info__datas"> 
                                    <div class="object-info__data"> <img class="object-info__icon" src="img/icon-marker.svg" alt="/"/><span class="object-info__val">${currObject.position}</span></div>
                                    <div class="object-info__data"> <img class="object-info__icon" src="img/icon-square.svg" alt="/"/><span class="object-info__val">${currObject.square}</span></div>
                                    <div class="object-info__data"> <img class="object-info__icon" src="img/icon-home.svg" alt="/"/><span class="object-info__val">${currObject.type}</span></div>
                                    <div class="object-info__data"> <img class="object-info__icon" src="img/icon-calendar.svg" alt="/"/><span class="object-info__val">${currObject.year}</span></div>
                                </div>
                                <div class="object-info__price">${currObject.price}</div>
                                <a class="object-info__feedback" data-popup="popup" href="#modal-form">Оставить заявку</a>
                                <div class="object-info__content"> 
                                    <b>Технические характеристики объектов недвижимости:</b>
                                    ${currObject.description}
                                </div>
                                <div class="object-info__content"> <b>На территории:</b>
                                    <ul>  
                                        ${currObject.charact ? currObject.charact.map(elem => '<li> - '+ elem +'</li>').join('') : ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `                   
            }
        })
        
        popup.classList.add('is-open')   // добавляем попапу класс для видимости
        popup.appendChild(popupContent)  // добавляем внутрь отрисованное содержимое
        
    }

    // галерея в попап
    popup.addEventListener('click', function(e){
        let target = e.target
        let bigImg = popup.querySelector('.object-gallery__fullimg img')
        let gallery = popup.querySelectorAll('.object-gallery__item')
        gallery.forEach(item => {
            let itsMiniature = target == item
            if(itsMiniature){
                let itsMiniatureSrc = target.getAttribute('src')
                bigImg.setAttribute('src', itsMiniatureSrc)
            }
        })
        
    })
    
    let xhr = new XMLHttpRequest()
    xhr.open('GET', "https://sergeykomyza.github.io/nedvijimost/build/img/objects.json")
    xhr.send()
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.response)
            renderObjectsPreview(data)
            objectsWrapper.addEventListener('click', function(e){
                if(e.target.classList.contains('object-preview') || e.target.closest('.object-preview')){
                    let dataId = e.target.closest('.object-preview').dataset.id
                    renderPopup(dataId, data) 
                }
            })
        }
    }

    // скрываем попап при клике на крестик либо оверлей
    popup.addEventListener('click', function(e){
        let target = e.target
        let itsOverlay = target == popup
        let itsCloseBtn = target == document.querySelector('.js-popupClose') || document.querySelector('.js-popupClose').contains(target)
        if(itsOverlay || itsCloseBtn){
            e.target.closest('.popup').classList.remove('is-open') 
        }
    })

    // вызов попап с формой из попап с объектом
    popup.addEventListener('click', function(e){
        let target = e.target
        let itsBtnForm = target == document.querySelector('.object-info__feedback')
        let hrefPopupBtn = target.getAttribute('href') || target.getAttribute('data-src')
        console.log(itsBtnForm)
        if(itsBtnForm){
            document.querySelectorAll('.popup').forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
        }
    })

}

// ==================================================
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
    const popupBtn = document.querySelectorAll("[data-popup='popup']")
    popup.forEach(item => {
        const closePopupBtn = item.querySelectorAll('.js-popupClose')
        closePopupBtn.forEach(elem => {
            elem.addEventListener('click', function(){
                item.classList.remove('is-open')
                document.documentElement.classList.remove('popup-open')
            })
        })
    })
    popupBtn.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src')
            document.documentElement.classList.add('popup-open')
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
        })
    })
}

// ================================================== 
headerScroll()
mMenuToggle()
quiz()
tabs('.tabs__buttons', '.tab', '.tabs__content ', 'active')
objects()
popup()
// ================================================== КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
// document.addEventListener('DOMContentLoaded', function () {
//     setTimeout(function() {
//         var headID = document.getElementsByTagName("body")[0];         
//         var newScript = document.createElement('script');
//         newScript.type = 'text/javascript';
//         newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
//         headID.appendChild(newScript);
//     }, 3000);
//     setTimeout(function() {
//             var myMap = new ymaps.Map("map", {
//             center: [36.488592, 32.118670],
//             zoom: 17,
//             controls: ['smallMapDefaultSet']
//         }, {
//             searchControlProvider: 'yandex#search'
//         });

//         myGeoObject = new ymaps.GeoObject({
//             geometry: {
//                 type: "Point"
//             },
//         });
//         myMap.geoObjects
//             .add(myGeoObject)
//             .add(new ymaps.Placemark([36.488592, 32.118670], {
//                 balloonContent: '<strong></strong>',
//                 iconCaption: 'Mahmutlar mah.Sarihasanli cad. A88'
//             }, {
//                 preset: 'islands#blueCircleDotIconWithCaption',
//                 iconCaptionMaxWidth: '200'
//             }));

//         myMap.setType('yandex#publicMap');

//         myMap.behaviors.disable('scrollZoom');
//         //на мобильных устройствах... (проверяем по userAgent браузера)
//         if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//             //... отключаем перетаскивание карты
//             myMap.behaviors.disable('drag');
//         }
//     }, 4000);
// });

