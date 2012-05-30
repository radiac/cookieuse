/*
** Example cookieuse call
*/

// Google analytics global variable
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'YOUR_ACCOUNT_ID_HERE']);
_gaq.push(['_trackPageview']);

$(function () {
    $('body').cookieuse({
        content:    'This site uses cookies - you can read the <a href="cookiepolicy.html">cookie policy</a> for more information.',
        consent: function () {
            // Abort here - we don't actually want to add GA in this example
            // To enable, remove return on the line below:
            return;
            
            // Google analytics closure
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        },
        refused: function () {
            $.cookieuse.clear('__utma', '__utmb', '__utmc', '__utmz', '__utmv', '__utmx');
        }
    });
});
