<h2>subscribe</h2>

<h3>once for all:</h3>

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/all.lists">💐 all.lists</a>

<h3>one by one:</h3>

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/hell.o">🐣 hell.o</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/hell.o`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.rubbish">🎩 no.rubbish</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.rubbish`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.compare">🧮 no.compare</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.compare`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.donate">🪙 no.donate</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/no.donate`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/better.workflow">🛠️ better.workflow</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/better.workflow`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/screw.urltrack">🧽 screw.urltrack [alpha]</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/screw.urltrack`

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/imabroke">🏴‍☠️ imabroke [alpha]</a> : `https://raw.githubusercontent.com/slavaleleka/webweb/master/say/imabroke`

* * *

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/testing/zdorov.o">testing/zdorov.o</a>

<a href="https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/testing/tro/lo.lo">tro/lo.lo</a>


* * *

<a href="https://subscribe.adblockplus.org?location=">empty location</a>


```PostCSS
// for blocking div#targer1
div:matches-attr(/-link/ = /-banner_/)

// for blocking div#targer2
div:has(> div:matches-attr(/data-/ = /adbanner/))

// for blocking div#targer3
div:matches-attr(/-unit/ = /click/):has(> span:contains(ads))

// for blocking div#targer4
*[class]:matches-attr(/.{5,}delay$/ = /^[0-9]*$/):upward(2)

div:xpath(//*[@class="test-xpath-class"])
div:has-text(/test-xpath-content/):xpath(../../..)

div.test:nth-ancestor(4)
div:has-text(/test/):nth-ancestor(2)

div.inner:remove()
div:has(> div[ad-attr]):remove()
div:xpath(../..):remove()
div:contains(target text) { remove: true; }
div[class]:has(> a:not([id])) { remove: true; }

div:contains(/this .* banner/)

div.banner:matches-css-before(content: block me)
div.banner[-ext-matches-css-before="content: /block me/"]
```

```
// for blocking div#targer1
div:matches-attr(/-link/ = /-banner_/)

// for blocking div#targer2
div:has(> div:matches-attr(/data-/ = /adbanner/))

// for blocking div#targer3
div:matches-attr(/-unit/ = /click/):has(> span:contains(ads))

// for blocking div#targer4
*[class]:matches-attr(/.{5,}delay$/ = /^[0-9]*$/):upward(2)

div:xpath(//*[@class="test-xpath-class"])
div:has-text(/test-xpath-content/):xpath(../../..)

div.test:nth-ancestor(4)
div:has-text(/test/):nth-ancestor(2)

div.inner:remove()
div:has(> div[ad-attr]):remove()
div:xpath(../..):remove()
div:contains(target text) { remove: true; }
div[class]:has(> a:not([id])) { remove: true; }

div:contains(/this .* banner/)


div.banner:matches-css-before(content: block me)
div.banner[-ext-matches-css-before="content: /block me/"]
```


* * *

<h3 align="center">
  <img src="https://cdn.adguard.com/public/Adguard/Common/adguard_safari.svg" width="300px" alt="AdGuard for Safari" />
</h3>

<h3 align="center">The most advanced ad blocking extension for Safari</h3>
<p align="center">
  Free and open source, highly customizable and lightning fast ad blocking extension.
</p>

<p align="center">
    <a href="https://adguard.com/">AdGuard.com</a> |
    <a href="https://reddit.com/r/Adguard">Reddit</a> |
    <a href="https://twitter.com/AdGuard">Twitter</a> |
    <a href="https://t.me/adguard_en">Telegram</a>
    <br /><br />
    <a href="https://agrd.io/safari">
        <img src="https://img.shields.io/badge/download-app%20store-blue.svg" alt="Download on the AppStore" />
    </a>
    <a href="https://agrd.io/safari_release">
        <img src="https://img.shields.io/github/release/AdguardTeam/AdguardForSafari.svg" alt="Latest release" />
    </a>
    <a href="https://agrd.io/safari_beta">
        <img src="https://img.shields.io/github/release-pre/AdguardTeam/AdguardForSafari.svg?label=beta" alt="Latest beta" />
    </a>
</p>

<br />

<p align="center">
    <img src="https://cdn.adguard.com/public/Adguard/Blog/Safari_Ext_AppStore/Preferences_Filters.jpg" width="800" />
</p>

<hr />



* * *

**webweb**

https://raw.githubusercontent.com/slavaleleka/webweb/master/customlist.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/blablab.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/dns-990.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/trusted_filter_test.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/untrusted_filter_test.txt

* * *
