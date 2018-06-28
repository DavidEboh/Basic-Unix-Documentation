function responsiveMenu () {
    var $menuTrigger = $('.menu__trigger'),
        $menuContent = $('.menu__content'),
        $menuLink = $('.nav-link'),
        $overlay = $('.overlay'),
        $body = $('body');

    function openMenu() {
        $menuContent.css({
            'right' : '0',
            'transition' : '0.5s'
        });
        $overlay.css('opacity', '0.5').fadeIn();
        $body.css('overflow', 'hidden');

    }
    function closeMenu() {
        $menuContent.css('right','-270px');
        $body.css('overflow','visible');
        $overlay.css('opacity', '0').fadeOut();
        $menuContent.removeClass('menuActive');
    }

    $menuTrigger.on('click', function(e){
        e.preventDefault();
        $menuContent.toggleClass('menuActive');

        if($menuContent.hasClass('menuActive')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    $overlay.on('click', function(){
        closeMenu();
    });

    $menuLink.on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        if(target.indexOf('...') > -1) {
            var posY = $('.main-section').eq(9).offset().top - 30;
        }else{
            var posY = $(target).offset().top - 30;
        }
        $('html, body').animate({
            scrollTop: posY
        });

        $('.nav-link').parent().removeClass('active');
        $(this).parent().addClass('active');


        closeMenu();
    })
}

function activeMenu() {
    $(document).scroll(function(){
        var scrollPos = $('body').scrollTop(),
            $section = $('.main-section');
        //console.log(scrollPos);

        $section.each(function(){
            var thisTop = $(this).offset().top - 40,
                thisBottom = $(this).offset().top + $(this).outerHeight();

            if(!$('html, body').is(':animated')){
                if(scrollPos >= thisTop && scrollPos < thisBottom) {
                    $('.nav-link').parent().removeClass('active');
                    $('.nav-link[href="#'+ $(this).attr('id') + '"]').parent().addClass('active');
                }
            }
        });

    })
}

$(document).ready(function(){
    responsiveMenu();
    activeMenu();
});