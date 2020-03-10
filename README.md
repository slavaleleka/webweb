# AdGuard Scriptlets and Redirect resources
[![Build Status](https://travis-ci.com/AdguardTeam/Scriptlets.svg?branch=master)](https://travis-ci.com/AdguardTeam/Scriptlets)

* [Scriptlets](#scriptlets)
    * [Syntax](#scriptlet-syntax)
    * [Available scriptlets](./wiki/about-scriptlets.md#scriptlets)        
    * [Scriptlets compatibility table](./wiki/compatibility-table.md#scriptlets)
* [Redirect resources](#redirect-resources)
    * [Syntax](#redirect-syntax)
    * [Available redirect resources](./wiki/about-redirects.md#redirect-resources)
    * [Redirect resources compatibility table](./wiki/compatibility-table.md#redirects)
* [How to build](#how-to-build)
* [Browser compatibility](#browser-compatibility)

* * *

### Build output

#### Scriptlets library

You are welcome to use scriptlets and redirect resources as a CJS module. They can be imported from `dist/cjs/scriptletsCjs.js`:

```javascript
const scriptlets = require('scriptlets');
const { redirects } = require('scriptlets');

```

And also there is a module at `dist/scriptlets.js` which has been exported to a global variable `scriptlets` with such methods:

```javascript
/**
* Returns scriptlet code
* @param {Source} source
* @returns {string}
*/
scriptlets.invoke(source);
```

```javascript
/**
* Checks if the scriptlet name is valid
* @param {string} name - scriptlet name
* @returns {boolean}
*/
scriptlets.isValidScriptletName(name);
```

```javascript
/**
* Validates any scriptlet rule
*
* ADG or UBO rule is single-scriptlet, but ABP rule may contain more than one snippet
* so if at least one of them is not valid - whole 'input' rule is not valid too.
* @param {string} input - can be Adguard or Ubo or Abp scriptlet rule
* @returns {boolean}
*/
scriptlets.isValidScriptletRule(input);
```

```javascript
/**
* Checks if the `rule` is AdGuard / Ubo / Abp scriptlet rule
* @param {string} rule - rule text
* @returns {boolean}
*/
scriptlets.isAdgScriptletRule(rule);
scriptlets.isUboScriptletRule(rule);
scriptlets.isAbpSnippetRule(rule);
```

```javascript
/**
* Converts Ubo scriptlet rule to AdGuard
* @param {string} rule - rule text
* @returns {Array} - array with one item - AdGuard scriptlet rule
*/
scriptlets.convertUboToAdg(rule);
```

```javascript
/**
* Converts Abp snippet rule to AdGuard
* @param {string} rule - rule text
* @returns {Array} - array with AdGuard scriptlet rule or rules if Abp-rule has few snippets in one line
*/
scriptlets.convertAbpToAdg(rule);
```

```javascript
/**
* Checks if the `rule` is any scriptlet rule and converts it to AdGuard
* @param {string} rule - rule text
* @returns {Array} - array of AdGuard scriptlet rules - one item for Adg and Ubo or few items for Abp
*/
scriptlets.convertScriptletToAdg(rule);
```

```javascript
/**
 * Converts AdGuard scriptlet rule to UBO one
 * @param {string} rule - AdGuard scriptlet rule
 * @returns {string} - UBO scriptlet rule
 */
scriptlets.convertAdgToUbo(rule);
```


##### Imported `redirects` has such methods:

```javascript
/**
* Returns redirects code
* @param {Source} source
* @returns {string}
*/
redirects.getCode(source);
```


```javascript
/**
* Validates any redirect rule
*
* @param {string} input - can be Adguard or Ubo or Abp redirect rule
* @returns {boolean}
*/
redirects.isValidRedirectRule(input);
```

```javascript
/**
* Checks if the `rule` is AdGuard / Ubo / Abp redirect resource rule
* @param {string} rule - rule text
* @returns {boolean}
*/
redirects.isAdgRedirectRule(rule);
redirects.isUboRedirectRule(rule);
redirects.isAbpRedirectRule(rule);
```

```javascript
/**
* Converts Ubo redirect rule to AdGuard
* @param {string} rule - rule text
* @returns {string}
*/
redirects.convertUboRedirectToAdg(rule);
```

```javascript
/**
* Converts Abp redirect rule to AdGuard
* @param {string} rule - rule text
* @returns {string}
*/
redirects.convertAbpRedirectToAdg(rule);
```

```javascript
/**
* Checks if the `rule` is any redirect rule and converts it to AdGuard
* @param {string} rule - rule text
* @returns {string} - converted to Adguard redirect rule OR `rule` if it is a comment
*/
redirects.convertRedirectToAdg(rule);
```

* * *

* * *

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
