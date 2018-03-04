
// вместо jquery- $(document).ready(function(){});

function ready(fn) {
    if(document.activeElement ? document.readyState ==='complete' : document.readyState !=='loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(function () {

//================================================= пишем весь функционал тут! ======================================//

    var mnu = document.querySelector('.toggle_mnu'), //выберем меню
        hmenu = document.querySelector('.head__hidden-wrap'), //переменная для cпрятанного подменю чтоб отобразить его
        sandwich = document.querySelector('.sandwich'), //cоздаем переменную для cпрятанного подменю - (бургер-крестик)
        contentWrap = document.querySelector('.wrapper'), // враппер всего контента
        hmenuBack = document.querySelector('.head__hidden-bg'); //затеменние фонового бекграунда

    var menuButtons = document.querySelectorAll('.hidden-navigation__link'), //пункты меню
        hiddenWrapper = document.querySelector('.hidden-navigation__wrapper'), //враппер на 2части меню(сдайдер)
        hiddenLists = document.querySelectorAll('.hidden-link__list'); //находим два скрытых подменю

    mnu.onclick = function () {
        contentWrap.classList.toggle('wrapper__active');
        hmenu.classList.toggle('head__hidden-wrap_active');
        hiddenMenuClose();
    };


    hmenuBack.onclick = function () {
        hmenu.classList.remove('head__hidden-wrap_active');
        hiddenMenuClose();
    };


    function hiddenMenuClose() { //функция для завершения анимации крестикаменю и возврата меню в исходное положение
        sandwich.classList.toggle('active');
        setTimeout(function () {
            hiddenWrapper.classList.remove('hidden-mnu-move');
        },500);
    }

//================================================= перемещение по подпунктам + закрытие меню при нажатии пунтов ==//


    for(var i=0; i <menuButtons.length; i++){
        (function (i) {
            var menubutton = menuButtons[i];
            menubutton.onclick = function () {
                if(this.classList.contains('hidden-navigation__link_next')){
                    hiddenWrapper.classList.add('hidden-mnu-move');

                    //делаем проверку какое подменю показать во втором слайде! по присвоеному ранее атрибуту data!
                    if(this.getAttribute('data-tab')=='first'){
                        hiddenLists[0].style.display='block';

                        //поиск всех элементов из списка hiddenLists - чтобы неотображать их при открытии подменю
                        var siblings1 = Array.prototype.filter.call(hiddenLists[0].parentNode.children, function(child){
                            return child !== hiddenLists[0];
                        });
                        //перебираем список из сиблингсов
                        for(var s=0; s<siblings1.length; s++) {
                            var sibling1= siblings1[s];
                            sibling1.style.display='none';
                        }

                        //или можно так
                        //hiddenLists[1].style.display='none';

                    } else {
                        hiddenLists[1].style.display='block';

                        var siblings2 = Array.prototype.filter.call(hiddenLists[1].parentNode.children, function(child){
                            return child !== hiddenLists[1];
                        });
                        //перебираем список из сиблингсов
                        for(var k=0; k<siblings2.length; k++) {
                            var sibling2= siblings2[k];
                            sibling2.style.display='none';
                        }

                        //или можно так
                        //hiddenLists[0].style.display='none';
                    }

                    //для возврата в первое подменю по нажатию на кнопку вернутся
                } else if(this.classList.contains('hidden-navigation__link_return')){
                    hiddenWrapper.classList.remove('hidden-mnu-move');

                    //для завершения анимаций при нажатии на пункт меню(переход)
                } else {
                    hiddenMenuClose();
                    hmenu.classList.remove('hidden_appear');
                    contentWrap.classList.remove('wrapper__active');
                }
            }
        })(i);
    }

});



