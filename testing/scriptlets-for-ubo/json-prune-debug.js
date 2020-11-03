/// json-prune.js
//
//  When no "prune paths" argument is provided, the scriptlet is
//  used for logging purpose and the "needle paths" argument is
//  used to filter logging output.
(function() {
    const rawPrunePaths = '{{1}}';
    const rawNeedlePaths = '{{2}}';
    const prunePaths = rawPrunePaths !== '{{1}}' && rawPrunePaths !== ''
        ? rawPrunePaths.split(/ +/)
        : [];
    let needlePaths;
    let log, reLogNeedle;
    if ( prunePaths.length !== 0 ) {
        needlePaths = prunePaths.length !== 0 &&
                      rawNeedlePaths !== '{{2}}' && rawNeedlePaths !== ''
            ? rawNeedlePaths.split(/ +/)
            : [];
    } else {
        log = console.log.bind(console);
        let needle;
        if ( rawNeedlePaths === '' || rawNeedlePaths === '{{2}}' ) {
            needle = '.?';
        } else if ( rawNeedlePaths.charAt(0) === '/' && rawNeedlePaths.slice(-1) === '/' ) {
            needle = rawNeedlePaths.slice(1, -1);
        } else {
            needle = rawNeedlePaths.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        reLogNeedle = new RegExp(needle);
    }
    const findOwner = function(root, path, prune = false) {
        let owner = root;
        let chain = path;
        for (;;) {
            if ( owner instanceof Object === false ) { return false; }
            const pos = chain.indexOf('.');
            if ( pos === -1 ) {
                const found = owner.hasOwnProperty(chain);
                if ( found === false ) { return false; }
                if ( prune ) {
                    delete owner[chain];
                }
                return true;
            }
            const prop = chain.slice(0, pos);
            if (
                prop === '[]' && Array.isArray(owner) ||
                prop === '*' && owner instanceof Object
            ) {
                const next = chain.slice(pos + 1);
                let found = false;
                for ( const item of owner.values() ) {
                    found = findOwner(item, next, prune) || found;
                }
                return found;
            }
            if ( owner.hasOwnProperty(prop) === false ) { return false; }
            owner = owner[prop];
            chain = chain.slice(pos + 1);
        }
    };
    const mustProcess = function(root) {
        for ( const needlePath of needlePaths ) {
            if ( findOwner(root, needlePath) === false ) {
                return false;
            }
        }
        return true;
    };
    JSON.parse = new Proxy(JSON.parse, {
        apply: function() {
            const r = Reflect.apply(...arguments);
            if ( log !== undefined ) {
                const json = JSON.stringify(r, null, 2);
                if ( reLogNeedle.test(json) ) {
                    log('uBO:', location.hostname, json);
                    debugger;
                }
                return r;
            }
            if ( mustProcess(r) === false ) { return r; }
            for ( const path of prunePaths ) {
                findOwner(r, path, true);
            }
            return r;
        },
    });
})();