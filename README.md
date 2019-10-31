

* abortOnPropertyWrite - &lt;p&gt;Abort property writing&lt;/p&gt;
&lt;p&gt;Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-&lt;/p&gt;
&lt;p&gt;Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896&lt;/p&gt;


* * *

### Available scriptlets

This is a list of scriptlets supported by AdGuard. Please note, that in order to achieve cross-blocker compatibility, we also support syntax of uBO and ABP. You can check out the [compatibility table](./wiki/compatibility-table.md).

<a name="module_abort-on-property-write.abortOnPropertyWrite"></a>

### abort-on-property-write.abortOnPropertyWrite(source, property)
<p>Abort property writing</p>
<p>Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-</p>
<p>Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896</p>

**Kind**: static method of [<code>abort-on-property-write</code>](#module_abort-on-property-write)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Source</code> |  |
| property | <code>string</code> | <p>propery name</p> |

<a name="module_abort-on-property-write"></a>

## abort-on-property-write
<a name="module_abort-on-property-write.abortOnPropertyWrite"></a>

### abort-on-property-write.abortOnPropertyWrite(source, property)
<p>Abort property writing</p>
<p>Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-</p>
<p>Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896</p>

**Kind**: static method of [<code>abort-on-property-write</code>](#module_abort-on-property-write)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Source</code> |  |
| property | <code>string</code> | <p>propery name</p> |


* [abort-on-property-write](#module_abort-on-property-write)
    * [.abortOnPropertyWrite(source, property)](#module_abort-on-property-write.abortOnPropertyWrite)

* [abort-on-property-write](#module_abort-on-property-write)
    * [.abortOnPropertyWrite(source, property)](#module_abort-on-property-write.abortOnPropertyWrite)

* * *


**webweb**

https://raw.githubusercontent.com/slavaleleka/webweb/master/customlist.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/blablab.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/dns-990.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/trusted_filter_test.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/untrusted_filter_test.txt

* * *

# AdGuard Scriptlets and Resources
[![Build Status](https://travis-ci.org/AdguardTeam/Scriptlets.svg?branch=master)](https://travis-ci.org/AdguardTeam/Scriptlets)

## Scriptlets
Scriptlet is a JavaScript function that provides extended capabilities for content blocking. These functions can be used in a declarative manner in AdGuard filtering rules.

### Syntax
```
rule = [domains]  "#%#//scriptlet(" scriptletName arguments ")"
```

* `scriptletName` (mandatory) is a name of the scriptlet from AdGuard's scriptlets library
* `arguments` (optional) a list of `String` arguments (no other types of arguments are supported)

> **Remarks**
> * The meanining of the arguments depends on the scriptlet.
> * You can use either single or double quotes for the scriptlet name and arguments.
> * Special characters must be escaped properly:
>     * `"prop[\"nested\"]"` - valid
>     * `"prop['nested']"` - also valid
>     * `"prop["nested"]"` - not valid

#### Example
```
example.org#%#//scriptlet("abort-on-property-read", "alert")
```

This rule applies the `abort-on-property-read` scriptlet on all pages of `example.org` and its subdomains, and passes one orgument to it (`alert`).

* * *

### Available scriptlets

This is a list of scriptlets supported by AdGuard. Please note, that in order to achieve cross-blocker compatibility, we also support syntax of uBO and ABP. You can check out the [compatibility table](./wiki/compatibility-table.md).

<a name="module_abort-on-property-write.abortOnPropertyWrite"></a>

### abort-on-property-write.abortOnPropertyWrite(source, property)
<p>Abort property writing</p>
<p>Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-</p>
<p>Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896</p>

**Kind**: static method of [<code>abort-on-property-write</code>](#module_abort-on-property-write)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Source</code> |  |
| property | <code>string</code> | <p>propery name</p> |


* * *
