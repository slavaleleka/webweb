/* querySelectorAll testing */
var testExtCss = (function (exports) {
    'use strict';

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

    const CONTAINS_PSEUDO = 'contains';
    const HAS_TEXT_PSEUDO = 'has-text';
    const ABP_CONTAINS_PSEUDO = '-abp-contains';
    const MATCHES_CSS_PSEUDO = 'matches-css';
    const MATCHES_CSS_BEFORE_PSEUDO = 'matches-css-before';
    const MATCHES_CSS_AFTER_PSEUDO = 'matches-css-after';
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

    const HAS_PSEUDO_CLASS_MARKER = 'has';
    const IF_PSEUDO_CLASS_MARKER = 'if';
    const ABP_HAS_PSEUDO_CLASS_MARKER = '-abp-has';
    const HAS_PSEUDO_CLASS_MARKERS = [HAS_PSEUDO_CLASS_MARKER, IF_PSEUDO_CLASS_MARKER, ABP_HAS_PSEUDO_CLASS_MARKER];
    const IF_NOT_PSEUDO_CLASS_MARKER = 'if-not';
    const IS_PSEUDO_CLASS_MARKER = 'is';
    const NOT_PSEUDO_CLASS_MARKER = 'not';
    const ABSOLUTE_PSEUDO_CLASSES = [CONTAINS_PSEUDO, HAS_TEXT_PSEUDO, ABP_CONTAINS_PSEUDO, MATCHES_CSS_PSEUDO, MATCHES_CSS_BEFORE_PSEUDO, MATCHES_CSS_AFTER_PSEUDO, MATCHES_ATTR_PSEUDO_CLASS_MARKER, MATCHES_PROPERTY_PSEUDO_CLASS_MARKER, XPATH_PSEUDO_CLASS_MARKER, NTH_ANCESTOR_PSEUDO_CLASS_MARKER, UPWARD_PSEUDO_CLASS_MARKER];
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
    };
    const CSS_PROPERTIES = {
      BACKGROUND: 'background',
      BACKGROUND_IMAGE: 'background-image',
      CONTENT: 'content',
      OPACITY: 'opacity'
    }; // limit applying of wildcard :is and :not pseudo-class only to html children
    // e.g. ':is(.page, .main) > .banner' or '*:not(span):not(p)'

    const IS_OR_NOT_PSEUDO_SELECTING_ROOT = `html ${ASTERISK}`; // limit applying of :xpath pseudo-class with to 'any' element
    // https://github.com/AdguardTeam/ExtendedCss/issues/115

    const XPATH_PSEUDO_SELECTING_ROOT = 'body'; // regexp that matches backward compatible syntaxes

    const REGEXP_VALID_OLD_SYNTAX = /\[-(?:ext)-([a-z-_]+)=(["'])((?:(?=(\\?))\4.)*?)\2\]/g; // marker for checking invalid selector after old-syntax normalizing by selector converter

    const INVALID_OLD_SYNTAX_MARKER = '[-ext-';
    let BrowserName;

    (function (BrowserName) {
      BrowserName["Chrome"] = "Chrome";
      BrowserName["Firefox"] = "Firefox";
      BrowserName["Edge"] = "Edg";
      BrowserName["Opera"] = "Opera";
      BrowserName["Safari"] = "Safari";
    })(BrowserName || (BrowserName = {}));

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
      const re = new RegExp(`([^\\\\]|^)\\\\${quoteChar}`, 'g');
      const value = rawValue.replace(re, `$1${quoteChar}`);
      return `:${name}(${value})`;
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
        throw new Error(`Invalid extended-css old syntax selector: '${selector}'`);
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

    /**
     * Class needed for creating ast nodes while selector parsing.
     * Used for SelectorList, Selector, ExtendedSelector
     */
    class AnySelectorNode {
      constructor(type) {
        _defineProperty(this, "children", []);

        this.type = type;
      }
      /**
       * Adds child node to children array
       */


      addChild(child) {
        this.children.push(child);
      }

    }
    /**
     * Class needed for creating ast RegularSelector node while selector parsing
     */

    class RegularSelectorNode extends AnySelectorNode {
      constructor(value) {
        super(NodeType.RegularSelector);
        this.value = value;
      }

    }
    /**
     * Class needed for creating ast RelativePseudoClass node while selector parsing
     */

    class RelativePseudoClassNode extends AnySelectorNode {
      constructor(name) {
        super(NodeType.RelativePseudoClass);
        this.name = name;
      }

    }
    /**
     * Class needed for creating ast AbsolutePseudoClass node while selector parsing
     */

    class AbsolutePseudoClassNode extends AnySelectorNode {
      constructor(name) {
        super(NodeType.AbsolutePseudoClass);

        _defineProperty(this, "value", '');

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
    const flatten = input => {
      const stack = [];
      input.forEach(el => stack.push(el));
      const res = [];

      while (stack.length) {
        // pop value from stack
        const next = stack.pop();

        if (!next) {
          throw new Error('Unable to make array flat');
        }

        if (Array.isArray(next)) {
          // push back array items, won't modify the original input
          next.forEach(el => stack.push(el));
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

    const getLast = array => {
      return array[array.length - 1];
    };

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
     * Gets the node which is being collected
     * or null if there is no such one
     * @param context parser context
     */
    const getBufferNode = context => {
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


    const updateBufferNode = (context, tokenValue) => {
      const bufferNode = getBufferNode(context);

      if (bufferNode === null) {
        throw new Error('No bufferNode to update');
      }

      const {
        type
      } = bufferNode;

      if (type === NodeType.RegularSelector || type === NodeType.AbsolutePseudoClass) {
        bufferNode.value += tokenValue;
      } else {
        throw new Error(`${bufferNode.type} node can not be updated. Only RegularSelector and AbsolutePseudoClass are supported.`); // eslint-disable-line max-len
      }
    };
    /**
     * Adds SelectorList node to context.ast at the start of ast collecting
     * @param context parser context
     */


    const addSelectorListNode = context => {
      const selectorListNode = new AnySelectorNode(NodeType.SelectorList);
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


    const addAstNodeByType = function (context, type) {
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
     * @param context parser context
     * @param tokenValue value of regular selector
     */


    const initAst = (context, tokenValue) => {
      addSelectorListNode(context);
      addAstNodeByType(context, NodeType.Selector); // RegularSelector node is always the first child of Selector node

      addAstNodeByType(context, NodeType.RegularSelector, tokenValue);
    };
    /**
     * Inits selector list subtree for relative extended pseudo-classes, e.g. :has(), :not()
     * @param context parser context
     * @param tokenValue optional, value of inner regular selector
     */


    const initRelativeSubtree = function (context) {
      let tokenValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
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


    const parse = selector => {
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
                throw new Error(`No white space is allowed before or after extended pseudo-class name in selector: '${selector}'`); // eslint-disable-line max-len
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
                  throw new Error(`'${selector}' is not a valid selector`);
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
                    throw new Error(`'${selector}' is not a valid selector.`);
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
                  throw new Error(`No white space is allowed before or after extended pseudo-class name in selector: '${selector}'`); // eslint-disable-line max-len
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
                    throw new Error(`Usage of :${nextTokenValue} pseudo-class is not allowed inside upper :has`); // eslint-disable-line max-len
                  }

                  if (!isSupportedExtendedPseudo(nextTokenValue.toLowerCase())) {
                    if (nextTokenValue.toLowerCase() === REMOVE_PSEUDO_CLASS_MARKER) {
                      // :remove() pseudo-class should be handled before
                      // as it is not about element selecting but actions with elements
                      // e.g. 'body > div:empty:remove()'
                      throw new Error(`Selector parser error: invalid :remove() pseudo-class in selector: '${selector}'`); // eslint-disable-line max-len
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
                      throw new Error(`Usage of :${nextTokenValue} pseudo-class is not allowed inside regular pseudo: '${getLast(context.standardPseudoNamesStack)}'`);
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
                    throw new Error(`Selector parser error: invalid :remove() pseudo-class in selector: '${selector}'`); // eslint-disable-line max-len
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
                    const lastStandardPseudo = context.standardPseudoNamesStack.pop();

                    if (!lastStandardPseudo) {
                      // standard pseudo should be in standardPseudoNamesStack
                      // as related to standardPseudoBracketsStack
                      throw new Error(`Parsing error. Invalid selector: ${selector}`);
                    } // Disallow :has() after regular pseudo-elements
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=669058#c54 [3]


                    if (Object.values(REGULAR_PSEUDO_ELEMENTS).includes(lastStandardPseudo) // check token which is next to closing parentheses and token after it
                    // parser position is on bracket after 'foo' now:
                    // e.g. '::part(foo):has(.a)'
                    && nextTokenValue === COLON && nextToNextTokenValue && HAS_PSEUDO_CLASS_MARKERS.includes(nextToNextTokenValue)) {
                      // eslint-disable-next-line max-len
                      throw new Error(`Usage of :${nextToNextTokenValue} pseudo-class is not allowed after any regular pseudo-element: '${lastStandardPseudo}'`);
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
                throw new Error(`'${selector}' is not a valid selector.`);
            }

            break;
          // no default statement for Marks as they are limited to SUPPORTED_SELECTOR_MARKS
          // and all other symbol combinations are tokenized as Word
          // so error for invalid Word will be thrown later while element selecting by parsed ast

          default:
            throw new Error(`Unknown type of token: '${tokenValue}'.`);
        }

        i += 1;
      }

      if (context.ast === null) {
        throw new Error(`'${selector}' is not a valid selector`);
      }

      if (context.extendedPseudoNamesStack.length > 0 || context.extendedPseudoBracketsStack.length > 0) {
        // eslint-disable-next-line max-len
        throw new Error(`Unbalanced brackets for extended pseudo-class: '${getLast(context.extendedPseudoNamesStack)}'`);
      }

      if (context.isAttributeBracketsOpen) {
        throw new Error(`Unbalanced brackets for attributes is selector: '${selector}'`);
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

    /**
     * Returns textContent of passed domElement
     * @param domElement
     */

    const getNodeTextContent = domElement => {
      return (nodeTextContentGetter === null || nodeTextContentGetter === void 0 ? void 0 : nodeTextContentGetter.apply(domElement)) || '';
    };
    /**
     * Returns element selector text based on it's tagName and attributes
     * @param element
     */

    const getElementSelectorDesc = element => {
      let selectorText = element.tagName.toLowerCase();
      selectorText += Array.from(element.attributes).map(attr => {
        return `[${attr.name}="${element.getAttribute(attr.name)}"]`;
      }).join('');
      return selectorText;
    };
    /**
     * Checks whether the element is instance of HTMLElement
     * @param element
     */

    const isHtmlElement = element => {
      return element instanceof HTMLElement;
    };

    const logger = {
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
     * Replaces all `pattern`s with `replacement` in `input` string.
     * String.replaceAll() polyfill because it is not supported by old browsers, e.g. Chrome 55
     * https://caniuse.com/?search=String.replaceAll
     * @param input
     * @param pattern
     * @param replacement
     */

    const replaceAll = (input, pattern, replacement) => {
      if (!input) {
        return input;
      }

      return input.split(pattern).join(replacement);
    };
    /**
     * Converts string pattern to regular expression
     * @param str
     */

    const toRegExp = str => {
      if (str.startsWith(SLASH) && str.endsWith(SLASH)) {
        return new RegExp(str.slice(1, -1));
      }

      const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(escaped);
    };
    /**
     * Converts any simple type value to string type
     * e.g. undefined -> 'undefined'
     * @param value
     */

    const convertTypeIntoString = value => {
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
    };
    /**
     * Converts instance of string value into other simple types
     * e.g. 'null' -> null, 'true' -> true
     * @param value
     */

    const convertTypeFromString = value => {
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
    };

    /**
     * Simple check for Safari browser
     */

    const isSafariBrowser = navigator.vendor === 'Apple Computer, Inc.';
    ({
      [BrowserName.Chrome]: {
        // avoid Chromium-based Edge browser
        MASK: /\s(Chrome)\/(\d+)\..+\s(?!.*Edg\/)/,
        MIN_VERSION: 55
      },
      [BrowserName.Firefox]: {
        MASK: /\s(Firefox)\/(\d+)\./,
        MIN_VERSION: 52
      },
      [BrowserName.Edge]: {
        MASK: /\s(Edg)\/(\d+)\./,
        MIN_VERSION: 80
      },
      [BrowserName.Opera]: {
        MASK: /\s(OPR)\/(\d+)\./,
        MIN_VERSION: 80
      },
      [BrowserName.Safari]: {
        MASK: /\sVersion\/(\d+)\..+\s(Safari)\//,
        MIN_VERSION: 10
      }
    });

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
    const removeContentQuotes = str => {
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

    const escapeRegExp = str => {
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
      // should be escaped . * + ? ^ $ { } ( ) | [ ] / \
      // except of * | ^
      const specials = ['.', '+', '?', '$', '{', '}', '(', ')', '[', ']', '\\', '/'];
      const specialsRegex = new RegExp(`[${specials.join('\\')}]`, 'g');
      return str.replace(specialsRegex, '\\$&');
    };
    /**
     * Converts :matches-css arg property value match to regexp
     * @param rawArg
     */


    const convertStyleMatchValueToRegexp = rawArg => {
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

        arg = replaceAll(arg, ASTERISK, REGEXP_ANY_SYMBOL);
      }

      return new RegExp(arg, 'i');
    };
    /**
     * Makes some properties values compatible
     * @param propertyName
     * @param propertyValue
     */


    const normalizePropertyValue = (propertyName, propertyValue) => {
      let normalized = '';

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


    const getComputedStylePropertyValue = (domElement, propertyName, regularPseudoElement) => {
      const style = getComputedStyle(domElement, regularPseudoElement);
      const propertyValue = style.getPropertyValue(propertyName);
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
     * @param argsData
     */


    const isStyleMatched = argsData => {
      const {
        pseudoName,
        pseudoArg,
        domElement,
        regularPseudoElement
      } = argsData;
      const {
        name: matchName,
        value: matchValue
      } = getPseudoArgData(pseudoArg, COLON);

      if (!matchName || !matchValue) {
        throw new Error(`Required property name or value is missing in :${pseudoName}() arg: '${pseudoArg}'`);
      }

      let valueRegexp;

      try {
        valueRegexp = convertStyleMatchValueToRegexp(matchValue);
      } catch (e) {
        logger.error(e);
        throw new Error(`Invalid argument of :${pseudoName}() pseudo-class: '${pseudoArg}'`);
      }

      const value = getComputedStylePropertyValue(domElement, matchName, regularPseudoElement);
      return valueRegexp && valueRegexp.test(value);
    };
    /**
     * Validates string arg for :matches-attr() and :matches-property()
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
     * @param [isWildcardAllowed=false] flag for wildcard (`*`) using as pseudo-class arg
     */


    const getValidMatcherArg = function (rawArg) {
      let isWildcardAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // if rawArg is missing for pseudo-class
      // e.g. :matches-attr()
      // error will be thrown before getValidMatcherArg() is called:
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
          arg = toRegExp(rawArg);
        } else {
          throw new Error(`Invalid regexp: '${rawArg}'`);
        }
      } else if (rawArg.includes(ASTERISK)) {
        if (rawArg === ASTERISK && !isWildcardAllowed) {
          // e.g. :matches-attr(*)
          throw new Error(`Argument should be more specific than ${rawArg}`);
        }

        arg = replaceAll(rawArg, ASTERISK, REGEXP_ANY_SYMBOL);
        arg = new RegExp(arg);
      } else {
        if (!validateStrMatcherArg(rawArg)) {
          throw new Error(`Invalid argument: '${rawArg}'`);
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
        throw new Error(`Required attribute name is missing in :${pseudoName} arg: ${pseudoArg}`);
      }

      return {
        rawName,
        rawValue
      };
    };
    /**
     * Checks whether the domElement is matched by :matches-attr() arg
     * @param argsData
     */

    const isAttributeMatched = argsData => {
      const {
        pseudoName,
        pseudoArg,
        domElement
      } = argsData;
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
        logger.error(e);
        throw new SyntaxError(e.message);
      }

      let isMatched = false;
      let i = 0;

      while (i < elementAttributes.length && !isMatched) {
        const attr = elementAttributes[i];
        const isNameMatched = attrNameMatch instanceof RegExp ? attrNameMatch.test(attr.name) : attrNameMatch === attr.name;

        if (!rawAttrValue) {
          // for rules with no attribute value specified
          // e.g. :matches-attr("/regex/") or :matches-attr("attr-name")
          isMatched = isNameMatched;
        } else {
          let attrValueMatch;

          try {
            attrValueMatch = getValidMatcherArg(rawAttrValue);
          } catch (e) {
            // eslint-disable-line @typescript-eslint/no-explicit-any
            logger.error(e);
            throw new SyntaxError(e.message);
          }

          const isValueMatched = attrValueMatch instanceof RegExp ? attrValueMatch.test(attr.value) : attrValueMatch === attr.value;
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

    const parseRawPropChain = input => {
      if (input.length > 1 && input.startsWith(DOUBLE_QUOTE) && input.endsWith(DOUBLE_QUOTE)) {
        input = input.slice(1, -1);
      }

      const chainChunks = input.split(DOT);
      const chainPatterns = [];
      let patternBuffer = '';
      let isRegexpPattern = false;
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

          patternBuffer += `.${chunk}`;
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
        throw new Error(`Invalid regexp property pattern '${input}'`);
      }

      const chainMatchPatterns = chainPatterns.map(pattern => {
        if (pattern.length === 0) {
          // e.g. '.prop.id' or 'nested..test'
          throw new Error(`Empty pattern '${pattern}' is invalid in chain '${input}'`);
        }

        let validPattern;

        try {
          validPattern = getValidMatcherArg(pattern, true);
        } catch (e) {
          logger.error(e);
          throw new Error(`Invalid property pattern '${pattern}' in property chain '${input}'`);
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
     * @param argsData
     */


    const isPropertyMatched = argsData => {
      const {
        pseudoName,
        pseudoArg,
        domElement
      } = argsData;
      const {
        rawName: rawPropertyName,
        rawValue: rawPropertyValue
      } = getRawMatchingData(pseudoName, pseudoArg); // chained property name can not include '/' or '.'
      // so regex prop names with such escaped characters are invalid

      if (rawPropertyName.includes('\\/') || rawPropertyName.includes('\\.')) {
        throw new Error(`Invalid :${pseudoName} name pattern: ${rawPropertyName}`);
      }

      let propChainMatches;

      try {
        propChainMatches = parseRawPropChain(rawPropertyName);
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        logger.error(e);
        throw new SyntaxError(e.message);
      }

      const ownerObjArr = filterRootsByRegexpChain(domElement, propChainMatches);

      if (ownerObjArr.length === 0) {
        return false;
      }

      let isMatched = true;

      if (rawPropertyValue) {
        let propValueMatch;

        try {
          propValueMatch = getValidMatcherArg(rawPropertyValue);
        } catch (e) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          logger.error(e);
          throw new SyntaxError(e.message);
        }

        if (propValueMatch) {
          for (let i = 0; i < ownerObjArr.length; i += 1) {
            const realValue = ownerObjArr[i].value;

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

    const isTextMatched = argsData => {
      const {
        pseudoName,
        pseudoArg,
        domElement
      } = argsData;
      const textContent = getNodeTextContent(domElement);
      let isTextContentMatched;
      /**
       * TODO: consider adding helper for parsing pseudoArg (string or regexp) later,
       * seems to be similar for few extended pseudo-classes
       */

      let pseudoArgToMatch = pseudoArg;

      if (pseudoArgToMatch.startsWith(SLASH) && REGEXP_WITH_FLAGS_REGEXP.test(pseudoArgToMatch)) {
        // regexp arg
        const flagsIndex = pseudoArgToMatch.lastIndexOf('/');
        const flagsStr = pseudoArgToMatch.substring(flagsIndex + 1);
        pseudoArgToMatch = pseudoArgToMatch.substring(0, flagsIndex + 1).slice(1, -1).replace(/\\([\\"])/g, '$1');
        let regex;

        try {
          regex = new RegExp(pseudoArgToMatch, flagsStr);
        } catch (e) {
          throw new Error(`Invalid argument of :${pseudoName}() pseudo-class: ${pseudoArg}`);
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
    const getValidNumberAncestorArg = (rawArg, pseudoName) => {
      const deep = Number(rawArg);

      if (Number.isNaN(deep) || deep < 1 || deep >= 256) {
        throw new Error(`Invalid argument of :${pseudoName} pseudo-class: '${rawArg}'`);
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
      let ancestor = null;
      let i = 0;

      while (i < deep) {
        ancestor = domElement.parentElement;

        if (!ancestor) {
          throw new Error(`Argument of :${pseudoName}() pseudo-class is too big — '${deep}', out of DOM elements root.`); // eslint-disable-line max-len
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

    /**
     * Wrapper to run matcher `callback` with `args`
     * and throw error with `errorMessage` if `callback` run fails
     * @param callback
     * @param argsData
     * @param errorMessage
     */
    const matcherWrapper = (callback, argsData, errorMessage) => {
      let isMatched;

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


    const isMatchedByAbsolutePseudo = (domElement, pseudoName, pseudoArg) => {
      let argsData;
      let errorMessage;
      let callback; // no standard pseudo-element is needed for :matched-css

      let regularPseudoElement = '';

      switch (pseudoName) {
        case CONTAINS_PSEUDO:
        case HAS_TEXT_PSEUDO:
        case ABP_CONTAINS_PSEUDO:
          callback = isTextMatched;
          argsData = {
            pseudoName,
            pseudoArg,
            domElement
          };
          errorMessage = `Error while matching element text content by arg '${pseudoArg}'.`;
          break;

        case MATCHES_CSS_PSEUDO:
        case MATCHES_CSS_AFTER_PSEUDO:
        case MATCHES_CSS_BEFORE_PSEUDO:
          if (pseudoName === MATCHES_CSS_BEFORE_PSEUDO) {
            regularPseudoElement = `${COLON}${REGULAR_PSEUDO_ELEMENTS.BEFORE}`;
          } else if (pseudoName === MATCHES_CSS_AFTER_PSEUDO) {
            regularPseudoElement = `${COLON}${REGULAR_PSEUDO_ELEMENTS.AFTER}`;
          }

          callback = isStyleMatched;
          argsData = {
            pseudoName,
            pseudoArg,
            domElement,
            regularPseudoElement
          };
          errorMessage = `Error while matching element style by arg '${pseudoArg}'.`;
          break;

        case MATCHES_ATTR_PSEUDO_CLASS_MARKER:
          callback = isAttributeMatched;
          argsData = {
            domElement,
            pseudoName,
            pseudoArg
          };
          errorMessage = `Error while matching element attributes by arg '${pseudoArg}'.`;
          break;

        case MATCHES_PROPERTY_PSEUDO_CLASS_MARKER:
          callback = isPropertyMatched;
          argsData = {
            domElement,
            pseudoName,
            pseudoArg
          };
          errorMessage = `Error while matching element properties by arg '${pseudoArg}'.`;
          break;

        default:
          throw new Error(`Unknown absolute pseudo-class :${pseudoName}()`);
      }

      return matcherWrapper(callback, argsData, errorMessage);
    };
    const findByAbsolutePseudoPseudo = {
      /**
       * Gets list of nth ancestors relative to every dom node from domElements list
       * @param domElements dom nodes
       * @param rawPseudoArg number arg of :nth-ancestor or :upward pseudo-class
       * @param pseudoName pseudo-class name
       */
      nthAncestor: (domElements, rawPseudoArg, pseudoName) => {
        const deep = getValidNumberAncestorArg(rawPseudoArg, pseudoName);
        const ancestors = domElements.map(domElement => {
          let ancestor = null;

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
      xpath: (domElements, rawPseudoArg) => {
        const foundElements = domElements.map(domElement => {
          const result = [];
          let xpathResult;

          try {
            xpathResult = document.evaluate(rawPseudoArg, domElement, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
          } catch (e) {
            logger.error(e);
            throw new Error(`Invalid argument of :xpath pseudo-class: '${rawPseudoArg}'`);
          }

          let node = xpathResult.iterateNext();

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
      upward: (domElements, rawPseudoArg) => {
        if (!validateStandardSelector(rawPseudoArg)) {
          throw new Error(`Invalid argument of :upward pseudo-class: '${rawPseudoArg}'`);
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
    const hasRelativesBySelectorList = argsData => {
      const {
        element,
        relativeSelectorList,
        pseudoName
      } = argsData;
      return relativeSelectorList.children // Array.every() is used here as each Selector node from SelectorList should exist on page
      .every(selector => {
        var _relativeRegularSelec, _relativeRegularSelec2;

        // selectorList.children always starts with regular selector as any selector generally
        const [relativeRegularSelector] = selector.children;

        if (!relativeRegularSelector) {
          throw new Error(`RegularSelector is missing for :${pseudoName} pseudo-class.`);
        }

        let specificity = '';
        let rootElement = null;

        if ((_relativeRegularSelec = relativeRegularSelector.value) !== null && _relativeRegularSelec !== void 0 && _relativeRegularSelec.startsWith(NEXT_SIBLING_COMBINATOR) || (_relativeRegularSelec2 = relativeRegularSelector.value) !== null && _relativeRegularSelec2 !== void 0 && _relativeRegularSelec2.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
          /**
           * For matching the element by "element:has(+ next-sibling)" and "element:has(~ sibling)"
           * we check whether the element's parentElement has specific direct child combination
           * e.g. 'h1:has(+ .share)' -> `h1Node.parentElement.querySelectorAll(':scope > h1 + .share')`
           * https://www.w3.org/TR/selectors-4/#relational
           */
          rootElement = element.parentElement;
          const elementSelectorText = element.tagName.toLowerCase();
          specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}${CHILD_COMBINATOR}${elementSelectorText}`;
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
          specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}${DESCENDANT_COMBINATOR}`;
          rootElement = element;
        }

        if (!rootElement) {
          throw new Error(`Selection by :${pseudoName} pseudo-class is not possible.`);
        }

        let relativeElements;

        try {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          relativeElements = getElementsForSelectorNode(selector, rootElement, specificity);
        } catch (e) {
          logger.error(e); // fail for invalid selector

          throw new Error(`Invalid selector for :${pseudoName} pseudo-class: '${relativeRegularSelector.value}'`);
        }

        return relativeElements.length > 0;
      });
    };
    /**
     * Checks whether the element is an any element specified by pseudo-class arg.
     * Used for :is() and :not()
     * @param argsData
     */

    const isAnyElementBySelectorList = argsData => {
      const {
        element,
        relativeSelectorList,
        pseudoName,
        errorOnInvalidSelector
      } = argsData;
      return relativeSelectorList.children // Array.some() is used here as any selector from selector list should exist on page
      .some(selector => {
        // selectorList.children always starts with regular selector
        const [relativeRegularSelector] = selector.children;

        if (!relativeRegularSelector) {
          throw new Error(`RegularSelector is missing for :${pseudoName} pseudo-class.`);
        }
        /**
         * For checking the element by 'div:is(.banner)' and 'div:not([data="content"])
         * we check whether the element's parentElement has any specific direct child
         */


        const rootElement = element.parentElement;

        if (!rootElement) {
          throw new Error(`Selection by :${pseudoName} pseudo-class is not possible.`);
        }
        /**
         * So we calculate the element "description" by it's tagname and attributes for targeting
         * and use it to specify the selection
         * e.g. 'div:is(.banner)' -> `divNode.parentElement.querySelectorAll(':scope > div[class="banner"]')`
         */


        const elementSelectorText = getElementSelectorDesc(element);
        const specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}${CHILD_COMBINATOR}${elementSelectorText}`;
        let anyElements;

        try {
          anyElements = getElementsForSelectorNode(selector, rootElement, specificity);
        } catch (e) {
          if (errorOnInvalidSelector) {
            // fail on invalid selectors for :not()
            logger.error(e);
            throw new Error(`Invalid selector for :${pseudoName} pseudo-class: '${relativeRegularSelector.value}'`); // eslint-disable-line max-len
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

    const getByRegularSelector = (regularSelectorNode, root, specificity) => {
      if (!regularSelectorNode.value) {
        throw new Error('RegularSelector value should be specified');
      }

      const selectorText = specificity ? `${specificity}${regularSelectorNode.value}` : regularSelectorNode.value;
      let selectedElements = [];

      try {
        selectedElements = Array.from(root.querySelectorAll(selectorText));
      } catch (e) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(`Error: unable to select by '${selectorText}' — ${e.message}`);
      }

      return selectedElements;
    };
    /**
     * Returns list of dom elements filtered or selected by ExtendedSelector node
     * @param domElements array of dom elements
     * @param extendedSelectorNode ExtendedSelector node
     * @returns array of dom elements
     */

    const getByExtendedSelector = (domElements, extendedSelectorNode) => {
      let foundElements = [];
      const pseudoName = extendedSelectorNode.children[0].name;

      if (!pseudoName) {
        // extended pseudo-classes should have a name
        throw new Error('Extended pseudo-class should have a name');
      }

      if (ABSOLUTE_PSEUDO_CLASSES.includes(pseudoName)) {
        const absolutePseudoArg = extendedSelectorNode.children[0].value;

        if (!absolutePseudoArg) {
          // absolute extended pseudo-classes should have an argument
          throw new Error(`Missing arg for :${pseudoName} pseudo-class`);
        }

        if (pseudoName === NTH_ANCESTOR_PSEUDO_CLASS_MARKER) {
          // :nth-ancestor()
          foundElements = findByAbsolutePseudoPseudo.nthAncestor(domElements, absolutePseudoArg, pseudoName);
        } else if (pseudoName === XPATH_PSEUDO_CLASS_MARKER) {
          // :xpath()
          try {
            document.createExpression(absolutePseudoArg, null);
          } catch (e) {
            throw new Error(`Invalid argument of :${pseudoName} pseudo-class: '${absolutePseudoArg}'`);
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
          foundElements = domElements.filter(element => {
            return isMatchedByAbsolutePseudo(element, pseudoName, absolutePseudoArg);
          });
        }
      } else if (RELATIVE_PSEUDO_CLASSES.includes(pseudoName)) {
        const relativeSelectorNodes = extendedSelectorNode.children[0].children;

        if (relativeSelectorNodes.length === 0) {
          // extended relative pseudo-classes should have an argument as well
          throw new Error(`Missing arg for :${pseudoName} pseudo-class`);
        }

        const [relativeSelectorList] = relativeSelectorNodes; // needed for :not()

        let errorOnInvalidSelector = false;
        let relativePredicate;

        switch (pseudoName) {
          case HAS_PSEUDO_CLASS_MARKER:
          case IF_PSEUDO_CLASS_MARKER:
          case ABP_HAS_PSEUDO_CLASS_MARKER:
            relativePredicate = element => hasRelativesBySelectorList({
              element,
              relativeSelectorList,
              pseudoName
            });

            break;

          case IF_NOT_PSEUDO_CLASS_MARKER:
            relativePredicate = element => !hasRelativesBySelectorList({
              element,
              relativeSelectorList,
              pseudoName
            });

            break;

          case IS_PSEUDO_CLASS_MARKER:
            relativePredicate = element => isAnyElementBySelectorList({
              element,
              relativeSelectorList,
              pseudoName
            });

            break;

          case NOT_PSEUDO_CLASS_MARKER:
            errorOnInvalidSelector = true;

            relativePredicate = element => !isAnyElementBySelectorList({
              element,
              relativeSelectorList,
              pseudoName,
              errorOnInvalidSelector
            });

            break;

          default:
            throw new Error(`Unknown relative pseudo-class :${pseudoName}()`);
        }

        foundElements = domElements.filter(relativePredicate);
      } else {
        // extra check is parser missed something
        throw new Error(`Unknown extended pseudo-class: ':${pseudoName}'`);
      }

      return foundElements;
    };
    /**
     * Returns list of dom elements which is selected by RegularSelector value
     * @param domElements array of dom elements
     * @param regularSelectorNode RegularSelector node
     * @returns array of dom elements
     */

    const getByFollowingRegularSelector = (domElements, regularSelectorNode) => {
      // array of arrays because of Array.map() later
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
          const specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}`;
          return getByRegularSelector(regularSelectorNode, root, specificity);
        });
      } else if (value.startsWith(NEXT_SIBLING_COMBINATOR) || value.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)) {
        // e.g. div:has(> img) + .banner
        // or   div:has(> img) ~ .banner
        foundElements = domElements.map(element => {
          const rootElement = element.parentElement;

          if (!rootElement) {
            throw new Error(`Selection by '${value}' part of selector is not possible.`);
          }

          const elementSelectorText = getElementSelectorDesc(element);
          const specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}${CHILD_COMBINATOR}${elementSelectorText}`;
          const selected = getByRegularSelector(regularSelectorNode, rootElement, specificity);
          return selected;
        });
      } else {
        // space-separated regular selector after extended one
        // e.g. div:has(> img) .banner
        foundElements = domElements.map(root => {
          const specificity = `${COLON}${REGULAR_PSEUDO_CLASSES.SCOPE}${DESCENDANT_COMBINATOR}`;
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

      const uniqueElements = [...new Set(flatten(selectedElements))];
      return uniqueElements;
    };
    /**
     * Selects elements by selector
     * @param selector
     */

    const querySelectorAll = selector => {
      const ast = parse(selector);
      return selectElementsByAst(ast);
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
          ast = parse(selector);
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

    exports.ExtCssDocument = ExtCssDocument;
    exports.querySelectorAll = querySelectorAll;
    exports.selectElementsByAst = selectElementsByAst;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
