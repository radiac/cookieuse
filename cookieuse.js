/*! v1.0.2 radiac.net/u/cookieuse */
(function ($) {
    var REFUSED = 0,
        CONSENT = 1,
        defaults = {
            key:        '__cookieuse',
            path:       '/',
            content:    'This site uses cookies; read the <a href="/cookiepolicy.html">cookie policy</a> for more information or to change your settings.',
            time:       10,
            cssClass:   '__cookieuse'
        },
        // Overlay display speed
        speed = 400,
        // Global options
        options = defaults
    ;
    
    function setCookie(value) {
        /** Set the cookie */
        var expires = new Date;
        expires.setDate(expires.getDate() + 3650);
        document.cookie = [
            encodeURIComponent(options.key), '=', value,
            '; expires=' + expires.toUTCString(),
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join('');
    }
    
    function getCookie() {
        /** Get the cookie */
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decodeURIComponent(pair[0]) === options.key) return pair[1];
        }
    }
    
    function clearCookie(key, path) {
        /** Clear a cookie */
        document.cookie = encodeURIComponent(key)
            + '=; path=' + (path || options.path) + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
        ;
    }
    
    function getConsent($root) {
        // Assume implicit consent
        setCookie(CONSENT);
        finish(CONSENT);
        
        // Create and add element
        var $el = $('<div class="' + options.cssClass + '"><p>'
                + options.content + '</p></div>'
            )
            .appendTo($root)
            .click(function (e) {
                $el.slideUp(speed);
            })
            .hide()
            .slideDown(speed)
        ;
        
        // Set the timer
        if (options.time) {
            setTimeout(function () {
                $el.slideUp(speed);
            }, options.time * 1000);
        }
    };
    function finish(consent) {
        /** The consent dialog has been closed */
        if (consent > REFUSED) {
            if (options.consent) options.consent(consent);
        } else if (consent == REFUSED) {
            if (options.refused) options.refused();
        }
        if (options.finish) options.finish(consent);
    };
    
    $.fn.cookieuse = function (_options) {
        /**
            options     Key/value pairs
                Cookie settings:
                key         Optional key to use as the cookie name
                            Default: __cookieuse
                path        Path to set the cookie on
                            Default: /
                domain      Domain to set the cookie on
                secure      If set, the cookie will have the secure flag set
                
                Overlay settings:
                content     The text to display in the overlay
                            Will be wrapped in <p></p>, so to insert a
                            paragraph break use: </p><p>
                            Default: This site uses cookies; read the <a href="/cookiepolicy.html">cookie policy</a> for more information or to change your settings.
                time        The amount of time to display the overlay for, in
                            seconds
                            If this is 0, the overlay will remain visible until
                            the visitor leaves the page
                            Default: 10
                cssClass    The CSS class to apply to the element
                            Will also be given position:fixed and positioning values
                            Default: __cookieuse
                
                Callbacks:
                consent     Callback when the user has granted implied consent
                            Arguments:
                                consent     Level of consent granted
                                            Default: 1
                refused     Callback when the user has refused consent
                finish      Callback at the end of cookieuse call - will be
                            called after consent or refused, regardless of
                            consent state
                            Arguments:
                                consent     Level of consent granted
        */
        // Set global options
        options = $.extend({}, defaults, _options || {});
        
        // Check if we have already got implied consent
        var consent = getCookie();
        if (consent == undefined) {
            getConsent($(this));
        } else {
            finish(consent);
        }
    };
    
    $.cookieuse = {
        get: getCookie,
        set: function (value) {
            /** Set the cookie use value */
            setCookie(value);
            finish(value);
        },
        clear: function () {
            for (var i=0; i<arguments.length; i++) {
                var key = arguments[i], path;
                if (key instanceof Array) {
                    path = key[1];
                    key = key[0];
                }
                clearCookie(key, path);
            }
        }
    };
    
})(jQuery);
