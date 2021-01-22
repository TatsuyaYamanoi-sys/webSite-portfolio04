$(function() {
    const main = new Main();
});

class Main {
    constructor() {
        this._init();
    }
    _init() {
        this._bgParallax();
    }
    _bgParallax() {
        $(window).on('scroll load', function(){
            var bg = $(window).scrollTop();
            $('.bg01').css({top:bg/10*-1});
            $('.bg02').css({top:bg/4*-1});
        });
    }
}