$(function() {
    const main = new Main();
});

class Main {
    constructor() {
        this._observers = [];
        this._init();
    }
    set observer(val) {
        this._observers.push(val);
    }
    get observers() {
        return this._observers;
    }
    _init() {
        this._bgParallax();
        this._observerInit()
    }
    _bgParallax() {
        $(window).on('scroll load', function(){
            var bg = $(window).scrollTop();
            $('.bg01').css({top:bg/10*-1});
            $('.bg02').css({top:bg/4*-1});
        });
    }
    _sectionTitleAnimate(els, inview) {
        if(inview) {
            const sta = new sectionTitleAnimation(els);
            sta.animate();
        }
    }
    _observerInit() {
        this.observer = new ScrollObserver('.section__header', this._sectionTitleAnimate, {rootMargin: "-140px 0px"});
    }
    _destroyObservers() {
        this.observers.forEach(ob => {
            ob.destroy();
        });
    }
}

class sectionTitleAnimation {
    constructor(els) {
        this.DOM = {};
        this.DOM.els = $(els)
    }
    animate() {
        this.DOM.els.toggleClass("inview");
    }
}

class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };

        this.io = new IntersectionObserver(callback.bind(this), this.options);
        this.io.POLL_INTERVAL = 100;
        this.els.forEach(el => this.io.observe(el));
    }
    destroy() {
        this.io.disconnect();
    }
}