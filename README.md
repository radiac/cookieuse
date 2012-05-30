Cookieuse
=========

A simple way to get implicit consent to set cookies for your website visitors.

This should help you comply with [EU cookie law legislation][ico_law], and was
written after the ICO [clarified][ico_implicit] their position on implicit
consent, so it is not as intrusive as some other cookie consent plugins.

Its only dependency is jQuery, and it is 1.3KB when minified. This project is
released under the MIT license.

* Website: http://radiac.net/projects/cookieuse/
* Example: http://radiac.net/projects/cookieuse/example/
* Code:    https://github.com/radiac/cookieuse


Disclaimer: This is provided to make it easier for you to comply with
the cookie law, but I am not a lawyer and every website is different, so it is
your responsibility to ensure that your use of this library meets your legal
requirements, and I cannot be held responsible if it does not.


Overview
--------

Cookieuse relies on implicit consent, by ensuring that all visitors have seen a
note about cookies.

Visitors are shown a message overlay, which is styled by your CSS - several
examples of size and position are included in `example.css`. The overlay tells
visitors that the site uses cookies; the message can be customised, but should
have a link to your cookie policy. The default path for the policy is
`/cookiepolicy.html`.

If the visitor clicks on the overlay, or if the timer elapses, the overlay will
be closed. A cookie is set to remember whether the overlay has been shown to
the visitor, and if the cookie is found the overlay will not be shown. The
cookie lives for 10 years.

The cookie also stores a state of consent, to remember whether the visitor
gives consent for cookie use. There are two callbacks available depending on
the consent state; `consent()` and `refused()`.

The `consent()` callback can be used to add JavaScript which sets cookies, and
the `refused()` callback can be used to remove any cookies which have been set.

The consent state would be managed by the cookie policy page. By default there
are just two consent states (consent given or refused), but you can use more if
you want - see the usage section below.

Alternatively, some websites seem to manage refused consent by telling visitors
to no longer use the website, or by telling them to change their browser
settings. As such, it seems that you could set cookies as normal and remove the
`Your cookie settings` section in the example policy and still comply with the
law.


Usage
-----

### Adding cookieuse to your pages

Load the code in the `head` of each page:

    <head>
    ...
    <link rel="stylesheet" href="/media/css/site.css" type="text/css" />
    <script src="/media/js/jquery-1.7.2.min.js"></script>
    <script src="/media/js/cookieuse-1.0.0.min.js"></script>
    <script src="/media/js/site.js"></script>
    ...
    </head>

Obviously, your paths will vary. To call `cookieuse`, you apply it to an
element in the page which will contain the overlay. This will in almost all
cases be `body`:

    // site.js
    $(function () {
        $('body').cookieuse();
    });

You can also pass some options to `cookieuse` (detailed fully below):

    // site.js
    $(function () {
        $('body').cookieuse({
            path:   '/subsite/',
            content: "I hope you like cookies, because now you have them."
        });
    });

There is a more complicated example of how you could use it with Google
Analytics in `example/example.js`.

Then you'll need some rules in your CSS to style the overlay - this one will
put a pale grey bar along the bottom:

    /* site.css */
    .__cookieuse {
        position:	fixed;
        bottom:		0;
        left:		0;
        width:		100%;
        background-position:	right center;
        background-repeat:		no-repeat;
        background-image:		url('close.png');
        background-color:		rgb(220,220,220);
        background-color:		rgba(220,220,220,0.9);
    }
    .__cookieuse p {
        margin:	0.6em;
        margin-right: 30px;
    }

You'll find examples in `example.css` for bars at the top and bottom, and boxes
in the top right and bottom right corners. The `close.png` icon included is
from Iconic (http://somerandomdude.com/work/iconic/), with added padding.


### Managing consent state

In addition to the `$(...).cookieuse` function which lets you insert the
overlay, there is also a `$.cookieuse` object which lets you control the
consent state and page cookies.

The example `cookiepolicy.html` shows how you could use this to let your users
select which cookies you set for them.

You can get the cookie consent state with:

    $.cookieuse.get()

You can set the cookie consent state with:

    $.cookieuse.set(state)

where `state` is the consent state you want to set.

The example policy uses the two default states (`0=refused` and `1=consent`),
but you could use your own values; for example, `1=enhancements` and
`2=advertising`. Any non-zero value will equal consent, and the consent cookie
value will be passed to the `consent()` callback as its first and only
argument.

There is also a third command:

    $.cookieuse.clear('cookie1', 'cookie2', ...)

This simply deletes the specified cookies; `example.js` shows how this could be
used to clear away any Google Analytics cookies after they have been set. If
you pay careful attention to load order, you could use this to log every visit
using GA, but then clear the cookies before the visitor leaves the page -
although that exercise is left for the reader.

The clear() function will use the same path as specified in the cookieuse
overlay options. If the cookie has been set on a different path, you can pass
in a tuple of `[cookie_name, path]`:

    $.cookieuse.clear(['cookie1', '/'], 'cookie2', ...)


### Options

As mentioned above, the overlay call accepts some options:


#### Cookie settings

`key`

* Optional key to use as the cookie name
* Default: `__cookieuse`


`path`

* Path to set the cookie on
* Default: `/`


`domain`

* Domain to set the cookie on


`secure`

* If set, the cookie will have the secure flag set


#### Overlay settings

`content`

* The text to display in the overlay
* Will be wrapped in `<p></p>`, so to insert a paragraph break use: `</p><p>`
* Default: `This site uses cookies; read the <a href="/cookiepolicy.html">cookie policy</a> for more information or to change your settings.`


`time`

* The amount of time to display the overlay for, in seconds
* If this is 0, the overlay will remain visible until the visitor leaves the
page
* Default: `10`


`cssClass`

* The CSS class to apply to the element
* Will also be given position:fixed and positioning values
* Default: `__cookieuse`


#### Callbacks

`consent`

* Callback when the user has granted implied consent
* It is passed one argument: `consent` is the consent state, which will be `1`
unless you have specified your own consent states


`refused`

* Callback when the user has refused consent


`finish`

* Callback after consent is either given or refused, for common functionality
* It is passed one argument: `consent` is the consent state


Changelog
---------

1.0.2 (2012-05-30)

* Added `finish` callback
* Tidied up `example.js`, corrected version number in `cookieuse.js`

1.0.1 (2012-05-28)

* Added path support to `$.cookieuse.clear()`
* Rearranged examples to make files more obvious

1.0.0 (2012-05-28)

* Initial release


[ico_law]: http://www.ico.gov.uk/~/media/documents/library/privacy_and_electronic/practical_application/guidance_on_the_new_cookies_regulations.ashx
[ico_implicit]: http://www.ico.gov.uk/for_organisations/privacy_and_electronic_communications/the_guide/cookies.aspx

