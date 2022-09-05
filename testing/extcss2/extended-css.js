/*! extended-css - v2.0.0 - Mon Sep 05 2022
* https://github.com/AdguardTeam/ExtendedCss#homepage
* Copyright (c) 2022 AdGuard. Licensed GPL-3.0
*/
var BrowserstackTest = (function (exports) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var LEFT_SQUARE_BRACKET = '[';
  var RIGHT_SQUARE_BRACKET = ']';
  var LEFT_PARENTHESIS = '(';
  var RIGHT_PARENTHESIS = ')';
  var LEFT_CURLY_BRACKET = '{';
  var RIGHT_CURLY_BRACKET = '}';
  var BRACKETS = {
    SQUARE: {
      LEFT: LEFT_SQUARE_BRACKET,
      RIGHT: RIGHT_SQUARE_BRACKET
    },
    PARENTHESES: {
      LEFT: LEFT_PARENTHESIS,
      RIGHT: RIGHT_PARENTHESIS
    },
    CURLY: {
      LEFT: LEFT_CURLY_BRACKET,
      RIGHT: RIGHT_CURLY_BRACKET
    }
  };
  var SLASH = '/';
  var BACKSLASH = '\\';
  var SPACE = ' ';
  var COMMA = ',';
  var DOT = '.';
  var SEMICOLON = ';';
  var COLON = ':';
  var SINGLE_QUOTE = '\'';
  var DOUBLE_QUOTE = '"'; // do not consider hyphen `-` as separated mark
  // to avoid pseudo-class names splitting
  // e.g. 'matches-css' or 'if-not'

  var CARET = '^';
  var DOLLAR_SIGN = '$';
  var EQUAL_SIGN = '=';
  var TAB = '\t';
  var CARRIAGE_RETURN = '\r';
  var LINE_FEED = '\n';
  var FORM_FEED = '\f';
  var WHITE_SPACE_CHARACTERS = [SPACE, TAB, CARRIAGE_RETURN, LINE_FEED, FORM_FEED]; // for universal selector and attributes

  var ASTERISK = '*';
  var ID_MARKER = '#';
  var CLASS_MARKER = DOT;
  var DESCENDANT_COMBINATOR = SPACE;
  var CHILD_COMBINATOR = '>';
  var NEXT_SIBLING_COMBINATOR = '+';
  var SUBSEQUENT_SIBLING_COMBINATOR = '~';
  var COMBINATORS = [DESCENDANT_COMBINATOR, CHILD_COMBINATOR, NEXT_SIBLING_COMBINATOR, SUBSEQUENT_SIBLING_COMBINATOR];
  var SUPPORTED_SELECTOR_MARKS = [LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET, LEFT_PARENTHESIS, RIGHT_PARENTHESIS, LEFT_CURLY_BRACKET, RIGHT_CURLY_BRACKET, SLASH, BACKSLASH, SEMICOLON, COLON, COMMA, SINGLE_QUOTE, DOUBLE_QUOTE, CARET, DOLLAR_SIGN, ASTERISK, ID_MARKER, CLASS_MARKER, DESCENDANT_COMBINATOR, CHILD_COMBINATOR, NEXT_SIBLING_COMBINATOR, SUBSEQUENT_SIBLING_COMBINATOR, TAB, CARRIAGE_RETURN, LINE_FEED, FORM_FEED]; // absolute:

  var CONTAINS_PSEUDO = 'contains';
  var HAS_TEXT_PSEUDO = 'has-text';
  var ABP_CONTAINS_PSEUDO = '-abp-contains';
  var MATCHES_CSS_PSEUDO = 'matches-css';
  var MATCHES_CSS_BEFORE_PSEUDO = 'matches-css-before';
  var MATCHES_CSS_AFTER_PSEUDO = 'matches-css-after';
  var MATCHES_ATTR_PSEUDO_CLASS_MARKER = 'matches-attr';
  var MATCHES_PROPERTY_PSEUDO_CLASS_MARKER = 'matches-property';
  var XPATH_PSEUDO_CLASS_MARKER = 'xpath';
  var NTH_ANCESTOR_PSEUDO_CLASS_MARKER = 'nth-ancestor';
  /**
   * :upward() can get number or selector arg
   * and if the arg is selector it should be standard, not extended
   * so :upward pseudo-class is always absolute
   */

  var UPWARD_PSEUDO_CLASS_MARKER = 'upward';
  /**
   * :remove() pseudo-class is used for element actions, not for element selecting
   * and 'clear' selector should not contain it
   * so selector parser should consider it as invalid
   */

  var REMOVE_PSEUDO_CLASS_MARKER = 'remove'; // relative:

  var HAS_PSEUDO_CLASS_MARKER = 'has';
  var IF_PSEUDO_CLASS_MARKER = 'if';
  var ABP_HAS_PSEUDO_CLASS_MARKER = '-abp-has';
  var HAS_PSEUDO_CLASS_MARKERS = [HAS_PSEUDO_CLASS_MARKER, IF_PSEUDO_CLASS_MARKER, ABP_HAS_PSEUDO_CLASS_MARKER];
  var IF_NOT_PSEUDO_CLASS_MARKER = 'if-not';
  var IS_PSEUDO_CLASS_MARKER = 'is';
  var NOT_PSEUDO_CLASS_MARKER = 'not';
  var ABSOLUTE_PSEUDO_CLASSES = [CONTAINS_PSEUDO, HAS_TEXT_PSEUDO, ABP_CONTAINS_PSEUDO, MATCHES_CSS_PSEUDO, MATCHES_CSS_BEFORE_PSEUDO, MATCHES_CSS_AFTER_PSEUDO, MATCHES_ATTR_PSEUDO_CLASS_MARKER, MATCHES_PROPERTY_PSEUDO_CLASS_MARKER, XPATH_PSEUDO_CLASS_MARKER, NTH_ANCESTOR_PSEUDO_CLASS_MARKER, UPWARD_PSEUDO_CLASS_MARKER];
  var RELATIVE_PSEUDO_CLASSES = [].concat(HAS_PSEUDO_CLASS_MARKERS, [IF_NOT_PSEUDO_CLASS_MARKER, IS_PSEUDO_CLASS_MARKER, NOT_PSEUDO_CLASS_MARKER]);
  var SUPPORTED_PSEUDO_CLASSES = [].concat(ABSOLUTE_PSEUDO_CLASSES, _toConsumableArray(RELATIVE_PSEUDO_CLASSES));
  var REGEXP_WITH_FLAGS_REGEXP = /^\s*\/.*\/[gmisuy]*\s*$/;
  var REGEXP_ANY_SYMBOL = '.*';
  /**
   * ':scope' is used for extended pseudo-class :has(), if-not(), :is() and :not()
   *
   * ':where' is needed for limitation it's using inside :has() arg
   * https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [1]
   */

  var REGULAR_PSEUDO_CLASSES = {
    SCOPE: 'scope',
    WHERE: 'where'
  };
  /**
   * ':after' and ':before' are needed for :matches-css() pseudo-class
   * all other are needed for :has() limitation after regular pseudo-elements
   * https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [3]
   */

  var REGULAR_PSEUDO_ELEMENTS = {
    AFTER: 'after',
    BACKDROP: 'backdrop',
    BEFORE: 'before',
    CUE: 'cue',
    CUE_REGION: 'cue-region',
    FIRST_LETTER: 'first-letter',
    FIRST_LINE: 'first-line',
    FILE_SELECTION_BUTTON: 'file-selector-button',
    GRAMMAR_ERROR: 'grammar-error',
    MARKER: 'marker',
    PART: 'part',
    PLACEHOLDER: 'placeholder',
    SELECTION: 'selection',
    SLOTTED: 'slotted',
    SPELLING_ERROR: 'spelling-error',
    TARGET_TEXT: 'target-text'
  };
  var CSS_PROPERTIES = {
    BACKGROUND: 'background',
    BACKGROUND_IMAGE: 'background-image',
    CONTENT: 'content',
    OPACITY: 'opacity'
  }; // limit applying of wildcard :is and :not pseudo-class only to html children
  // e.g. ':is(.page, .main) > .banner' or '*:not(span):not(p)'

  var IS_OR_NOT_PSEUDO_SELECTING_ROOT = "html ".concat(ASTERISK); // limit applying of :xpath pseudo-class with to 'any' element
  // https://github.com/AdguardTeam/ExtendedCss/issues/115

  var XPATH_PSEUDO_SELECTING_ROOT = 'body'; // regexp that matches backward compatible syntaxes

  var REGEXP_VALID_OLD_SYNTAX = /\[-(?:ext)-([a-z-_]+)=(["'])((?:(?=(\\?))\4.)*?)\2\]/g; // marker for checking invalid selector after old-syntax normalizing by selector converter

  var INVALID_OLD_SYNTAX_MARKER = '[-ext-';
  var DEBUG_PSEUDO_PROPERTY_KEY = 'debug';
  var REMOVE_PSEUDO_PROPERTY_KEY = REMOVE_PSEUDO_CLASS_MARKER;
  var PSEUDO_PROPERTY_POSITIVE_VALUE = 'true';
  var DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE = 'global';
  var REGEXP_DECLARATION_END = /[;}]/g;
  var REGEXP_DECLARATION_DIVIDER = /[;:}]/g;
  var REGEXP_NON_WHITESPACE = /\S/g;
  var STYLESHEET_ERROR_PREFIX = {
    NO_STYLE: 'No style declaration at stylesheet part',
    INVALID_STYLE: 'Invalid style declaration at stylesheet part',
    UNCLOSED_STYLE: 'Unclosed style declaration at stylesheet part',
    NO_PROPERTY: 'Missing style property in declaration at stylesheet part',
    NO_VALUE: 'Missing style value in declaration at stylesheet part',
    INVALID_REMOVE: 'Invalid :remove() pseudo-class in selector',
    NO_STYLE_OR_REMOVE: 'Invalid stylesheet - no style declared or :remove() pseudo-class used'
  };
  var BrowserName;

  (function (BrowserName) {
    BrowserName["Chrome"] = "Chrome";
    BrowserName["Firefox"] = "Firefox";
    BrowserName["Edge"] = "Edg";
    BrowserName["Opera"] = "Opera";
    BrowserName["Safari"] = "Safari";
  })(BrowserName || (BrowserName = {}));

  var CHROMIUM_BRAND_NAME = 'Chromium';
  var GOOGLE_CHROME_BRAND_NAME = 'Google Chrome';

  /**
   * Complex replacement function.
   * Undo quote escaping inside of an extended selector.
   *
   * @param match     Whole matched string
   * @param name      Group 1
   * @param quoteChar Group 2
   * @param rawValue  Group 3
   */

  var evaluateMatch = function evaluateMatch(match, name, quoteChar, rawValue) {
    // Unescape quotes
    var re = new RegExp("([^\\\\]|^)\\\\".concat(quoteChar), 'g');
    var value = rawValue.replace(re, "$1".concat(quoteChar));
    return ":".concat(name, "(").concat(value, ")");
  }; // ':scope' pseudo may be at start of :has() argument
  // but ExtCssDocument.querySelectorAll() already use it for selecting exact element descendants


  var reScope = /\(:scope >/g;
  var SCOPE_REPLACER = '(>';
  /**
   * Handles old syntax and :scope inside :has
   * @param selector trimmed selector to normalize
   * @returns normalized selector
   */

  var normalize = function normalize(selector) {
    var normalizedSelector = selector.replace(REGEXP_VALID_OLD_SYNTAX, evaluateMatch).replace(reScope, SCOPE_REPLACER); // validate old syntax after normalizing
    // e.g. '[-ext-matches-css-before=\'content:  /^[A-Z][a-z]'

    if (normalizedSelector.includes(INVALID_OLD_SYNTAX_MARKER)) {
      throw new Error("Invalid extended-css old syntax selector: '".concat(selector, "'"));
    }

    return normalizedSelector;
  };
  /**
   * Prepares the rawSelector before tokenization:
   * 1. trims it
   * 2. converts old syntax `[-ext-pseudo-class="..."]` to new one `:pseudo-class(...)`
   * 3. handles :scope pseudo inside :has() pseudo-class arg
   * @param rawSelector selector with no style declaration
   * @returns prepared selector with no style declaration
   */


  var convert = function convert(rawSelector) {
    var trimmedSelector = rawSelector.trim();
    return normalize(trimmedSelector);
  };

  var TokenType;

  (function (TokenType) {
    TokenType["Mark"] = "mark";
    TokenType["Word"] = "word";
  })(TokenType || (TokenType = {}));

  /**
   * Splits selector string into tokens
   * @param rawSelector raw css selector
   */
  var tokenize = function tokenize(rawSelector) {
    var selector = convert(rawSelector); // currently processed

    var symbol; // for words collecting while iterating

    var buffer = ''; // result collection

    var tokens = []; // iterate selector chars and collect tokens

    for (var i = 0; i < selector.length; i += 1) {
      symbol = selector[i];

      if (SUPPORTED_SELECTOR_MARKS.includes(symbol)) {
        tokens.push({
          type: TokenType.Mark,
          value: symbol
        });
        continue;
      }

      buffer += symbol;
      var nextSymbol = selector[i + 1]; // string end has been reached if nextSymbol is undefined

      if (!nextSymbol || SUPPORTED_SELECTOR_MARKS.includes(nextSymbol)) {
        tokens.push({
          type: TokenType.Word,
          value: buffer
        });
        buffer = '';
      }
    }

    return tokens;
  };

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var NodeType;
  /**
   * Universal interface for all node types
   */

  (function (NodeType) {
    NodeType["SelectorList"] = "SelectorList";
    NodeType["Selector"] = "Selector";
    NodeType["RegularSelector"] = "RegularSelector";
    NodeType["ExtendedSelector"] = "ExtendedSelector";
    NodeType["AbsolutePseudoClass"] = "AbsolutePseudoClass";
    NodeType["RelativePseudoClass"] = "RelativePseudoClass";
  })(NodeType || (NodeType = {}));

  /**
   * Class needed for creating ast nodes while selector parsing.
   * Used for SelectorList, Selector, ExtendedSelector
   */
  var AnySelectorNode = /*#__PURE__*/function () {
    function AnySelectorNode(type) {
      _classCallCheck(this, AnySelectorNode);

      _defineProperty(this, "children", []);

      this.type = type;
    }
    /**
     * Adds child node to children array
     */


    _createClass(AnySelectorNode, [{
      key: "addChild",
      value: function addChild(child) {
        this.children.push(child);
      }
    }]);

    return AnySelectorNode;
  }();
  /**
   * Class needed for creating ast RegularSelector node while selector parsing
   */

  var RegularSelectorNode = /*#__PURE__*/function (_AnySelectorNode) {
    _inherits(RegularSelectorNode, _AnySelectorNode);

    var _super = _createSuper$1(RegularSelectorNode);

    function RegularSelectorNode(value) {
      var _this;

      _classCallCheck(this, RegularSelectorNode);

      _this = _super.call(this, NodeType.RegularSelector);
      _this.value = value;
      return _this;
    }

    return _createClass(RegularSelectorNode);
  }(AnySelectorNode);
  /**
   * Class needed for creating ast RelativePseudoClass node while selector parsing
   */

  var RelativePseudoClassNode = /*#__PURE__*/function (_AnySelectorNode2) {
    _inherits(RelativePseudoClassNode, _AnySelectorNode2);

    var _super2 = _createSuper$1(RelativePseudoClassNode);

    function RelativePseudoClassNode(name) {
      var _this2;

      _classCallCheck(this, RelativePseudoClassNode);

      _this2 = _super2.call(this, NodeType.RelativePseudoClass);
      _this2.name = name;
      return _this2;
    }

    return _createClass(RelativePseudoClassNode);
  }(AnySelectorNode);
  /**
   * Class needed for creating ast AbsolutePseudoClass node while selector parsing
   */

  var AbsolutePseudoClassNode = /*#__PURE__*/function (_AnySelectorNode3) {
    _inherits(AbsolutePseudoClassNode, _AnySelectorNode3);

    var _super3 = _createSuper$1(AbsolutePseudoClassNode);

    function AbsolutePseudoClassNode(name) {
      var _this3;

      _classCallCheck(this, AbsolutePseudoClassNode);

      _this3 = _super3.call(this, NodeType.AbsolutePseudoClass);

      _defineProperty(_assertThisInitialized(_this3), "value", '');

      _this3.name = name;
      return _this3;
    }

    return _createClass(AbsolutePseudoClassNode);
  }(AnySelectorNode);
  /**
   * Root node
   *
   * SelectorList
   *   : Selector
   *     ...
   *   ;
   */

  /**
   * Selector node
   *
   * Selector
   *   : RegularSelector
   *   | ExtendedSelector
   *     ...
   *   ;
   */

  /**
   * Regular selector node;
   * it can be selected by querySelectorAll()
   *
   * RegularSelector
   *   : type
   *   : value
   *   ;
   */

  /**
   * Extended selector node
   *
   * ExtendedSelector
   *   : AbsolutePseudoClass
   *   | RelativePseudoClass
   *   ;
   */

  /**
   * Absolute extended pseudo-class node
   * i.e. none-selector args
   *
   * AbsolutePseudoClass
   *   : type
   *   : name
   *   : value
   *   ;
   */

  /**
   * Relative extended pseudo-class node
   * i.e. selector as arg
   *
   * RelativePseudoClass
   *   : type
   *   : name
   *   : SelectorList
   *   ;
   */
  //
  //  ast example
  //
  //  div.banner > div:has(span, p), a img.ad
  //
  //  SelectorList - div.banner > div:has(span, p), a img.ad
  //      Selector - div.banner > div:has(span, p)
  //          RegularSelector - div.banner > div
  //          ExtendedSelector - :has(span, p)
  //              PseudoClassSelector - :has
  //              SelectorList - span, p
  //                  Selector - span
  //                      RegularSelector - span
  //                  Selector - p
  //                      RegularSelector - p
  //      Selector - a img.ad
  //          RegularSelector - a img.ad
  //

  /**
   * Some browsers do not support Array.prototype.flat()
   * for example, Opera 42 which is used for browserstack tests
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
   * @param input
   */
  var flatten = function flatten(input) {
    var stack = [];
    input.forEach(function (el) {
      return stack.push(el);
    });
    var res = [];

    while (stack.length) {
      // pop value from stack
      var next = stack.pop();

      if (!next) {
        throw new Error('Unable to make array flat');
      }

      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        next.forEach(function (el) {
          return stack.push(el);
        });
      } else {
        res.push(next);
      }
    } // reverse to restore input order


    return res.reverse();
  };
  /**
   * Returns last item from array
   * @param array
   */

  var getLast = function getLast(array) {
    return array[array.length - 1];
  };

  /**
   * Checks whether the passed token is supported extended pseudo-class
   * @param token
   */

  var isSupportedExtendedPseudo = function isSupportedExtendedPseudo(token) {
    return SUPPORTED_PSEUDO_CLASSES.includes(token);
  };
  /**
   * Checks whether next token is a continuation of regular selector being processed
   * @param nextTokenType
   * @param nextTokenValue
   */


  var doesRegularContinueAfterSpace = function doesRegularContinueAfterSpace(nextTokenType, nextTokenValue) {
    return COMBINATORS.includes(nextTokenValue) || nextTokenType === TokenType.Word // e.g. '#main *:has(> .ad)'
    || nextTokenValue === ASTERISK || nextTokenValue === ID_MARKER || nextTokenValue === CLASS_MARKER // e.g. 'div :where(.content)'
    || nextTokenValue === COLON // e.g. "div[class*=' ']"
    || nextTokenValue === SINGLE_QUOTE // e.g. 'div[class*=" "]'
    || nextTokenValue === DOUBLE_QUOTE || nextTokenValue === BRACKETS.SQUARE.LEFT;
  };

  /**
   * Gets the node which is being collected
   * or null if there is no such one
   * @param context parser context
   */
  var getBufferNode = function getBufferNode(context) {
    if (context.pathToBufferNode.length === 0) {
      return null;
    } // buffer node is always the last in the pathToBufferNode stack


    return getLast(context.pathToBufferNode);
  };
  /**
   * Updates needed buffer node value while tokens iterating
   * @param context parser context
   * @param tokenValue
   */


  var updateBufferNode = function updateBufferNode(context, tokenValue) {
    var bufferNode = getBufferNode(context);

    if (bufferNode === null) {
      throw new Error('No bufferNode to update');
    }

    var type = bufferNode.type;

    if (type === NodeType.RegularSelector || type === NodeType.AbsolutePseudoClass) {
      bufferNode.value += tokenValue;
    } else {
      throw new Error("".concat(bufferNode.type, " node can not be updated. Only RegularSelector and AbsolutePseudoClass are supported.")); // eslint-disable-line max-len
    }
  };
  /**
   * Adds SelectorList node to context.ast at the start of ast collecting
   * @param context parser context
   */


  var addSelectorListNode = function addSelectorListNode(context) {
    var selectorListNode = new AnySelectorNode(NodeType.SelectorList);
    context.ast = selectorListNode;
    context.pathToBufferNode.push(selectorListNode);
  };
  /**
   * Adds new node to buffer node children.
   * New added node will be considered as buffer node after it
   * @param context parser context
   * @param type type of node to add
   * @param tokenValue optional, value of processing token
   */


  var addAstNodeByType = function addAstNodeByType(context, type) {
    var tokenValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var bufferNode = getBufferNode(context);

    if (bufferNode === null) {
      throw new Error('No buffer node');
    }

    var node;

    if (type === NodeType.RegularSelector) {
      node = new RegularSelectorNode(tokenValue);
    } else if (type === NodeType.AbsolutePseudoClass) {
      node = new AbsolutePseudoClassNode(tokenValue);
    } else if (type === NodeType.RelativePseudoClass) {
      node = new RelativePseudoClassNode(tokenValue);
    } else {
      // SelectorList || Selector || ExtendedSelector
      node = new AnySelectorNode(type);
    }

    bufferNode.addChild(node);
    context.pathToBufferNode.push(node);
  };
  /**
   * The very beginning of ast collecting
   * @param context parser context
   * @param tokenValue value of regular selector
   */


  var initAst = function initAst(context, tokenValue) {
    addSelectorListNode(context);
    addAstNodeByType(context, NodeType.Selector); // RegularSelector node is always the first child of Selector node

    addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
  };
  /**
   * Inits selector list subtree for relative extended pseudo-classes, e.g. :has(), :not()
   * @param context parser context
   * @param tokenValue optional, value of inner regular selector
   */


  var initRelativeSubtree = function initRelativeSubtree(context) {
    var tokenValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    addAstNodeByType(context, NodeType.SelectorList);
    addAstNodeByType(context, NodeType.Selector);
    addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
  };
  /**
   * Goes to closest parent specified by type.
   * Actually updates path to buffer node for proper ast collecting of selectors while parsing
   * @param context parser context
   * @param parentType type of needed parent node in ast
   */


  var upToClosest = function upToClosest(context, parentType) {
    for (var i = context.pathToBufferNode.length - 1; i >= 0; i -= 1) {
      if (context.pathToBufferNode[i].type === parentType) {
        context.pathToBufferNode = context.pathToBufferNode.slice(0, i + 1);
        break;
      }
    }
  };
  /**
   * Parses selector into ast for following element selection
   * @param selector
   */


  var parse$1 = function parse(selector) {
    var _bufferNode, _bufferNode2, _bufferNode3, _bufferNode4, _bufferNode5, _bufferNode6, _bufferNode7, _bufferNode8, _bufferNode9, _bufferNode10, _bufferNode11, _bufferNode12, _bufferNode13, _bufferNode14, _bufferNode15, _bufferNode16, _bufferNode17, _bufferNode18;

    var tokens = tokenize(selector);
    var context = {
      ast: null,
      pathToBufferNode: [],
      extendedPseudoNamesStack: [],
      extendedPseudoBracketsStack: [],
      standardPseudoNamesStack: [],
      standardPseudoBracketsStack: [],
      isAttributeBracketsOpen: false,
      isRegexpOpen: false
    };
    var i = 0;

    while (i < tokens.length) {
      var token = tokens[i]; // Token to process

      var tokenType = token.type,
          tokenValue = token.value; // needed for SPACE and COLON tokens checking

      var nextToken = tokens[i + 1] || [];
      var nextTokenType = nextToken.type,
          nextTokenValue = nextToken.value; // needed for limitations
      // - :not() and :is() root element
      // - :has() usage
      // - white space before and after pseudo-class name

      var nextToNextToken = tokens[i + 2] || [];
      var nextToNextTokenValue = nextToNextToken.value; // needed for COLON token checking for none-specified regular selector before extended one
      // e.g. 'p, :hover'
      // or   '.banner, :contains(ads)'

      var previousToken = tokens[i - 1] || [];
      var prevTokenType = previousToken.type,
          prevTokenValue = previousToken.value;
      var bufferNode = getBufferNode(context);

      switch (tokenType) {
        case TokenType.Word:
          if (bufferNode === null) {
            // there is no buffer node only in one case — no ast collecting has been started
            initAst(context, tokenValue);
          } else if (bufferNode.type === NodeType.SelectorList) {
            // add new selector to selector list
            addAstNodeByType(context, NodeType.Selector);
            addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
          } else if (bufferNode.type === NodeType.RegularSelector) {
            updateBufferNode(context, tokenValue);
          } else if (bufferNode.type === NodeType.ExtendedSelector) {
            // No white space is allowed between the name of extended pseudo-class
            // and its opening parenthesis
            // https://www.w3.org/TR/selectors-4/#pseudo-classes
            // e.g. 'span:contains (text)'
            if (WHITE_SPACE_CHARACTERS.includes(nextTokenValue) && nextToNextTokenValue === BRACKETS.PARENTHESES.LEFT) {
              throw new Error("No white space is allowed before or after extended pseudo-class name in selector: '".concat(selector, "'")); // eslint-disable-line max-len
            } // save pseudo-class name for brackets balance checking


            context.extendedPseudoNamesStack.push(tokenValue.toLowerCase()); // extended pseudo-class name are parsed in lower case
            // as they should be case-insensitive
            // https://www.w3.org/TR/selectors-4/#pseudo-classes

            if (ABSOLUTE_PSEUDO_CLASSES.includes(tokenValue.toLowerCase())) {
              addAstNodeByType(context, NodeType.AbsolutePseudoClass, tokenValue.toLowerCase());
            } else {
              // if it is not absolute pseudo-class, it must be relative one
              // add RelativePseudoClass with tokenValue as pseudo-class name to ExtendedSelector children
              addAstNodeByType(context, NodeType.RelativePseudoClass, tokenValue.toLowerCase());
            }
          } else if (bufferNode.type === NodeType.AbsolutePseudoClass) {
            // collect absolute pseudo-class arg
            updateBufferNode(context, tokenValue);
          } else if (bufferNode.type === NodeType.RelativePseudoClass) {
            initRelativeSubtree(context, tokenValue);
          }

          break;

        case TokenType.Mark:
          switch (tokenValue) {
            case COMMA:
              if (!bufferNode || typeof bufferNode !== 'undefined' && !nextTokenValue) {
                // consider the selector is invalid if there is no bufferNode yet (e.g. ', a')
                // or there is nothing after the comma while bufferNode is defined (e.g. 'div, ')
                throw new Error("'".concat(selector, "' is not a valid selector"));
              } else if (bufferNode.type === NodeType.RegularSelector) {
                if (context.isAttributeBracketsOpen) {
                  // the comma might be inside element attribute value
                  // e.g. 'div[data-comma="0,1"]'
                  updateBufferNode(context, tokenValue);
                } else {
                  // new Selector should be collected to upper SelectorList
                  upToClosest(context, NodeType.SelectorList);
                }
              } else if (bufferNode.type === NodeType.AbsolutePseudoClass) {
                // the comma inside arg of absolute extended pseudo
                // e.g. 'div:xpath(//h3[contains(text(),"Share it!")]/..)'
                updateBufferNode(context, tokenValue);
              } else if (((_bufferNode = bufferNode) === null || _bufferNode === void 0 ? void 0 : _bufferNode.type) === NodeType.Selector) {
                // new Selector should be collected to upper SelectorList
                // if parser position is on Selector node
                upToClosest(context, NodeType.SelectorList);
              }

              break;

            case SPACE:
              if (((_bufferNode2 = bufferNode) === null || _bufferNode2 === void 0 ? void 0 : _bufferNode2.type) === NodeType.RegularSelector) {
                // standard selectors with white space between colon and name of pseudo
                // are invalid for native document.querySelectorAll() anyway,
                // so throwing the error here is better
                // than proper parsing of invalid selector and passing it further.
                // first of all do not check attributes
                // e.g. div[style="text-align: center"]
                if (!context.isAttributeBracketsOpen // check the space after the colon and before the pseudo
                // e.g. '.block: nth-child(2)
                && (prevTokenValue === COLON && nextTokenType === TokenType.Word // or after the pseudo and before the opening parenthesis
                // e.g. '.block:nth-child (2)
                || prevTokenType === TokenType.Word && nextTokenValue === BRACKETS.PARENTHESES.LEFT)) {
                  throw new Error("'".concat(selector, "' is not a valid selector."));
                } // collect current tokenValue to value of RegularSelector
                // if it is the last token or standard selector continues after the space.
                // otherwise it will be skipped


                if (!nextTokenValue || doesRegularContinueAfterSpace(nextTokenType, nextTokenValue)) {
                  updateBufferNode(context, tokenValue);
                }
              }

              if (((_bufferNode3 = bufferNode) === null || _bufferNode3 === void 0 ? void 0 : _bufferNode3.type) === NodeType.AbsolutePseudoClass) {
                // space inside extended pseudo-class arg
                // e.g. 'span:contains(some text)'
                updateBufferNode(context, tokenValue);
              }

              if (((_bufferNode4 = bufferNode) === null || _bufferNode4 === void 0 ? void 0 : _bufferNode4.type) === NodeType.RelativePseudoClass) {
                // init with empty value RegularSelector
                // as the space is not needed for selector value
                // e.g. 'p:not( .content )'
                initRelativeSubtree(context);
              }

              if (((_bufferNode5 = bufferNode) === null || _bufferNode5 === void 0 ? void 0 : _bufferNode5.type) === NodeType.Selector) {
                /**
                 * do NOT add RegularSelector if parser position on space BEFORE the comma in selector list
                 * e.g. '.block:has(> img) , .banner)'
                 */
                if (nextTokenValue && doesRegularContinueAfterSpace(nextTokenType, nextTokenValue)) {
                  /**
                   * regular selector might be after the extended one.
                   * extra space before combinator or selector should not be collected
                   * e.g. '.banner:upward(2) .block'
                   *      '.banner:upward(2) > .block'
                   * so no tokenValue passed to addAnySelectorNode()
                   */
                  addAstNodeByType(context, NodeType.RegularSelector);
                }
              }

              break;

            case DESCENDANT_COMBINATOR:
            case CHILD_COMBINATOR:
            case NEXT_SIBLING_COMBINATOR:
            case SUBSEQUENT_SIBLING_COMBINATOR:
            case SEMICOLON:
            case SLASH:
            case BACKSLASH:
            case SINGLE_QUOTE:
            case DOUBLE_QUOTE:
            case CARET:
            case DOLLAR_SIGN:
            case BRACKETS.CURLY.LEFT:
            case BRACKETS.CURLY.RIGHT:
            case ASTERISK:
            case ID_MARKER:
            case CLASS_MARKER:
            case BRACKETS.SQUARE.LEFT:
              if (bufferNode === null) {
                // no ast collecting has been started
                if (tokenValue === ASTERISK && nextTokenValue === COLON && (nextToNextTokenValue === IS_PSEUDO_CLASS_MARKER || nextToNextTokenValue === NOT_PSEUDO_CLASS_MARKER)) {
                  /**
                   * limit applying of wildcard :is() and :not() pseudo-class only to html children
                   * as we check element parent for them and there is no parent for html
                   * e.g. '*:is(.page, .main) > .banner'
                   * or   '*:not(span):not(p)'
                   */
                  initAst(context, IS_OR_NOT_PSEUDO_SELECTING_ROOT);
                } else {
                  // e.g. '.banner > p'
                  // or   '#top > div.ad'
                  // or   '[class][style][attr]'
                  initAst(context, tokenValue);
                }
              } else if (bufferNode.type === NodeType.RegularSelector) {
                // collect the mark to the value of RegularSelector node
                updateBufferNode(context, tokenValue);

                if (tokenValue === BRACKETS.SQUARE.LEFT) {
                  // needed for proper handling element attribute value with comma
                  // e.g. 'div[data-comma="0,1"]'
                  context.isAttributeBracketsOpen = true;
                }
              } else if (bufferNode.type === NodeType.AbsolutePseudoClass) {
                // collect the mark to the arg of AbsolutePseudoClass node
                updateBufferNode(context, tokenValue); // 'isRegexpOpen' flag is needed for brackets balancing inside extended pseudo-class arg

                if (tokenValue === SLASH && prevTokenValue !== BACKSLASH) {
                  context.isRegexpOpen = context.extendedPseudoNamesStack.length > 0 && !context.isRegexpOpen;
                }
              } else if (bufferNode.type === NodeType.RelativePseudoClass) {
                // add SelectorList to children of RelativePseudoClass node
                initRelativeSubtree(context, tokenValue);
              } else if (bufferNode.type === NodeType.Selector) {
                // after the extended pseudo closing parentheses
                // parser position is on Selector node
                // and regular selector can be after the extended one
                // e.g. '.banner:upward(2)> .block'
                // or   '.inner:nth-ancestor(1)~ .banner'
                if (COMBINATORS.includes(tokenValue)) {
                  addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
                }
              } else if (bufferNode.type === NodeType.SelectorList) {
                // add Selector to SelectorList
                addAstNodeByType(context, NodeType.Selector); // and RegularSelector as it is always the first child of Selector

                addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
              }

              break;

            case BRACKETS.SQUARE.RIGHT:
              if (((_bufferNode6 = bufferNode) === null || _bufferNode6 === void 0 ? void 0 : _bufferNode6.type) === NodeType.RegularSelector) {
                // needed for proper parsing regular selectors after the attributes with comma
                // e.g. 'div[data-comma="0,1"] > img'
                context.isAttributeBracketsOpen = false; // collect the bracket to the value of RegularSelector node

                updateBufferNode(context, tokenValue);
              }

              if (((_bufferNode7 = bufferNode) === null || _bufferNode7 === void 0 ? void 0 : _bufferNode7.type) === NodeType.AbsolutePseudoClass) {
                // :xpath() expended pseudo-class arg might contain square bracket
                // so it should be collected
                // e.g. 'div:xpath(//h3[contains(text(),"Share it!")]/..)'
                updateBufferNode(context, tokenValue);
              }

              break;

            case COLON:
              // No white space is allowed between the colon and the following name of the pseudo-class
              // https://www.w3.org/TR/selectors-4/#pseudo-classes
              // e.g. 'span: contains(text)'
              if (WHITE_SPACE_CHARACTERS.includes(nextTokenValue) && SUPPORTED_PSEUDO_CLASSES.includes(nextToNextTokenValue)) {
                throw new Error("No white space is allowed before or after extended pseudo-class name in selector: '".concat(selector, "'")); // eslint-disable-line max-len
              }

              if (bufferNode === null) {
                // no ast collecting has been started
                if (nextTokenValue === XPATH_PSEUDO_CLASS_MARKER) {
                  // limit applying of "naked" :xpath pseudo-class
                  // https://github.com/AdguardTeam/ExtendedCss/issues/115
                  initAst(context, XPATH_PSEUDO_SELECTING_ROOT);
                } else if (nextTokenValue === IS_PSEUDO_CLASS_MARKER || nextTokenValue === NOT_PSEUDO_CLASS_MARKER) {
                  /**
                   * parent element checking is used for extended pseudo-class :is() and :not().
                   * as there is no parentNode for root element (html)
                   * element selection should be limited to it's children.
                   * e.g. :is(.page, .main) > .banner
                   * or   :not(span):not(p)
                   */
                  initAst(context, IS_OR_NOT_PSEUDO_SELECTING_ROOT);
                } else {
                  // make it more obvious if selector starts with pseudo with no tag specified
                  // e.g. ':has(a)' -> '*:has(a)'
                  // or   ':empty'  -> '*:empty'
                  initAst(context, ASTERISK);
                } // bufferNode should be updated for following checking


                bufferNode = getBufferNode(context);
              }

              if (!bufferNode) {
                throw new Error('bufferNode has to be specified by now');
              }

              if (bufferNode.type === NodeType.SelectorList) {
                // bufferNode is SelectorList after comma has been parsed.
                // parser position is on colon now:
                // e.g. 'img,:not(.content)'
                addAstNodeByType(context, NodeType.Selector); // add empty value RegularSelector anyway as any selector should start with it
                // and check previous token on the next step

                addAstNodeByType(context, NodeType.RegularSelector); // bufferNode should be updated for following checking

                bufferNode = getBufferNode(context);
              }

              if (((_bufferNode8 = bufferNode) === null || _bufferNode8 === void 0 ? void 0 : _bufferNode8.type) === NodeType.RegularSelector) {
                // it can be extended or standard pseudo
                // e.g. '#share, :contains(share it)'
                // or   'div,:hover'
                // of   'div:has(+:contains(text))'  // position is after '+'
                if (COMBINATORS.includes(prevTokenValue) || prevTokenValue === COMMA) {
                  // case with colon at the start of string - e.g. ':contains(text)'
                  // is covered by 'bufferNode === null' above at start of COLON checking
                  updateBufferNode(context, ASTERISK);
                } // Disallow :has(), :is(), :where() inside :has() argument
                // to avoid increasing the :has() invalidation complexity
                // https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [1]


                if (context.extendedPseudoNamesStack.length > 0 // check the last extended pseudo-class name from context
                && HAS_PSEUDO_CLASS_MARKERS.includes(getLast(context.extendedPseudoNamesStack)) // and check the processing pseudo-class
                && (HAS_PSEUDO_CLASS_MARKERS.includes(nextTokenValue) || nextTokenValue === IS_PSEUDO_CLASS_MARKER || nextTokenValue === REGULAR_PSEUDO_CLASSES.WHERE)) {
                  throw new Error("Usage of :".concat(nextTokenValue, " pseudo-class is not allowed inside upper :has")); // eslint-disable-line max-len
                }

                if (!isSupportedExtendedPseudo(nextTokenValue.toLowerCase())) {
                  if (nextTokenValue.toLowerCase() === REMOVE_PSEUDO_CLASS_MARKER) {
                    // :remove() pseudo-class should be handled before
                    // as it is not about element selecting but actions with elements
                    // e.g. 'body > div:empty:remove()'
                    throw new Error("Selector parser error: invalid :remove() pseudo-class in selector: '".concat(selector, "'")); // eslint-disable-line max-len
                  } // if following token is not an extended pseudo
                  // the colon should be collected to value of RegularSelector
                  // e.g. '.entry_text:nth-child(2)'


                  updateBufferNode(context, tokenValue); // check the token after the pseudo and do balance parentheses later
                  // only if it is functional pseudo-class (standard with brackets, e.g. ':lang()').
                  // no brackets balance needed for such case,
                  // parser position is on first colon after the 'div':
                  // e.g. 'div:last-child:has(button.privacy-policy__btn)'

                  if (nextToNextTokenValue === BRACKETS.PARENTHESES.LEFT) {
                    context.standardPseudoNamesStack.push(nextTokenValue);
                  }
                } else {
                  // it is supported extended pseudo-class.
                  // Disallow :has() inside the pseudos accepting only compound selectors
                  // https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [2]
                  if (HAS_PSEUDO_CLASS_MARKERS.includes(nextTokenValue) && context.standardPseudoNamesStack.length > 0) {
                    // eslint-disable-next-line max-len
                    throw new Error("Usage of :".concat(nextTokenValue, " pseudo-class is not allowed inside regular pseudo: '").concat(getLast(context.standardPseudoNamesStack), "'"));
                  } else {
                    // stop RegularSelector value collecting
                    upToClosest(context, NodeType.Selector); // add ExtendedSelector to Selector children

                    addAstNodeByType(context, NodeType.ExtendedSelector);
                  }
                }
              }

              if (((_bufferNode9 = bufferNode) === null || _bufferNode9 === void 0 ? void 0 : _bufferNode9.type) === NodeType.Selector) {
                // after the extended pseudo closing parentheses
                // parser position is on Selector node
                // and there is might be another extended selector.
                // parser position is on colon before 'upward':
                // e.g. 'p:contains(PR):upward(2)'
                if (isSupportedExtendedPseudo(nextTokenValue.toLowerCase())) {
                  // if supported extended pseudo-class is next to colon
                  // add ExtendedSelector to Selector children
                  addAstNodeByType(context, NodeType.ExtendedSelector);
                } else if (nextTokenValue.toLowerCase() === REMOVE_PSEUDO_CLASS_MARKER) {
                  // :remove() pseudo-class should be handled before
                  // as it is not about element selecting but actions with elements
                  // e.g. '#banner:upward(2):remove()'
                  throw new Error("Selector parser error: invalid :remove() pseudo-class in selector: '".concat(selector, "'")); // eslint-disable-line max-len
                } else {
                  // otherwise it is standard pseudo after extended pseudo-class
                  // and colon should be collected to value of RegularSelector
                  // e.g. 'body *:not(input)::selection'
                  addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
                }
              }

              if (((_bufferNode10 = bufferNode) === null || _bufferNode10 === void 0 ? void 0 : _bufferNode10.type) === NodeType.AbsolutePseudoClass) {
                // collecting arg for absolute pseudo-class
                // e.g. 'div:matches-css(width:400px)'
                updateBufferNode(context, tokenValue);
              }

              if (((_bufferNode11 = bufferNode) === null || _bufferNode11 === void 0 ? void 0 : _bufferNode11.type) === NodeType.RelativePseudoClass) {
                // make it more obvious if selector starts with pseudo with no tag specified
                // parser position is on colon inside :has() arg
                // e.g. 'div:has(:contains(text))'
                // or   'div:not(:empty)'
                initRelativeSubtree(context, ASTERISK);

                if (!isSupportedExtendedPseudo(nextTokenValue.toLowerCase())) {
                  // collect the colon to value of RegularSelector
                  // e.g. 'div:not(:empty)'
                  updateBufferNode(context, tokenValue); // parentheses should be balanced only for functional pseudo-classes
                  // e.g. '.yellow:not(:nth-child(3))'

                  if (nextToNextTokenValue === BRACKETS.PARENTHESES.LEFT) {
                    context.standardPseudoNamesStack.push(nextTokenValue);
                  }
                } else {
                  // add ExtendedSelector to Selector children
                  // e.g. 'div:has(:contains(text))'
                  upToClosest(context, NodeType.Selector);
                  addAstNodeByType(context, NodeType.ExtendedSelector);
                }
              }

              break;

            case BRACKETS.PARENTHESES.LEFT:
              // start of pseudo-class arg
              if (((_bufferNode12 = bufferNode) === null || _bufferNode12 === void 0 ? void 0 : _bufferNode12.type) === NodeType.AbsolutePseudoClass) {
                // no brackets balancing needed inside
                // 1. :xpath() extended pseudo-class arg
                // 2. regexp arg for other extended pseudo-classes
                if (bufferNode.name !== XPATH_PSEUDO_CLASS_MARKER && context.isRegexpOpen) {
                  // if the parentheses is escaped it should be part of regexp
                  // collect it to arg of AbsolutePseudoClass
                  // e.g. 'div:matches-css(background-image: /^url\\("data:image\\/gif;base64.+/)'
                  updateBufferNode(context, tokenValue);
                } else {
                  // otherwise brackets should be balanced
                  // e.g. 'div:xpath(//h3[contains(text(),"Share it!")]/..)'
                  context.extendedPseudoBracketsStack.push(tokenValue); // eslint-disable-next-line max-len

                  if (context.extendedPseudoBracketsStack.length > context.extendedPseudoNamesStack.length) {
                    updateBufferNode(context, tokenValue);
                  }
                }
              }

              if (((_bufferNode13 = bufferNode) === null || _bufferNode13 === void 0 ? void 0 : _bufferNode13.type) === NodeType.RegularSelector) {
                // continue RegularSelector value collecting for standard pseudo-classes
                // e.g. '.banner:where(div)'
                if (context.standardPseudoNamesStack.length > 0) {
                  updateBufferNode(context, tokenValue);
                  context.standardPseudoBracketsStack.push(tokenValue);
                }
              }

              if (((_bufferNode14 = bufferNode) === null || _bufferNode14 === void 0 ? void 0 : _bufferNode14.type) === NodeType.RelativePseudoClass) {
                // save opening bracket for balancing
                // e.g. 'div:not()'  // position is on `(`
                context.extendedPseudoBracketsStack.push(tokenValue);
              }

              break;

            case BRACKETS.PARENTHESES.RIGHT:
              if (((_bufferNode15 = bufferNode) === null || _bufferNode15 === void 0 ? void 0 : _bufferNode15.type) === NodeType.AbsolutePseudoClass) {
                // no brackets balancing needed inside
                // 1. :xpath() extended pseudo-class arg
                // 2. regexp arg for other extended pseudo-classes
                if (bufferNode.name !== XPATH_PSEUDO_CLASS_MARKER && context.isRegexpOpen) {
                  // if closing bracket is part of regexp
                  // simply save it to pseudo-class arg
                  updateBufferNode(context, tokenValue);
                } else {
                  // remove stacked open parentheses for brackets balance
                  // and stacked name of extended pseudo-class
                  // e.g. 'h3:contains((Ads))'
                  // or   'div:xpath(//h3[contains(text(),"Share it!")]/..)'
                  context.extendedPseudoBracketsStack.pop();
                  context.extendedPseudoNamesStack.pop();

                  if (context.extendedPseudoBracketsStack.length > context.extendedPseudoNamesStack.length) {
                    // eslint-disable-line max-len
                    // if brackets stack is not empty yet, save tokenValue to arg of AbsolutePseudoClass
                    // parser position on first closing bracket after 'Ads':
                    // e.g. 'h3:contains((Ads))'
                    updateBufferNode(context, tokenValue);
                  } else if (context.extendedPseudoBracketsStack.length >= 0 && context.extendedPseudoNamesStack.length >= 0) {
                    // assume it is combined extended pseudo-classes
                    // parser position on first closing bracket after 'advert':
                    // e.g. 'div:has(.banner, :contains(advert))'
                    upToClosest(context, NodeType.Selector);
                  }
                }
              }

              if (((_bufferNode16 = bufferNode) === null || _bufferNode16 === void 0 ? void 0 : _bufferNode16.type) === NodeType.RegularSelector) {
                if (context.standardPseudoNamesStack.length > 0 && context.standardPseudoBracketsStack.length > 0) {
                  // standard pseudo-class was processing.
                  // collect the closing bracket to value of RegularSelector
                  // parser position is on bracket after 'class' now:
                  // e.g. 'div:where(.class)'
                  updateBufferNode(context, tokenValue); // remove bracket and pseudo name from stacks

                  context.standardPseudoBracketsStack.pop();
                  var lastStandardPseudo = context.standardPseudoNamesStack.pop();

                  if (!lastStandardPseudo) {
                    // standard pseudo should be in standardPseudoNamesStack
                    // as related to standardPseudoBracketsStack
                    throw new Error("Parsing error. Invalid selector: ".concat(selector));
                  } // Disallow :has() after regular pseudo-elements
                  // https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [3]


                  if (Object.values(REGULAR_PSEUDO_ELEMENTS).includes(lastStandardPseudo) // check token which is next to closing parentheses and token after it
                  // parser position is on bracket after 'foo' now:
                  // e.g. '::part(foo):has(.a)'
                  && nextTokenValue === COLON && nextToNextTokenValue && HAS_PSEUDO_CLASS_MARKERS.includes(nextToNextTokenValue)) {
                    // eslint-disable-next-line max-len
                    throw new Error("Usage of :".concat(nextToNextTokenValue, " pseudo-class is not allowed after any regular pseudo-element: '").concat(lastStandardPseudo, "'"));
                  }
                } else {
                  // extended pseudo-class was processing.
                  // e.g. 'div:has(h3)'
                  // remove bracket and pseudo name from stacks
                  context.extendedPseudoBracketsStack.pop();
                  context.extendedPseudoNamesStack.pop();
                  upToClosest(context, NodeType.ExtendedSelector); // go to upper selector for possible selector continuation after extended pseudo-class
                  // e.g. 'div:has(h3) > img'

                  upToClosest(context, NodeType.Selector);
                }
              }

              if (((_bufferNode17 = bufferNode) === null || _bufferNode17 === void 0 ? void 0 : _bufferNode17.type) === NodeType.Selector) {
                // after inner extended pseudo-class bufferNode is Selector.
                // parser position is on last bracket now:
                // e.g. 'div:has(.banner, :contains(ads))'
                context.extendedPseudoBracketsStack.pop();
                context.extendedPseudoNamesStack.pop();
                upToClosest(context, NodeType.ExtendedSelector);
                upToClosest(context, NodeType.Selector);
              }

              if (((_bufferNode18 = bufferNode) === null || _bufferNode18 === void 0 ? void 0 : _bufferNode18.type) === NodeType.RelativePseudoClass) {
                // save opening bracket for balancing
                // e.g. 'div:not()'  // position is on `)`
                // context.extendedPseudoBracketsStack.push(tokenValue);
                if (context.extendedPseudoNamesStack.length > 0 && context.extendedPseudoBracketsStack.length > 0) {
                  context.extendedPseudoBracketsStack.pop();
                  context.extendedPseudoNamesStack.pop();
                }
              }

              break;

            case TAB:
            case LINE_FEED:
            case FORM_FEED:
            case CARRIAGE_RETURN:
              // such characters at start and end of selector should be trimmed
              // so is there is one them among tokens, it is not valid selector
              throw new Error("'".concat(selector, "' is not a valid selector."));
          }

          break;
        // no default statement for Marks as they are limited to SUPPORTED_SELECTOR_MARKS
        // and all other symbol combinations are tokenized as Word
        // so error for invalid Word will be thrown later while element selecting by parsed ast

        default:
          throw new Error("Unknown type of token: '".concat(tokenValue, "'."));
      }

      i += 1;
    }

    if (context.ast === null) {
      throw new Error("'".concat(selector, "' is not a valid selector"));
    }

    if (context.extendedPseudoNamesStack.length > 0 || context.extendedPseudoBracketsStack.length > 0) {
      // eslint-disable-next-line max-len
      throw new Error("Unbalanced brackets for extended pseudo-class: '".concat(getLast(context.extendedPseudoNamesStack), "'"));
    }

    if (context.isAttributeBracketsOpen) {
      throw new Error("Unbalanced brackets for attributes is selector: '".concat(selector, "'"));
    }

    return context.ast;
  };

  var logger = {
    /**
     * Safe console.error version
     */
    error: typeof console !== 'undefined' && console.error && console.error.bind ? console.error.bind(window.console) : console.error,

    /**
    * Safe console.info version
    */
    info: typeof console !== 'undefined' && console.info && console.info.bind ? console.info.bind(window.console) : console.info
  };

  /**
   * Converts array of pairs to object.
   * Object.fromEntries() polyfill because it is not supported by old browsers, e.g. Chrome 55
   * https://caniuse.com/?search=Object.fromEntries
   * @param entries - array of pairs
   */
  var getObjectFromEntries = function getObjectFromEntries(entries) {
    var initAcc = {};
    var object = entries.reduce(function (acc, el) {
      var key = el[0];
      var value = el[1];
      acc[key] = value;
      return acc;
    }, initAcc);
    return object;
  };

  /**
   * Init value for rawRuleData
   */
  var initRawRuleData = {
    selector: ''
  };
  /**
   * Resets rule data buffer to init value after rule successfully collected
   * @param context
   */

  var restoreRuleAcc = function restoreRuleAcc(context) {
    context.rawRuleData = initRawRuleData;
  };

  /**
   * Checks the presence of :remove() pseudo-class and validates it while parsing the selector part of css rule
   * @param rawSelector
   */
  var parseRemoveSelector = function parseRemoveSelector(rawSelector) {
    /**
     * no error will be thrown on invalid selector as it will be validated later
     * so it's better to explicitly specify 'any' selector for :remove() pseudo-class by '*'
     * e.g. '.banner > *:remove()' instead of '.banner > :remove()'
     */
    // ':remove()'
    var VALID_REMOVE_MARKER = "".concat(COLON).concat(REMOVE_PSEUDO_CLASS_MARKER).concat(BRACKETS.PARENTHESES.LEFT).concat(BRACKETS.PARENTHESES.RIGHT); // eslint-disable-line max-len
    // ':remove(' - needed for validation rules like 'div:remove(2)'

    var INVALID_REMOVE_MARKER = "".concat(COLON).concat(REMOVE_PSEUDO_CLASS_MARKER).concat(BRACKETS.PARENTHESES.LEFT);
    var selector;
    var shouldRemove = false;
    var firstIndex = rawSelector.indexOf(VALID_REMOVE_MARKER);

    if (firstIndex === 0) {
      // e.g. ':remove()'
      throw new Error("Selector should be specified before :remove() pseudo-class: '".concat(rawSelector, "'"));
    } else if (firstIndex > 0) {
      if (firstIndex !== rawSelector.lastIndexOf(VALID_REMOVE_MARKER)) {
        // rule with more than one :remove() pseudo-class is invalid
        // e.g. '.block:remove() > .banner:remove()'
        throw new Error("Pseudo-class :remove() appears more than once in selector: '".concat(rawSelector, "'"));
      } else if (firstIndex + VALID_REMOVE_MARKER.length < rawSelector.length) {
        // remove pseudo-class should be last in the rule
        // e.g. '.block:remove():upward(2)'
        throw new Error("Pseudo-class :remove() should be at the end of selector: '".concat(rawSelector, "'"));
      } else {
        // valid :remove() pseudo-class position
        selector = rawSelector.substring(0, firstIndex);
        shouldRemove = true;
      }
    } else if (rawSelector.includes(INVALID_REMOVE_MARKER)) {
      // it is not valid if ':remove()' is absent in rule but just ':remove(' is present
      // e.g. 'div:remove(0)'
      throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_REMOVE, ": '").concat(rawSelector, "'"));
    } else {
      // there is no :remove() pseudo-class is rule
      selector = rawSelector;
    }

    var stylesOfSelector = shouldRemove ? [{
      property: REMOVE_PSEUDO_PROPERTY_KEY,
      value: String(shouldRemove)
    }] : [];
    return {
      selector: selector,
      stylesOfSelector: stylesOfSelector
    };
  };
  /**
   * Parses cropped selector part found before `{` previously
   * @param context
   */


  var parseSelectorPart = function parseSelectorPart(context) {
    var selector = context.selectorBuffer.trim();
    var removeSelectorData;

    try {
      removeSelectorData = parseRemoveSelector(selector);
    } catch (e) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      logger.error(e.message);
      throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_REMOVE, ": '").concat(selector, "'"));
    }

    if (context.nextIndex === -1) {
      if (selector === removeSelectorData.selector) {
        // rule should have style or pseudo-class :remove()
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_STYLE_OR_REMOVE, ": '").concat(context.cssToParse, "'")); // eslint-disable-line max-len
      } // stop parsing as there is no style declaration and selector parsed fine


      context.cssToParse = '';
    }

    var stylesOfSelector = [];
    var success = false;
    var ast;

    try {
      selector = removeSelectorData.selector;
      stylesOfSelector = removeSelectorData.stylesOfSelector; // validate found selector by parsing it to ast
      // so if it is invalid error will be thrown

      ast = parse$1(selector);
      success = true;
    } catch (e) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      success = false;
    }

    if (context.nextIndex > 0) {
      // slice found valid selector part off
      // and parse rest of stylesheet later
      context.cssToParse = context.cssToParse.slice(context.nextIndex);
    }

    return {
      success: success,
      selector: selector,
      ast: ast,
      stylesOfSelector: stylesOfSelector
    };
  };
  /**
   * Recursively parses style declaration string into `Style`s
   * @return a number index of the next `}` in `this.cssToParse`.
   */


  var parseUntilClosingBracket = function parseUntilClosingBracket(context, styles) {
    // Expects ":", ";", and "}".
    REGEXP_DECLARATION_DIVIDER.lastIndex = context.nextIndex;
    var match = REGEXP_DECLARATION_DIVIDER.exec(context.cssToParse);

    if (match === null) {
      throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_STYLE, ": '").concat(context.cssToParse, "'"));
    }

    var matchPos = match.index;
    var matched = match[0];

    if (matched === BRACKETS.CURLY.RIGHT) {
      var declarationChunk = context.cssToParse.slice(context.nextIndex, matchPos);

      if (declarationChunk.trim().length === 0) {
        // empty style declaration
        // e.g. 'div { }'
        if (styles.length === 0) {
          throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_STYLE, ": '").concat(context.cssToParse, "'"));
        } // else valid style parsed before it
        // e.g. '{ display: none; }' -- position is after ';'

      } else {
        // closing curly bracket '}' is matched before colon ':'
        // trimmed declarationChunk is not a space, between ';' and '}',
        // e.g. 'visible }' in style '{ display: none; visible }' after part before ';' is parsed
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_STYLE, ": '").concat(context.cssToParse, "'"));
      }

      return matchPos;
    }

    if (matched === COLON) {
      var colonIndex = matchPos; // Expects ";" and "}".

      REGEXP_DECLARATION_END.lastIndex = colonIndex;
      match = REGEXP_DECLARATION_END.exec(context.cssToParse);

      if (match === null) {
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.UNCLOSED_STYLE, ": '").concat(context.cssToParse, "'"));
      }

      matchPos = match.index;
      matched = match[0]; // Populates the `styleMap` key-value map.

      var property = context.cssToParse.slice(context.nextIndex, colonIndex).trim();

      if (property.length === 0) {
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_PROPERTY, ": '").concat(context.cssToParse, "'"));
      }

      var value = context.cssToParse.slice(colonIndex + 1, matchPos).trim();

      if (value.length === 0) {
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_VALUE, ": '").concat(context.cssToParse, "'"));
      }

      styles.push({
        property: property,
        value: value
      }); // finish style parsing if '}' is found
      // e.g. '{ display: none }' -- no ';' at the end of declaration

      if (matched === BRACKETS.CURLY.RIGHT) {
        return matchPos;
      }
    } // matchPos is the position of the next ';'
    // crop 'cssToParse' and re-run the loop


    context.cssToParse = context.cssToParse.slice(matchPos + 1);
    context.nextIndex = 0;
    return parseUntilClosingBracket(context, styles); // Should be a subject of tail-call optimization.
  };
  /**
   * Parses next style declaration part in stylesheet
   * @param context
   */


  var parseNextStyle = function parseNextStyle(context) {
    var styles = [];
    var styleEndPos = parseUntilClosingBracket(context, styles); // find next rule after the style declaration

    REGEXP_NON_WHITESPACE.lastIndex = styleEndPos + 1;
    var match = REGEXP_NON_WHITESPACE.exec(context.cssToParse);

    if (match === null) {
      context.cssToParse = '';
      return styles;
    }

    var matchPos = match.index; // cut out matched style declaration for previous selector

    context.cssToParse = context.cssToParse.slice(matchPos);
    return styles;
  };
  /**
   * Checks whether the 'remove' property positively set in styles
   * with only one positive value - 'true'
   * @param styles
   */


  var isRemoveSetInStyles = function isRemoveSetInStyles(styles) {
    return styles.some(function (s) {
      return s.property === REMOVE_PSEUDO_PROPERTY_KEY && s.value === PSEUDO_PROPERTY_POSITIVE_VALUE;
    });
  };
  /**
   * Gets valid 'debug' property value set in styles
   * where possible values are 'true' and 'global'
   * @param styles
   */


  var getDebugStyleValue = function getDebugStyleValue(styles) {
    var debugStyle = styles.find(function (s) {
      return s.property === DEBUG_PSEUDO_PROPERTY_KEY;
    });
    return debugStyle === null || debugStyle === void 0 ? void 0 : debugStyle.value;
  };
  /**
   * Prepares final RuleData
   * @param selector
   * @param ast
   * @param rawStyles array of previously collected styles which may contain 'remove' and 'debug'
   */


  var prepareRuleData = function prepareRuleData(selector, ast, rawStyles) {
    var ruleData = {
      selector: selector,
      ast: ast
    };
    var debugValue = getDebugStyleValue(rawStyles);
    var shouldRemove = isRemoveSetInStyles(rawStyles);
    var styles = rawStyles;

    if (debugValue) {
      // get rid of 'debug' from styles
      styles = rawStyles.filter(function (s) {
        return s.property !== DEBUG_PSEUDO_PROPERTY_KEY;
      }); // and set it as separate property only if its value is valid
      // which is 'true' or 'global'

      if (debugValue === PSEUDO_PROPERTY_POSITIVE_VALUE || debugValue === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE) {
        ruleData[DEBUG_PSEUDO_PROPERTY_KEY] = debugValue;
      }
    }

    if (shouldRemove) {
      // no other styles are needed to apply if 'remove' is set
      ruleData.style = _defineProperty({}, REMOVE_PSEUDO_PROPERTY_KEY, PSEUDO_PROPERTY_POSITIVE_VALUE);
    } else {
      // otherwise all styles should be applied.
      // every style property will be unique because of their converting into object
      if (styles.length > 0) {
        var stylesAsEntries = styles.map(function (style) {
          var property = style.property,
              value = style.value;
          return [property, value];
        });
        var preparedStyleData = getObjectFromEntries(stylesAsEntries);
        ruleData.style = preparedStyleData;
      }
    }

    return ruleData;
  };
  /**
   * Saves rules data for unique selectors
   * @param rawResults
   * @param rawRuleData
   */

  var saveToRawResults = function saveToRawResults(rawResults, rawRuleData) {
    var selector = rawRuleData.selector,
        ast = rawRuleData.ast,
        styles = rawRuleData.styles;

    if (!styles) {
      throw new Error("No style declaration for selector: '".concat(selector, "'"));
    }

    if (!ast) {
      throw new Error("No ast parsed for selector: '".concat(selector, "'"));
    }

    var storedRuleData = rawResults.get(selector);

    if (!storedRuleData) {
      rawResults.set(selector, {
        ast: ast,
        styles: styles
      });
    } else {
      var _storedRuleData$style;

      (_storedRuleData$style = storedRuleData.styles).push.apply(_storedRuleData$style, _toConsumableArray(styles));
    }
  };
  /**
   * Parses stylesheet into rules data objects
   * @param stylesheet
   */


  var parse = function parse(rawStylesheet) {
    var stylesheet = rawStylesheet.trim();
    var context = {
      // any stylesheet should start with selector
      isSelector: true,
      // init value of parser position
      nextIndex: 0,
      // init value of cssToParse
      cssToParse: stylesheet,
      // buffer for collecting selector part
      selectorBuffer: '',
      // accumulator for rules
      rawRuleData: initRawRuleData
    };
    var rawResults = new Map();
    var selectorData; // context.cssToParse is going to be cropped while its parsing

    while (context.cssToParse) {
      if (context.isSelector) {
        // find index of first opening curly bracket
        // which may mean start of style part and end of selector one
        context.nextIndex = context.cssToParse.indexOf(BRACKETS.CURLY.LEFT); // rule should not start with style, selector required

        if (context.selectorBuffer.length === 0 && context.nextIndex === 0) {
          throw new Error("Selector should be defined before style declaration in stylesheet: '".concat(context.cssToParse, "'")); // eslint-disable-line max-len
        }

        if (context.nextIndex === -1) {
          // no style declaration in rule
          // but rule still may contain :remove() pseudo-class
          context.selectorBuffer = context.cssToParse;
        } else {
          // collect string parts before opening curly bracket
          // until valid selector collected
          context.selectorBuffer += context.cssToParse.slice(0, context.nextIndex);
        }

        selectorData = parseSelectorPart(context);

        if (selectorData.success) {
          // selector successfully parsed
          context.rawRuleData.selector = selectorData.selector.trim();
          context.rawRuleData.ast = selectorData.ast;
          context.rawRuleData.styles = selectorData.stylesOfSelector;
          context.isSelector = false; // save rule data if there is no style declaration

          if (context.nextIndex === -1) {
            saveToRawResults(rawResults, context.rawRuleData); // clean up ruleContext

            restoreRuleAcc(context);
          } else {
            // skip the opening curly bracket at the start of style declaration part
            context.nextIndex = 1;
            context.selectorBuffer = '';
          }
        } else {
          // if selector was not successfully parsed parseSelectorPart(), continue stylesheet parsing:
          // save the found bracket to buffer and proceed to next loop iteration
          context.selectorBuffer += BRACKETS.CURLY.LEFT; // delete `{` from cssToParse

          context.cssToParse = context.cssToParse.slice(1);
        }
      } else {
        var _context$rawRuleData$;

        // style declaration should be parsed
        var parsedStyles = parseNextStyle(context); // styles can be parsed from selector part if it has :remove() pseudo-class
        // e.g. '.banner:remove() { debug: true; }'

        (_context$rawRuleData$ = context.rawRuleData.styles) === null || _context$rawRuleData$ === void 0 ? void 0 : _context$rawRuleData$.push.apply(_context$rawRuleData$, _toConsumableArray(parsedStyles)); // save rule data to results

        saveToRawResults(rawResults, context.rawRuleData);
        context.nextIndex = 0; // clean up ruleContext

        restoreRuleAcc(context); // parse next rule selector after style successfully parsed

        context.isSelector = true;
      }
    }

    var results = [];
    rawResults.forEach(function (value, key) {
      var selector = key;
      var ast = value.ast,
          rawStyles = value.styles;
      results.push(prepareRuleData(selector, ast, rawStyles));
    });
    return results;
  };

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var natives = {
    MutationObserver: window.MutationObserver || window.WebKitMutationObserver
  };
  /**
   * As soon as possible stores native Node textContent getter to be used for contains pseudo-class
   * because elements' 'textContent' and 'innerText' properties might be mocked
   * https://github.com/AdguardTeam/ExtendedCss/issues/127
   */

  var nodeTextContentGetter = function () {
    var _Object$getOwnPropert;

    var nativeNode = window.Node || Node;
    return (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(nativeNode.prototype, 'textContent')) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.get;
  }();

  /**
   * Returns textContent of passed domElement
   * @param domElement
   */

  var getNodeTextContent = function getNodeTextContent(domElement) {
    return (nodeTextContentGetter === null || nodeTextContentGetter === void 0 ? void 0 : nodeTextContentGetter.apply(domElement)) || '';
  };
  /**
   * Returns element selector text based on it's tagName and attributes
   * @param element
   */

  var getElementSelectorDesc = function getElementSelectorDesc(element) {
    var selectorText = element.tagName.toLowerCase();
    selectorText += Array.from(element.attributes).map(function (attr) {
      return "[".concat(attr.name, "=\"").concat(element.getAttribute(attr.name), "\"]");
    }).join('');
    return selectorText;
  };
  /**
   * Returns path of a DOM element as string selector
   * @param inputEl input element
   */

  var getElementSelectorPath = function getElementSelectorPath(inputEl) {
    if (!(inputEl instanceof Element)) {
      throw new Error('Function received argument with wrong type');
    }

    var el;
    el = inputEl;
    var path = []; // we need to check '!!el' first because it is possible
    // that some ancestor of the inputEl was removed before it

    while (!!el && el.nodeType === Node.ELEMENT_NODE) {
      var selector = el.nodeName.toLowerCase();

      if (el.id && typeof el.id === 'string') {
        selector += "#".concat(el.id);
        path.unshift(selector);
        break;
      }

      var sibling = el;
      var nth = 1;

      while (sibling.previousElementSibling) {
        sibling = sibling.previousElementSibling;

        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName.toLowerCase() === selector) {
          nth += 1;
        }
      }

      if (nth !== 1) {
        selector += ":nth-of-type(".concat(nth, ")");
      }

      path.unshift(selector);
      el = el.parentElement;
    }

    return path.join(' > ');
  };
  /**
   * Checks whether the element is instance of HTMLElement
   * @param element
   */

  var isHtmlElement = function isHtmlElement(element) {
    return element instanceof HTMLElement;
  };

  /**
   * Gets string without suffix
   * @param str input string
   * @param suffix needed to remove
   */

  var removeSuffix = function removeSuffix(str, suffix) {
    var index = str.indexOf(suffix, str.length - suffix.length);

    if (index >= 0) {
      return str.substring(0, index);
    }

    return str;
  };
  /**
   * Replaces all `pattern`s with `replacement` in `input` string.
   * String.replaceAll() polyfill because it is not supported by old browsers, e.g. Chrome 55
   * https://caniuse.com/?search=String.replaceAll
   * @param input
   * @param pattern
   * @param replacement
   */

  var replaceAll = function replaceAll(input, pattern, replacement) {
    if (!input) {
      return input;
    }

    return input.split(pattern).join(replacement);
  };
  /**
   * Converts string pattern to regular expression
   * @param str
   */

  var toRegExp = function toRegExp(str) {
    if (str.startsWith(SLASH) && str.endsWith(SLASH)) {
      return new RegExp(str.slice(1, -1));
    }

    var escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped);
  };
  /**
   * Converts any simple type value to string type
   * e.g. undefined -> 'undefined'
   * @param value
   */

  var convertTypeIntoString = function convertTypeIntoString(value) {
    var output;

    switch (value) {
      case undefined:
        output = 'undefined';
        break;

      case null:
        output = 'null';
        break;

      default:
        output = value.toString();
    }

    return output;
  };
  /**
   * Converts instance of string value into other simple types
   * e.g. 'null' -> null, 'true' -> true
   * @param value
   */

  var convertTypeFromString = function convertTypeFromString(value) {
    var numValue = Number(value);
    var output;

    if (!Number.isNaN(numValue)) {
      output = numValue;
    } else {
      switch (value) {
        case 'undefined':
          output = undefined;
          break;

        case 'null':
          output = null;
          break;

        case 'true':
          output = true;
          break;

        case 'false':
          output = false;
          break;

        default:
          output = value;
      }
    }

    return output;
  };

  var _SUPPORTED_BROWSERS_D;
  /**
   * Simple check for Safari browser
   */

  var isSafariBrowser = navigator.vendor === 'Apple Computer, Inc.';
  var SUPPORTED_BROWSERS_DATA = (_SUPPORTED_BROWSERS_D = {}, _defineProperty(_SUPPORTED_BROWSERS_D, BrowserName.Chrome, {
    // avoid Chromium-based Edge browser
    MASK: /\s(Chrome)\/(\d+)\..+\s(?!.*Edg\/)/,
    MIN_VERSION: 55
  }), _defineProperty(_SUPPORTED_BROWSERS_D, BrowserName.Firefox, {
    MASK: /\s(Firefox)\/(\d+)\./,
    MIN_VERSION: 52
  }), _defineProperty(_SUPPORTED_BROWSERS_D, BrowserName.Edge, {
    MASK: /\s(Edg)\/(\d+)\./,
    MIN_VERSION: 80
  }), _defineProperty(_SUPPORTED_BROWSERS_D, BrowserName.Opera, {
    MASK: /\s(OPR)\/(\d+)\./,
    MIN_VERSION: 80
  }), _defineProperty(_SUPPORTED_BROWSERS_D, BrowserName.Safari, {
    MASK: /\sVersion\/(\d+)\..+\s(Safari)\//,
    MIN_VERSION: 10
  }), _SUPPORTED_BROWSERS_D);
  /**
   * Returns chromium brand object from navigator.userAgentData.brands or null if not supported.
   * Chromium because of all browsers based on it should be supported as well
   * and it is universal wey to check it
   * https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/brands
   */

  var getChromiumBrand = function getChromiumBrand() {
    var _navigator$userAgentD;

    var brandsData = (_navigator$userAgentD = navigator.userAgentData) === null || _navigator$userAgentD === void 0 ? void 0 : _navigator$userAgentD.brands;

    if (!brandsData) {
      return null;
    } // for chromium-based browsers


    var chromiumBrand = brandsData.find(function (brandData) {
      return brandData.brand === CHROMIUM_BRAND_NAME || brandData.brand === GOOGLE_CHROME_BRAND_NAME;
    });
    return chromiumBrand || null;
  };

  /**
   * Parses userAgent string and returns the data object for supported browsers;
   * otherwise returns null
   */
  var parseUserAgent = function parseUserAgent() {
    var browserName;
    var currentVersion;
    var browserNames = Object.values(BrowserName);

    for (var i = 0; i < browserNames.length; i += 1) {
      var match = SUPPORTED_BROWSERS_DATA[browserNames[i]].MASK.exec(navigator.userAgent);

      if (match) {
        // for safari order is different because of regexp
        if (match[2] === browserNames[i]) {
          browserName = match[2];
          currentVersion = Number(match[1]);
        } else {
          // for others first is name and second is version
          browserName = match[1];
          currentVersion = Number(match[2]);
        }

        return {
          browserName: browserName,
          currentVersion: currentVersion
        };
      }
    }

    return null;
  };
  /**
   * Gets info about current browser
   */


  var getCurrentBrowserInfoAsSupported = function getCurrentBrowserInfoAsSupported() {
    var brandData = getChromiumBrand();

    if (!brandData) {
      var uaInfo = parseUserAgent();

      if (!uaInfo) {
        return null;
      }

      var _browserName = uaInfo.browserName,
          currentVersion = uaInfo.currentVersion;
      return {
        browserName: _browserName,
        currentVersion: currentVersion
      };
    } // if navigator.userAgentData is supported


    var brand = brandData.brand,
        version = brandData.version; // handle chromium-based browsers

    var browserName = brand === CHROMIUM_BRAND_NAME || brand === GOOGLE_CHROME_BRAND_NAME ? BrowserName.Chrome : brand;
    return {
      browserName: browserName,
      currentVersion: Number(version)
    };
  };
  /**
   * Checks whether the current browser is supported
   */


  var isBrowserSupported = function isBrowserSupported() {
    var ua = navigator.userAgent; // do not support Internet Explorer

    if (ua.includes('MSIE') || ua.includes('Trident/')) {
      return false;
    } // for local testing purposes


    if (ua.includes('jsdom')) {
      return true;
    }

    var currentBrowserData = getCurrentBrowserInfoAsSupported();

    if (!currentBrowserData) {
      return false;
    }

    var browserName = currentBrowserData.browserName,
        currentVersion = currentBrowserData.currentVersion;
    return currentVersion >= SUPPORTED_BROWSERS_DATA[browserName].MIN_VERSION;
  };

  /**
   * Removes quotes for specified content value.
   *
   * For example, content style declaration with ::before can be set as '-' (e.g. unordered list)
   * which displayed as simple dash `-` with no quotes,
   * but CSSStyleDeclaration.getPropertyValue('content') will return value
   * wrapped into quotes, e.g. '"-"', which should be removed
   * because filters maintainers does not use any quotes in real rules
   * @param str
   */
  var removeContentQuotes = function removeContentQuotes(str) {
    return str.replace(/^(["'])([\s\S]*)\1$/, '$2');
  };
  /**
   * Adds quotes for specified background url value.
   *
   * If background-image is specified **without** quotes:
   * e.g. 'background: url(data:image/gif;base64,R0lGODlhAQA7)'
   *
   * CSSStyleDeclaration.getPropertyValue('background-image') may return value **with** quotes:
   * e.g. 'background: url("data:image/gif;base64,R0lGODlhAQA7")'
   *
   * So we add quotes for compatibility since filters maintainers might use quotes in real rules
   * @param str
   */


  var addUrlPropertyQuotes = function addUrlPropertyQuotes(str) {
    if (!str.includes('url("')) {
      var re = /url\((.*?)\)/g;
      return str.replace(re, 'url("$1")');
    }

    return str;
  };
  /**
   * Adds quotes to url arg for consistent property value matching
   */


  var addUrlQuotesTo = {
    regexpArg: function regexpArg(str) {
      // e.g. /^url\\([a-z]{4}:[a-z]{5}/
      // or /^url\\(data\\:\\image\\/gif;base64.+/
      var re = /(\^)?url(\\)?\\\((\w|\[\w)/g;
      return str.replace(re, '$1url$2\\(\\"?$3');
    },
    noneRegexpArg: addUrlPropertyQuotes
  };
  /**
   * Escapes regular expression string
   * @param str
   */

  var escapeRegExp = function escapeRegExp(str) {
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
    // should be escaped . * + ? ^ $ { } ( ) | [ ] / \
    // except of * | ^
    var specials = ['.', '+', '?', '$', '{', '}', '(', ')', '[', ']', '\\', '/'];
    var specialsRegex = new RegExp("[".concat(specials.join('\\'), "]"), 'g');
    return str.replace(specialsRegex, '\\$&');
  };
  /**
   * Converts :matches-css arg property value match to regexp
   * @param rawArg
   */


  var convertStyleMatchValueToRegexp = function convertStyleMatchValueToRegexp(rawArg) {
    var arg;

    if (rawArg.startsWith(SLASH) && rawArg.endsWith(SLASH)) {
      // For regex patterns double quotes `"` and backslashes `\` should be escaped
      arg = addUrlQuotesTo.regexpArg(rawArg);
      arg = arg.slice(1, -1);
    } else {
      // For non-regex patterns parentheses `(` `)` and square brackets `[` `]`
      // should be unescaped, because their escaping in filter rules is required
      arg = addUrlQuotesTo.noneRegexpArg(rawArg);
      arg = arg.replace(/\\([\\()[\]"])/g, '$1');
      arg = escapeRegExp(arg); // e.g. div:matches-css(background-image: url(data:*))

      arg = replaceAll(arg, ASTERISK, REGEXP_ANY_SYMBOL);
    }

    return new RegExp(arg, 'i');
  };
  /**
   * Makes some properties values compatible
   * @param propertyName
   * @param propertyValue
   */


  var normalizePropertyValue = function normalizePropertyValue(propertyName, propertyValue) {
    var normalized = '';

    switch (propertyName) {
      case CSS_PROPERTIES.BACKGROUND:
      case CSS_PROPERTIES.BACKGROUND_IMAGE:
        // sometimes url property does not have quotes
        // so we add them for consistent matching
        normalized = addUrlPropertyQuotes(propertyValue);
        break;

      case CSS_PROPERTIES.CONTENT:
        normalized = removeContentQuotes(propertyValue);
        break;

      case CSS_PROPERTIES.OPACITY:
        // https://bugs.webkit.org/show_bug.cgi?id=93445
        if (isSafariBrowser) {
          normalized = (Math.round(parseFloat(propertyValue) * 100) / 100).toString();
        }

        break;

      default:
        normalized = propertyValue;
    }

    return normalized;
  };
  /**
   * Gets domElement style property value
   * by css property name and standard pseudo-element
   * @param domElement dom node
   * @param regularPseudoElement standard pseudo-element — :before or :after
   * @param propertyName css property name
   */


  var getComputedStylePropertyValue = function getComputedStylePropertyValue(domElement, propertyName, regularPseudoElement) {
    var style = getComputedStyle(domElement, regularPseudoElement);
    var propertyValue = style.getPropertyValue(propertyName);
    return normalizePropertyValue(propertyName, propertyValue);
  };

  /**
   * Parses arg of absolute pseudo-class into 'name' and 'value' if set.
   *
   * Used for :matches-css() - with COLON as separator,
   * for :matches-attr() and :matches-property() - with EQUAL_SIGN as separator
   * @param pseudoArg
   * @param separator
   * @returns {PseudoArgData} { name, value } where 'value' can be undefined
   */
  var getPseudoArgData = function getPseudoArgData(pseudoArg, separator) {
    var index = pseudoArg.indexOf(separator);
    var name;
    var value;

    if (index > -1) {
      name = pseudoArg.substring(0, index).trim();
      value = pseudoArg.substring(index + 1).trim();
    } else {
      name = pseudoArg;
    }

    return {
      name: name,
      value: value
    };
  };
  /**
   * Checks whether the domElement is matched by :matches-css() arg
   * @param argsData
   */


  var isStyleMatched = function isStyleMatched(argsData) {
    var pseudoName = argsData.pseudoName,
        pseudoArg = argsData.pseudoArg,
        domElement = argsData.domElement,
        regularPseudoElement = argsData.regularPseudoElement;

    var _getPseudoArgData = getPseudoArgData(pseudoArg, COLON),
        matchName = _getPseudoArgData.name,
        matchValue = _getPseudoArgData.value;

    if (!matchName || !matchValue) {
      throw new Error("Required property name or value is missing in :".concat(pseudoName, "() arg: '").concat(pseudoArg, "'"));
    }

    var valueRegexp;

    try {
      valueRegexp = convertStyleMatchValueToRegexp(matchValue);
    } catch (e) {
      logger.error(e);
      throw new Error("Invalid argument of :".concat(pseudoName, "() pseudo-class: '").concat(pseudoArg, "'"));
    }

    var value = getComputedStylePropertyValue(domElement, matchName, regularPseudoElement);
    return valueRegexp && valueRegexp.test(value);
  };
  /**
   * Validates string arg for :matches-attr() and :matches-property()
   * @param arg
   */

  var validateStrMatcherArg = function validateStrMatcherArg(arg) {
    if (arg.includes(SLASH)) {
      return false;
    }

    if (!/^[\w-]+$/.test(arg)) {
      return false;
    }

    return true;
  };
  /**
   * Returns valid arg for :matches-attr and :matcher-property
   * @param rawArg arg pattern
   * @param [isWildcardAllowed=false] flag for wildcard (`*`) using as pseudo-class arg
   */


  var getValidMatcherArg = function getValidMatcherArg(rawArg) {
    var isWildcardAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // if rawArg is missing for pseudo-class
    // e.g. :matches-attr()
    // error will be thrown before getValidMatcherArg() is called:
    // name or arg is missing in AbsolutePseudoClass
    var arg;

    if (rawArg.length > 1 && rawArg.startsWith(DOUBLE_QUOTE) && rawArg.endsWith(DOUBLE_QUOTE)) {
      rawArg = rawArg.slice(1, -1);
    }

    if (rawArg === '') {
      // e.g. :matches-property("")
      throw new Error('Argument should be specified. Empty arg is invalid.');
    }

    if (rawArg.startsWith(SLASH) && rawArg.endsWith(SLASH)) {
      // e.g. :matches-property("//")
      if (rawArg.length > 2) {
        arg = toRegExp(rawArg);
      } else {
        throw new Error("Invalid regexp: '".concat(rawArg, "'"));
      }
    } else if (rawArg.includes(ASTERISK)) {
      if (rawArg === ASTERISK && !isWildcardAllowed) {
        // e.g. :matches-attr(*)
        throw new Error("Argument should be more specific than ".concat(rawArg));
      }

      arg = replaceAll(rawArg, ASTERISK, REGEXP_ANY_SYMBOL);
      arg = new RegExp(arg);
    } else {
      if (!validateStrMatcherArg(rawArg)) {
        throw new Error("Invalid argument: '".concat(rawArg, "'"));
      }

      arg = rawArg;
    }

    return arg;
  };

  /**
   * Parses pseudo-class argument and returns parsed data
   * @param pseudoName extended pseudo-class name
   * @param pseudoArg extended pseudo-class argument
   */
  var getRawMatchingData = function getRawMatchingData(pseudoName, pseudoArg) {
    var _getPseudoArgData2 = getPseudoArgData(pseudoArg, EQUAL_SIGN),
        rawName = _getPseudoArgData2.name,
        rawValue = _getPseudoArgData2.value;

    if (!rawName) {
      throw new Error("Required attribute name is missing in :".concat(pseudoName, " arg: ").concat(pseudoArg));
    }

    return {
      rawName: rawName,
      rawValue: rawValue
    };
  };
  /**
   * Checks whether the domElement is matched by :matches-attr() arg
   * @param argsData
   */

  var isAttributeMatched = function isAttributeMatched(argsData) {
    var pseudoName = argsData.pseudoName,
        pseudoArg = argsData.pseudoArg,
        domElement = argsData.domElement;
    var elementAttributes = domElement.attributes; // no match if dom element has no attributes

    if (elementAttributes.length === 0) {
      return false;
    }

    var _getRawMatchingData = getRawMatchingData(pseudoName, pseudoArg),
        rawAttrName = _getRawMatchingData.rawName,
        rawAttrValue = _getRawMatchingData.rawValue;

    var attrNameMatch;

    try {
      attrNameMatch = getValidMatcherArg(rawAttrName);
    } catch (e) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      logger.error(e);
      throw new SyntaxError(e.message);
    }

    var isMatched = false;
    var i = 0;

    while (i < elementAttributes.length && !isMatched) {
      var attr = elementAttributes[i];
      var isNameMatched = attrNameMatch instanceof RegExp ? attrNameMatch.test(attr.name) : attrNameMatch === attr.name;

      if (!rawAttrValue) {
        // for rules with no attribute value specified
        // e.g. :matches-attr("/regex/") or :matches-attr("attr-name")
        isMatched = isNameMatched;
      } else {
        var attrValueMatch = void 0;

        try {
          attrValueMatch = getValidMatcherArg(rawAttrValue);
        } catch (e) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          logger.error(e);
          throw new SyntaxError(e.message);
        }

        var isValueMatched = attrValueMatch instanceof RegExp ? attrValueMatch.test(attr.value) : attrValueMatch === attr.value;
        isMatched = isNameMatched && isValueMatched;
      }

      i += 1;
    }

    return isMatched;
  };
  /**
   * Parses raw :matches-property() arg which may be chain of properties
   * @param input argument of :matches-property()
   */

  var parseRawPropChain = function parseRawPropChain(input) {
    if (input.length > 1 && input.startsWith(DOUBLE_QUOTE) && input.endsWith(DOUBLE_QUOTE)) {
      input = input.slice(1, -1);
    }

    var chainChunks = input.split(DOT);
    var chainPatterns = [];
    var patternBuffer = '';
    var isRegexpPattern = false;
    var i = 0;

    while (i < chainChunks.length) {
      var chunk = chainChunks[i];

      if (chunk.startsWith(SLASH) && chunk.endsWith(SLASH) && chunk.length > 2) {
        // regexp pattern with no dot in it, e.g. /propName/
        chainPatterns.push(chunk);
      } else if (chunk.startsWith(SLASH)) {
        // if chunk is a start of regexp pattern
        isRegexpPattern = true;
        patternBuffer += chunk;
      } else if (chunk.endsWith(SLASH)) {
        isRegexpPattern = false; // restore dot removed while splitting
        // e.g. testProp./.{1,5}/

        patternBuffer += ".".concat(chunk);
        chainPatterns.push(patternBuffer);
        patternBuffer = '';
      } else {
        // if there are few dots in regexp pattern
        // so chunk might be in the middle of it
        if (isRegexpPattern) {
          patternBuffer += chunk;
        } else {
          // otherwise it is string pattern
          chainPatterns.push(chunk);
        }
      }

      i += 1;
    }

    if (patternBuffer.length > 0) {
      throw new Error("Invalid regexp property pattern '".concat(input, "'"));
    }

    var chainMatchPatterns = chainPatterns.map(function (pattern) {
      if (pattern.length === 0) {
        // e.g. '.prop.id' or 'nested..test'
        throw new Error("Empty pattern '".concat(pattern, "' is invalid in chain '").concat(input, "'"));
      }

      var validPattern;

      try {
        validPattern = getValidMatcherArg(pattern, true);
      } catch (e) {
        logger.error(e);
        throw new Error("Invalid property pattern '".concat(pattern, "' in property chain '").concat(input, "'"));
      }

      return validPattern;
    });
    return chainMatchPatterns;
  };

  /**
   * Checks if the property exists in the base object (recursively).
   * @param base
   * @param chain array of objects - parsed string property chain
   * @param [output=[]] result acc
   */
  var filterRootsByRegexpChain = function filterRootsByRegexpChain(base, chain) {
    var output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var tempProp = chain[0];

    if (chain.length === 1) {
      for (var key in base) {
        if (tempProp instanceof RegExp) {
          if (tempProp.test(key)) {
            var _Object$getOwnPropert;

            output.push({
              base: base,
              prop: key,
              value: (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(base, key)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.value
            });
          }
        } else if (tempProp === key) {
          var _Object$getOwnPropert2;

          output.push({
            base: base,
            prop: tempProp,
            value: (_Object$getOwnPropert2 = Object.getOwnPropertyDescriptor(base, key)) === null || _Object$getOwnPropert2 === void 0 ? void 0 : _Object$getOwnPropert2.value
          });
        }
      }

      return output;
    } // if there is a regexp prop in input chain
    // e.g. 'unit./^ad.+/.src' for 'unit.ad-1gf2.src unit.ad-fgd34.src'),
    // every base keys should be tested by regexp and it can be more that one results


    if (tempProp instanceof RegExp) {
      var nextProp = chain.slice(1);
      var baseKeys = [];

      for (var _key in base) {
        if (tempProp.test(_key)) {
          baseKeys.push(_key);
        }
      }

      baseKeys.forEach(function (key) {
        var _Object$getOwnPropert3;

        var item = (_Object$getOwnPropert3 = Object.getOwnPropertyDescriptor(base, key)) === null || _Object$getOwnPropert3 === void 0 ? void 0 : _Object$getOwnPropert3.value;
        filterRootsByRegexpChain(item, nextProp, output);
      });
    }

    if (base && typeof tempProp === 'string') {
      var _Object$getOwnPropert4;

      var nextBase = (_Object$getOwnPropert4 = Object.getOwnPropertyDescriptor(base, tempProp)) === null || _Object$getOwnPropert4 === void 0 ? void 0 : _Object$getOwnPropert4.value;
      chain = chain.slice(1);

      if (nextBase !== undefined) {
        filterRootsByRegexpChain(nextBase, chain, output);
      }
    }

    return output;
  };
  /**
   * Checks whether the domElement is matched by :matches-property() arg
   * @param argsData
   */


  var isPropertyMatched = function isPropertyMatched(argsData) {
    var pseudoName = argsData.pseudoName,
        pseudoArg = argsData.pseudoArg,
        domElement = argsData.domElement;

    var _getRawMatchingData2 = getRawMatchingData(pseudoName, pseudoArg),
        rawPropertyName = _getRawMatchingData2.rawName,
        rawPropertyValue = _getRawMatchingData2.rawValue; // chained property name can not include '/' or '.'
    // so regex prop names with such escaped characters are invalid


    if (rawPropertyName.includes('\\/') || rawPropertyName.includes('\\.')) {
      throw new Error("Invalid :".concat(pseudoName, " name pattern: ").concat(rawPropertyName));
    }

    var propChainMatches;

    try {
      propChainMatches = parseRawPropChain(rawPropertyName);
    } catch (e) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      logger.error(e);
      throw new SyntaxError(e.message);
    }

    var ownerObjArr = filterRootsByRegexpChain(domElement, propChainMatches);

    if (ownerObjArr.length === 0) {
      return false;
    }

    var isMatched = true;

    if (rawPropertyValue) {
      var propValueMatch;

      try {
        propValueMatch = getValidMatcherArg(rawPropertyValue);
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        logger.error(e);
        throw new SyntaxError(e.message);
      }

      if (propValueMatch) {
        for (var i = 0; i < ownerObjArr.length; i += 1) {
          var realValue = ownerObjArr[i].value;

          if (propValueMatch instanceof RegExp) {
            isMatched = propValueMatch.test(convertTypeIntoString(realValue));
          } else {
            // handle 'null' and 'undefined' property values set as string
            if (realValue === 'null' || realValue === 'undefined') {
              isMatched = propValueMatch === realValue;
              break;
            }

            isMatched = convertTypeFromString(propValueMatch) === realValue;
          }

          if (isMatched) {
            break;
          }
        }
      }
    }

    return isMatched;
  };
  /**
   * Checks whether the textContent is matched by :contains arg
   * @param argsData
   */

  var isTextMatched = function isTextMatched(argsData) {
    var pseudoName = argsData.pseudoName,
        pseudoArg = argsData.pseudoArg,
        domElement = argsData.domElement;
    var textContent = getNodeTextContent(domElement);
    var isTextContentMatched;
    /**
     * TODO: consider adding helper for parsing pseudoArg (string or regexp) later,
     * seems to be similar for few extended pseudo-classes
     */

    var pseudoArgToMatch = pseudoArg;

    if (pseudoArgToMatch.startsWith(SLASH) && REGEXP_WITH_FLAGS_REGEXP.test(pseudoArgToMatch)) {
      // regexp arg
      var flagsIndex = pseudoArgToMatch.lastIndexOf('/');
      var flagsStr = pseudoArgToMatch.substring(flagsIndex + 1);
      pseudoArgToMatch = pseudoArgToMatch.substring(0, flagsIndex + 1).slice(1, -1).replace(/\\([\\"])/g, '$1');
      var regex;

      try {
        regex = new RegExp(pseudoArgToMatch, flagsStr);
      } catch (e) {
        throw new Error("Invalid argument of :".concat(pseudoName, "() pseudo-class: ").concat(pseudoArg));
      }

      isTextContentMatched = regex.test(textContent);
    } else {
      // none-regexp arg
      pseudoArgToMatch = pseudoArgToMatch.replace(/\\([\\()[\]"])/g, '$1');
      isTextContentMatched = textContent.includes(pseudoArgToMatch);
    }

    return isTextContentMatched;
  };

  /**
   * Validates number arg for :nth-ancestor and :upward pseudo-classes
   * @param rawArg raw arg of pseudo-class
   * @param pseudoName pseudo-class name
   */
  var getValidNumberAncestorArg = function getValidNumberAncestorArg(rawArg, pseudoName) {
    var deep = Number(rawArg);

    if (Number.isNaN(deep) || deep < 1 || deep >= 256) {
      throw new Error("Invalid argument of :".concat(pseudoName, " pseudo-class: '").concat(rawArg, "'"));
    }

    return deep;
  };
  /**
   * Returns nth ancestor by 'deep' number arg OR undefined if ancestor range limit exceeded
   * @param domElement
   * @param deep
   * @param pseudoName
   */

  var getNthAncestor = function getNthAncestor(domElement, deep, pseudoName) {
    var ancestor = null;
    var i = 0;

    while (i < deep) {
      ancestor = domElement.parentElement;

      if (!ancestor) {
        throw new Error("Argument of :".concat(pseudoName, "() pseudo-class is too big \u2014 '").concat(deep, "', out of DOM elements root.")); // eslint-disable-line max-len
      }

      domElement = ancestor;
      i += 1;
    }

    return ancestor;
  };
  /**
   * Validates standard CSS selector
   * @param selector
   */

  var validateStandardSelector = function validateStandardSelector(selector) {
    var isValid;

    try {
      document.querySelectorAll(selector);
      isValid = true;
    } catch (e) {
      isValid = false;
    }

    return isValid;
  };

  /**
   * Wrapper to run matcher `callback` with `args`
   * and throw error with `errorMessage` if `callback` run fails
   * @param callback
   * @param argsData
   * @param errorMessage
   */
  var matcherWrapper = function matcherWrapper(callback, argsData, errorMessage) {
    var isMatched;

    try {
      isMatched = callback(argsData);
    } catch (e) {
      logger.error(e);
      throw new Error(errorMessage);
    }

    return isMatched;
  };
  /**
   * Checks whether the domElement is matched by absolute extended pseudo-class argument
   * @param domElement
   * @param pseudoName
   * @param pseudoArg
   */


  var isMatchedByAbsolutePseudo = function isMatchedByAbsolutePseudo(domElement, pseudoName, pseudoArg) {
    var argsData;
    var errorMessage;
    var callback; // no standard pseudo-element is needed for :matched-css

    var regularPseudoElement = '';

    switch (pseudoName) {
      case CONTAINS_PSEUDO:
      case HAS_TEXT_PSEUDO:
      case ABP_CONTAINS_PSEUDO:
        callback = isTextMatched;
        argsData = {
          pseudoName: pseudoName,
          pseudoArg: pseudoArg,
          domElement: domElement
        };
        errorMessage = "Error while matching element text content by arg '".concat(pseudoArg, "'.");
        break;

      case MATCHES_CSS_PSEUDO:
      case MATCHES_CSS_AFTER_PSEUDO:
      case MATCHES_CSS_BEFORE_PSEUDO:
        if (pseudoName === MATCHES_CSS_BEFORE_PSEUDO) {
          regularPseudoElement = "".concat(COLON).concat(REGULAR_PSEUDO_ELEMENTS.BEFORE);
        } else if (pseudoName === MATCHES_CSS_AFTER_PSEUDO) {
          regularPseudoElement = "".concat(COLON).concat(REGULAR_PSEUDO_ELEMENTS.AFTER);
        }

        callback = isStyleMatched;
        argsData = {
          pseudoName: pseudoName,
          pseudoArg: pseudoArg,
          domElement: domElement,
          regularPseudoElement: regularPseudoElement
        };
        errorMessage = "Error while matching element style by arg '".concat(pseudoArg, "'.");
        break;

      case MATCHES_ATTR_PSEUDO_CLASS_MARKER:
        callback = isAttributeMatched;
        argsData = {
          domElement: domElement,
          pseudoName: pseudoName,
          pseudoArg: pseudoArg
        };
        errorMessage = "Error while matching element attributes by arg '".concat(pseudoArg, "'.");
        break;

      case MATCHES_PROPERTY_PSEUDO_CLASS_MARKER:
        callback = isPropertyMatched;
        argsData = {
          domElement: domElement,
          pseudoName: pseudoName,
          pseudoArg: pseudoArg
        };
        errorMessage = "Error while matching element properties by arg '".concat(pseudoArg, "'.");
        break;

      default:
        throw new Error("Unknown absolute pseudo-class :".concat(pseudoName, "()"));
    }

    return matcherWrapper(callback, argsData, errorMessage);
  };
  var findByAbsolutePseudoPseudo = {
    /**
     * Gets list of nth ancestors relative to every dom node from domElements list
     * @param domElements dom nodes
     * @param rawPseudoArg number arg of :nth-ancestor or :upward pseudo-class
     * @param pseudoName pseudo-class name
     */
    nthAncestor: function nthAncestor(domElements, rawPseudoArg, pseudoName) {
      var deep = getValidNumberAncestorArg(rawPseudoArg, pseudoName);
      var ancestors = domElements.map(function (domElement) {
        var ancestor = null;

        try {
          ancestor = getNthAncestor(domElement, deep, pseudoName);
        } catch (e) {
          logger.error(e);
        }

        return ancestor;
      }).filter(isHtmlElement);
      return ancestors;
    },

    /**
     * Gets list of elements by xpath expression, evaluated on every dom node from domElements list
     * @param domElements dom nodes
     * @param rawPseudoArg arg of :xpath pseudo-class
     */
    xpath: function xpath(domElements, rawPseudoArg) {
      var foundElements = domElements.map(function (domElement) {
        var result = [];
        var xpathResult;

        try {
          xpathResult = document.evaluate(rawPseudoArg, domElement, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        } catch (e) {
          logger.error(e);
          throw new Error("Invalid argument of :xpath pseudo-class: '".concat(rawPseudoArg, "'"));
        }

        var node = xpathResult.iterateNext();

        while (node) {
          if (isHtmlElement(node)) {
            result.push(node);
          }

          node = xpathResult.iterateNext();
        }

        return result;
      });
      return flatten(foundElements);
    },

    /**
     * Gets list of closest ancestors relative to every dom node from domElements list
     * @param domElements dom nodes
     * @param rawPseudoArg standard selector arg of :upward pseudo-class
     */
    upward: function upward(domElements, rawPseudoArg) {
      if (!validateStandardSelector(rawPseudoArg)) {
        throw new Error("Invalid argument of :upward pseudo-class: '".concat(rawPseudoArg, "'"));
      }

      var closestAncestors = domElements.map(function (domElement) {
        // closest to parent element should be found
        // otherwise `.base:upward(.base)` will return itself too, not only ancestor
        var parent = domElement.parentElement;

        if (!parent) {
          return null;
        }
        /**
         * TODO: decide the way :upward should work
         *
         * previously it was done with node.closest(selector)
         * that's why argument of :upward(selector) should be standard selector
         * so I assume cases where :not() is part of arg should consider :not() as standard pseudo-class
         */


        return parent.closest(rawPseudoArg);
      }).filter(isHtmlElement);
      return closestAncestors;
    }
  };

  /**
   * Additional calculated selector part which is needed to :has(), :if-not(), :is() and :not() pseudo-classes.
   *
   * Native Document.querySelectorAll() does not select exact descendant elements
   * but match all page elements satisfying the selector,
   * so extra specification is needed for proper descendants selection
   * e.g. 'div:has(> img)'
   *
   * Its calculation depends on extended selector.
   */

  /**
   * Checks whether the element has all relative elements specified by pseudo-class arg
   * Used for :has() and :if-not()
   * @param argsData
   */
  var hasRelativesBySelectorList = function hasRelativesBySelectorList(argsData) {
    var element = argsData.element,
        relativeSelectorList = argsData.relativeSelectorList,
        pseudoName = argsData.pseudoName;
    return relativeSelectorList.children // Array.every() is used here as each Selector node from SelectorList should exist on page
    .every(function (selector) {
      var _relativeRegularSelec, _relativeRegularSelec2;

      // selectorList.children always starts with regular selector as any selector generally
      var _selector$children = _slicedToArray(selector.children, 1),
          relativeRegularSelector = _selector$children[0];

      if (!relativeRegularSelector) {
        throw new Error("RegularSelector is missing for :".concat(pseudoName, " pseudo-class."));
      }

      var specificity = '';
      var rootElement = null;

      if ((_relativeRegularSelec = relativeRegularSelector.value) !== null && _relativeRegularSelec !== void 0 && _relativeRegularSelec.startsWith(NEXT_SIBLING_COMBINATOR) || (_relativeRegularSelec2 = relativeRegularSelector.value) !== null && _relativeRegularSelec2 !== void 0 && _relativeRegularSelec2.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
        /**
         * For matching the element by "element:has(+ next-sibling)" and "element:has(~ sibling)"
         * we check whether the element's parentElement has specific direct child combination
         * e.g. 'h1:has(+ .share)' -> `h1Node.parentElement.querySelectorAll(':scope > h1 + .share')`
         * https://www.w3.org/TR/selectors-4/#relational
         */
        rootElement = element.parentElement;
        var elementSelectorText = element.tagName.toLowerCase();
        specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(CHILD_COMBINATOR).concat(elementSelectorText);
      } else {
        /**
         * TODO: figure out something with :scope usage as IE does not support it
         * https://developer.mozilla.org/en-US/docs/Web/CSS/:scope#browser_compatibility
         */

        /**
         * :scope specification is needed for proper descendants selection
         * as native element.querySelectorAll() does not select exact element descendants
         * e.g. 'a:has(> img)' -> `aNode.querySelectorAll(':scope > img')`
         * OR '.block(div > span)' -> `blockClassNode.querySelectorAll(':scope div > span')`
         */
        specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(DESCENDANT_COMBINATOR);
        rootElement = element;
      }

      if (!rootElement) {
        throw new Error("Selection by :".concat(pseudoName, " pseudo-class is not possible."));
      }

      var relativeElements;

      try {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        relativeElements = getElementsForSelectorNode(selector, rootElement, specificity);
      } catch (e) {
        logger.error(e); // fail for invalid selector

        throw new Error("Invalid selector for :".concat(pseudoName, " pseudo-class: '").concat(relativeRegularSelector.value, "'"));
      }

      return relativeElements.length > 0;
    });
  };
  /**
   * Checks whether the element is an any element specified by pseudo-class arg.
   * Used for :is() and :not()
   * @param argsData
   */

  var isAnyElementBySelectorList = function isAnyElementBySelectorList(argsData) {
    var element = argsData.element,
        relativeSelectorList = argsData.relativeSelectorList,
        pseudoName = argsData.pseudoName,
        errorOnInvalidSelector = argsData.errorOnInvalidSelector;
    return relativeSelectorList.children // Array.some() is used here as any selector from selector list should exist on page
    .some(function (selector) {
      // selectorList.children always starts with regular selector
      var _selector$children2 = _slicedToArray(selector.children, 1),
          relativeRegularSelector = _selector$children2[0];

      if (!relativeRegularSelector) {
        throw new Error("RegularSelector is missing for :".concat(pseudoName, " pseudo-class."));
      }
      /**
       * For checking the element by 'div:is(.banner)' and 'div:not([data="content"])
       * we check whether the element's parentElement has any specific direct child
       */


      var rootElement = element.parentElement;

      if (!rootElement) {
        throw new Error("Selection by :".concat(pseudoName, " pseudo-class is not possible."));
      }
      /**
       * So we calculate the element "description" by it's tagname and attributes for targeting
       * and use it to specify the selection
       * e.g. 'div:is(.banner)' -> `divNode.parentElement.querySelectorAll(':scope > div[class="banner"]')`
       */


      var elementSelectorText = getElementSelectorDesc(element);
      var specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(CHILD_COMBINATOR).concat(elementSelectorText);
      var anyElements;

      try {
        anyElements = getElementsForSelectorNode(selector, rootElement, specificity);
      } catch (e) {
        if (errorOnInvalidSelector) {
          // fail on invalid selectors for :not()
          logger.error(e);
          throw new Error("Invalid selector for :".concat(pseudoName, " pseudo-class: '").concat(relativeRegularSelector.value, "'")); // eslint-disable-line max-len
        } else {
          // do not fail on invalid selectors for :is()
          return false;
        }
      }

      return anyElements.length > 0;
    });
  };

  /**
   * Selects dom elements by value of RegularSelector
   * @param regularSelectorNode RegularSelector node
   * @param root root dom element
   * @param specificity
   */

  var getByRegularSelector = function getByRegularSelector(regularSelectorNode, root, specificity) {
    if (!regularSelectorNode.value) {
      throw new Error('RegularSelector value should be specified');
    }

    var selectorText = specificity ? "".concat(specificity).concat(regularSelectorNode.value) : regularSelectorNode.value;
    var selectedElements = [];

    try {
      selectedElements = Array.from(root.querySelectorAll(selectorText));
    } catch (e) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      throw new Error("Error: unable to select by '".concat(selectorText, "' \u2014 ").concat(e.message));
    }

    return selectedElements;
  };
  /**
   * Returns list of dom elements filtered or selected by ExtendedSelector node
   * @param domElements array of dom elements
   * @param extendedSelectorNode ExtendedSelector node
   * @returns array of dom elements
   */

  var getByExtendedSelector = function getByExtendedSelector(domElements, extendedSelectorNode) {
    var foundElements = [];
    var pseudoName = extendedSelectorNode.children[0].name;

    if (!pseudoName) {
      // extended pseudo-classes should have a name
      throw new Error('Extended pseudo-class should have a name');
    }

    if (ABSOLUTE_PSEUDO_CLASSES.includes(pseudoName)) {
      var absolutePseudoArg = extendedSelectorNode.children[0].value;

      if (!absolutePseudoArg) {
        // absolute extended pseudo-classes should have an argument
        throw new Error("Missing arg for :".concat(pseudoName, " pseudo-class"));
      }

      if (pseudoName === NTH_ANCESTOR_PSEUDO_CLASS_MARKER) {
        // :nth-ancestor()
        foundElements = findByAbsolutePseudoPseudo.nthAncestor(domElements, absolutePseudoArg, pseudoName);
      } else if (pseudoName === XPATH_PSEUDO_CLASS_MARKER) {
        // :xpath()
        try {
          document.createExpression(absolutePseudoArg, null);
        } catch (e) {
          throw new Error("Invalid argument of :".concat(pseudoName, " pseudo-class: '").concat(absolutePseudoArg, "'"));
        }

        foundElements = findByAbsolutePseudoPseudo.xpath(domElements, absolutePseudoArg);
      } else if (pseudoName === UPWARD_PSEUDO_CLASS_MARKER) {
        // :upward()
        if (Number.isNaN(Number(absolutePseudoArg))) {
          // so arg is selector, not a number
          foundElements = findByAbsolutePseudoPseudo.upward(domElements, absolutePseudoArg);
        } else {
          foundElements = findByAbsolutePseudoPseudo.nthAncestor(domElements, absolutePseudoArg, pseudoName);
        }
      } else {
        // all other absolute extended pseudo-classes
        // e.g. contains, matches-attr, etc.
        foundElements = domElements.filter(function (element) {
          return isMatchedByAbsolutePseudo(element, pseudoName, absolutePseudoArg);
        });
      }
    } else if (RELATIVE_PSEUDO_CLASSES.includes(pseudoName)) {
      var relativeSelectorNodes = extendedSelectorNode.children[0].children;

      if (relativeSelectorNodes.length === 0) {
        // extended relative pseudo-classes should have an argument as well
        throw new Error("Missing arg for :".concat(pseudoName, " pseudo-class"));
      }

      var _relativeSelectorNode = _slicedToArray(relativeSelectorNodes, 1),
          relativeSelectorList = _relativeSelectorNode[0]; // needed for :not()


      var errorOnInvalidSelector = false;
      var relativePredicate;

      switch (pseudoName) {
        case HAS_PSEUDO_CLASS_MARKER:
        case IF_PSEUDO_CLASS_MARKER:
        case ABP_HAS_PSEUDO_CLASS_MARKER:
          relativePredicate = function relativePredicate(element) {
            return hasRelativesBySelectorList({
              element: element,
              relativeSelectorList: relativeSelectorList,
              pseudoName: pseudoName
            });
          };

          break;

        case IF_NOT_PSEUDO_CLASS_MARKER:
          relativePredicate = function relativePredicate(element) {
            return !hasRelativesBySelectorList({
              element: element,
              relativeSelectorList: relativeSelectorList,
              pseudoName: pseudoName
            });
          };

          break;

        case IS_PSEUDO_CLASS_MARKER:
          relativePredicate = function relativePredicate(element) {
            return isAnyElementBySelectorList({
              element: element,
              relativeSelectorList: relativeSelectorList,
              pseudoName: pseudoName
            });
          };

          break;

        case NOT_PSEUDO_CLASS_MARKER:
          errorOnInvalidSelector = true;

          relativePredicate = function relativePredicate(element) {
            return !isAnyElementBySelectorList({
              element: element,
              relativeSelectorList: relativeSelectorList,
              pseudoName: pseudoName,
              errorOnInvalidSelector: errorOnInvalidSelector
            });
          };

          break;

        default:
          throw new Error("Unknown relative pseudo-class :".concat(pseudoName, "()"));
      }

      foundElements = domElements.filter(relativePredicate);
    } else {
      // extra check is parser missed something
      throw new Error("Unknown extended pseudo-class: ':".concat(pseudoName, "'"));
    }

    return foundElements;
  };
  /**
   * Returns list of dom elements which is selected by RegularSelector value
   * @param domElements array of dom elements
   * @param regularSelectorNode RegularSelector node
   * @returns array of dom elements
   */

  var getByFollowingRegularSelector = function getByFollowingRegularSelector(domElements, regularSelectorNode) {
    // array of arrays because of Array.map() later
    var foundElements = [];
    var value = regularSelectorNode.value;

    if (!value) {
      throw new Error('RegularSelector should have a value.');
    }

    if (value.startsWith(CHILD_COMBINATOR)) {
      // e.g. div:has(> img) > .banner
      foundElements = domElements.map(function (root) {
        var specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE);
        return getByRegularSelector(regularSelectorNode, root, specificity);
      });
    } else if (value.startsWith(NEXT_SIBLING_COMBINATOR) || value.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
      // e.g. div:has(> img) + .banner
      // or   div:has(> img) ~ .banner
      foundElements = domElements.map(function (element) {
        var rootElement = element.parentElement;

        if (!rootElement) {
          throw new Error("Selection by '".concat(value, "' part of selector is not possible."));
        }

        var elementSelectorText = getElementSelectorDesc(element);
        var specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(CHILD_COMBINATOR).concat(elementSelectorText);
        var selected = getByRegularSelector(regularSelectorNode, rootElement, specificity);
        return selected;
      });
    } else {
      // space-separated regular selector after extended one
      // e.g. div:has(> img) .banner
      foundElements = domElements.map(function (root) {
        var specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(DESCENDANT_COMBINATOR);
        return getByRegularSelector(regularSelectorNode, root, specificity);
      });
    } // foundElements should be flattened
    // as getByRegularSelector() returns elements array, and Array.map() collects them to array


    return flatten(foundElements);
  };
  /**
   * Gets elements nodes for Selector node.
   * As far as any selector always starts with regular part,
   * it selects by RegularSelector first and checks found elements later.
   *
   * Relative pseudo-classes has it's own subtree so getElementsForSelectorNode is called recursively.
   *
   * 'specificity' is needed for :has(), :is() and :not() pseudo-classes.
   * e.g. ':scope' specification is needed for proper descendants selection for 'div:has(> img)'
   * as native querySelectorAll() does not select exact element descendants even if it is called on 'div'.
   * so we check `divNode.querySelectorAll(':scope > img').length > 0`
   *
   * @param selectorNode Selector node
   * @param root root dom element
   * @param specificity needed element specification
   */

  var getElementsForSelectorNode = function getElementsForSelectorNode(selectorNode, root, specificity) {
    var selectedElements = [];
    var i = 0;

    while (i < selectorNode.children.length) {
      var selectorNodeChild = selectorNode.children[i];

      if (i === 0) {
        // any selector always starts with regular selector
        selectedElements = getByRegularSelector(selectorNodeChild, root, specificity);
      } else if (selectorNodeChild.type === NodeType.ExtendedSelector) {
        // filter previously selected elements by next selector nodes
        selectedElements = getByExtendedSelector(selectedElements, selectorNodeChild);
      } else if (selectorNodeChild.type === NodeType.RegularSelector) {
        selectedElements = getByFollowingRegularSelector(selectedElements, selectorNodeChild);
      }

      i += 1;
    }

    return selectedElements;
  };

  /**
   * Selects elements by ast
   * @param ast ast of parsed selector
   * @param doc document
   */

  var selectElementsByAst = function selectElementsByAst(ast) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var selectedElements = []; // ast root is SelectorList node;
    // it has Selector nodes as children which should be processed separately

    ast.children.forEach(function (selectorNode) {
      selectedElements.push.apply(selectedElements, _toConsumableArray(getElementsForSelectorNode(selectorNode, doc)));
    }); // selectedElements should be flattened as it is array of arrays with elements

    var uniqueElements = _toConsumableArray(new Set(flatten(selectedElements)));

    return uniqueElements;
  };
  /**
   * Class of ExtCssDocument is needed for caching.
   * For making cache related to each new instance of class, not global
   */

  var ExtCssDocument = /*#__PURE__*/function () {
    /**
     * Cache with selectors and their AST parsing results
     */
    function ExtCssDocument() {
      _classCallCheck(this, ExtCssDocument);

      this.astCache = new Map();
    }
    /**
     * Saves selector and it's ast to cache
     * @param selector
     * @param ast
     */


    _createClass(ExtCssDocument, [{
      key: "saveAstToCache",
      value: function saveAstToCache(selector, ast) {
        this.astCache.set(selector, ast);
      }
      /**
       * Gets ast from cache for given selector
       * @param selector
       */

    }, {
      key: "getAstFromCache",
      value: function getAstFromCache(selector) {
        var cachedAst = this.astCache.get(selector) || null;
        return cachedAst;
      }
      /**
       * Gets selector ast:
       * - if cached ast exists — returns it
       * - if no cached ast — saves newly parsed ast to cache and returns it
       * @param selector
       */

    }, {
      key: "getSelectorAst",
      value: function getSelectorAst(selector) {
        var ast = this.getAstFromCache(selector);

        if (!ast) {
          ast = parse$1(selector);
        }

        this.saveAstToCache(selector, ast);
        return ast;
      }
      /**
       * Selects elements by selector
       * @param selector
       */

    }, {
      key: "querySelectorAll",
      value: function querySelectorAll(selector) {
        var ast = this.getSelectorAst(selector);
        return selectElementsByAst(ast);
      }
    }]);

    return ExtCssDocument;
  }();

  /**
   * Checks whether passed `arg` is number type
   * @param arg
   */
  var isNumber = function isNumber(arg) {
    return typeof arg === 'number';
  };

  var isSupported = typeof window.requestAnimationFrame !== 'undefined';
  var rAF = isSupported ? requestAnimationFrame : window.setTimeout;
  var perf = isSupported ? performance : Date;
  var DEFAULT_THROTTLE_DELAY_MS = 150;

  /**
   * A helper class to throttle function calls with setTimeout and requestAnimationFrame
   */
  var AsyncWrapper = /*#__PURE__*/function () {
    // number, the provided callback should be executed twice in this time frame
    function AsyncWrapper(context, callback, throttle) {
      _classCallCheck(this, AsyncWrapper);

      this.context = context;
      this.callback = callback;
      this.throttle = throttle || DEFAULT_THROTTLE_DELAY_MS;
      this.wrappedCb = this.wrappedCallback.bind(this);
    }

    _createClass(AsyncWrapper, [{
      key: "wrappedCallback",
      value: function wrappedCallback(timestamp) {
        this.lastRun = isNumber(timestamp) ? timestamp : perf.now();
        delete this.rAFid;
        delete this.timerId;

        if (this.callback) {
          this.callback(this.context);
        }
      }
      /**
       * Indicates whether there is a scheduled callback.
       */

    }, {
      key: "hasPendingCallback",
      value: function hasPendingCallback() {
        return isNumber(this.rAFid) || isNumber(this.timerId);
      }
      /**
       * Schedules a function call before the next animation frame.
       */

    }, {
      key: "run",
      value: function run() {
        if (this.hasPendingCallback()) {
          // there is a pending execution scheduled
          return;
        }

        if (typeof this.lastRun !== 'undefined') {
          var elapsed = perf.now() - this.lastRun;

          if (elapsed < this.throttle) {
            this.timerId = window.setTimeout(this.wrappedCb, this.throttle - elapsed);
            return;
          }
        }

        this.rAFid = rAF(this.wrappedCb);
      }
    }], [{
      key: "now",
      value: function now() {
        return perf.now();
      }
    }]);

    return AsyncWrapper;
  }();

  var LAST_EVENT_TIMEOUT_MS = 10;
  var IGNORED_EVENTS = ['mouseover', 'mouseleave', 'mouseenter', 'mouseout'];
  var SUPPORTED_EVENTS = [// keyboard events
  'keydown', 'keypress', 'keyup', // mouse events
  'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel']; // 'wheel' event makes scrolling in Safari twitchy
  // https://github.com/AdguardTeam/ExtendedCss/issues/120

  var SAFARI_PROBLEMATIC_EVENTS = ['wheel'];
  /**
   * We use EventTracker to track the event that is likely to cause the mutation.
   * The problem is that we cannot use `window.event` directly from the mutation observer call
   * as we're not in the event handler context anymore.
   */

  var EventTracker = /*#__PURE__*/function () {
    function EventTracker() {
      var _this = this;

      _classCallCheck(this, EventTracker);

      _defineProperty(this, "getLastEventType", function () {
        return _this.lastEventType;
      });

      _defineProperty(this, "getTimeSinceLastEvent", function () {
        if (!_this.lastEventTime) {
          return null;
        }

        return Date.now() - _this.lastEventTime;
      });

      this.trackedEvents = isSafariBrowser ? SUPPORTED_EVENTS.filter(function (event) {
        return !SAFARI_PROBLEMATIC_EVENTS.includes(event);
      }) : SUPPORTED_EVENTS;
      this.trackedEvents.forEach(function (eventName) {
        document.documentElement.addEventListener(eventName, _this.trackEvent, true);
      });
    }

    _createClass(EventTracker, [{
      key: "trackEvent",
      value: function trackEvent(event) {
        this.lastEvent = event;
        this.lastEventType = event.type;
        this.lastEventTime = Date.now();
      }
    }, {
      key: "isIgnoredEventType",
      value: function isIgnoredEventType() {
        var lastEventType = this.getLastEventType();
        var sinceLastEventTime = this.getTimeSinceLastEvent();
        return !!lastEventType && IGNORED_EVENTS.includes(lastEventType) && !!sinceLastEventTime && sinceLastEventTime < LAST_EVENT_TIMEOUT_MS;
      }
    }]);

    return EventTracker;
  }();

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct$1()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * A helper class for MutationObserver with extra property `styleProtectionCount`
   */
  var ExtMutationObserver = /*#__PURE__*/function (_MutationObserver) {
    _inherits(ExtMutationObserver, _MutationObserver);

    var _super = _createSuper(ExtMutationObserver);

    // extra property for keeping 'style fix counts'
    // extra property for easy checking whether the observer does observe
    // observeNode: (t: Node, o: MutationObserverInit) => void;
    // disconnectProtection:
    function ExtMutationObserver(protectionCallback) {
      var _this;

      _classCallCheck(this, ExtMutationObserver);

      _this = _super.call(this, function (mutations) {
        _this.styleProtectionCount += 1;
        protectionCallback(mutations, _assertThisInitialized(_this));
      });
      _this.styleProtectionCount = 0;
      _this.isActive = false;
      _this.observeNode = _this.observeNode;
      _this.disconnectProtection = _this.disconnectProtection;
      return _this;
    }
    /**
     * Observe target element and mark observer as active
     */


    _createClass(ExtMutationObserver, [{
      key: "observeNode",
      value: function observeNode(target, options) {
        this.isActive = true;
        this.observe(target, options);
      }
      /**
       * Disconnect Observer and mark as inactive
       */

    }, {
      key: "disconnectProtection",
      value: function disconnectProtection() {
        this.isActive = false;
        this.disconnect();
      }
    }]);

    return ExtMutationObserver;
  }( /*#__PURE__*/_wrapNativeSuper(MutationObserver));

  /**
   * A helper class for applied rule stats
   */
  var TimingStats = /*#__PURE__*/function () {
    function TimingStats() {
      _classCallCheck(this, TimingStats);

      this.array = [];
      this.length = 0;
      this.sum = 0;
      this.squaredSum = 0;
      this.stddev = 0;
    }
    /**
     * Observe target element and mark observer as active
     */


    _createClass(TimingStats, [{
      key: "push",
      value: function push(dataPoint) {
        this.array.push(dataPoint);
        this.length += 1;
        this.sum += dataPoint;
        this.squaredSum += dataPoint * dataPoint;
        this.mean = this.sum / this.length;
        this.stddev = Math.sqrt(this.squaredSum / this.length - Math.pow(this.mean, 2));
      }
    }]);

    return TimingStats;
  }();

  var APPLY_RULES_DELAY = 150;
  var isEventListenerSupported = typeof window.addEventListener !== 'undefined';

  var observeDocument = function observeDocument(context, callback) {
    // We are trying to limit the number of callback calls by not calling it on all kind of "hover" events.
    // The rationale behind this is that "hover" events often cause attributes modification,
    // but re-applying extCSS rules will be useless as these attribute changes are usually transient.
    var shouldIgnoreMutations = function shouldIgnoreMutations(mutations) {
      // ignore if all mutations are about attributes changes
      return mutations.every(function (m) {
        return m.type === 'attributes';
      });
    };

    if (natives.MutationObserver) {
      context.domMutationObserver = new natives.MutationObserver(function (mutations) {
        if (!mutations || mutations.length === 0) {
          return;
        }

        var eventTracker = new EventTracker();

        if (eventTracker.isIgnoredEventType() && shouldIgnoreMutations(mutations)) {
          return;
        }

        callback();
      });
      context.domMutationObserver.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id', 'class']
      });
    } else if (isEventListenerSupported) {
      document.addEventListener('DOMNodeInserted', callback, false);
      document.addEventListener('DOMNodeRemoved', callback, false);
      document.addEventListener('DOMAttrModified', callback, false);
    }
  };

  var disconnectDocument = function disconnectDocument(context, callback) {
    if (context.domMutationObserver) {
      context.domMutationObserver.disconnect();
    } else if (isEventListenerSupported) {
      document.removeEventListener('DOMNodeInserted', callback, false);
      document.removeEventListener('DOMNodeRemoved', callback, false);
      document.removeEventListener('DOMAttrModified', callback, false);
    }
  };
  /**
   * Sets style to the specified DOM node
   * @param node element
   * @param style style
   */


  var setStyleToElement = function setStyleToElement(node, style) {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    Object.keys(style).forEach(function (prop) {
      // Apply this style only to existing properties
      // We can't use hasOwnProperty here (does not work in FF)
      if (typeof node.style.getPropertyValue(prop) !== 'undefined') {
        var value = style[prop]; // First we should remove !important attribute (or it won't be applied')

        value = removeSuffix(value.trim(), '!important').trim();
        node.style.setProperty(prop, value, 'important');
      }
    });
  };

  var MAX_STYLE_PROTECTION_COUNT = 50;
  var protectionObserverOption = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['style']
  };
  /**
   * Creates MutationObserver protection callback
   * @param styles
   */

  var createProtectionCallback = function createProtectionCallback(styles) {
    var protectionCallback = function protectionCallback(mutations, observer) {
      if (!mutations.length) {
        return;
      }

      var target = mutations[0].target;
      observer.disconnect();
      styles.forEach(function (style) {
        setStyleToElement(target, style);
      });

      if (observer.styleProtectionCount < MAX_STYLE_PROTECTION_COUNT) {
        observer.observe(target, protectionObserverOption);
      } else {
        logger.error('ExtendedCss: infinite loop protection for style');
      }
    };

    return protectionCallback;
  };
  /**
   * Sets up a MutationObserver which protects style attributes from changes
   * @param node DOM node
   * @param rules rule data objects
   * @returns Mutation observer used to protect attribute or null if there's nothing to protect
   */


  var protectStyleAttribute = function protectStyleAttribute(node, rules) {
    if (!natives.MutationObserver) {
      return null;
    }

    var styles = [];
    rules.forEach(function (ruleData) {
      var style = ruleData.style;

      if (!style) {
        throw new Error("No affectedElement style to apply for selector: '".concat(ruleData.selector, "'"));
      }

      styles.push(style);
    });
    var protectionObserver = new ExtMutationObserver(createProtectionCallback(styles));
    protectionObserver.observeNode(node, protectionObserverOption);
    return protectionObserver;
  };

  /**
   * Finds affectedElement object for the specified DOM node
   * @param affElements context.affectedElements
   * @param domNode DOM node
   * @returns found affectedElement or undefined
   */
  var findAffectedElement = function findAffectedElement(affElements, domNode) {
    return affElements.find(function (affEl) {
      return affEl.node === domNode;
    });
  };
  /**
   * Removes affectedElement.node from DOM
   * @param context
   * @param affectedElement
   */


  var removeElement = function removeElement(context, affectedElement) {
    var node = affectedElement.node;
    affectedElement.removed = true;
    var elementSelector = getElementSelectorPath(node); // check if the element has been already removed earlier

    var elementRemovalsCounter = context.removalsStatistic[elementSelector] || 0; // if removals attempts happened more than specified we do not try to remove node again

    if (elementRemovalsCounter > MAX_STYLE_PROTECTION_COUNT) {
      logger.error("ExtendedCss: infinite loop protection for selector: '".concat(elementSelector, "'"));
      return;
    }

    if (node.parentElement) {
      node.parentElement.removeChild(node);
      context.removalsStatistic[elementSelector] = elementRemovalsCounter + 1;
    }
  };
  /**
   * Api interface with required 'content' style property in rules
   */


  /**
   * Applies style to the specified DOM node
   * @param context
   * @param affectedElement Object containing DOM node and rule to be applied
   */
  var applyStyle = function applyStyle(context, affectedElement) {
    var _affectedElement$prot;

    if ((_affectedElement$prot = affectedElement.protectionObserver) !== null && _affectedElement$prot !== void 0 && _affectedElement$prot.isActive) {
      // style is already applied and protected by the observer
      return;
    }

    if (context.beforeStyleApplied) {
      affectedElement = context.beforeStyleApplied(affectedElement);

      if (!affectedElement) {
        return;
      }
    }

    var _affectedElement = affectedElement,
        node = _affectedElement.node;

    for (var i = 0; i < affectedElement.rules.length; i += 1) {
      var _affectedElement$rule = affectedElement.rules[i],
          selector = _affectedElement$rule.selector,
          style = _affectedElement$rule.style;

      if (!style) {
        throw new Error("No affectedElement style to apply for selector: '".concat(selector, "'"));
      }

      if (style[REMOVE_PSEUDO_PROPERTY_KEY] === PSEUDO_PROPERTY_POSITIVE_VALUE) {
        removeElement(context, affectedElement);
        return;
      }

      setStyleToElement(node, style);
    }
  };
  /**
   * Reverts style for the affected object
   */


  var revertStyle = function revertStyle(affElement) {
    var _affElement$protectio;

    if ((_affElement$protectio = affElement.protectionObserver) !== null && _affElement$protectio !== void 0 && _affElement$protectio.isActive) {
      affElement.protectionObserver.disconnectProtection();
    }

    affElement.node.style.cssText = affElement.originalStyle;
  };
  /**
   * Applies specified rule and returns list of elements affected
   * @param ruleData rule to apply
   * @returns list of elements affected by the rule
   */


  var applyRule = function applyRule(context, ruleData) {
    // debugging mode can be enabled in two ways:
    // 1. for separate rules - by `{ debug: true; }`
    // 2. for all rules simultaneously by:
    //   - `{ debug: global; }` in any rule
    //   - positive `debug` property in ExtCssConfiguration
    var isDebuggingMode = !!ruleData.debug || context.debug;
    var startTime;

    if (isDebuggingMode) {
      startTime = AsyncWrapper.now();
    }

    var ast = ruleData.ast;
    var nodes = selectElementsByAst(ast);
    nodes.forEach(function (node) {
      var affectedElement = findAffectedElement(context.affectedElements, node);

      if (affectedElement) {
        affectedElement.rules.push(ruleData);
        applyStyle(context, affectedElement);
      } else {
        // Applying style first time
        var originalStyle = node.style.cssText;
        affectedElement = {
          node: node,
          // affected DOM node
          rules: [ruleData],
          // rule to be applied
          originalStyle: originalStyle,
          // original node style
          protectionObserver: null // style attribute observer

        };
        applyStyle(context, affectedElement);
        context.affectedElements.push(affectedElement);
      }
    });

    if (isDebuggingMode && startTime) {
      var elapsed = AsyncWrapper.now() - startTime;

      if (!ruleData.timingStats) {
        ruleData.timingStats = new TimingStats();
      }

      ruleData.timingStats.push(elapsed);
    }

    return nodes;
  };

  /**
   * Prints timing information if debugging mode is enabled
   */
  var printTimingInfo = function printTimingInfo(context) {
    if (context.timingsPrinted) {
      return;
    }

    context.timingsPrinted = true;
    var timingsToLog = [];
    context.parsedRules.forEach(function (rule) {
      if (rule.timingStats) {
        var record = {
          selector: rule.selector,
          timings: rule.timingStats
        };
        timingsToLog.push(record);
      }
    });

    if (timingsToLog.length === 0) {
      return;
    } // add location.href to the message to distinguish frames


    logger.info('[ExtendedCss] Timings in milliseconds for %o:\n%o', window.location.href, timingsToLog);
  };

  var mainObserve = function mainObserve(context, mainCallback) {
    if (context.isDomObserved) {
      return;
    } // handle dynamically added elements


    context.isDomObserved = true;
    observeDocument(context, mainCallback);
  };

  var mainDisconnect = function mainDisconnect(context, mainCallback) {
    if (!context.isDomObserved) {
      return;
    }

    context.isDomObserved = false;
    disconnectDocument(context, mainCallback);
  };
  /**
   * Main Extended css class
   */


  var ExtendedCss = /*#__PURE__*/function () {
    function ExtendedCss(configuration) {
      _classCallCheck(this, ExtendedCss);

      if (!isBrowserSupported()) {
        throw new Error('Browser is not supported by ExtendedCss.');
      }

      if (!configuration) {
        throw new Error('ExtendedCss configuration should be provided.');
      }

      this.context = {
        beforeStyleApplied: configuration.beforeStyleApplied,
        debug: configuration.debug || false,
        affectedElements: [],
        isDomObserved: false,
        removalsStatistic: {},
        parsedRules: parse(configuration.styleSheet),
        mainCallback: function mainCallback() {}
      }; // true if any one rule in styleSheet has `debug: global`

      this.context.debug = this.context.parsedRules.some(function (ruleData) {
        return ruleData.debug === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE;
      });
      this.applyRulesScheduler = new AsyncWrapper(this.context, this.applyRules, APPLY_RULES_DELAY);
      this.mainCallback = this.applyRulesScheduler.run.bind(this.applyRulesScheduler);
      this.context.mainCallback = this.mainCallback;

      if (this.context.beforeStyleApplied && typeof this.context.beforeStyleApplied !== 'function') {
        throw new Error("Invalid configuration. Type of 'beforeStyleApplied' should be a function, received: '".concat(_typeof(this.context.beforeStyleApplied), "'")); // eslint-disable-line max-len
      }
    }
    /**
     * Applies filtering rules
     */


    _createClass(ExtendedCss, [{
      key: "applyRules",
      value: function applyRules(context) {
        var newSelectedElements = []; // some rules could make call - selector.querySelectorAll() temporarily to change node id attribute
        // this caused MutationObserver to call recursively
        // https://github.com/AdguardTeam/ExtendedCss/issues/81

        mainDisconnect(context, context.mainCallback);
        context.parsedRules.forEach(function (ruleData) {
          var nodes = applyRule(context, ruleData);
          Array.prototype.push.apply(newSelectedElements, nodes);
        }); // Now revert styles for elements which are no more affected

        var affLength = context.affectedElements.length; // do nothing if there is no elements to process

        while (affLength) {
          var affectedEl = context.affectedElements[affLength - 1];

          if (!newSelectedElements.includes(affectedEl.node)) {
            // Time to revert style
            revertStyle(affectedEl);
            context.affectedElements.splice(affLength - 1, 1);
          } else if (!affectedEl.removed) {
            var _affectedEl$protectio;

            // Add style protection observer
            // Protect "style" attribute from changes
            if (!((_affectedEl$protectio = affectedEl.protectionObserver) !== null && _affectedEl$protectio !== void 0 && _affectedEl$protectio.isActive)) {
              affectedEl.protectionObserver = protectStyleAttribute(affectedEl.node, affectedEl.rules);
            }
          }

          affLength -= 1;
        } // After styles are applied we can start observe again


        mainObserve(context, context.mainCallback);
        printTimingInfo(context);
      }
      /**
       * Applies stylesheet rules on page
       */

    }, {
      key: "apply",
      value: function apply() {
        var _this = this;

        this.applyRules(this.context);

        if (document.readyState !== 'complete') {
          document.addEventListener('DOMContentLoaded', function () {
            _this.applyRules(_this.context);
          }, false);
        }
      }
      /**
       * Disposes ExtendedCss and removes our styles from matched elements
       */

    }, {
      key: "dispose",
      value: function dispose() {
        mainDisconnect(this.context, this.context.mainCallback);
        this.context.affectedElements.forEach(function (el) {
          revertStyle(el);
        });
      }
      /**
       * Exposed for testing purposes only
       */

    }, {
      key: "_getAffectedElements",
      value: function _getAffectedElements() {
        return this.context.affectedElements;
      }
      /**
       * Returns a list of the document's elements that match the specified selector.
       * Uses ExtCssDocument.querySelectorAll()
       * @param selector selector text
       * @param [noTiming=true] if true -- do not print the timing to the console
       * @returns a list of elements that match the selector
       * @throws an error if selector is not valid
       */

    }], [{
      key: "query",
      value: function query(selector) {
        var noTiming = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (typeof selector !== 'string') {
          throw new Error('Selector should be defined as a string.');
        }

        var start = AsyncWrapper.now();

        try {
          var extCssDoc = new ExtCssDocument();
          return extCssDoc.querySelectorAll(selector);
        } finally {
          var end = AsyncWrapper.now();

          if (!noTiming) {
            logger.info("[ExtendedCss] Elapsed: ".concat(Math.round((end - start) * 1000), " \u03BCs."));
          }
        }
      }
      /**
       * Validates selector
       * @param selector selector text
       */

    }, {
      key: "validate",
      value: function validate(selector) {
        try {
          ExtendedCss.query(selector);
          return {
            ok: true,
            error: null
          };
        } catch (e) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          var error = "Error: selector \"".concat(selector, "\" is invalid \u2014 ").concat(e.message, ")");
          return {
            ok: false,
            error: error
          };
        }
      }
    }]);

    return ExtendedCss;
  }();

  exports.ExtendedCss = ExtendedCss;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
