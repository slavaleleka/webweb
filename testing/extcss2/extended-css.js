/*! extended-css - v2.0.0 - Tue Aug 16 2022
* https://github.com/AdguardTeam/ExtendedCss
* Copyright (c) 2022 AdGuard. Licensed GPL-3.0
*/
var BrowserstackTest = (function (exports) {
    'use strict';

    /**
     * Normalizes stylesheet before tokenization
     * @param input
     */
    const normalize$1 = input => {
      const normalized = input.trim(); // TODO:
      // https://www.w3.org/TR/css-syntax-3/#css-filter-code-points

      return normalized;
    };

    const LEFT_SQUARE_BRACKET = '[';
    const RIGHT_SQUARE_BRACKET = ']';
    const LEFT_PARENTHESIS = '(';
    const RIGHT_PARENTHESIS = ')';
    const LEFT_CURLY_BRACKET = '{';
    const RIGHT_CURLY_BRACKET = '}';
    const BRACKETS = {
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
    const SLASH = '/';
    const BACKSLASH = '\\';
    const SPACE = ' ';
    const COMMA = ',';
    const DOT = '.';
    const SEMICOLON = ';';
    const COLON = ':';
    const SINGLE_QUOTE = '\'';
    const DOUBLE_QUOTE = '"'; // do not consider hyphen `-` as separated mark
    // to avoid pseudo-class names splitting
    // e.g. 'matches-css' or 'if-not'

    const CARET = '^';
    const DOLLAR_SIGN = '$';
    const EQUAL_SIGN = '=';
    const TAB = '\t';
    const CARRIAGE_RETURN = '\r';
    const LINE_FEED = '\n';
    const FORM_FEED = '\f';
    const WHITE_SPACE_CHARACTERS = [SPACE, TAB, CARRIAGE_RETURN, LINE_FEED, FORM_FEED]; // for universal selector and attributes

    const ASTERISK = '*';
    const ID_MARKER = '#';
    const CLASS_MARKER = DOT;
    const DESCENDANT_COMBINATOR = SPACE;
    const CHILD_COMBINATOR = '>';
    const NEXT_SIBLING_COMBINATOR = '+';
    const SUBSEQUENT_SIBLING_COMBINATOR = '~';
    const COMBINATORS = [DESCENDANT_COMBINATOR, CHILD_COMBINATOR, NEXT_SIBLING_COMBINATOR, SUBSEQUENT_SIBLING_COMBINATOR];
    const SUPPORTED_SELECTOR_MARKS = [LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET, LEFT_PARENTHESIS, RIGHT_PARENTHESIS, LEFT_CURLY_BRACKET, RIGHT_CURLY_BRACKET, SLASH, BACKSLASH, SEMICOLON, COLON, COMMA, SINGLE_QUOTE, DOUBLE_QUOTE, CARET, DOLLAR_SIGN, ASTERISK, ID_MARKER, CLASS_MARKER, DESCENDANT_COMBINATOR, CHILD_COMBINATOR, NEXT_SIBLING_COMBINATOR, SUBSEQUENT_SIBLING_COMBINATOR, TAB, CARRIAGE_RETURN, LINE_FEED, FORM_FEED]; // absolute:

    const CONTAINS_PSEUDO_CLASS_MARKERS = ['contains', 'has-text', '-abp-contains'];
    const MATCHES_CSS_PSEUDO = 'matches-css';
    const MATCHES_CSS_BEFORE_PSEUDO = 'matches-css-before';
    const MATCHES_CSS_AFTER_PSEUDO = 'matches-css-after';
    const MATCHES_CSS_PSEUDO_CLASS_MARKERS = [MATCHES_CSS_PSEUDO, MATCHES_CSS_BEFORE_PSEUDO, MATCHES_CSS_AFTER_PSEUDO];
    const MATCHES_ATTR_PSEUDO_CLASS_MARKER = 'matches-attr';
    const MATCHES_PROPERTY_PSEUDO_CLASS_MARKER = 'matches-property';
    const XPATH_PSEUDO_CLASS_MARKER = 'xpath';
    const NTH_ANCESTOR_PSEUDO_CLASS_MARKER = 'nth-ancestor';
    /**
     * :upward() can get number or selector arg
     * and if the arg is selector it should be standard, not extended
     * so :upward pseudo-class is always absolute
     */

    const UPWARD_PSEUDO_CLASS_MARKER = 'upward';
    /**
     * :remove() pseudo-class is used for element actions, not for element selecting
     * and 'clear' selector should not contain it
     * so selector parser should consider it as invalid
     */

    const REMOVE_PSEUDO_CLASS_MARKER = 'remove'; // relative:

    const HAS_PSEUDO_CLASS_MARKERS = ['has', 'if', '-abp-has'];
    const IF_NOT_PSEUDO_CLASS_MARKER = 'if-not';
    const IS_PSEUDO_CLASS_MARKER = 'is';
    const NOT_PSEUDO_CLASS_MARKER = 'not';
    const ABSOLUTE_PSEUDO_CLASSES = [...CONTAINS_PSEUDO_CLASS_MARKERS, ...MATCHES_CSS_PSEUDO_CLASS_MARKERS, MATCHES_ATTR_PSEUDO_CLASS_MARKER, MATCHES_PROPERTY_PSEUDO_CLASS_MARKER, XPATH_PSEUDO_CLASS_MARKER, NTH_ANCESTOR_PSEUDO_CLASS_MARKER, UPWARD_PSEUDO_CLASS_MARKER];
    const RELATIVE_PSEUDO_CLASSES = [...HAS_PSEUDO_CLASS_MARKERS, IF_NOT_PSEUDO_CLASS_MARKER, IS_PSEUDO_CLASS_MARKER, NOT_PSEUDO_CLASS_MARKER];
    const SUPPORTED_PSEUDO_CLASSES = [...ABSOLUTE_PSEUDO_CLASSES, ...RELATIVE_PSEUDO_CLASSES];
    const REGEXP_WITH_FLAGS_REGEXP = /^\s*\/.*\/[gmisuy]*\s*$/;
    const REGEXP_ANY_SYMBOL = '.*';
    /**
     * ':scope' is used for extended pseudo-class :has(), if-not(), :is() and :not()
     *
     * ':where' is needed for limitation it's using inside :has() arg
     * https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [1]
     */

    const REGULAR_PSEUDO_CLASSES = {
      SCOPE: 'scope',
      WHERE: 'where'
    };
    /**
     * ':after' and ':before' are needed for :matches-css() pseudo-class
     * all other are needed for :has() limitation after regular pseudo-elements
     * https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [3]
     */

    const REGULAR_PSEUDO_ELEMENTS = {
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
    }; // limit applying of wildcard :is and :not pseudo-class only to html children
    // e.g. ':is(.page, .main) > .banner' or '*:not(span):not(p)'

    const IS_OR_NOT_PSEUDO_SELECTING_ROOT = "html ".concat(ASTERISK); // limit applying of :xpath pseudo-class with to 'any' element
    // https://github.com/AdguardTeam/ExtendedCss/issues/115

    const XPATH_PSEUDO_SELECTING_ROOT = 'body'; // regexp that matches backward compatible syntaxes

    const REGEXP_VALID_OLD_SYNTAX = /\[-(?:ext)-([a-z-_]+)=(["'])((?:(?=(\\?))\4.)*?)\2\]/g; // marker for checking invalid selector after old-syntax normalizing by selector converter

    const INVALID_OLD_SYNTAX_MARKER = '[-ext-';
    const DEBUG_PSEUDO_PROPERTY_KEY = 'debug';
    const REMOVE_PSEUDO_PROPERTY_KEY = REMOVE_PSEUDO_CLASS_MARKER;
    const PSEUDO_PROPERTY_POSITIVE_VALUE = 'true';
    const DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE = 'global';
    const REGEXP_DECLARATION_END = /[;}]/g;
    const REGEXP_DECLARATION_DIVIDER = /[;:}]/g;
    const REGEXP_NON_WHITESPACE = /\S/g;
    const STYLESHEET_ERROR_PREFIX = {
      NO_STYLE: 'No style declaration at stylesheet part',
      INVALID_STYLE: 'Invalid style declaration at stylesheet part',
      UNCLOSED_STYLE: 'Unclosed style declaration at stylesheet part',
      NO_PROPERTY: 'Missing style property in declaration at stylesheet part',
      NO_VALUE: 'Missing style value in declaration at stylesheet part',
      INVALID_REMOVE: 'Invalid :remove() pseudo-class in selector',
      NO_STYLE_OR_REMOVE: 'Invalid stylesheet - no style declared or :remove() pseudo-class used'
    };

    /**
     * Complex replacement function.
     * Undo quote escaping inside of an extended selector.
     *
     * @param match     Whole matched string
     * @param name      Group 1
     * @param quoteChar Group 2
     * @param rawValue  Group 3
     */

    const evaluateMatch = (match, name, quoteChar, rawValue) => {
      // Unescape quotes
      const re = new RegExp("([^\\\\]|^)\\\\".concat(quoteChar), 'g');
      const value = rawValue.replace(re, "$1".concat(quoteChar));
      return ":".concat(name, "(").concat(value, ")");
    }; // ':scope' pseudo may be at start of :has() argument
    // but ExtCssDocument.querySelectorAll() already use it for selecting exact element descendants


    const reScope = /\(:scope >/g;
    const SCOPE_REPLACER = '(>';
    /**
     * Handles old syntax and :scope inside :has
     * @param selector trimmed selector to normalize
     * @returns normalized selector
     */

    const normalize = selector => {
      const normalizedSelector = selector.replace(REGEXP_VALID_OLD_SYNTAX, evaluateMatch).replace(reScope, SCOPE_REPLACER); // validate old syntax after normalizing
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


    const convert = rawSelector => {
      const trimmedSelector = rawSelector.trim();
      return normalize(trimmedSelector);
    };

    let TokenType;

    (function (TokenType) {
      TokenType["Mark"] = "mark";
      TokenType["Word"] = "word";
    })(TokenType || (TokenType = {}));

    /**
     * Splits selector string into tokens
     * @param rawSelector raw css selector
     */
    const tokenize = rawSelector => {
      const selector = convert(rawSelector); // currently processed

      let symbol; // for words collecting while iterating

      let buffer = ''; // result collection

      const tokens = []; // iterate selector chars and collect tokens

      for (let i = 0; i < selector.length; i += 1) {
        symbol = selector[i];

        if (SUPPORTED_SELECTOR_MARKS.includes(symbol)) {
          tokens.push({
            type: TokenType.Mark,
            value: symbol
          });
          continue;
        }

        buffer += symbol;
        const nextSymbol = selector[i + 1]; // string end has been reached if nextSymbol is undefined

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

    let NodeType;
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

    class AnySelectorNode {
      constructor(type) {
        _defineProperty(this, "children", []);

        this.type = type;
      }

      addChild(child) {
        this.children.push(child);
      }

    }
    class RegularSelectorNode extends AnySelectorNode {
      constructor(value) {
        super(NodeType.RegularSelector);
        this.value = value;
      }

    }
    class RelativePseudoClassNode extends AnySelectorNode {
      constructor(name) {
        super(NodeType.RelativePseudoClass);
        this.name = name;
      }

    }
    class AbsolutePseudoClassNode extends AnySelectorNode {
      constructor(name) {
        super(NodeType.AbsolutePseudoClass);

        _defineProperty(this, "arg", '');

        this.name = name;
      }

    }
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
     *   : arg
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
     * Checks whether the passed token is supported extended pseudo-class
     * @param token
     */

    const isSupportedExtendedPseudo = token => SUPPORTED_PSEUDO_CLASSES.includes(token);
    /**
     * Checks whether next token is a continuation of regular selector being processed
     * @param nextTokenType
     * @param nextTokenValue
     */


    const doesRegularContinueAfterSpace = (nextTokenType, nextTokenValue) => {
      return COMBINATORS.includes(nextTokenValue) || nextTokenType === TokenType.Word // e.g. '#main *:has(> .ad)'
      || nextTokenValue === ASTERISK || nextTokenValue === ID_MARKER || nextTokenValue === CLASS_MARKER // e.g. 'div :where(.content)'
      || nextTokenValue === COLON // e.g. "div[class*=' ']"
      || nextTokenValue === SINGLE_QUOTE // e.g. 'div[class*=" "]'
      || nextTokenValue === DOUBLE_QUOTE || nextTokenValue === BRACKETS.SQUARE.LEFT;
    };

    /**
     * Returns last item from array
     * @param array
     */
    const getLast = array => {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      return array[array.length - 1];
    };
    /**
     * Gets the node which is being collected
     * or null if there is no such one
     * @param context {@link Context|parser context}
     */


    const getBufferNode = context => {
      if (context.pathToBufferNode.length === 0) {
        return null;
      } // buffer node is always the last in the pathToBufferNode stack


      return getLast(context.pathToBufferNode);
    };
    /**
     * Updates needed buffer node value while tokens iterating
     * @param context {@link Context|parser context}
     * @param tokenValue
     */


    const updateBufferNode = (context, tokenValue) => {
      const bufferNode = getBufferNode(context);

      if (bufferNode === null) {
        throw new Error('No bufferNode to update');
      }

      if (bufferNode.type === NodeType.RegularSelector) {
        bufferNode.value += tokenValue;
      } else if (bufferNode.type === NodeType.AbsolutePseudoClass) {
        bufferNode.arg += tokenValue;
      }
    };
    /**
     * Adds SelectorList node to context.ast at the start of ast collecting
     * @param context {@link Context|parser context}
     */


    const addSelectorListNode = context => {
      const selectorListNode = new AnySelectorNode(NodeType.SelectorList);
      context.ast = selectorListNode;
      context.pathToBufferNode.push(selectorListNode);
    };
    /**
     * Adds new node to buffer node children.
     * New added node will be considered as buffer node after it
     * @param context {@link Context|parser context}
     * @param type type of node to add
     * @param tokenValue optional, value of processing token
     */


    const addAnySelectorNode = function (context, type) {
      let tokenValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      const bufferNode = getBufferNode(context);

      if (bufferNode === null) {
        throw new Error('No buffer node');
      }

      let node;

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
     * @param context {@link Context|parser context}
     * @param tokenValue value of regular selector
     */


    const initAst = (context, tokenValue) => {
      addSelectorListNode(context);
      addAnySelectorNode(context, NodeType.Selector); // RegularSelector node is always the first child of Selector node

      addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
    };
    /**
     * Inits selector list subtree for relative extended pseudo-classes, e.g. :has(), :not()
     * @param context {@link Context|parser context}
     * @param tokenValue optional, value of inner regular selector
     */


    const initRelativeSubtree = function (context) {
      let tokenValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      addAnySelectorNode(context, NodeType.SelectorList);
      addAnySelectorNode(context, NodeType.Selector);
      addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
    };
    /**
     * Goes to closest parent specified by type.
     * Actually updates path to buffer node for proper ast collecting of selectors while parsing
     * @param context {@link Context|parser context}
     * @param parentType type of needed parent node in ast
     */


    const upToClosest = (context, parentType) => {
      for (let i = context.pathToBufferNode.length - 1; i >= 0; i -= 1) {
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


    const parse$1 = selector => {
      var _bufferNode, _bufferNode2, _bufferNode3, _bufferNode4, _bufferNode5, _bufferNode6, _bufferNode7, _bufferNode8, _bufferNode9, _bufferNode10, _bufferNode11, _bufferNode12, _bufferNode13, _bufferNode14, _bufferNode15, _bufferNode16, _bufferNode17, _bufferNode18;

      const tokens = tokenize(selector);
      const context = {
        ast: null,
        pathToBufferNode: [],
        extendedPseudoNamesStack: [],
        extendedPseudoBracketsStack: [],
        standardPseudoNamesStack: [],
        standardPseudoBracketsStack: [],
        isAttributeBracketsOpen: false,
        isRegexpOpen: false
      };
      let i = 0;

      while (i < tokens.length) {
        const token = tokens[i]; // Token to process

        const {
          type: tokenType,
          value: tokenValue
        } = token; // needed for SPACE and COLON tokens checking

        const nextToken = tokens[i + 1] || [];
        const {
          type: nextTokenType,
          value: nextTokenValue
        } = nextToken; // needed for limitations
        // - :not() and :is() root element
        // - :has() usage
        // - white space before and after pseudo-class name

        const nextToNextToken = tokens[i + 2] || [];
        const {
          value: nextToNextTokenValue
        } = nextToNextToken; // needed for COLON token checking for none-specified regular selector before extended one
        // e.g. 'p, :hover'
        // or   '.banner, :contains(ads)'

        const previousToken = tokens[i - 1] || [];
        const {
          type: prevTokenType,
          value: prevTokenValue
        } = previousToken;
        let bufferNode = getBufferNode(context);

        switch (tokenType) {
          case TokenType.Word:
            if (bufferNode === null) {
              // there is no buffer node only in one case — no ast collecting has been started
              initAst(context, tokenValue);
            } else if (bufferNode.type === NodeType.SelectorList) {
              // add new selector to selector list
              addAnySelectorNode(context, NodeType.Selector);
              addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
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
                addAnySelectorNode(context, NodeType.AbsolutePseudoClass, tokenValue.toLowerCase());
              } else {
                // if it is not absolute pseudo-class, it must be relative one
                // add RelativePseudoClass with tokenValue as pseudo-class name to ExtendedSelector children
                addAnySelectorNode(context, NodeType.RelativePseudoClass, tokenValue.toLowerCase());
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
                    addAnySelectorNode(context, NodeType.RegularSelector);
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
                    addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
                  }
                } else if (bufferNode.type === NodeType.SelectorList) {
                  // add Selector to SelectorList
                  addAnySelectorNode(context, NodeType.Selector); // and RegularSelector as it is always the first child of Selector

                  addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
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
                  addAnySelectorNode(context, NodeType.Selector); // add empty value RegularSelector anyway as any selector should start with it
                  // and check previous token on the next step

                  addAnySelectorNode(context, NodeType.RegularSelector); // bufferNode should be updated for following checking

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

                      addAnySelectorNode(context, NodeType.ExtendedSelector);
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
                    addAnySelectorNode(context, NodeType.ExtendedSelector);
                  } else if (nextTokenValue.toLowerCase() === REMOVE_PSEUDO_CLASS_MARKER) {
                    // :remove() pseudo-class should be handled before
                    // as it is not about element selecting but actions with elements
                    // e.g. '#banner:upward(2):remove()'
                    throw new Error("Selector parser error: invalid :remove() pseudo-class in selector: '".concat(selector, "'")); // eslint-disable-line max-len
                  } else {
                    // otherwise it is standard pseudo after extended pseudo-class
                    // and colon should be collected to value of RegularSelector
                    // e.g. 'body *:not(input)::selection'
                    addAnySelectorNode(context, NodeType.RegularSelector, tokenValue);
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
                    addAnySelectorNode(context, NodeType.ExtendedSelector);
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
                    const lastStandardPseudo = context.standardPseudoNamesStack.pop();

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

    /**
     * As soon as possible stores native Node textContent getter to be used for contains pseudo-class
     * because elements' 'textContent' and 'innerText' properties might be mocked
     * https://github.com/AdguardTeam/ExtendedCss/issues/127
     */

    const nodeTextContentGetter = (() => {
      var _Object$getOwnPropert;

      const nativeNode = window.Node || Node;
      return (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(nativeNode.prototype, 'textContent')) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.get;
    })();

    const utils = {
      MutationObserver: window.MutationObserver || window.WebKitMutationObserver,
      isNumber: obj => {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        return typeof obj === 'number';
      },

      /**
       * Gets string without suffix
       * @param str input string
       * @param suffix needed to remove
       */
      removeSuffix: (str, suffix) => {
        const index = str.indexOf(suffix, str.length - suffix.length);

        if (index >= 0) {
          return str.substring(0, index);
        }

        return str;
      },

      /**
       * Returns textContent of passed domElement
       * @param domElement
       */
      getNodeTextContent: domElement => {
        return (nodeTextContentGetter === null || nodeTextContentGetter === void 0 ? void 0 : nodeTextContentGetter.apply(domElement)) || '';
      },

      /**
       * Safe console.error version
       */
      logError: typeof console !== 'undefined' && console.error && console.error.bind ? console.error.bind(window.console) : console.error,

      /**
       * Safe console.info version
       */
      logInfo: typeof console !== 'undefined' && console.info && console.info.bind ? console.info.bind(window.console) : console.info,
      isSafariBrowser: navigator.vendor === 'Apple Computer, Inc.',

      /**
       * Replaces all 'find' with 'replace' in 'str' string
       * @param str
       * @param find
       * @param replace
       */
      replaceAll: (str, find, replace) => {
        if (!str) {
          return str;
        }

        return str.split(find).join(replace);
      },

      /**
       * Converts string to regular expression
       * @param str
       */
      toRegExp: str => {
        if (str.startsWith(SLASH) && str.endsWith(SLASH)) {
          return new RegExp(str.slice(1, -1));
        }

        const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(escaped);
      },

      /**
       * Converts any instance value to string
       * @param value
       */
      convertTypeIntoStr: value => {
        let output;

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
      },

      /**
       * Converts instance of string value
       * e.g. null for 'null', true for 'true' etc.
       * @param value
       */
      convertTypeFromStr: value => {
        const numValue = Number(value);
        let output;

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
      },

      /**
       * Returns element selector text based on it's tagName and attributes
       * @param element
       */
      getElementSelectorText: element => {
        let selectorText = element.tagName.toLowerCase();
        selectorText += Array.from(element.attributes).map(attr => {
          return "[".concat(attr.name, "=\"").concat(element.getAttribute(attr.name), "\"]");
        }).join('');
        return selectorText;
      },

      /**
       * Returns string selector path for element in dom
       * @param inputEl input element
       */
      getNodeSelector: inputEl => {
        if (!(inputEl instanceof Element)) {
          throw new Error('Function received argument with wrong type');
        }

        let el;
        el = inputEl;
        const path = []; // we need to check '!!el' first because it is possible
        // that some ancestor of the inputEl was removed before it

        while (!!el && el.nodeType === Node.ELEMENT_NODE) {
          let selector = el.nodeName.toLowerCase();

          if (el.id && typeof el.id === 'string') {
            selector += "#".concat(el.id);
            path.unshift(selector);
            break;
          }

          let sibling = el;
          let nth = 1;

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
      },

      /**
       * Converts array of pairs to object.
       * Object.fromEntries() polyfill because it is not supported by old browsers
       * https://caniuse.com/?search=Object.fromEntries
       * @param {Array} entries - array of pairs
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getObjectFromEntries: entries => {
        const output = entries.reduce((acc, el) => {
          const key = el[0];
          const value = el[1];
          acc[key] = value;
          return acc;
        }, {});
        return output;
      },

      /**
       * Some browsers do not support Array.prototype.flat()
       * for example, Opera 42 which is used for browserstack tests
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
       * @param input
       */
      flatten: input => {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        const stack = []; // eslint-disable-line @typescript-eslint/no-explicit-any

        input.forEach(el => stack.push(el));
        const res = [];

        while (stack.length) {
          // pop value from stack
          const next = stack.pop();

          if (Array.isArray(next)) {
            // push back array items, won't modify the original input
            next.forEach(el => stack.push(el));
          } else {
            res.push(next);
          }
        } // reverse to restore input order


        return res.reverse();
      }
    };

    const restoreRuleAcc = context => {
      context.rawRuleData = {
        selector: ''
      };
    };

    /**
     * Checks the presence of :remove() pseudo-class and validates it while parsing the selector part of css rule
     * @param rawSelector
     * @return `{ selector, stylesOfSelector }`
     */
    const parseRemoveSelector = rawSelector => {
      /**
       * no error will be thrown on invalid selector as it will be validated later
       * so it's better to explicitly specify 'any' selector for :remove() pseudo-class by '*'
       * e.g. '.banner > *:remove()' instead of '.banner > :remove()'
       */
      // ':remove()'
      const VALID_REMOVE_MARKER = "".concat(COLON).concat(REMOVE_PSEUDO_CLASS_MARKER).concat(BRACKETS.PARENTHESES.LEFT).concat(BRACKETS.PARENTHESES.RIGHT); // eslint-disable-line max-len
      // ':remove(' - needed for validation rules like 'div:remove(2)'

      const INVALID_REMOVE_MARKER = "".concat(COLON).concat(REMOVE_PSEUDO_CLASS_MARKER).concat(BRACKETS.PARENTHESES.LEFT);
      let selector;
      let shouldRemove = false;
      const firstIndex = rawSelector.indexOf(VALID_REMOVE_MARKER);

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

      const stylesOfSelector = shouldRemove ? [{
        property: REMOVE_PSEUDO_PROPERTY_KEY,
        value: String(shouldRemove)
      }] : [];
      return {
        selector,
        stylesOfSelector
      };
    };
    /**
     * Parses cropped selector part found before `{` previously
     * @param context
     */


    const parseSelectorPart = context => {
      let selector = context.selectorBuffer.trim();
      let removeSelectorData;

      try {
        removeSelectorData = parseRemoveSelector(selector);
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        utils.logError(e.message);
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_REMOVE, ": '").concat(selector, "'"));
      }

      if (context.nextIndex === -1) {
        if (selector === removeSelectorData.selector) {
          // rule should have style or pseudo-class :remove()
          throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_STYLE_OR_REMOVE, ": '").concat(context.cssToParse, "'")); // eslint-disable-line max-len
        } // stop parsing as there is no style declaration and selector parsed fine


        context.cssToParse = '';
      }

      let stylesOfSelector = [];
      let success = false;
      let ast;

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
        success,
        selector,
        ast,
        stylesOfSelector
      };
    };
    /**
     * Recursively parses style declaration string into `Style`s
     * @return a number index of the next `}` in `this.cssToParse`.
     */


    const parseUntilClosingBracket = (context, styles) => {
      // Expects ":", ";", and "}".
      REGEXP_DECLARATION_DIVIDER.lastIndex = context.nextIndex;
      let match = REGEXP_DECLARATION_DIVIDER.exec(context.cssToParse);

      if (match === null) {
        throw new Error("".concat(STYLESHEET_ERROR_PREFIX.INVALID_STYLE, ": '").concat(context.cssToParse, "'"));
      }

      let matchPos = match.index;
      let matched = match[0];

      if (matched === BRACKETS.CURLY.RIGHT) {
        const declarationChunk = context.cssToParse.slice(context.nextIndex, matchPos);

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
        const colonIndex = matchPos; // Expects ";" and "}".

        REGEXP_DECLARATION_END.lastIndex = colonIndex;
        match = REGEXP_DECLARATION_END.exec(context.cssToParse);

        if (match === null) {
          throw new Error("".concat(STYLESHEET_ERROR_PREFIX.UNCLOSED_STYLE, ": '").concat(context.cssToParse, "'"));
        }

        matchPos = match.index;
        matched = match[0]; // Populates the `styleMap` key-value map.

        const property = context.cssToParse.slice(context.nextIndex, colonIndex).trim();

        if (property.length === 0) {
          throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_PROPERTY, ": '").concat(context.cssToParse, "'"));
        }

        const value = context.cssToParse.slice(colonIndex + 1, matchPos).trim();

        if (value.length === 0) {
          throw new Error("".concat(STYLESHEET_ERROR_PREFIX.NO_VALUE, ": '").concat(context.cssToParse, "'"));
        }

        styles.push({
          property,
          value
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


    const parseNextStyle = context => {
      const styles = [];
      const styleEndPos = parseUntilClosingBracket(context, styles); // find next rule after the style declaration

      REGEXP_NON_WHITESPACE.lastIndex = styleEndPos + 1;
      const match = REGEXP_NON_WHITESPACE.exec(context.cssToParse);

      if (match === null) {
        context.cssToParse = '';
        return styles;
      }

      const matchPos = match.index; // cut out matched style declaration for previous selector

      context.cssToParse = context.cssToParse.slice(matchPos);
      return styles;
    };
    /**
     * Checks whether the 'remove' property positively set in styles
     * with only one positive value - 'true'
     * @param styles
     */


    const isRemoveSetInStyles = styles => {
      return styles.some(s => {
        return s.property === REMOVE_PSEUDO_PROPERTY_KEY && s.value === PSEUDO_PROPERTY_POSITIVE_VALUE;
      });
    };
    /**
     * Gets valid 'debug' property value set in styles
     * where possible values are 'true' and 'global'
     * @param styles
     */


    const getDebugStyleValue = styles => {
      const debugStyle = styles.find(s => {
        return s.property === DEBUG_PSEUDO_PROPERTY_KEY;
      });
      return debugStyle === null || debugStyle === void 0 ? void 0 : debugStyle.value;
    };
    /**
     * Prepares final RuleData
     * @param selector
     * @param rawStyles array of previously collected styles which may contain 'remove' and 'debug'
     */


    const prepareRuleData = (selector, ast, rawStyles) => {
      const ruleData = {
        selector,
        ast
      };
      const debugValue = getDebugStyleValue(rawStyles);
      const shouldRemove = isRemoveSetInStyles(rawStyles);
      let styles = rawStyles;

      if (debugValue) {
        // get rid of 'debug' from styles
        styles = rawStyles.filter(s => s.property !== DEBUG_PSEUDO_PROPERTY_KEY); // and set it as separate property only if its value is valid
        // which is 'true' or 'global'

        if (debugValue === PSEUDO_PROPERTY_POSITIVE_VALUE || debugValue === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE) {
          ruleData[DEBUG_PSEUDO_PROPERTY_KEY] = debugValue;
        }
      }

      if (shouldRemove) {
        // no other styles are needed to apply if 'remove' is set
        ruleData.style = {
          [REMOVE_PSEUDO_PROPERTY_KEY]: PSEUDO_PROPERTY_POSITIVE_VALUE
        };
      } else {
        // otherwise all styles should be applied.
        // every style property will be unique because of their converting into object
        if (styles.length > 0) {
          const stylesAsEntries = styles.map(style => {
            const {
              property,
              value
            } = style;
            return [property, value];
          });
          const preparedStyleData = utils.getObjectFromEntries(stylesAsEntries);
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

    const saveToRawResults = (rawResults, rawRuleData) => {
      const {
        selector,
        ast,
        styles
      } = rawRuleData;

      if (!styles) {
        throw new Error("No style declaration for selector: '".concat(selector, "'"));
      }

      if (!ast) {
        throw new Error("No ast parsed for selector: '".concat(selector, "'"));
      }

      const storedRuleData = rawResults.get(selector);

      if (!storedRuleData) {
        rawResults.set(selector, {
          ast,
          styles
        });
      } else {
        storedRuleData.styles.push(...styles);
      }
    };
    /**
     * Parses stylesheet into rules data objects
     * @param stylesheet
     */


    const parse = rawStylesheet => {
      const stylesheet = normalize$1(rawStylesheet);
      const context = {
        // any stylesheet should start with selector
        isSelector: true,
        // init value of parser position
        nextIndex: 0,
        // init value of cssToParse
        cssToParse: stylesheet,
        // buffer for collecting selector part
        selectorBuffer: '',
        // accumulator for rules
        rawRuleData: {
          selector: ''
        }
      };
      const rawResults = new Map();
      let selectorData; // context.cssToParse is going to be cropped while its parsing

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
          const parsedStyles = parseNextStyle(context); // styles can be parsed from selector part if it has :remove() pseudo-class
          // e.g. '.banner:remove() { debug: true; }'

          (_context$rawRuleData$ = context.rawRuleData.styles) === null || _context$rawRuleData$ === void 0 ? void 0 : _context$rawRuleData$.push(...parsedStyles); // save rule data to results

          saveToRawResults(rawResults, context.rawRuleData);
          context.nextIndex = 0; // clean up ruleContext

          restoreRuleAcc(context); // parse next rule selector after style successfully parsed

          context.isSelector = true;
        }
      }

      const results = [];
      rawResults.forEach((value, key) => {
        const selector = key;
        const {
          ast,
          styles: rawStyles
        } = value;
        results.push(prepareRuleData(selector, ast, rawStyles));
      });
      return results;
    };

    /**
     * Removes quotes for specified content value.
     *
     * getPropertyValue('content') returns value wrapped into quotes e.g. '"Chapter "',
     * but filters maintainers does not use any quotes in real rules
     * @param str
     */

    const removeContentQuotes = str => {
      return str.replace(/^(["'])([\s\S]*)\1$/, '$2');
    };
    /**
     * Adds quotes for specified background url value
     *
     * e.g. if background-image is specified as 'background: url(data:image/gif;base64,R0lGODlhAQA7)',
     * getPropertyValue('background-image') may return value with quotes:
     * 'background: url("data:image/gif;base64,R0lGODlhAQA7")'.
     * So we add quotes for better matching since filters maintainers might use quotes in real rules
     * @param str
     */


    const addUrlPropertyQuotes = str => {
      if (!str.includes('url("')) {
        const re = /url\((.*?)\)/g;
        return str.replace(re, 'url("$1")');
      }

      return str;
    };
    /**
     * Adds quotes to url arg for consistent property value matching
     */


    const addUrlQuotesTo = {
      regexpArg: str => {
        // e.g. /^url\\([a-z]{4}:[a-z]{5}/
        // or /^url\\(data\\:\\image\\/gif;base64.+/
        const re = /(\^)?url(\\)?\\\((\w|\[\w)/g;
        return str.replace(re, '$1url$2\\(\\"?$3');
      },
      noneRegexpArg: addUrlPropertyQuotes
    };
    /**
     * Escapes regular expression string
     * @param str
     */

    const escapeRegExp = function (str) {
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
      // should be escaped . * + ? ^ $ { } ( ) | [ ] / \
      // except of * | ^
      const specials = ['.', '+', '?', '$', '{', '}', '(', ')', '[', ']', '\\', '/'];
      const specialsRegex = new RegExp("[".concat(specials.join('\\'), "]"), 'g');
      return str.replace(specialsRegex, '\\$&');
    };
    /**
     * Converts :matches-css arg property value match to regexp
     * @param rawArg
     */


    const matchingStyleValueToRegexp = rawArg => {
      let arg;

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

        arg = utils.replaceAll(arg, ASTERISK, REGEXP_ANY_SYMBOL);
      }

      return new RegExp(arg, 'i');
    };
    /**
     * Gets css property value by property name
     * @param domElement dom node
     * @param regularPseudo standard pseudo-class name — :before or :after
     * @param propertyName css property name
     */


    const getComputedStylePropertyValue = (domElement, regularPseudo, propertyName) => {
      let value = '';
      const style = getComputedStyle(domElement, regularPseudo);

      if (style) {
        value = style.getPropertyValue(propertyName); // https://bugs.webkit.org/show_bug.cgi?id=93445

        if (propertyName === 'opacity' && utils.isSafariBrowser) {
          value = (Math.round(parseFloat(value) * 100) / 100).toString();
        }
      }

      if (propertyName === 'content') {
        value = removeContentQuotes(value);
      }

      if (propertyName === 'background' || propertyName === 'background-image') {
        // sometimes url property does not have quotes
        // so we add them for consistent matching
        value = addUrlPropertyQuotes(value);
      }

      return value;
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
    const getPseudoArgData = (pseudoArg, separator) => {
      const index = pseudoArg.indexOf(separator);
      let name;
      let value;

      if (index > -1) {
        name = pseudoArg.substring(0, index).trim();
        value = pseudoArg.substring(index + 1).trim();
      } else {
        name = pseudoArg;
      }

      return {
        name,
        value
      };
    };
    /**
     * Checks whether the domElement is matched by :matches-css() arg
     * @param domElement
     * @param pseudoName
     * @param pseudoArg
     * @param regularPseudo
     */


    const matchingStyle = (domElement, pseudoName, pseudoArg, regularPseudo) => {
      const {
        name: matchName,
        value: matchValue
      } = getPseudoArgData(pseudoArg, COLON);

      if (!matchName || !matchValue) {
        throw new Error("Required property name or value is missing in :".concat(pseudoName, " arg: ").concat(pseudoArg));
      }

      let valueRegexp;

      try {
        valueRegexp = matchingStyleValueToRegexp(matchValue);
      } catch (e) {
        utils.logError(e);
        throw new Error("Invalid argument of :".concat(pseudoName, " pseudo-class: ").concat(pseudoArg));
      }

      const value = getComputedStylePropertyValue(domElement, regularPseudo, matchName);
      return valueRegexp && valueRegexp.test(value);
    };
    /**
     * Validates string arg for :matches-attr and :matches-property
     * @param arg
     */

    const validateStrMatcherArg = arg => {
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
     * @param isWildcardAllowed flag for allowing of usage of '*' as pseudo-class arg
     */


    const getValidMatcherArg = function (rawArg) {
      let isWildcardAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // if rawArg is missing for pseudo-class
      // e.g. :matches-attr()
      // isAbsoluteMatching will throw error before getValidMatcherArg is called:
      // name or arg is missing in AbsolutePseudoClass
      let arg;

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
          arg = utils.toRegExp(rawArg);
        } else {
          throw new Error("Invalid regexp: '".concat(rawArg, "'"));
        }
      } else if (rawArg.includes(ASTERISK)) {
        if (rawArg === ASTERISK && !isWildcardAllowed) {
          // e.g. :matches-attr(*)
          throw new Error("Argument should be more specific than ".concat(rawArg));
        }

        arg = utils.replaceAll(rawArg, ASTERISK, REGEXP_ANY_SYMBOL);
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
    const getRawMatchingData = (pseudoName, pseudoArg) => {
      const {
        name: rawName,
        value: rawValue
      } = getPseudoArgData(pseudoArg, EQUAL_SIGN);

      if (!rawName) {
        throw new Error("Required attribute name is missing in :".concat(pseudoName, " arg: ").concat(pseudoArg));
      }

      return {
        rawName,
        rawValue
      };
    };
    /**
     * Checks whether the domElement is matched by :matches-attr() arg
     * @param domElement element to check
     * @param pseudoName name of pseudo-class
     * @param pseudoArg arg of pseudo-class
     */

    const matchingAttr = (domElement, pseudoName, pseudoArg) => {
      const elementAttributes = domElement.attributes; // no match if dom element has no attributes

      if (elementAttributes.length === 0) {
        return false;
      }

      const {
        rawName: rawAttrName,
        rawValue: rawAttrValue
      } = getRawMatchingData(pseudoName, pseudoArg);
      let attrNameMatch;

      try {
        attrNameMatch = getValidMatcherArg(rawAttrName);
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        utils.logError(e);
        throw new SyntaxError(e.message);
      }

      let isMatching = false;
      let i = 0;

      while (i < elementAttributes.length && !isMatching) {
        const attr = elementAttributes[i];
        const isNameMatching = attrNameMatch instanceof RegExp ? attrNameMatch.test(attr.name) : attrNameMatch === attr.name;

        if (!rawAttrValue) {
          // for rules with no attribute value specified
          // e.g. :matches-attr("/regex/") or :matches-attr("attr-name")
          isMatching = isNameMatching;
        } else {
          let attrValueMatch;

          try {
            attrValueMatch = getValidMatcherArg(rawAttrValue);
          } catch (e) {
            // eslint-disable-line @typescript-eslint/no-explicit-any
            utils.logError(e);
            throw new SyntaxError(e.message);
          }

          const isValueMatching = attrValueMatch instanceof RegExp ? attrValueMatch.test(attr.value) : attrValueMatch === attr.value;
          isMatching = isNameMatching && isValueMatching;
        }

        i += 1;
      }

      return isMatching;
    };
    /**
     * Parses raw :matches-property() arg which may be chain of properties
     * @param input argument of :matches-property()
     */

    const parseRawPropChain = input => {
      if (input.length > 1 && input.startsWith(DOUBLE_QUOTE) && input.endsWith(DOUBLE_QUOTE)) {
        input = input.slice(1, -1);
      }

      const chainChunks = input.split(DOT);
      const chainPatterns = [];
      let patternBuffer = '';
      let isRegexpPattern;
      let i = 0;

      while (i < chainChunks.length) {
        const chunk = chainChunks[i];

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

      const chainMatchPatterns = chainPatterns.map(pattern => {
        if (pattern.length === 0) {
          // e.g. '.prop.id' or 'nested..test'
          throw new Error("Empty pattern '".concat(pattern, "' is invalid in chain '").concat(input, "'"));
        }

        let validPattern;

        try {
          validPattern = getValidMatcherArg(pattern, true);
        } catch (e) {
          utils.logError(e);
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
     * @param output result acc
     */
    const filterRootsByRegexpChain = function (base, chain) {
      let output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      const tempProp = chain[0];

      if (chain.length === 1) {
        for (const key in base) {
          if (tempProp instanceof RegExp) {
            if (tempProp.test(key)) {
              var _Object$getOwnPropert;

              output.push({
                base,
                prop: key,
                value: (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(base, key)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.value
              });
            }
          } else if (tempProp === key) {
            var _Object$getOwnPropert2;

            output.push({
              base,
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
        const nextProp = chain.slice(1);
        const baseKeys = [];

        for (const key in base) {
          if (tempProp.test(key)) {
            baseKeys.push(key);
          }
        }

        baseKeys.forEach(key => {
          var _Object$getOwnPropert3;

          const item = (_Object$getOwnPropert3 = Object.getOwnPropertyDescriptor(base, key)) === null || _Object$getOwnPropert3 === void 0 ? void 0 : _Object$getOwnPropert3.value;
          filterRootsByRegexpChain(item, nextProp, output);
        });
      }

      if (base && typeof tempProp === 'string') {
        var _Object$getOwnPropert4;

        const nextBase = (_Object$getOwnPropert4 = Object.getOwnPropertyDescriptor(base, tempProp)) === null || _Object$getOwnPropert4 === void 0 ? void 0 : _Object$getOwnPropert4.value;
        chain = chain.slice(1);

        if (nextBase !== undefined) {
          filterRootsByRegexpChain(nextBase, chain, output);
        }
      }

      return output;
    };
    /**
     * Checks whether the domElement is matched by :matches-property() arg
     * @param domElement element to check
     * @param pseudoName name of pseudo-class
     * @param pseudoArg arg of pseudo-class
     */


    const matchingProperty = (domElement, pseudoName, pseudoArg) => {
      const {
        rawName: rawPropertyName,
        rawValue: rawPropertyValue
      } = getRawMatchingData(pseudoName, pseudoArg); // chained property name can not include '/' or '.'
      // so regex prop names with such escaped characters are invalid

      if (rawPropertyName.includes('\\/') || rawPropertyName.includes('\\.')) {
        throw new Error("Invalid :".concat(pseudoName, " name pattern: ").concat(rawPropertyName));
      }

      let propChainMatches;

      try {
        propChainMatches = parseRawPropChain(rawPropertyName);
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        utils.logError(e);
        throw new SyntaxError(e.message);
      }

      const ownerObjArr = filterRootsByRegexpChain(domElement, propChainMatches);

      if (ownerObjArr.length === 0) {
        return false;
      }

      let isMatching = true;

      if (rawPropertyValue) {
        let propValueMatch;

        try {
          propValueMatch = getValidMatcherArg(rawPropertyValue);
        } catch (e) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          utils.logError(e);
          throw new SyntaxError(e.message);
        }

        if (propValueMatch) {
          for (let i = 0; i < ownerObjArr.length; i += 1) {
            const realValue = ownerObjArr[i].value;

            if (propValueMatch instanceof RegExp) {
              isMatching = propValueMatch.test(utils.convertTypeIntoStr(realValue));
            } else {
              // handle 'null' and 'undefined' property values set as string
              if (realValue === 'null' || realValue === 'undefined') {
                isMatching = propValueMatch === realValue;
                break;
              }

              isMatching = utils.convertTypeFromStr(propValueMatch) === realValue;
            }

            if (isMatching) {
              break;
            }
          }
        }
      }

      return isMatching;
    };
    /**
     * Checks whether the textContent is matched by :contains arg
     * @param textContent dom element textContent
     * @param rawPseudoArg argument of :contains pseudo-class
     */

    const matchingText = (textContent, rawPseudoArg) => {
      let isTextContentMatched;
      /**
       * TODO: add helper for parsing rawPseudoArg (string or regexp) later,
       * seems to be similar for few extended pseudo-classes
       */

      let pseudoArg = rawPseudoArg;

      if (pseudoArg.startsWith(SLASH) && REGEXP_WITH_FLAGS_REGEXP.test(pseudoArg)) {
        // regexp arg
        const flagsIndex = pseudoArg.lastIndexOf('/');
        const flagsStr = pseudoArg.substring(flagsIndex + 1);
        pseudoArg = pseudoArg.substring(0, flagsIndex + 1).slice(1, -1).replace(/\\([\\"])/g, '$1');
        let regex;

        try {
          regex = new RegExp(pseudoArg, flagsStr);
        } catch (e) {
          throw new Error("Invalid argument of :contains pseudo-class: ".concat(rawPseudoArg));
        }

        isTextContentMatched = regex.test(textContent);
      } else {
        // none-regexp arg
        pseudoArg = pseudoArg.replace(/\\([\\()[\]"])/g, '$1');
        isTextContentMatched = textContent.includes(pseudoArg);
      }

      return isTextContentMatched;
    };

    /**
     * Validates number arg for :nth-ancestor and :upward pseudo-classes
     * @param rawArg raw arg of pseudo-class
     * @param pseudoName pseudo-class name
     */
    const getValidNumberAncestorArg = (rawArg, pseudoName) => {
      const deep = Number(rawArg);

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

    const getNthAncestor = (domElement, deep, pseudoName) => {
      let ancestor;
      let i = 0;

      while (i < deep) {
        ancestor = domElement.parentElement;

        if (!ancestor) {
          throw new Error("Too big :".concat(pseudoName, " arg '").concat(deep, "', out of DOM elements root."));
        }

        domElement = ancestor;
        i += 1;
      }

      return ancestor;
    };
    /**
     * Checks whether the element is instance of HTMLElement
     * @param element
     */

    const isHtmlElement = element => {
      return element instanceof HTMLElement;
    };
    /**
     * Validates standard CSS selector
     * @param selector
     */

    const validateStandardSelector = selector => {
      let isValid;

      try {
        document.querySelectorAll(selector);
        isValid = true;
      } catch (e) {
        isValid = false;
      }

      return isValid;
    };

    const matchPseudo = {
      /**
       * Checks whether the element satisfies condition of contains pseudo-class
       * @param domElement dom node
       * @param rawPseudoArg contains pseudo-class arg
       */
      contains: (domElement, rawPseudoArg) => {
        const elemTextContent = utils.getNodeTextContent(domElement);
        let isTextContentMatching;

        try {
          isTextContentMatching = matchingText(elemTextContent, rawPseudoArg);
        } catch (e) {
          utils.logError(e);
          throw new Error("Error while matching text: \"".concat(elemTextContent, "\" by arg ").concat(rawPseudoArg, "."));
        }

        return isTextContentMatching;
      },
      matchesCss: (domElement, pseudoName, rawPseudoArg) => {
        // no standard pseudo-element for :matched-css
        let regularPseudo = '';

        if (pseudoName === MATCHES_CSS_BEFORE_PSEUDO) {
          regularPseudo = "".concat(COLON).concat(REGULAR_PSEUDO_ELEMENTS.BEFORE);
        } else if (pseudoName === MATCHES_CSS_AFTER_PSEUDO) {
          regularPseudo = "".concat(COLON).concat(REGULAR_PSEUDO_ELEMENTS.AFTER);
        }

        let isMatchingCss;

        try {
          isMatchingCss = matchingStyle(domElement, pseudoName, rawPseudoArg, regularPseudo);
        } catch (e) {
          utils.logError(e);
          throw new Error("Error while matching css by arg ".concat(rawPseudoArg, "."));
        }

        return isMatchingCss;
      },
      matchesAttr: (domElement, pseudoName, rawPseudoArg) => {
        let isMatchingAttr;

        try {
          isMatchingAttr = matchingAttr(domElement, pseudoName, rawPseudoArg);
        } catch (e) {
          utils.logError(e);
          throw new Error("Error while matching attributes by arg ".concat(rawPseudoArg, "."));
        }

        return isMatchingAttr;
      },
      matchesProperty: (domElement, pseudoName, rawPseudoArg) => {
        let isMatchingAttr;

        try {
          isMatchingAttr = matchingProperty(domElement, pseudoName, rawPseudoArg);
        } catch (e) {
          utils.logError(e);
          throw new Error("Error while matching properties by arg ".concat(rawPseudoArg, "."));
        }

        return isMatchingAttr;
      }
    };
    const findPseudo = {
      /**
       * Gets list of nth ancestors relative to every dom node from domElements list
       * @param domElements dom nodes
       * @param rawPseudoArg number arg of :nth-ancestor or :upward pseudo-class
       * @param pseudoName pseudo-class name
       */
      nthAncestor: (domElements, rawPseudoArg, pseudoName) => {
        const deep = getValidNumberAncestorArg(rawPseudoArg, pseudoName);
        const ancestors = domElements.map(domElement => {
          let ancestor;

          try {
            ancestor = getNthAncestor(domElement, deep, pseudoName);
          } catch (e) {
            utils.logError(e);
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
      xpath: (domElements, rawPseudoArg) => {
        const foundElements = domElements.map(domElement => {
          const result = [];
          let xpathResult;

          try {
            xpathResult = document.evaluate(rawPseudoArg, domElement, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
          } catch (e) {
            utils.logError(e);
            throw new Error("Invalid argument of :xpath pseudo-class: '".concat(rawPseudoArg, "'"));
          }

          let node = xpathResult.iterateNext();

          while (node) {
            if (isHtmlElement(node)) {
              result.push(node);
            }

            node = xpathResult.iterateNext();
          }

          return result;
        }).flat(1);
        return foundElements;
      },

      /**
       * Gets list of closest ancestors relative to every dom node from domElements list
       * @param domElements dom nodes
       * @param rawPseudoArg standard selector arg of :upward pseudo-class
       */
      upward: (domElements, rawPseudoArg) => {
        if (!validateStandardSelector(rawPseudoArg)) {
          throw new Error("Invalid argument of :upward pseudo-class: '".concat(rawPseudoArg, "'"));
        }

        const closestAncestors = domElements.map(domElement => {
          // closest to parent element should be found
          // otherwise `.base:upward(.base)` will return itself too, not only ancestor
          const parent = domElement.parentElement;

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
     * Selects dom elements by value of RegularSelector
     * @param regularSelectorNode RegularSelector node
     * @param root root element
     * @param specificity
     */

    const getByRegularSelector = (regularSelectorNode, root, specificity) => {
      if (!regularSelectorNode.value) {
        throw new Error('RegularSelector value should be specified');
      }

      const selectorText = specificity ? "".concat(specificity).concat(regularSelectorNode.value) : regularSelectorNode.value;
      return Array.from(root.querySelectorAll(selectorText));
    };
    /**
     * Checks whether the domElement satisfies condition of absolute extended pseudo-class
     * @param domElement dom node, i.e html element
     * @param pseudoName pseudo-class name
     * @param pseudoArg pseudo-class arg
     */


    const isAbsoluteMatching = (domElement, pseudoName, pseudoArg) => {
      let isMatching = false;

      if (CONTAINS_PSEUDO_CLASS_MARKERS.includes(pseudoName)) {
        isMatching = matchPseudo.contains(domElement, pseudoArg);
      } else if (MATCHES_CSS_PSEUDO_CLASS_MARKERS.includes(pseudoName)) {
        isMatching = matchPseudo.matchesCss(domElement, pseudoName, pseudoArg);
      } else if (pseudoName === MATCHES_ATTR_PSEUDO_CLASS_MARKER) {
        isMatching = matchPseudo.matchesAttr(domElement, pseudoName, pseudoArg);
      } else if (pseudoName === MATCHES_PROPERTY_PSEUDO_CLASS_MARKER) {
        isMatching = matchPseudo.matchesProperty(domElement, pseudoName, pseudoArg);
      }

      return isMatching;
    };
    /**
     * Checks whether the element has all relative elements specified by pseudo-class arg
     * Used for :has() and :if-not()
     * @param element dom node
     * @param selectorList SelectorList node
     * @param pseudoName relative pseudo-class name
     */


    const hasRelativesBySelectorList = (element, selectorList, pseudoName) => {
      return selectorList.children // "every" is used here as each Selector node from SelectorList should exist on page
      .every(selector => {
        var _relativeRegularSelec, _relativeRegularSelec2;

        // selectorList.children always starts with regular selector as any selector generally
        const relativeRegularSelector = selector.children[0];

        if (!relativeRegularSelector) {
          throw new Error("RegularSelector is missing for :".concat(pseudoName, " pseudo-class."));
        }

        let specificity;
        let rootElement;

        if ((_relativeRegularSelec = relativeRegularSelector.value) !== null && _relativeRegularSelec !== void 0 && _relativeRegularSelec.startsWith(NEXT_SIBLING_COMBINATOR) || (_relativeRegularSelec2 = relativeRegularSelector.value) !== null && _relativeRegularSelec2 !== void 0 && _relativeRegularSelec2.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
          /**
           * For matching the element by "element:has(+ next-sibling)" and "element:has(~ sibling)"
           * we check whether the element's parentElement has specific direct child combination
           * e.g. 'h1:has(+ .share)' -> `h1Node.parentElement.querySelectorAll(':scope > h1 + .share')`
           * https://www.w3.org/TR/selectors-4/#relational
           */
          rootElement = element.parentElement;
          const elementSelectorText = element.tagName.toLowerCase();
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

        let relativeElements;

        try {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          relativeElements = getElementsForSelectorNode(selector, rootElement, specificity);
        } catch (e) {
          // fail for invalid selector
          throw new Error("Invalid selector for :".concat(pseudoName, " pseudo-class: '").concat(relativeRegularSelector.value, "'"));
        }

        return relativeElements.length > 0;
      });
    };
    /**
     * Checks whether the element is an any element specified by pseudo-class arg.
     * Used for :is() and :not()
     * @param element dom node
     * @param selectorList SelectorList node
     * @param pseudoName relative pseudo-class name
     */


    const isAnyElementBySelectorList = (element, selectorList, pseudoName, errorOnInvalidSelector) => {
      return selectorList.children // "some" is used here as any selector from selector list should exist on page
      .some(selector => {
        // selectorList.children always starts with regular selector
        const relativeRegularSelector = selector.children[0];

        if (!relativeRegularSelector) {
          throw new Error("RegularSelector is missing for :".concat(pseudoName, " pseudo-class."));
        }
        /**
         * For checking the element by 'div:is(.banner)' and 'div:not([data="content"])
         * we check whether the element's parentElement has any specific direct child
         */


        const rootElement = element.parentElement;

        if (!rootElement) {
          throw new Error("Selection by :".concat(pseudoName, " pseudo-class is not possible."));
        }
        /**
         * So we calculate the element "description" by it's tagname and attributes for targeting
         * and use it to specify the selection
         * e.g. 'div:is(.banner)' -> `divNode.parentElement.querySelectorAll(':scope > div[class="banner"]')`
         */


        const elementSelectorText = utils.getElementSelectorText(element);
        const specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(CHILD_COMBINATOR).concat(elementSelectorText);
        let anyElements;

        try {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          anyElements = getElementsForSelectorNode(selector, rootElement, specificity);
        } catch (e) {
          if (errorOnInvalidSelector) {
            // fail on invalid selectors for :not()
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
     * Returns list of dom nodes filtered or selected by ExtendedSelector node
     * @param domElements array of dom nodes
     * @param extendedSelectorNode ExtendedSelector node
     * @returns array of dom nodes
     */


    const getByExtendedSelector = (domElements, extendedSelectorNode) => {
      let foundElements = [];
      const extPseudoName = extendedSelectorNode.children[0].name;

      if (!extPseudoName) {
        // extended pseudo-classes should have a name
        throw new Error('Extended pseudo-class should have a name');
      }
      /**
       * TODO: refactor later
       */


      if (ABSOLUTE_PSEUDO_CLASSES.includes(extPseudoName)) {
        const absolutePseudoArg = extendedSelectorNode.children[0].arg;

        if (!absolutePseudoArg) {
          // absolute extended pseudo-classes should have an argument
          throw new Error("Missing arg for :".concat(extPseudoName, " pseudo-class"));
        }

        if (extPseudoName === NTH_ANCESTOR_PSEUDO_CLASS_MARKER) {
          // :nth-ancestor()
          foundElements = findPseudo.nthAncestor(domElements, absolutePseudoArg, extPseudoName);
        } else if (extPseudoName === XPATH_PSEUDO_CLASS_MARKER) {
          // :xpath()
          try {
            document.createExpression(absolutePseudoArg, null);
          } catch (e) {
            throw new Error("Invalid argument of :".concat(extPseudoName, " pseudo-class: '").concat(absolutePseudoArg, "'"));
          }

          foundElements = findPseudo.xpath(domElements, absolutePseudoArg);
        } else if (extPseudoName === UPWARD_PSEUDO_CLASS_MARKER) {
          // :upward()
          if (Number.isNaN(Number(absolutePseudoArg))) {
            // so arg is selector, not a number
            foundElements = findPseudo.upward(domElements, absolutePseudoArg);
          } else {
            foundElements = findPseudo.nthAncestor(domElements, absolutePseudoArg, extPseudoName);
          }
        } else {
          // all other absolute extended pseudo-classes
          // e.g. contains, matches-attr, etc.
          foundElements = domElements.filter(element => {
            return isAbsoluteMatching(element, extPseudoName, absolutePseudoArg);
          });
        }
      } else if (RELATIVE_PSEUDO_CLASSES.includes(extPseudoName)) {
        const relativeSelectorNodes = extendedSelectorNode.children[0].children;

        if (relativeSelectorNodes.length === 0) {
          // extended relative pseudo-classes should have an argument as well
          throw new Error("Missing arg for :".concat(extPseudoName, " pseudo-class"));
        }

        if (HAS_PSEUDO_CLASS_MARKERS.includes(extPseudoName)) {
          // :has(), :if(), :-abp-has()
          foundElements = domElements.filter(element => {
            return hasRelativesBySelectorList(element, relativeSelectorNodes[0], extPseudoName);
          });
        } else if (extPseudoName === IF_NOT_PSEUDO_CLASS_MARKER) {
          // :if-not()
          foundElements = domElements.filter(element => {
            return !hasRelativesBySelectorList(element, relativeSelectorNodes[0], extPseudoName);
          });
        } else if (extPseudoName === IS_PSEUDO_CLASS_MARKER) {
          // :is()
          foundElements = domElements.filter(element => {
            return isAnyElementBySelectorList(element, relativeSelectorNodes[0], extPseudoName);
          });
        } else if (extPseudoName === NOT_PSEUDO_CLASS_MARKER) {
          // :not()
          foundElements = domElements.filter(element => {
            return !isAnyElementBySelectorList(element, relativeSelectorNodes[0], extPseudoName, // 'true' for error throwing on invalid selector
            true);
          });
        }
      } else {
        // extra check is parser missed something
        throw new Error("Unknown extended pseudo-class: ':".concat(extPseudoName, "'"));
      }

      return foundElements;
    };
    /**
     * Returns list of dom nodes which is selected by RegularSelector value
     * @param domElements array of dom nodes
     * @param regularSelectorNode RegularSelector node
     * @returns array of dom nodes
     */


    const getByFollowingRegularSelector = (domElements, regularSelectorNode) => {
      let foundElements = [];
      const {
        value
      } = regularSelectorNode;

      if (!value) {
        throw new Error('RegularSelector should have a value.');
      }

      if (value.startsWith(CHILD_COMBINATOR)) {
        // e.g. div:has(> img) > .banner
        foundElements = domElements.map(root => {
          const specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE);
          return getByRegularSelector(regularSelectorNode, root, specificity);
        });
      } else if (value.startsWith(NEXT_SIBLING_COMBINATOR) || value.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
        // e.g. div:has(> img) + .banner
        // or   div:has(> img) ~ .banner
        foundElements = domElements.map(element => {
          const rootElement = element.parentElement;

          if (!rootElement) {
            throw new Error("Selection by '".concat(value, "' part of selector is not possible."));
          }

          const elementSelectorText = utils.getElementSelectorText(element);
          const specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(CHILD_COMBINATOR).concat(elementSelectorText);
          const selected = getByRegularSelector(regularSelectorNode, rootElement, specificity);
          return selected;
        });
      } else {
        // space-separated regular selector after extended one
        // e.g. div:has(> img) .banner
        foundElements = domElements.map(root => {
          const specificity = "".concat(COLON).concat(REGULAR_PSEUDO_CLASSES.SCOPE).concat(DESCENDANT_COMBINATOR);
          return getByRegularSelector(regularSelectorNode, root, specificity);
        });
      } // foundElements should be flattened
      // as getByRegularSelector() returns elements array, and map() collects them to array


      return foundElements.flat(1);
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
     * @param root root element
     * @param specificity needed element specification
     */


    const getElementsForSelectorNode = (selectorNode, root, specificity) => {
      let selectedElements = [];
      let i = 0;

      while (i < selectorNode.children.length) {
        const selectorNodeChild = selectorNode.children[i];

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


    const selectElementsByAst = function (ast) {
      let doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      const selectedElements = []; // ast root is SelectorList node;
      // it has Selector nodes as children which should be processed separately

      ast.children.forEach(selectorNode => {
        selectedElements.push(...getElementsForSelectorNode(selectorNode, doc));
      }); // selectedElements should be flattened as it is array of arrays with elements
      // const uniqueElements = [...new Set(selectedElements.flat(1))];

      const uniqueElements = [...new Set(utils.flatten(selectedElements))];
      return uniqueElements;
    };
    /**
     * Class of ExtCssDocument is needed for caching.
     * For making cache related to each new instance of class, not global
     */

    class ExtCssDocument {
      /**
       * Cache with selectors and their AST parsing results
       */
      constructor() {
        this.astCache = new Map();
      }
      /**
       * Saves selector and it's ast to cache
       * @param selector
       * @param ast
       */


      saveAstToCache(selector, ast) {
        this.astCache.set(selector, ast);
      }
      /**
       * Gets ast from cache for given selector
       * @param selector
       */


      getAstFromCache(selector) {
        const cachedAst = this.astCache.get(selector) || null;
        return cachedAst;
      }
      /**
       * Gets selector ast:
       * - if cached ast exists — returns it
       * - if no cached ast — saves newly parsed ast to cache and returns it
       * @param selector
       */


      getSelectorAst(selector) {
        let ast = this.getAstFromCache(selector);

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


      querySelectorAll(selector) {
        const ast = this.getSelectorAst(selector);
        return selectElementsByAst(ast);
      }

    }

    const isSupported = typeof window.requestAnimationFrame !== 'undefined';
    const rAF = isSupported ? requestAnimationFrame : window.setTimeout;
    const perf = isSupported ? performance : Date;
    const DEFAULT_THROTTLE_DELAY_MS = 150;

    /**
     * A helper class to throttle function calls with setTimeout and requestAnimationFrame
     */
    class AsyncWrapper {
      // number, the provided callback should be executed twice in this time frame
      constructor(context, callback, throttle) {
        this.context = context;
        this.callback = callback;
        this.throttle = throttle || DEFAULT_THROTTLE_DELAY_MS;
        this.wrappedCb = this.wrappedCallback.bind(this);
      }

      wrappedCallback(timestamp) {
        this.lastRun = utils.isNumber(timestamp) ? timestamp : perf.now();
        delete this.rAFid;
        delete this.timerId;

        if (this.callback) {
          this.callback(this.context);
        }
      }
      /**
       * Indicates whether there is a scheduled callback.
       */


      hasPendingCallback() {
        return utils.isNumber(this.rAFid) || utils.isNumber(this.timerId);
      }
      /**
       * Schedules a function call before the next animation frame.
       */


      run() {
        if (this.hasPendingCallback()) {
          // there is a pending execution scheduled
          return;
        }

        if (typeof this.lastRun !== 'undefined') {
          const elapsed = perf.now() - this.lastRun;

          if (elapsed < this.throttle) {
            this.timerId = window.setTimeout(this.wrappedCb, this.throttle - elapsed);
            return;
          }
        }

        this.rAFid = rAF(this.wrappedCb);
      }

      now() {
        return perf.now();
      }

    }

    const LAST_EVENT_TIMEOUT_MS = 10;
    const IGNORED_EVENTS = ['mouseover', 'mouseleave', 'mouseenter', 'mouseout'];
    const SUPPORTED_EVENTS = [// keyboard events
    'keydown', 'keypress', 'keyup', // mouse events
    'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel']; // 'wheel' event makes scrolling in Safari twitchy
    // https://github.com/AdguardTeam/ExtendedCss/issues/120

    const SAFARI_PROBLEMATIC_EVENTS = ['wheel'];
    /**
     * We use EventTracker to track the event that is likely to cause the mutation.
     * The problem is that we cannot use `window.event` directly from the mutation observer call
     * as we're not in the event handler context anymore.
     */

    class EventTracker {
      constructor() {
        _defineProperty(this, "getLastEventType", () => this.lastEventType);

        _defineProperty(this, "getTimeSinceLastEvent", () => {
          if (!this.lastEventTime) {
            return null;
          }

          return Date.now() - this.lastEventTime;
        });

        this.trackedEvents = utils.isSafariBrowser ? SUPPORTED_EVENTS.filter(event => !SAFARI_PROBLEMATIC_EVENTS.includes(event)) : SUPPORTED_EVENTS;
        this.trackedEvents.forEach(eventName => {
          document.documentElement.addEventListener(eventName, this.trackEvent, true);
        });
      }

      trackEvent(e) {
        this.lastEvent = e;
        this.lastEventType = e.type;
        this.lastEventTime = Date.now();
      }

      isIgnoredEventType() {
        const lastEventType = this.getLastEventType();
        const sinceLastEventTime = this.getTimeSinceLastEvent();
        return !!lastEventType && IGNORED_EVENTS.includes(lastEventType) && !!sinceLastEventTime && sinceLastEventTime < LAST_EVENT_TIMEOUT_MS;
      }

    }

    /**
     * A helper class for MutationObserver with extra property `styleProtectionCount`
     */
    class ExtMutationObserver {
      // extra property for keeping 'style fix counts'
      constructor(callback) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.observer = new utils.MutationObserver(callback);
        this.isActive = false;
        this.styleProtectionCount = 0;
      }
      /**
       * Observe target element and mark observer as active
       */


      observe(target, options) {
        this.isActive = true;
        this.observer.observe(target, options);
      }
      /**
       * Disconnect Observer and mark as inactive
       */


      disconnect() {
        this.isActive = false;
        this.observer.disconnect();
      }

    }

    /**
     * A helper class for applied rule stats
     */
    class TimingStats {
      constructor() {
        this.array = [];
        this.length = 0;
        this.sum = 0;
        this.squaredSum = 0;
        this.stddev = 0;
      }
      /**
       * Observe target element and mark observer as active
       */


      push(dataPoint) {
        this.array.push(dataPoint);
        this.length += 1;
        this.sum += dataPoint;
        this.squaredSum += dataPoint * dataPoint;
        this.mean = this.sum / this.length;
        this.stddev = Math.sqrt(this.squaredSum / this.length - Math.pow(this.mean, 2));
      }

    }

    const APPLY_RULES_DELAY = 150;
    const isEventListenerSupported = typeof window.addEventListener !== 'undefined';

    const observeDocument = (context, callback) => {
      // We are trying to limit the number of callback calls by not calling it on all kind of "hover" events.
      // The rationale behind this is that "hover" events often cause attributes modification,
      // but re-applying extCSS rules will be useless as these attribute changes are usually transient.
      const shouldIgnoreMutations = mutations => {
        // ignore if all mutations are about attributes changes
        return mutations.every(m => m.type === 'attributes');
      };

      if (utils.MutationObserver) {
        context.domMutationObserver = new utils.MutationObserver(mutations => {
          if (!mutations || mutations.length === 0) {
            return;
          }

          const eventTracker = new EventTracker();

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

    const disconnectDocument = (context, callback) => {
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


    const setStyleToElement = (node, style) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      Object.keys(style).forEach(prop => {
        // Apply this style only to existing properties
        // We can't use hasOwnProperty here (does not work in FF)
        if (typeof node.style.getPropertyValue(prop) !== 'undefined') {
          let value = style[prop]; // First we should remove !important attribute (or it won't be applied')

          value = utils.removeSuffix(value.trim(), '!important').trim();
          node.style.setProperty(prop, value, 'important');
        }
      });
    };

    const MAX_STYLE_PROTECTION_COUNT = 50;
    const protectionObserverOption = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['style']
    };
    /**
     * Creates MutationObserver protection callback
     * @param styles
     */

    const createProtectionCallback = styles => {
      const protectionCallback = (mutations, observer) => {
        if (!mutations.length) {
          return;
        }

        const {
          target
        } = mutations[0];
        observer.disconnect();
        styles.forEach(style => {
          setStyleToElement(target, style);
        });

        if (typeof observer.styleProtectionCount === 'undefined') {
          observer.styleProtectionCount = 0;
        }

        observer.styleProtectionCount += 1;

        if (observer.styleProtectionCount < MAX_STYLE_PROTECTION_COUNT) {
          observer.observe(target, protectionObserverOption);
        } else {
          utils.logError('ExtendedCss: infinite loop protection for style');
        }
      };

      return protectionCallback;
    };
    /**
     * Sets up a MutationObserver which protects style attributes from changes
     * @param node DOM node
     * @param rules rules
     * @returns Mutation observer used to protect attribute or null if there's nothing to protect
     */


    const protectStyleAttribute = (node, rules) => {
      if (!utils.MutationObserver) {
        return null;
      }

      const styles = [];
      rules.forEach(ruleData => {
        const {
          style
        } = ruleData;

        if (!style) {
          throw new Error("No affectedElement style to apply for selector: '".concat(ruleData.selector, "'"));
        }

        styles.push(style);
      });
      const protectionObserver = new ExtMutationObserver(createProtectionCallback(styles));
      protectionObserver.observe(node, protectionObserverOption);
      return protectionObserver;
    };

    /**
     * Finds affectedElement object for the specified DOM node
     * @param affElements context.affectedElements
     * @param domNode DOM node
     * @returns found affectedElement or undefined
     */
    const findAffectedElement = (affElements, domNode) => {
      return affElements.find(affEl => affEl.node === domNode);
    };

    const removeElement = (context, affectedElement) => {
      const {
        node
      } = affectedElement;
      affectedElement.removed = true;
      const elementSelector = utils.getNodeSelector(node); // check if the element has been already removed earlier

      const elementRemovalsCounter = context.removalsStatistic[elementSelector] || 0; // if removals attempts happened more than specified we do not try to remove node again

      if (elementRemovalsCounter > MAX_STYLE_PROTECTION_COUNT) {
        utils.logError("ExtendedCss: infinite loop protection for selector: '".concat(elementSelector, "'"));
        return;
      }

      if (node.parentElement) {
        node.parentElement.removeChild(node);
        context.removalsStatistic[elementSelector] = elementRemovalsCounter + 1;
      }
    };
    /**
     * Needed for getting affected node elements and handle style properties
     * before they are applied to them if it is necessary.
     *
     * Used by AdGuard Browser extension to display rules in Filtering log
     * and `collect-hits-count` (via tsurlfilter's CssHitsCounter)
     */


    /**
     * Applies style to the specified DOM node
     * @param context
     * @param affectedElement Object containing DOM node and rule to be applied
     */
    const applyStyle = (context, affectedElement) => {
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

      const {
        node
      } = affectedElement;

      for (let i = 0; i < affectedElement.rules.length; i += 1) {
        const {
          selector,
          style
        } = affectedElement.rules[i];

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


    const revertStyle = affElement => {
      var _affElement$protectio;

      if ((_affElement$protectio = affElement.protectionObserver) !== null && _affElement$protectio !== void 0 && _affElement$protectio.isActive) {
        affElement.protectionObserver.disconnect();
      }

      affElement.node.style.cssText = affElement.originalStyle;
    };
    /**
     * Applies specified rule and returns list of elements affected
     * @param ruleData rule to apply
     * @returns List of elements affected by this rule
     */


    const applyRule = (context, ruleData, asyncWrapper) => {
      // debugging mode can be enabled in two ways:
      // 1. for separate rules - by `{ debug: true; }`
      // 2. for all rules simultaneously by:
      //   - `{ debug: global; }` in any rule
      //   - positive `debug` property in ExtCssConfiguration
      const isDebuggingMode = !!ruleData.debug || context.debug;
      let startTime;

      if (isDebuggingMode) {
        startTime = asyncWrapper.now();
      }

      const {
        ast
      } = ruleData;
      const nodes = selectElementsByAst(ast);
      nodes.forEach(node => {
        let affectedElement = findAffectedElement(context.affectedElements, node);

        if (affectedElement) {
          affectedElement.rules.push(ruleData);
          applyStyle(context, affectedElement);
        } else {
          // Applying style first time
          const originalStyle = node.style.cssText;
          affectedElement = {
            node,
            // affected DOM node
            rules: [ruleData],
            // rule to be applied
            originalStyle,
            // original node style
            protectionObserver: null // style attribute observer

          };
          applyStyle(context, affectedElement);
          context.affectedElements.push(affectedElement);
        }
      });

      if (isDebuggingMode && startTime) {
        const elapsed = asyncWrapper.now() - startTime;

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
    const printTimingInfo = context => {
      if (context.timingsPrinted) {
        return;
      }

      context.timingsPrinted = true;
      const timingsToLog = [];
      context.parsedRules.forEach(rule => {
        if (rule.timingStats) {
          const record = {
            selector: rule.selector,
            timings: rule.timingStats
          };
          timingsToLog.push(record);
        }
      });

      if (timingsToLog.length === 0) {
        return;
      } // add location.href to the message to distinguish frames


      utils.logInfo('[ExtendedCss] Timings in milliseconds for %o:\n%o', window.location.href, timingsToLog);
    };

    const mainObserve = (context, mainCallback) => {
      if (context.isDomObserved) {
        return;
      } // handle dynamically added elements


      context.isDomObserved = true;
      observeDocument(context, mainCallback);
    };

    const mainDisconnect = (context, mainCallback) => {
      if (!context.isDomObserved) {
        return;
      }

      context.isDomObserved = false;
      disconnectDocument(context, mainCallback);
    };
    /**
     * Extended css class
     */


    class ExtendedCss {
      constructor(configuration) {
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
          mainCallback: () => {}
        }; // true if any one rule in styleSheet has `debug: global`

        this.context.debug = this.context.parsedRules.some(ruleData => {
          return ruleData.debug === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE;
        });
        this.applyRulesScheduler = new AsyncWrapper(this.context, this.applyRules, APPLY_RULES_DELAY);
        this.mainCallback = this.applyRulesScheduler.run.bind(this.applyRulesScheduler);
        this.context.mainCallback = this.mainCallback;

        if (this.context.beforeStyleApplied && typeof this.context.beforeStyleApplied !== 'function') {
          throw new Error("Invalid configuration. Type of 'beforeStyleApplied' should be a function, received: '".concat(typeof this.context.beforeStyleApplied, "'")); // eslint-disable-line max-len
        }
      }
      /**
       * Applies filtering rules
       */


      applyRules(context) {
        const newSelectedElements = []; // some rules could make call - selector.querySelectorAll() temporarily to change node id attribute
        // this caused MutationObserver to call recursively
        // https://github.com/AdguardTeam/ExtendedCss/issues/81

        mainDisconnect(context, context.mainCallback);
        context.parsedRules.forEach(ruleData => {
          const nodes = applyRule(context, ruleData, this.applyRulesScheduler);
          Array.prototype.push.apply(newSelectedElements, nodes);
        }); // Now revert styles for elements which are no more affected

        let l = context.affectedElements.length; // do nothing if there is no elements to process

        while (l) {
          const affectedEl = context.affectedElements[l - 1];

          if (!newSelectedElements.includes(affectedEl.node)) {
            // Time to revert style
            revertStyle(affectedEl);
            context.affectedElements.splice(l - 1, 1);
          } else if (!affectedEl.removed) {
            var _affectedEl$protectio;

            // Add style protection observer
            // Protect "style" attribute from changes
            if (!((_affectedEl$protectio = affectedEl.protectionObserver) !== null && _affectedEl$protectio !== void 0 && _affectedEl$protectio.isActive)) {
              affectedEl.protectionObserver = protectStyleAttribute(affectedEl.node, affectedEl.rules);
            }
          }

          l -= 1;
        } // After styles are applied we can start observe again


        mainObserve(context, context.mainCallback);
        printTimingInfo(context);
      }

      apply() {
        this.applyRules(this.context);

        if (document.readyState !== 'complete') {
          document.addEventListener('DOMContentLoaded', () => {
            this.applyRules(this.context);
          }, false);
        }
      }
      /**
       * Disposes ExtendedCss and removes our styles from matched elements
       */


      dispose() {
        mainDisconnect(this.context, this.context.mainCallback);
        this.context.affectedElements.forEach(el => {
          revertStyle(el);
        });
      }
      /** Exposed for testing purposes only */


      _getAffectedElements() {
        return this.context.affectedElements;
      }
      /**
       * Expose querySelectorAll for debugging and validating selectors
       * @param {string} selector selector text
       * @param {boolean} [noTiming=true] if true -- do not print the timing to the console
       * @returns {Array<Node>|NodeList} a list of elements found
       * @throws Will throw an error if the argument is not a valid selector
       */


      query(selector) {
        let noTiming = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (typeof selector !== 'string') {
          throw new Error('Selector should be defined as a string.');
        }

        const asyncWrapper = new AsyncWrapper(this.context);
        const start = asyncWrapper.now();

        try {
          const extCssDoc = new ExtCssDocument();
          return extCssDoc.querySelectorAll(selector);
        } finally {
          const end = asyncWrapper.now();

          if (!noTiming) {
            utils.logInfo("[ExtendedCss] Elapsed: ".concat(Math.round((end - start) * 1000), " \u03BCs."));
          }
        }
      } // TODO: consider adding a new ExtendedCss method for selector validation
      // as there is such old test "Test using ExtendedCss.query for selectors validation".
      // ExtendedCss.query also used in compiler to validate selector:
      // eslint-disable-next-line max-len
      // https://bit.adguard.com/projects/ADGUARD-FILTERS/repos/compiler/browse/src/main/utils/extended-css-validator.js#41


    }

    exports.ExtendedCss = ExtendedCss;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});