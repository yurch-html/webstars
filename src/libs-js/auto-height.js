$(document).ready(function(){
    $.fn.equivalent = function (){
        var $blocks = $(this), //запишем значение jQuery выборки к которой будет применена эта функция
            maxH    = $blocks.eq(0).height(); //примем за максимальную высоту - высоту первого блока в выборке

        $blocks.each(function(){
            //делаем сравнение высоты каждого блока с максимальной
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
            /*
            Этот блок можно записать так:
            if ( $(this).height() > maxH ) {
                maxH = $(this).height();
            }
            */
        });

        $blocks.height(maxH); //устанавливаем найденное максимальное значение высоты для каждого блока jQuery выборки
    }

    $('.nav').equivalent(); //применяем нашу функцию в элементам jQuery выборки - $('.nav')
});
