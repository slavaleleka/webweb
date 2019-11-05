


### <a id="abort-on-property-read"></a> abort-on-property-read

Abort property reading even if it doesn't exist in execution moment

Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-readjs-

Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L864

**Syntax**
```
example.org#%#//scriptlet("abort-on-property-write", <property>)
```

**Parameters**
- `property` (required) path to a property (joined with `.` if needed). The property must be attached to `window`.

**Examples**
```
! 1. Aborts all inline scripts trying to access `window.alert`
utils.escape('<script></script>')
// => '&lt;script&gt;&lt;/script&gt;'

! 2. Aborts all inline scripts trying to access `window.alert`
example2.escape('<script></script>')
```
[Scriptlet source](./testdir/abort-on-property-read.js)
* * *
### <a id="abort-on-property-write"></a> abort-on-property-write

Abort property writing

Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-

Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896

**Syntax**
```
example.org#%#//scriptlet("abort-on-property-write", <property>)
```

**Parameters**
- `property` (required) path to a property (joined with `.` if needed). The property must be attached to `window`.

**Examples**
```
! Aborts all inline scripts trying to access `window.alert`
utils.escape('<script></script>')
// => '&lt;script&gt;&lt;/script&gt;'
```
[Scriptlet source](./testdir/abort-on-property-write.js)
* * *



* * *
### <a id="abort-on-property-read"></a> abort-on-property-read

Abort property reading even if it doesn't exist in execution moment

Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-readjs-

Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L864

**Syntax**
```
example.org#%#//scriptlet("abort-on-property-write", <property>)
```

**Parameters**
- `property` (required) path to a property (joined with `.` if needed). The property must be attached to `window`.

**Examples**
```
! 1. Aborts all inline scripts trying to access `window.alert`
utils.escape('<script></script>')
// => '&lt;script&gt;&lt;/script&gt;'

! 2. Aborts all inline scripts trying to access `window.alert`
example2.escape('<script></script>')
```
[Scriptlet source](${scriptletsSource})
* * *
### <a id="abort-on-property-write"></a> abort-on-property-write

Abort property writing

Related UBO scriptlet:
https://github.com/gorhill/uBlock/wiki/Resources-Library#abort-on-property-writejs-

Related ABP source:
https://github.com/adblockplus/adblockpluscore/blob/6b2a309054cc23432102b85d13f12559639ef495/lib/content/snippets.js#L896

**Syntax**
```
example.org#%#//scriptlet("abort-on-property-write", <property>)
```

**Parameters**
- `property` (required) path to a property (joined with `.` if needed). The property must be attached to `window`.

**Examples**
```
! Aborts all inline scripts trying to access `window.alert`
utils.escape('<script></script>')
// => '&lt;script&gt;&lt;/script&gt;'
```
[Scriptlet source](${scriptletsSource})
* * *

11111111111111111111

* * *
      
     
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
