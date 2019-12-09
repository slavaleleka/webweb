


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


**webweb**

https://raw.githubusercontent.com/slavaleleka/webweb/master/customlist.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/blablab.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/dns-990.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/trusted_filter_test.txt

https://raw.githubusercontent.com/slavaleleka/webweb/master/untrusted_filter_test.txt

* * *
