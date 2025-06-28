// ==UserScript==
// @name         Anti-AI Elements
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Hides Google Search AI Overview.
// @author       Slava Leleka @slavaleleka
// @license      MIT
// @downloadURL  https://slavaleleka.github.io/webweb/do/anti-ai.user.js
// @updateURL    https://slavaleleka.github.io/webweb/do/anti-ai.meta.js
// @match        *://www.google.com/*
// @match        *://www.google.co.uk/*
// @match        *://www.google.ca/*
// @match        *://www.google.com.au/*
// @match        *://www.google.de/*
// @match        *://www.google.fr/*
// @match        *://www.google.*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
    'use strict';

    /**
     * Google Search AI Overview selectors.
     */
    const SELECTORS = [
        'div[data-lhcontainer][style="margin-bottom:30px"] > div[data-mcpr]',
        'script + div[data-mcpr][class="YzCcne"]',
        'div[data-q][data-al]'
    ];

    const COMBINED_SELECTOR = SELECTORS.join(', ');

    /**
     * XHR request pattern to block.
     */
    const BLOCK_REQUEST_PATTERN = /:\/\/www\.google\.[^\/]+\/async\/folsrch\?.*&async=_basejs:.*,_basecomb:.*&q=/;

    const nativeXHROpen = XMLHttpRequest.prototype.open;
    const nativeFetch = window.fetch;

    /**
     * Hide elements using CSS.
     */
    const addCustomStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Hide AI elements */
            ${COMBINED_SELECTOR} { display: none !important; }
        `;
        document.head.appendChild(styleElement);
    }

    /**
     * Hide an element by setting its display style to none.
     *
     * @param {Element} element DOM element to hide.
     */
    const hideElement = (element) => {
        element.style.display = 'none';
    }

    /**
     * Check if a URL matches the block pattern.
     *
     * @param {string} url URL to check.
     *
     * @returns {boolean} True if URL should be blocked.
     */
    const shouldBlockRequest = (url) => {
        return typeof url === 'string' && BLOCK_REQUEST_PATTERN.test(url);
    }

    /**
     * Set up MutationObserver to handle dynamically loaded elements.
     */
    const observeDOMChanges = () => {
        const observer = new MutationObserver(function(mutations) {
            for (const mutation of mutations) {
                if (!mutation.addedNodes || mutation.addedNodes.length === 0) {
                    continue;
                }

                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        continue;
                    }

                    // Check children of added nodes
                    const elements = node.querySelectorAll(COMBINED_SELECTOR);
                    elements.forEach(hideElement);
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Intercept and block XMLHttpRequest
     */
    const interceptXHR = () => {
        XMLHttpRequest.prototype.open = function(
            method,
            url,
            async,
            user,
            password
        ) {
            if (shouldBlockRequest(url)) {
                console.log('Blocking XHR request:', url);
                return nativeXHROpen.apply(
                    this,
                    [method, 'about:blank', async, user, password],
                );
            }
            return nativeXHROpen.apply(this, arguments);
        };
    }

    /**
     * Intercept and block fetch requests
     */
    const interceptFetch = () => {
        window.fetch = function(resource, init) {
            if (resource && shouldBlockRequest(resource)) {
                console.log('Blocking fetch request:', resource);
                return Promise.resolve(new Response('', {
                    status: 200,
                    headers: {'Content-Type': 'text/plain'}
                }));
            }
            return nativeFetch.apply(this, arguments);
        };
    }

    /**
     * Initialize the userscript
     */
    const init = () => {
        // Add CSS styles
        if (document.head) {
            addCustomStyles();
        } else {
            const addCustomStylesListener = () => {
                addCustomStyles();
                document.removeEventListener('DOMContentLoaded', addCustomStylesListener);
            };

            document.addEventListener('DOMContentLoaded', addCustomStylesListener);
        }

        // Start DOM observer
        if (document.readyState === 'loading') {
            const observeDOMChangesListener = () => {
                observeDOMChanges();
                document.removeEventListener('DOMContentLoaded', observeDOMChangesListener);
            };
            document.addEventListener('DOMContentLoaded', observeDOMChangesListener);
        } else {
            observeDOMChanges();
        }

        // Intercept network requests
        interceptXHR();
        interceptFetch();
    }

    // Start the script
    init();
})();
