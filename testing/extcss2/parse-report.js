const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

const REPORT_FILE_NAME = 'report.txt';
const REPORT_FILE_PATH = path.resolve(__dirname, REPORT_FILE_NAME);

const RESULT_FILE_NAME = 'parsed.txt';
const parsedHostsFilePath = path.resolve(__dirname, RESULT_FILE_NAME);

const rawReport = fs.readFileSync(REPORT_FILE_PATH, 'utf8');

const INVALID_SELECTOR_MARKER = 'Invalid selector: ';
const LINE_DIVIDER = ' -- ';

const isValidRuleType = (line) => {
    const MARKERS = [
        '^script:has-text',
        '+js(',
        // '',
        // issue: it is temporary just for counting the issues left, SHOULD BE CHECKED
        // ReferenceError: XPathResult is not defined
        // node does not have `XPathResult` which is used to select by :xpath().
        // figure something out for validation purposes
        // RESOLVED: `XPathResult` --> `window.XPathResult`
        // ':xpath(', // invalid xpath arg error
    ];
    const isInvalid = MARKERS.some((m) => line.indexOf(m) === 0);
    return !isInvalid;
};

const isValidSelector = (line) => {
    const INVALID_SELECTORS = [
        // somehow were valid earlier but should not be
        '#13_3623',
        '.4wNET',
        '#j-top^Box',
        '#__^HFa',
        'tl_shadow_new ^',
        'div:nth-child(15 + n)',
        'div[class*=" "]:has(> div[class] > a[href="/terms"]:not([rel])',
        // were invalid earlier as well
        '.\\].slidein.\\[.box',
        '):others()',
        ':watch-attr(',
        // WILL BE FIXED -- means fixes are already in WIP
        '	',
        // 'body > div:not([id])[style="position: absolute; z-index: 10000;"]',
        // issue: ReferenceError: getComputedStyle is not defined
        // node does not have getComputedStyle() which is used to select by matching the element style
        // figure something out for validation purposes
        // RESOLVED: `getComputedStyle` --> `window.getComputedStyle`
        // 'body > *:not(div):not(script):matches-css(width:336px)',
        // issue: :remove() pseudo-class in selector
        // RESOLVED:
        // 'invalid :remove() pseudo-class in selector',
        // issue: it is temporary just for counting the issues left, SHOULD BE FIXED
        // 'Unbalanced brackets for extended pseudo-class',
        // RESOLVED cases:
        // '.fullarticle:has-text(src="https://mobiili.fi/aaa.png")',
        // 'p:-abp-contains(=== Anzeige /',
        // '.obj-cont dt:-abp-contains( Reklama/)',
        // '#kontakt .et_pb_blurb_content:-abp-contains(facebook/liftex)',
        //
        // NEW invalid due to limitations - OK
        'Selection by :not() pseudo-class is not possible',
        //

        // FIXME: more complex but proper attribute parsing
        // 'a[href^="/watch?v="][onclick^="return koya.onEvent(arguments[0]||window.event,\'"]',

    ];
    const isInvalid = INVALID_SELECTORS.some((i) => line.includes(i));
    return !isInvalid;
}

const parsedLines = rawReport
    .split(EOL)
    .filter((line) => line.indexOf(INVALID_SELECTOR_MARKER) === 0)
    .map((rawLine) => {
        const line = rawLine.slice(INVALID_SELECTOR_MARKER.length, rawLine.length);
        const [rawSelector, error] = line.split(LINE_DIVIDER);
        const final = `${rawSelector.slice(1, -1)}${EOL}${error}`;
        return `${final}${EOL}`;
    // });
    })
    .filter(isValidRuleType)
    .filter(isValidSelector);

console.log('count: ', parsedLines.length);

// invalid selectors
//
// before 2.0.8 — total 270
// after  2.0.8 — total 134

// filtered:
//   - actually invalid selectors -- isValidSelector()
//   - was invalid before -- isValidRuleType()
//   - some are already fixed in WIP PR
// total: ~60

// where:
//  - 18 - Unbalanced brackets for extended pseudo-class
//  - 20 - RESOLVED - invalid xpath arg
//  - 8  - OK - new limitations — Selection by :not() pseudo-class is not possible
//  - 7  - invalid :remove() pseudo-class in selector
//  - 2  - RESOLVED - no getComputedStyle
//  - 2  - proper attribute parsing with `[` / `]` in its value


const parsedContent = parsedLines.join(EOL);

fs.writeFileSync(parsedHostsFilePath, parsedContent);
