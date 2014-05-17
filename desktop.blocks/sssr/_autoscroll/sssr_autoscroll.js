modules.define('sssr', ['jquery'], function(provide, $, Sssr) {

var $win = $(window),
    docElem = document.documentElement;

provide(Sssr.decl({ modName: 'autoscroll' }, {

    onSetMod: {
        loading: function(modName, modVal) {
            this.__base.apply(this, arguments);
            modVal? this._stopScroll() : setTimeout(this._startScroll.bind(this), 2000);
        },
        autoscroll: function() {
            this._startScroll();
        }
    },

    beforeSetMod: {
        autoscroll: function() {
            this._stopScroll();
        }
    },

    _clear: function() {
        this.__base();
        this._stopScroll();
    },

    _startScroll: function() {
        if (docElem.offsetHeight < window.innerHeight) return;

        var top = $win.scrollTop();

        this._timer = setInterval(function() {
            $win.scrollTop(++top);
            top < (docElem.offsetHeight - window.innerHeight) || this._doRequest();
        }.bind(this), 20);
    },

    _stopScroll: function() {
        clearInterval(this._timer);
    },

    _updateContent: function() {
        $win.scrollTop(0);
        this.__base.apply(this, arguments);
    }

}, {

    /*live: function() {
        this.__base();
        this.liveInitOnBlockInsideEvent('click', 'button', function(e) {
            if (this.elem('autoscroll')[0] === e.target.domElem[0]) {
                this.setMod('autoscroll', e.target.hasMod('checked'));
            }
        });
    }*/

}))

});