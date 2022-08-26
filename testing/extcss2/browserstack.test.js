/* browserstack qunit testing */
(function () {
    'use strict';

    var _document$getElementB;

    /* Start with creating ExtendedCss */
    const cssText = (_document$getElementB = document.getElementById('extendedCss')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.innerHTML;

    if (!cssText) {
      throw new Error('Missing extendedCss style on page');
    }

    const extCss = new BrowserstackTest.ExtendedCss({
      styleSheet: cssText
    });
    extCss.apply();

    /**
     * Asserts that specified function has specified expected styles
     */
    const assertElementStyle = function (id, expectedStyle, assert) {
      const element = document.getElementById(id);
      let resultOk = true;

      if (!element) {
        resultOk = false;
      }

      Object.keys(expectedStyle).forEach(prop => {
        const left = (element === null || element === void 0 ? void 0 : element.style.getPropertyValue(prop)) || '';
        const right = expectedStyle[prop];

        if (left !== right) {
          resultOk = false;
        }
      });
      assert.ok(resultOk, id + (resultOk ? ' ok' : ' element either does not exist or has different style.'));
    };

    /**
     * We throttle MO callbacks in ExtCss with requestAnimationFrame and setTimeout.
     * Browsers postpone rAF callbacks in inactive tabs for a long time.
     * It throttles setTimeout callbacks as well, but it is called within a
     * relatively short time. (within several seconds)
     * We apply rAF in tests as well to postpone test for similar amount of time.
     */
    const rAF = (callback, delay) => {
      if (typeof window.requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          setTimeout(callback, delay);
        });
      } else {
        setTimeout(callback, delay);
      }
    };

    QUnit.test('Modifier -ext-has', assert => {
      assertElementStyle('case1-blocked', {
        display: 'none'
      }, assert);
    });
    QUnit.test('Modifier -ext-has + >h3', assert => {
      assertElementStyle('case2-blocked', {
        display: 'none'
      }, assert);
    });
    QUnit.test('Append our style', assert => {
      assertElementStyle('case3-modified', {
        'display': 'block',
        'visibility': 'hidden'
      }, assert);
    });
    QUnit.test('Composite style', assert => {
      assertElementStyle('case4-blocked', {
        'display': 'none'
      }, assert);
      assertElementStyle('case4-not-blocked', {
        'display': ''
      }, assert);
    });
    QUnit.test('Reaction on DOM modification', assert => {
      var _document, _document$getElementB2;

      const done = assert.async();
      assertElementStyle('case5-blocked', {
        display: 'none'
      }, assert);
      const el = document.getElementById('case5-blocked');

      if (!el) {
        throw new Error('No needed test element #case5-blocked on page');
      }

      (_document = document) === null || _document === void 0 ? void 0 : (_document$getElementB2 = _document.getElementById('container')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.appendChild(el);
      rAF(() => {
        assertElementStyle('case5-blocked', {
          display: ''
        }, assert);
        done();
      }, 200);
    });
    QUnit.test('Protection from recurring style fixes', assert => {
      const done = assert.async();
      const testNode = document.getElementById('case11');

      if (!testNode) {
        throw new Error('No needed test element #case11 on page');
      }

      let styleTamperCount = 0;

      const tamperStyle = function () {
        if (testNode.hasAttribute('style')) {
          testNode.removeAttribute('style');
          styleTamperCount++;
        }
      };

      const tamperObserver = new MutationObserver(tamperStyle);
      tamperStyle();
      tamperObserver.observe(testNode, {
        attributes: true,
        attributeFilter: ['style']
      });
      setTimeout(() => {
        tamperObserver.disconnect();
        assert.ok(styleTamperCount < 60);
        assert.ok(styleTamperCount >= 50);
        assert.notOk(testNode.hasAttribute('style'));
        done();
      }, 1000);
    });

})();
