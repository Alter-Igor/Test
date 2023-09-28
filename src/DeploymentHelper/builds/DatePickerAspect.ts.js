"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@popperjs/core/dist/cjs/popper.js
var require_popper = __commonJS({
  "node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getWindow(node) {
      if (node == null) {
        return window;
      }
      if (node.toString() !== "[object Window]") {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }
      return node;
    }
    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }
    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }
    function isShadowRoot(node) {
      if (typeof ShadowRoot === "undefined") {
        return false;
      }
      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    var max = Math.max;
    var min = Math.min;
    var round = Math.round;
    function getUAString() {
      var uaData = navigator.userAgentData;
      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function(item) {
          return item.brand + "/" + item.version;
        }).join(" ");
      }
      return navigator.userAgent;
    }
    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }
    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }
      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }
      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;
      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }
      var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width,
        height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x,
        y
      };
    }
    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft,
        scrollTop
      };
    }
    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }
    function getNodeName(element) {
      return element ? (element.nodeName || "").toLowerCase() : null;
    }
    function getDocumentElement(element) {
      return ((isElement(element) ? element.ownerDocument : (
        // $FlowFixMe[prop-missing]
        element.document
      )) || window.document).documentElement;
    }
    function getWindowScrollBarX(element) {
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
    function getComputedStyle(element) {
      return getWindow(element).getComputedStyle(element);
    }
    function isScrollParent(element) {
      var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    }
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }
      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };
      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }
      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }
    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element);
      var width = element.offsetWidth;
      var height = element.offsetHeight;
      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }
      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }
      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width,
        height
      };
    }
    function getParentNode(element) {
      if (getNodeName(element) === "html") {
        return element;
      }
      return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element)
      );
    }
    function getScrollParent(node) {
      if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
        return node.ownerDocument.body;
      }
      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }
      return getScrollParent(getParentNode(node));
    }
    function listScrollParents(element, list) {
      var _element$ownerDocumen;
      if (list === void 0) {
        list = [];
      }
      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : (
        // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
        updatedList.concat(listScrollParents(getParentNode(target)))
      );
    }
    function isTableElement(element) {
      return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
    }
    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle(element).position === "fixed") {
        return null;
      }
      return element.offsetParent;
    }
    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());
      if (isIE && isHTMLElement(element)) {
        var elementCss = getComputedStyle(element);
        if (elementCss.position === "fixed") {
          return null;
        }
      }
      var currentNode = getParentNode(element);
      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }
      while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle(currentNode);
        if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }
      return null;
    }
    function getOffsetParent(element) {
      var window2 = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);
      while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
        offsetParent = getTrueOffsetParent(offsetParent);
      }
      if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
        return window2;
      }
      return offsetParent || getContainingBlock(element) || window2;
    }
    var top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [top, bottom, right, left];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead";
    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain";
    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
    function order(modifiers) {
      var map = /* @__PURE__ */ new Map();
      var visited = /* @__PURE__ */ new Set();
      var result = [];
      modifiers.forEach(function(modifier) {
        map.set(modifier.name, modifier);
      });
      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function(dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);
            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }
      modifiers.forEach(function(modifier) {
        if (!visited.has(modifier.name)) {
          sort(modifier);
        }
      });
      return result;
    }
    function orderModifiers(modifiers) {
      var orderedModifiers = order(modifiers);
      return modifierPhases.reduce(function(acc, phase) {
        return acc.concat(orderedModifiers.filter(function(modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }
    function debounce(fn) {
      var pending;
      return function() {
        if (!pending) {
          pending = new Promise(function(resolve) {
            Promise.resolve().then(function() {
              pending = void 0;
              resolve(fn());
            });
          });
        }
        return pending;
      };
    }
    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function(merged2, current) {
        var existing = merged2[current.name];
        merged2[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged2;
      }, {});
      return Object.keys(merged).map(function(key) {
        return merged[key];
      });
    }
    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;
      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();
        if (layoutViewport || !layoutViewport && strategy === "fixed") {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
      return {
        width,
        height,
        x: x + getWindowScrollBarX(element),
        y
      };
    }
    function getDocumentRect(element) {
      var _element$ownerDocumen;
      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;
      if (getComputedStyle(body || html).direction === "rtl") {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }
      return {
        width,
        height,
        x,
        y
      };
    }
    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode();
      if (parent.contains(child)) {
        return true;
      } else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;
        do {
          if (next && parent.isSameNode(next)) {
            return true;
          }
          next = next.parentNode || next.host;
        } while (next);
      }
      return false;
    }
    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }
    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === "fixed");
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }
    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    }
    function getClippingParents(element) {
      var clippingParents2 = listScrollParents(getParentNode(element));
      var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
      if (!isElement(clipperElement)) {
        return [];
      }
      return clippingParents2.filter(function(clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
      });
    }
    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
      var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents2[0];
      var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }
    function getBasePlacement(placement) {
      return placement.split("-")[0];
    }
    function getVariation(placement) {
      return placement.split("-")[1];
    }
    function getMainAxisFromPlacement(placement) {
      return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
    }
    function computeOffsets(_ref) {
      var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference2.x + reference2.width / 2 - element.width / 2;
      var commonY = reference2.y + reference2.height / 2 - element.height / 2;
      var offsets;
      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference2.y - element.height
          };
          break;
        case bottom:
          offsets = {
            x: commonX,
            y: reference2.y + reference2.height
          };
          break;
        case right:
          offsets = {
            x: reference2.x + reference2.width,
            y: commonY
          };
          break;
        case left:
          offsets = {
            x: reference2.x - element.width,
            y: commonY
          };
          break;
        default:
          offsets = {
            x: reference2.x,
            y: reference2.y
          };
      }
      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
      if (mainAxis != null) {
        var len = mainAxis === "y" ? "height" : "width";
        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
            break;
          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
            break;
        }
      }
      return offsets;
    }
    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }
    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
      return keys.reduce(function(hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }
    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }
      var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets2 = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: "absolute",
        placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset;
      if (elementContext === popper && offsetData) {
        var offset2 = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function(key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
          overflowOffsets[key] += offset2[axis] * multiply;
        });
      }
      return overflowOffsets;
    }
    var DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return !args.some(function(element) {
        return !(element && typeof element.getBoundingClientRect === "function");
      });
    }
    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }
      var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper2(reference2, popper2, options) {
        if (options === void 0) {
          options = defaultOptions;
        }
        var state = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference2,
            popper: popper2
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state,
          setOptions: function setOptions(setOptionsAction) {
            var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options2);
            state.scrollParents = {
              reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
              popper: listScrollParents(popper2)
            };
            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
            state.orderedModifiers = orderedModifiers.filter(function(m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }
            var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
            if (!areValidElements(reference3, popper3)) {
              return;
            }
            state.rects = {
              reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
              popper: getLayoutRect(popper3)
            };
            state.reset = false;
            state.placement = state.options.placement;
            state.orderedModifiers.forEach(function(modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }
              var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
              if (typeof fn === "function") {
                state = fn({
                  state,
                  options: _options,
                  name,
                  instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function() {
            return new Promise(function(resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };
        if (!areValidElements(reference2, popper2)) {
          return instance;
        }
        instance.setOptions(options).then(function(state2) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state2);
          }
        });
        function runModifierEffects() {
          state.orderedModifiers.forEach(function(_ref) {
            var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
            if (typeof effect2 === "function") {
              var cleanupFn = effect2({
                state,
                name,
                instance,
                options: options2
              });
              var noopFn = function noopFn2() {
              };
              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }
        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function(fn) {
            return fn();
          });
          effectCleanupFns = [];
        }
        return instance;
      };
    }
    var passive = {
      passive: true
    };
    function effect$2(_ref) {
      var state = _ref.state, instance = _ref.instance, options = _ref.options;
      var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
      var window2 = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.addEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.addEventListener("resize", instance.update, passive);
      }
      return function() {
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.removeEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.removeEventListener("resize", instance.update, passive);
        }
      };
    }
    var eventListeners = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect$2,
      data: {}
    };
    function popperOffsets(_ref) {
      var state = _ref.state, name = _ref.name;
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: "absolute",
        placement: state.placement
      });
    }
    var popperOffsets$1 = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
    var unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    function roundOffsetsByDPR(_ref, win) {
      var x = _ref.x, y = _ref.y;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }
    function mapToStyles(_ref2) {
      var _Object$assign2;
      var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
      var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
        x,
        y
      }) : {
        x,
        y
      };
      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty("x");
      var hasY = offsets.hasOwnProperty("y");
      var sideX = left;
      var sideY = top;
      var win = window;
      if (adaptive) {
        var offsetParent = getOffsetParent(popper2);
        var heightProp = "clientHeight";
        var widthProp = "clientWidth";
        if (offsetParent === getWindow(popper2)) {
          offsetParent = getDocumentElement(popper2);
          if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
            heightProp = "scrollHeight";
            widthProp = "scrollWidth";
          }
        }
        offsetParent = offsetParent;
        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
            // $FlowFixMe[prop-missing]
            offsetParent[heightProp]
          );
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
            // $FlowFixMe[prop-missing]
            offsetParent[widthProp]
          );
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }
      var commonStyles = Object.assign({
        position
      }, adaptive && unsetSides);
      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x,
        y
      }, getWindow(popper2)) : {
        x,
        y
      };
      x = _ref4.x;
      y = _ref4.y;
      if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }
      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
    }
    function computeStyles(_ref5) {
      var state = _ref5.state, options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration,
        isFixed: state.options.strategy === "fixed"
      };
      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive,
          roundOffsets
        })));
      }
      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: "absolute",
          adaptive: false,
          roundOffsets
        })));
      }
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-placement": state.placement
      });
    }
    var computeStyles$1 = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function(name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name];
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(name2) {
          var value = attributes[name2];
          if (value === false) {
            element.removeAttribute(name2);
          } else {
            element.setAttribute(name2, value === true ? "" : value);
          }
        });
      });
    }
    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
      return function() {
        Object.keys(state.elements).forEach(function(name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
          var style = styleProperties.reduce(function(style2, property) {
            style2[property] = "";
            return style2;
          }, {});
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    }
    var applyStyles$1 = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect: effect$1,
      requires: ["computeStyles"]
    };
    function distanceAndSkiddingToXY(placement, rects, offset2) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
      var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
        placement
      })) : offset2, skidding = _ref[0], distance = _ref[1];
      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }
    function offset(_ref2) {
      var state = _ref2.state, options = _ref2.options, name = _ref2.name;
      var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function(acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }
      state.modifiersData[name] = data;
    }
    var offset$1 = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
    var hash$1 = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function(matched) {
        return hash$1[matched];
      });
    }
    var hash = {
      start: "end",
      end: "start"
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function(matched) {
        return hash[matched];
      });
    }
    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }
      var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
        return getVariation(placement2) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function(placement2) {
        return allowedAutoPlacements.indexOf(placement2) >= 0;
      });
      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      }
      var overflows = allowedPlacements.reduce(function(acc, placement2) {
        acc[placement2] = detectOverflow(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding
        })[getBasePlacement(placement2)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function(a, b) {
        return overflows[a] - overflows[b];
      });
    }
    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }
      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }
    function flip(_ref) {
      var state = _ref.state, options = _ref.options, name = _ref.name;
      if (state.modifiersData[name]._skip) {
        return;
      }
      var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
        return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding,
          flipVariations,
          allowedAutoPlacements
        }) : placement2);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = /* @__PURE__ */ new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements2[0];
      for (var i = 0; i < placements2.length; i++) {
        var placement = placements2[i];
        var _basePlacement = getBasePlacement(placement);
        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? "width" : "height";
        var overflow = detectOverflow(state, {
          placement,
          boundary,
          rootBoundary,
          altBoundary,
          padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }
        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];
        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }
        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }
        if (checks.every(function(check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }
        checksMap.set(placement, checks);
      }
      if (makeFallbackChecks) {
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop2(_i2) {
          var fittingPlacement = placements2.find(function(placement2) {
            var checks2 = checksMap.get(placement2);
            if (checks2) {
              return checks2.slice(0, _i2).every(function(check) {
                return check;
              });
            }
          });
          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };
        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);
          if (_ret === "break")
            break;
        }
      }
      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    }
    var flip$1 = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
    function getAltAxis(axis) {
      return axis === "x" ? "y" : "x";
    }
    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min2, value, max2) {
      var v = within(min2, value, max2);
      return v > max2 ? max2 : v;
    }
    function preventOverflow(_ref) {
      var state = _ref.state, options = _ref.options, name = _ref.name;
      var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary,
        rootBoundary,
        padding,
        altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };
      if (!popperOffsets2) {
        return;
      }
      if (checkMainAxis) {
        var _offsetModifierState$;
        var mainSide = mainAxis === "y" ? top : left;
        var altSide = mainAxis === "y" ? bottom : right;
        var len = mainAxis === "y" ? "height" : "width";
        var offset2 = popperOffsets2[mainAxis];
        var min$1 = offset2 + overflow[mainSide];
        var max$1 = offset2 - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide];
        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset2 + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets2[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset2;
      }
      if (checkAltAxis) {
        var _offsetModifierState$2;
        var _mainSide = mainAxis === "x" ? top : left;
        var _altSide = mainAxis === "x" ? bottom : right;
        var _offset = popperOffsets2[altAxis];
        var _len = altAxis === "y" ? "height" : "width";
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
        popperOffsets2[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
      state.modifiersData[name] = data;
    }
    var preventOverflow$1 = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
    var toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
      var _state$modifiersData$;
      var state = _ref.state, name = _ref.name, options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? "height" : "width";
      if (!arrowElement || !popperOffsets2) {
        return;
      }
      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === "y" ? top : left;
      var maxProp = axis === "y" ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
      var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2;
      var min2 = paddingObject[minProp];
      var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset2 = within(min2, center, max2);
      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
    }
    function effect(_ref2) {
      var state = _ref2.state, options = _ref2.options;
      var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
      if (arrowElement == null) {
        return;
      }
      if (typeof arrowElement === "string") {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) {
          return;
        }
      }
      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }
      state.elements.arrow = arrowElement;
    }
    var arrow$1 = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }
      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }
    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function(side) {
        return overflow[side] >= 0;
      });
    }
    function hide(_ref) {
      var state = _ref.state, name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: "reference"
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets,
        popperEscapeOffsets,
        isReferenceHidden,
        hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-reference-hidden": isReferenceHidden,
        "data-popper-escaped": hasPopperEscaped
      });
    }
    var hide$1 = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /* @__PURE__ */ popperGenerator({
      defaultModifiers: defaultModifiers$1
    });
    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /* @__PURE__ */ popperGenerator({
      defaultModifiers
    });
    exports.applyStyles = applyStyles$1;
    exports.arrow = arrow$1;
    exports.computeStyles = computeStyles$1;
    exports.createPopper = createPopper;
    exports.createPopperLite = createPopper$1;
    exports.defaultModifiers = defaultModifiers;
    exports.detectOverflow = detectOverflow;
    exports.eventListeners = eventListeners;
    exports.flip = flip$1;
    exports.hide = hide$1;
    exports.offset = offset$1;
    exports.popperGenerator = popperGenerator;
    exports.popperOffsets = popperOffsets$1;
    exports.preventOverflow = preventOverflow$1;
  }
});

// node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.js
var require_tempus_dominus = __commonJS({
  "node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.tempusDominus = {}));
    })(exports, function(exports2) {
      "use strict";
      class TdError extends Error {
      }
      class ErrorMessages {
        constructor() {
          this.base = "TD:";
          this.failedToSetInvalidDate = "Failed to set invalid date";
          this.failedToParseInput = "Failed parse input field";
        }
        //#region out to console
        /**
         * Throws an error indicating that a key in the options object is invalid.
         * @param optionName
         */
        unexpectedOption(optionName) {
          const error = new TdError(`${this.base} Unexpected option: ${optionName} does not match a known option.`);
          error.code = 1;
          throw error;
        }
        /**
         * Throws an error indicating that one more keys in the options object is invalid.
         * @param optionName
         */
        unexpectedOptions(optionName) {
          const error = new TdError(`${this.base}: ${optionName.join(", ")}`);
          error.code = 1;
          throw error;
        }
        /**
         * Throws an error when an option is provide an unsupported value.
         * For example a value of 'cheese' for toolbarPlacement which only supports
         * 'top', 'bottom', 'default'.
         * @param optionName
         * @param badValue
         * @param validOptions
         */
        unexpectedOptionValue(optionName, badValue, validOptions) {
          const error = new TdError(`${this.base} Unexpected option value: ${optionName} does not accept a value of "${badValue}". Valid values are: ${validOptions.join(", ")}`);
          error.code = 2;
          throw error;
        }
        /**
         * Throws an error when an option value is the wrong type.
         * For example a string value was provided to multipleDates which only
         * supports true or false.
         * @param optionName
         * @param badType
         * @param expectedType
         */
        typeMismatch(optionName, badType, expectedType) {
          const error = new TdError(`${this.base} Mismatch types: ${optionName} has a type of ${badType} instead of the required ${expectedType}`);
          error.code = 3;
          throw error;
        }
        /**
         * Throws an error when an option value is  outside of the expected range.
         * For example restrictions.daysOfWeekDisabled excepts a value between 0 and 6.
         * @param optionName
         * @param lower
         * @param upper
         */
        numbersOutOfRange(optionName, lower, upper) {
          const error = new TdError(`${this.base} ${optionName} expected an array of number between ${lower} and ${upper}.`);
          error.code = 4;
          throw error;
        }
        /**
         * Throws an error when a value for a date options couldn't be parsed. Either
         * the option was an invalid string or an invalid Date object.
         * @param optionName
         * @param date
         * @param soft If true, logs a warning instead of an error.
         */
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        failedToParseDate(optionName, date, soft = false) {
          const error = new TdError(`${this.base} Could not correctly parse "${date}" to a date for ${optionName}.`);
          error.code = 5;
          if (!soft)
            throw error;
          console.warn(error);
        }
        /**
         * Throws when an element to attach to was not provided in the constructor.
         */
        mustProvideElement() {
          const error = new TdError(`${this.base} No element was provided.`);
          error.code = 6;
          throw error;
        }
        /**
         * Throws if providing an array for the events to subscribe method doesn't have
         * the same number of callbacks. E.g., subscribe([1,2], [1])
         */
        subscribeMismatch() {
          const error = new TdError(`${this.base} The subscribed events does not match the number of callbacks`);
          error.code = 7;
          throw error;
        }
        /**
         * Throws if the configuration has conflicting rules e.g. minDate is after maxDate
         */
        conflictingConfiguration(message) {
          const error = new TdError(`${this.base} A configuration value conflicts with another rule. ${message}`);
          error.code = 8;
          throw error;
        }
        /**
         * customDateFormat errors
         */
        customDateFormatError(message) {
          const error = new TdError(`${this.base} Custom Date Format: ${message}`);
          error.code = 9;
          throw error;
        }
        /**
         * Logs a warning if a date option value is provided as a string, instead of
         * a date/datetime object.
         */
        dateString() {
          console.warn(`${this.base} Using a string for date options is not recommended unless you specify an ISO string or use the customDateFormat plugin.`);
        }
        deprecatedWarning(message, remediation) {
          console.warn(`${this.base} Warning ${message} is deprecated and will be removed in a future version. ${remediation}`);
        }
        throwError(message) {
          const error = new TdError(`${this.base} ${message}`);
          error.code = 9;
          throw error;
        }
      }
      const NAME = "tempus-dominus", dataKey = "td";
      class Events {
        constructor() {
          this.key = `.${dataKey}`;
          this.change = `change${this.key}`;
          this.update = `update${this.key}`;
          this.error = `error${this.key}`;
          this.show = `show${this.key}`;
          this.hide = `hide${this.key}`;
          this.blur = `blur${this.key}`;
          this.focus = `focus${this.key}`;
          this.keyup = `keyup${this.key}`;
          this.keydown = `keydown${this.key}`;
        }
      }
      class Css {
        constructor() {
          this.widget = `${NAME}-widget`;
          this.calendarHeader = "calendar-header";
          this.switch = "picker-switch";
          this.toolbar = "toolbar";
          this.noHighlight = "no-highlight";
          this.sideBySide = "timepicker-sbs";
          this.previous = "previous";
          this.next = "next";
          this.disabled = "disabled";
          this.old = "old";
          this.new = "new";
          this.active = "active";
          this.dateContainer = "date-container";
          this.decadesContainer = `${this.dateContainer}-decades`;
          this.decade = "decade";
          this.yearsContainer = `${this.dateContainer}-years`;
          this.year = "year";
          this.monthsContainer = `${this.dateContainer}-months`;
          this.month = "month";
          this.daysContainer = `${this.dateContainer}-days`;
          this.day = "day";
          this.calendarWeeks = "cw";
          this.dayOfTheWeek = "dow";
          this.today = "today";
          this.weekend = "weekend";
          this.rangeIn = "range-in";
          this.rangeStart = "range-start";
          this.rangeEnd = "range-end";
          this.timeContainer = "time-container";
          this.separator = "separator";
          this.clockContainer = `${this.timeContainer}-clock`;
          this.hourContainer = `${this.timeContainer}-hour`;
          this.minuteContainer = `${this.timeContainer}-minute`;
          this.secondContainer = `${this.timeContainer}-second`;
          this.hour = "hour";
          this.minute = "minute";
          this.second = "second";
          this.toggleMeridiem = "toggleMeridiem";
          this.show = "show";
          this.collapsing = "td-collapsing";
          this.collapse = "td-collapse";
          this.inline = "inline";
          this.lightTheme = "light";
          this.darkTheme = "dark";
          this.isDarkPreferredQuery = "(prefers-color-scheme: dark)";
        }
      }
      class Namespace {
      }
      Namespace.NAME = NAME;
      Namespace.dataKey = dataKey;
      Namespace.events = new Events();
      Namespace.css = new Css();
      Namespace.errorMessages = new ErrorMessages();
      const DefaultFormatLocalization = {
        dateFormats: {
          LTS: "h:mm:ss T",
          LT: "h:mm T",
          L: "MM/dd/yyyy",
          LL: "MMMM d, yyyy",
          LLL: "MMMM d, yyyy h:mm T",
          LLLL: "dddd, MMMM d, yyyy h:mm T"
        },
        format: "L LT",
        locale: "default",
        hourCycle: void 0,
        ordinal: (n) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`;
        }
      };
      var DefaultFormatLocalization$1 = { ...DefaultFormatLocalization };
      exports2.Unit = void 0;
      (function(Unit) {
        Unit["seconds"] = "seconds";
        Unit["minutes"] = "minutes";
        Unit["hours"] = "hours";
        Unit["date"] = "date";
        Unit["month"] = "month";
        Unit["year"] = "year";
      })(exports2.Unit || (exports2.Unit = {}));
      const twoDigitTemplate = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      const getFormatByUnit = (unit) => {
        switch (unit) {
          case "date":
            return { dateStyle: "short" };
          case "month":
            return {
              month: "numeric",
              year: "numeric"
            };
          case "year":
            return { year: "numeric" };
        }
      };
      const guessHourCycle = (locale2) => {
        if (!locale2)
          return "h12";
        const template = {
          hour: "2-digit",
          minute: "2-digit",
          numberingSystem: "latn"
        };
        const dt = new DateTime2().setLocalization({ locale: locale2 });
        dt.hours = 0;
        const start = dt.parts(void 0, template).hour;
        if (start === "12")
          return "h12";
        if (start === "24")
          return "h24";
        dt.hours = 23;
        const end = dt.parts(void 0, template).hour;
        if (start === "00" && end === "11")
          return "h11";
        if (start === "00" && end === "23")
          return "h23";
        console.warn(`couldn't determine hour cycle for ${locale2}. start: ${start}. end: ${end}`);
        return void 0;
      };
      class DateTime2 extends Date {
        constructor() {
          super(...arguments);
          this.localization = DefaultFormatLocalization$1;
          this.nonLeapLadder = [
            0,
            31,
            59,
            90,
            120,
            151,
            181,
            212,
            243,
            273,
            304,
            334
          ];
          this.leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
          this.dateTimeRegex = //is regex cannot be simplified beyond what it already is
          /(\[[^[\]]*])|y{1,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|t|T|m{1,2}|s{1,2}|f{3}/g;
          this.formattingTokens = /(\[[^[\]]*])|([-_:/.,()\s]+)|(T|t|yyyy|yy?|MM?M?M?|Do|dd?|hh?|HH?|mm?|ss?)/g;
          this.match2 = /\d\d/;
          this.match3 = /\d{3}/;
          this.match4 = /\d{4}/;
          this.match1to2 = /\d\d?/;
          this.matchSigned = /[+-]?\d+/;
          this.matchOffset = /[+-]\d\d:?(\d\d)?|Z/;
          this.matchWord = /[^\d_:/,\-()\s]+/;
          this.zoneExpressions = [
            this.matchOffset,
            (obj, input) => {
              obj.offset = this.offsetFromString(input);
            }
          ];
          this.expressions = {
            t: [
              this.matchWord,
              (ojb, input) => {
                ojb.afternoon = this.meridiemMatch(input);
              }
            ],
            T: [
              this.matchWord,
              (ojb, input) => {
                ojb.afternoon = this.meridiemMatch(input);
              }
            ],
            fff: [
              this.match3,
              (ojb, input) => {
                ojb.milliseconds = +input;
              }
            ],
            s: [this.match1to2, this.addInput("seconds")],
            ss: [this.match1to2, this.addInput("seconds")],
            m: [this.match1to2, this.addInput("minutes")],
            mm: [this.match1to2, this.addInput("minutes")],
            H: [this.match1to2, this.addInput("hours")],
            h: [this.match1to2, this.addInput("hours")],
            HH: [this.match1to2, this.addInput("hours")],
            hh: [this.match1to2, this.addInput("hours")],
            d: [this.match1to2, this.addInput("day")],
            dd: [this.match2, this.addInput("day")],
            Do: [
              this.matchWord,
              (ojb, input) => {
                [ojb.day] = input.match(/\d+/);
                if (!this.localization.ordinal)
                  return;
                for (let i = 1; i <= 31; i += 1) {
                  if (this.localization.ordinal(i).replace(/[[\]]/g, "") === input) {
                    ojb.day = i;
                  }
                }
              }
            ],
            M: [this.match1to2, this.addInput("month")],
            MM: [this.match2, this.addInput("month")],
            MMM: [
              this.matchWord,
              (obj, input) => {
                const months = this.getAllMonths();
                const monthsShort = this.getAllMonths("short");
                const matchIndex = (monthsShort || months.map((_) => _.slice(0, 3))).indexOf(input) + 1;
                if (matchIndex < 1) {
                  throw new Error();
                }
                obj.month = matchIndex % 12 || matchIndex;
              }
            ],
            MMMM: [
              this.matchWord,
              (obj, input) => {
                const months = this.getAllMonths();
                const matchIndex = months.indexOf(input) + 1;
                if (matchIndex < 1) {
                  throw new Error();
                }
                obj.month = matchIndex % 12 || matchIndex;
              }
            ],
            y: [this.matchSigned, this.addInput("year")],
            yy: [
              this.match2,
              (obj, input) => {
                obj.year = this.parseTwoDigitYear(input);
              }
            ],
            yyyy: [this.match4, this.addInput("year")]
            // z: this.zoneExpressions,
            // zz: this.zoneExpressions,
            // zzz: this.zoneExpressions
          };
        }
        /**
         * Chainable way to set the {@link locale}
         * @param value
         * @deprecated use setLocalization with a FormatLocalization object instead
         */
        setLocale(value) {
          if (!this.localization) {
            this.localization = DefaultFormatLocalization$1;
            this.localization.locale = value;
          }
          return this;
        }
        /**
         * Chainable way to set the {@link localization}
         * @param value
         */
        setLocalization(value) {
          this.localization = value;
          return this;
        }
        /**
         * Converts a plain JS date object to a DateTime object.
         * Doing this allows access to format, etc.
         * @param  date
         * @param locale this parameter is deprecated. Use formatLocalization instead.
         * @param formatLocalization
         */
        static convert(date, locale2 = "default", formatLocalization = void 0) {
          if (!date)
            throw new Error(`A date is required`);
          if (!formatLocalization) {
            formatLocalization = DefaultFormatLocalization$1;
            formatLocalization.locale = locale2;
          }
          return new DateTime2(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()).setLocalization(formatLocalization);
        }
        /**
         * Native date manipulations are not pure functions. This function creates a duplicate of the DateTime object.
         */
        get clone() {
          return new DateTime2(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.getMilliseconds()).setLocalization(this.localization);
        }
        static isValid(d) {
          if (d === void 0 || JSON.stringify(d) === "null")
            return false;
          if (d.constructor.name === DateTime2.name)
            return true;
          return false;
        }
        /**
         * Sets the current date to the start of the {@link unit} provided
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).startOf('month')
         * would return April 1, 2021, 12:00:00.000 AM (midnight)
         * @param unit
         * @param startOfTheWeek Allows for the changing the start of the week.
         */
        startOf(unit, startOfTheWeek = 0) {
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          switch (unit) {
            case "seconds":
              this.setMilliseconds(0);
              break;
            case "minutes":
              this.setSeconds(0, 0);
              break;
            case "hours":
              this.setMinutes(0, 0, 0);
              break;
            case "date":
              this.setHours(0, 0, 0, 0);
              break;
            case "weekDay": {
              this.startOf(exports2.Unit.date);
              if (this.weekDay === startOfTheWeek)
                break;
              const goBack = (this.weekDay - startOfTheWeek + 7) % 7;
              this.manipulate(goBack * -1, exports2.Unit.date);
              break;
            }
            case "month":
              this.startOf(exports2.Unit.date);
              this.setDate(1);
              break;
            case "year":
              this.startOf(exports2.Unit.date);
              this.setMonth(0, 1);
              break;
          }
          return this;
        }
        /**
         * Sets the current date to the end of the {@link unit} provided
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).endOf('month')
         * would return April 30, 2021, 11:59:59.999 PM
         * @param unit
         * @param startOfTheWeek
         */
        endOf(unit, startOfTheWeek = 0) {
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          switch (unit) {
            case "seconds":
              this.setMilliseconds(999);
              break;
            case "minutes":
              this.setSeconds(59, 999);
              break;
            case "hours":
              this.setMinutes(59, 59, 999);
              break;
            case "date":
              this.setHours(23, 59, 59, 999);
              break;
            case "weekDay": {
              this.endOf(exports2.Unit.date);
              const endOfWeek = 6 + startOfTheWeek;
              if (this.weekDay === endOfWeek)
                break;
              this.manipulate(endOfWeek - this.weekDay, exports2.Unit.date);
              break;
            }
            case "month":
              this.endOf(exports2.Unit.date);
              this.manipulate(1, exports2.Unit.month);
              this.setDate(0);
              break;
            case "year":
              this.endOf(exports2.Unit.date);
              this.setMonth(11, 31);
              break;
          }
          return this;
        }
        /**
         * Change a {@link unit} value. Value can be positive or negative
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).manipulate(1, 'month')
         * would return May 30, 2021, 11:45:32.984 AM
         * @param value A positive or negative number
         * @param unit
         */
        manipulate(value, unit) {
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          this[unit] += value;
          return this;
        }
        /**
         * Return true if {@link compare} is before this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparison.
         */
        isBefore(compare, unit) {
          if (!DateTime2.isValid(compare))
            return false;
          if (!unit)
            return this.valueOf() < compare.valueOf();
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          return this.clone.startOf(unit).valueOf() < compare.clone.startOf(unit).valueOf();
        }
        /**
         * Return true if {@link compare} is after this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparison.
         */
        isAfter(compare, unit) {
          if (!DateTime2.isValid(compare))
            return false;
          if (!unit)
            return this.valueOf() > compare.valueOf();
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          return this.clone.startOf(unit).valueOf() > compare.clone.startOf(unit).valueOf();
        }
        /**
         * Return true if {@link compare} is same this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparison.
         */
        isSame(compare, unit) {
          if (!DateTime2.isValid(compare))
            return false;
          if (!unit)
            return this.valueOf() === compare.valueOf();
          if (this[unit] === void 0)
            throw new Error(`Unit '${unit}' is not valid`);
          compare = DateTime2.convert(compare);
          return this.clone.startOf(unit).valueOf() === compare.startOf(unit).valueOf();
        }
        /**
         * Check if this is between two other DateTimes, optionally looking at unit scale. The match is exclusive.
         * @param left
         * @param right
         * @param unit.
         * @param inclusivity. A [ indicates inclusion of a value. A ( indicates exclusion.
         * If the inclusivity parameter is used, both indicators must be passed.
         */
        isBetween(left, right, unit, inclusivity = "()") {
          if (!DateTime2.isValid(left) || !DateTime2.isValid(right))
            return false;
          if (unit && this[unit] === void 0) {
            throw new Error(`Unit '${unit}' is not valid`);
          }
          const leftInclusivity = inclusivity[0] === "(";
          const rightInclusivity = inclusivity[1] === ")";
          const isLeftInRange = leftInclusivity ? this.isAfter(left, unit) : !this.isBefore(left, unit);
          const isRightInRange = rightInclusivity ? this.isBefore(right, unit) : !this.isAfter(right, unit);
          return isLeftInRange && isRightInRange;
        }
        /**
         * Returns flattened object of the date. Does not include literals
         * @param locale
         * @param template
         */
        parts(locale2 = this.localization.locale, template = { dateStyle: "full", timeStyle: "long" }) {
          const parts = {};
          new Intl.DateTimeFormat(locale2, template).formatToParts(this).filter((x) => x.type !== "literal").forEach((x) => parts[x.type] = x.value);
          return parts;
        }
        /**
         * Shortcut to Date.getSeconds()
         */
        get seconds() {
          return this.getSeconds();
        }
        /**
         * Shortcut to Date.setSeconds()
         */
        set seconds(value) {
          this.setSeconds(value);
        }
        /**
         * Returns two digit hours
         */
        get secondsFormatted() {
          return this.parts(void 0, twoDigitTemplate).second;
        }
        /**
         * Shortcut to Date.getMinutes()
         */
        get minutes() {
          return this.getMinutes();
        }
        /**
         * Shortcut to Date.setMinutes()
         */
        set minutes(value) {
          this.setMinutes(value);
        }
        /**
         * Returns two digit minutes
         */
        get minutesFormatted() {
          return this.parts(void 0, twoDigitTemplate).minute;
        }
        /**
         * Shortcut to Date.getHours()
         */
        get hours() {
          return this.getHours();
        }
        /**
         * Shortcut to Date.setHours()
         */
        set hours(value) {
          this.setHours(value);
        }
        /**
         * Returns two digit hour, e.g. 01...10
         * @param hourCycle Providing an hour cycle will change 00 to 24 depending on the given value.
         */
        getHoursFormatted(hourCycle = "h12") {
          return this.parts(void 0, { ...twoDigitTemplate, hourCycle }).hour;
        }
        /**
         * Get the meridiem of the date. E.g. AM or PM.
         * If the {@link locale} provides a "dayPeriod" then this will be returned,
         * otherwise it will return AM or PM.
         * @param locale
         */
        meridiem(locale2 = this.localization.locale) {
          return new Intl.DateTimeFormat(locale2, {
            hour: "numeric",
            hour12: true
          }).formatToParts(this).find((p) => p.type === "dayPeriod")?.value;
        }
        /**
         * Shortcut to Date.getDate()
         */
        get date() {
          return this.getDate();
        }
        /**
         * Shortcut to Date.setDate()
         */
        set date(value) {
          this.setDate(value);
        }
        /**
         * Return two digit date
         */
        get dateFormatted() {
          return this.parts(void 0, twoDigitTemplate).day;
        }
        /**
         * Shortcut to Date.getDay()
         */
        get weekDay() {
          return this.getDay();
        }
        /**
         * Shortcut to Date.getMonth()
         */
        get month() {
          return this.getMonth();
        }
        /**
         * Shortcut to Date.setMonth()
         */
        set month(value) {
          const targetMonth = new Date(this.year, value + 1);
          targetMonth.setDate(0);
          const endOfMonth = targetMonth.getDate();
          if (this.date > endOfMonth) {
            this.date = endOfMonth;
          }
          this.setMonth(value);
        }
        /**
         * Return two digit, human expected month. E.g. January = 1, December = 12
         */
        get monthFormatted() {
          return this.parts(void 0, twoDigitTemplate).month;
        }
        /**
         * Shortcut to Date.getFullYear()
         */
        get year() {
          return this.getFullYear();
        }
        /**
         * Shortcut to Date.setFullYear()
         */
        set year(value) {
          this.setFullYear(value);
        }
        // borrowed a bunch of stuff from Luxon
        /**
         * Gets the week of the year
         */
        get week() {
          const ordinal = this.computeOrdinal(), weekday = this.getUTCDay();
          let weekNumber = Math.floor((ordinal - weekday + 10) / 7);
          if (weekNumber < 1) {
            weekNumber = this.weeksInWeekYear();
          } else if (weekNumber > this.weeksInWeekYear()) {
            weekNumber = 1;
          }
          return weekNumber;
        }
        /**
         * Returns the number of weeks in the year
         */
        weeksInWeekYear() {
          const p1 = (this.year + Math.floor(this.year / 4) - Math.floor(this.year / 100) + Math.floor(this.year / 400)) % 7, last = this.year - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
          return p1 === 4 || p2 === 3 ? 53 : 52;
        }
        /**
         * Returns true or false depending on if the year is a leap year or not.
         */
        get isLeapYear() {
          return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
        }
        computeOrdinal() {
          return this.date + (this.isLeapYear ? this.leapLadder : this.nonLeapLadder)[this.month];
        }
        /**
         * Returns a list of month values based on the current locale
         */
        getAllMonths(format = "long") {
          const applyFormat = new Intl.DateTimeFormat(this.localization.locale, {
            month: format
          }).format;
          return [...Array(12).keys()].map((m) => applyFormat(new Date(2021, m)));
        }
        /**
         * Replaces an expanded token set (e.g. LT/LTS)
         */
        replaceTokens(formatStr, formats) {
          return formatStr.replace(/(\[[^[\]]*])|(LTS?|l{1,4}|L{1,4})/g, (_, a, b) => {
            const B = b && b.toUpperCase();
            return a || formats[B] || DefaultFormatLocalization$1.dateFormats[B];
          });
        }
        parseTwoDigitYear(input) {
          input = +input;
          return input + (input > 68 ? 1900 : 2e3);
        }
        offsetFromString(string) {
          if (!string)
            return 0;
          if (string === "Z")
            return 0;
          const [first, second, third] = string.match(/([+-]|\d\d)/g);
          const minutes = +(second * 60) + (+third || 0);
          const signed = first === "+" ? -minutes : minutes;
          return minutes === 0 ? 0 : signed;
        }
        /**
         * z = -4, zz = -04, zzz = -0400
         * @param date
         * @param style
         * @private
         */
        zoneInformation(date, style) {
          let name = date.parts(this.localization.locale, { timeZoneName: "longOffset" }).timeZoneName.replace("GMT", "").replace(":", "");
          const negative = name.includes("-");
          name = name.replace("-", "");
          if (style === "z")
            name = name.substring(1, 2);
          else if (style === "zz")
            name = name.substring(0, 2);
          return `${negative ? "-" : ""}${name}`;
        }
        addInput(property) {
          return (time, input) => {
            time[property] = +input;
          };
        }
        meridiemMatch(input) {
          const meridiem = new Intl.DateTimeFormat(this.localization.locale, {
            hour: "numeric",
            hour12: true
          }).formatToParts(new Date(2022, 3, 4, 13)).find((p) => p.type === "dayPeriod")?.value;
          return input.toLowerCase() === meridiem.toLowerCase();
        }
        correctHours(time) {
          const { afternoon } = time;
          if (afternoon !== void 0) {
            const { hours } = time;
            if (afternoon) {
              if (hours < 12) {
                time.hours += 12;
              }
            } else if (hours === 12) {
              time.hours = 0;
            }
            delete time.afternoon;
          }
        }
        makeParser(format) {
          format = this.replaceTokens(format, this.localization.dateFormats);
          const array = format.match(this.formattingTokens);
          const { length } = array;
          for (let i = 0; i < length; i += 1) {
            const token = array[i];
            const parseTo = this.expressions[token];
            const regex = parseTo && parseTo[0];
            const parser = parseTo && parseTo[1];
            if (parser) {
              array[i] = { regex, parser };
            } else {
              array[i] = token.replace(/^\[[^[\]]*]$/g, "");
            }
          }
          return (input) => {
            const time = {
              hours: 0,
              minutes: 0,
              seconds: 0,
              milliseconds: 0
            };
            for (let i = 0, start = 0; i < length; i += 1) {
              const token = array[i];
              if (typeof token === "string") {
                start += token.length;
              } else {
                const { regex, parser } = token;
                const part = input.slice(start);
                const match = regex.exec(part);
                const value = match[0];
                parser.call(this, time, value);
                input = input.replace(value, "");
              }
            }
            this.correctHours(time);
            return time;
          };
        }
        /**
         * Attempts to create a DateTime from a string.
         * @param input date as string
         * @param localization provides the date template the string is in via the format property
         */
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        static fromString(input, localization) {
          if (!localization?.format) {
            Namespace.errorMessages.customDateFormatError("No format was provided");
          }
          try {
            const dt = new DateTime2();
            dt.setLocalization(localization);
            if (["x", "X"].indexOf(localization.format) > -1)
              return new DateTime2((localization.format === "X" ? 1e3 : 1) * +input);
            const parser = dt.makeParser(localization.format);
            const { year, month, day, hours, minutes, seconds, milliseconds, zone } = parser(input);
            const d = day || (!year && !month ? dt.getDate() : 1);
            const y = year || dt.getFullYear();
            let M = 0;
            if (!(year && !month)) {
              M = month > 0 ? month - 1 : dt.getMonth();
            }
            if (zone) {
              return new DateTime2(Date.UTC(y, M, d, hours, minutes, seconds, milliseconds + zone.offset * 60 * 1e3));
            }
            return new DateTime2(y, M, d, hours, minutes, seconds, milliseconds);
          } catch (e) {
            Namespace.errorMessages.customDateFormatError(`Unable to parse provided input: ${input}, format: ${localization.format}`);
          }
        }
        /**
         * Returns a string format.
         * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
         * for valid templates and locale objects
         * @param template An optional object. If provided, method will use Intl., otherwise the localizations format properties
         * @param locale Can be a string or an array of strings. Uses browser defaults otherwise.
         */
        format(template, locale2 = this.localization.locale) {
          if (template && typeof template === "object")
            return new Intl.DateTimeFormat(locale2, template).format(this);
          const formatString = this.replaceTokens(
            //try template first
            template || //otherwise try localization format
            this.localization.format || //otherwise try date + time
            `${DefaultFormatLocalization$1.dateFormats.L}, ${DefaultFormatLocalization$1.dateFormats.LT}`,
            this.localization.dateFormats
          );
          const formatter = (template2) => new Intl.DateTimeFormat(this.localization.locale, template2).format(this);
          if (!this.localization.hourCycle)
            this.localization.hourCycle = guessHourCycle(this.localization.locale);
          const HHCycle = this.localization.hourCycle.startsWith("h1") ? "h24" : this.localization.hourCycle;
          const hhCycle = this.localization.hourCycle.startsWith("h2") ? "h12" : this.localization.hourCycle;
          const matches = {
            yy: formatter({ year: "2-digit" }),
            yyyy: this.year,
            M: formatter({ month: "numeric" }),
            MM: this.monthFormatted,
            MMM: this.getAllMonths("short")[this.getMonth()],
            MMMM: this.getAllMonths()[this.getMonth()],
            d: this.date,
            dd: this.dateFormatted,
            ddd: formatter({ weekday: "short" }),
            dddd: formatter({ weekday: "long" }),
            H: this.getHours(),
            HH: this.getHoursFormatted(HHCycle),
            h: this.hours > 12 ? this.hours - 12 : this.hours,
            hh: this.getHoursFormatted(hhCycle),
            t: this.meridiem(),
            T: this.meridiem().toUpperCase(),
            m: this.minutes,
            mm: this.minutesFormatted,
            s: this.seconds,
            ss: this.secondsFormatted,
            fff: this.getMilliseconds()
            // z: this.zoneInformation(dateTime, 'z'), //-4
            // zz: this.zoneInformation(dateTime, 'zz'), //-04
            // zzz: this.zoneInformation(dateTime, 'zzz') //-0400
          };
          return formatString.replace(this.dateTimeRegex, (match, $1) => {
            return $1 || matches[match];
          }).replace(/\[/g, "").replace(/]/g, "");
        }
      }
      class ServiceLocator {
        constructor() {
          this.cache = /* @__PURE__ */ new Map();
        }
        locate(identifier) {
          const service = this.cache.get(identifier);
          if (service)
            return service;
          const value = new identifier();
          this.cache.set(identifier, value);
          return value;
        }
      }
      const setupServiceLocator = () => {
        serviceLocator = new ServiceLocator();
      };
      let serviceLocator;
      const CalendarModes = [
        {
          name: "calendar",
          className: Namespace.css.daysContainer,
          unit: exports2.Unit.month,
          step: 1
        },
        {
          name: "months",
          className: Namespace.css.monthsContainer,
          unit: exports2.Unit.year,
          step: 1
        },
        {
          name: "years",
          className: Namespace.css.yearsContainer,
          unit: exports2.Unit.year,
          step: 10
        },
        {
          name: "decades",
          className: Namespace.css.decadesContainer,
          unit: exports2.Unit.year,
          step: 100
        }
      ];
      class OptionsStore {
        constructor() {
          this._currentCalendarViewMode = 0;
          this._viewDate = new DateTime2();
          this.minimumCalendarViewMode = 0;
          this.currentView = "calendar";
        }
        get currentCalendarViewMode() {
          return this._currentCalendarViewMode;
        }
        set currentCalendarViewMode(value) {
          this._currentCalendarViewMode = value;
          this.currentView = CalendarModes[value].name;
        }
        get viewDate() {
          return this._viewDate;
        }
        set viewDate(v) {
          this._viewDate = v;
          if (this.options)
            this.options.viewDate = v;
        }
        /**
         * When switching back to the calendar from the clock,
         * this sets currentView to the correct calendar view.
         */
        refreshCurrentView() {
          this.currentView = CalendarModes[this.currentCalendarViewMode].name;
        }
        get isTwelveHour() {
          return ["h12", "h11"].includes(this.options.localization.hourCycle);
        }
      }
      class Validation {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
        }
        /**
         * Checks to see if the target date is valid based on the rules provided in the options.
         * Granularity can be provided to check portions of the date instead of the whole.
         * @param targetDate
         * @param granularity
         */
        isValid(targetDate, granularity) {
          if (!this._enabledDisabledDatesIsValid(granularity, targetDate))
            return false;
          if (granularity !== exports2.Unit.month && granularity !== exports2.Unit.year && this.optionsStore.options.restrictions.daysOfWeekDisabled?.length > 0 && this.optionsStore.options.restrictions.daysOfWeekDisabled.indexOf(targetDate.weekDay) !== -1)
            return false;
          if (!this._minMaxIsValid(granularity, targetDate))
            return false;
          if (granularity === exports2.Unit.hours || granularity === exports2.Unit.minutes || granularity === exports2.Unit.seconds) {
            if (!this._enabledDisabledHoursIsValid(targetDate))
              return false;
            if (this.optionsStore.options.restrictions.disabledTimeIntervals?.filter((internal) => targetDate.isBetween(internal.from, internal.to)).length !== 0)
              return false;
          }
          return true;
        }
        _enabledDisabledDatesIsValid(granularity, targetDate) {
          if (granularity !== exports2.Unit.date)
            return true;
          if (this.optionsStore.options.restrictions.disabledDates.length > 0 && this._isInDisabledDates(targetDate)) {
            return false;
          }
          if (this.optionsStore.options.restrictions.enabledDates.length > 0 && !this._isInEnabledDates(targetDate)) {
            return false;
          }
          return true;
        }
        /**
         * Checks to see if the disabledDates option is in use and returns true (meaning invalid)
         * if the `testDate` is with in the array. Granularity is by date.
         * @param testDate
         * @private
         */
        _isInDisabledDates(testDate) {
          if (!this.optionsStore.options.restrictions.disabledDates || this.optionsStore.options.restrictions.disabledDates.length === 0)
            return false;
          return !!this.optionsStore.options.restrictions.disabledDates.find((x) => x.isSame(testDate, exports2.Unit.date));
        }
        /**
         * Checks to see if the enabledDates option is in use and returns true (meaning valid)
         * if the `testDate` is with in the array. Granularity is by date.
         * @param testDate
         * @private
         */
        _isInEnabledDates(testDate) {
          if (!this.optionsStore.options.restrictions.enabledDates || this.optionsStore.options.restrictions.enabledDates.length === 0)
            return true;
          return !!this.optionsStore.options.restrictions.enabledDates.find((x) => x.isSame(testDate, exports2.Unit.date));
        }
        _minMaxIsValid(granularity, targetDate) {
          if (this.optionsStore.options.restrictions.minDate && targetDate.isBefore(this.optionsStore.options.restrictions.minDate, granularity)) {
            return false;
          }
          if (this.optionsStore.options.restrictions.maxDate && targetDate.isAfter(this.optionsStore.options.restrictions.maxDate, granularity)) {
            return false;
          }
          return true;
        }
        _enabledDisabledHoursIsValid(targetDate) {
          if (this.optionsStore.options.restrictions.disabledHours.length > 0 && this._isInDisabledHours(targetDate)) {
            return false;
          }
          if (this.optionsStore.options.restrictions.enabledHours.length > 0 && !this._isInEnabledHours(targetDate)) {
            return false;
          }
          return true;
        }
        /**
         * Checks to see if the disabledHours option is in use and returns true (meaning invalid)
         * if the `testDate` is with in the array. Granularity is by hours.
         * @param testDate
         * @private
         */
        _isInDisabledHours(testDate) {
          if (!this.optionsStore.options.restrictions.disabledHours || this.optionsStore.options.restrictions.disabledHours.length === 0)
            return false;
          const formattedDate = testDate.hours;
          return this.optionsStore.options.restrictions.disabledHours.includes(formattedDate);
        }
        /**
         * Checks to see if the enabledHours option is in use and returns true (meaning valid)
         * if the `testDate` is with in the array. Granularity is by hours.
         * @param testDate
         * @private
         */
        _isInEnabledHours(testDate) {
          if (!this.optionsStore.options.restrictions.enabledHours || this.optionsStore.options.restrictions.enabledHours.length === 0)
            return true;
          const formattedDate = testDate.hours;
          return this.optionsStore.options.restrictions.enabledHours.includes(formattedDate);
        }
        dateRangeIsValid(dates, index, target) {
          if (!this.optionsStore.options.dateRange)
            return true;
          if (dates.length !== 2 && index !== 1)
            return true;
          const start = dates[0].clone;
          if (start.isSame(target, exports2.Unit.date))
            return true;
          start.manipulate(1, exports2.Unit.date);
          while (!start.isSame(target, exports2.Unit.date)) {
            const valid = this.isValid(start, exports2.Unit.date);
            if (!valid)
              return false;
            start.manipulate(1, exports2.Unit.date);
          }
          return true;
        }
      }
      class EventEmitter {
        constructor() {
          this.subscribers = [];
        }
        subscribe(callback) {
          this.subscribers.push(callback);
          return this.unsubscribe.bind(this, this.subscribers.length - 1);
        }
        unsubscribe(index) {
          this.subscribers.splice(index, 1);
        }
        emit(value) {
          this.subscribers.forEach((callback) => {
            callback(value);
          });
        }
        destroy() {
          this.subscribers = null;
          this.subscribers = [];
        }
      }
      class EventEmitters {
        constructor() {
          this.triggerEvent = new EventEmitter();
          this.viewUpdate = new EventEmitter();
          this.updateDisplay = new EventEmitter();
          this.action = new EventEmitter();
          this.updateViewDate = new EventEmitter();
        }
        destroy() {
          this.triggerEvent.destroy();
          this.viewUpdate.destroy();
          this.updateDisplay.destroy();
          this.action.destroy();
          this.updateViewDate.destroy();
        }
      }
      const defaultEnLocalization = {
        clear: "Clear selection",
        close: "Close the picker",
        dateFormats: DefaultFormatLocalization$1.dateFormats,
        dayViewHeaderFormat: { month: "long", year: "2-digit" },
        decrementHour: "Decrement Hour",
        decrementMinute: "Decrement Minute",
        decrementSecond: "Decrement Second",
        format: DefaultFormatLocalization$1.format,
        hourCycle: DefaultFormatLocalization$1.hourCycle,
        incrementHour: "Increment Hour",
        incrementMinute: "Increment Minute",
        incrementSecond: "Increment Second",
        locale: DefaultFormatLocalization$1.locale,
        nextCentury: "Next Century",
        nextDecade: "Next Decade",
        nextMonth: "Next Month",
        nextYear: "Next Year",
        ordinal: DefaultFormatLocalization$1.ordinal,
        pickHour: "Pick Hour",
        pickMinute: "Pick Minute",
        pickSecond: "Pick Second",
        previousCentury: "Previous Century",
        previousDecade: "Previous Decade",
        previousMonth: "Previous Month",
        previousYear: "Previous Year",
        selectDate: "Select Date",
        selectDecade: "Select Decade",
        selectMonth: "Select Month",
        selectTime: "Select Time",
        selectYear: "Select Year",
        startOfTheWeek: 0,
        today: "Go to today",
        toggleMeridiem: "Toggle Meridiem"
      };
      const DefaultOptions = {
        allowInputToggle: false,
        container: void 0,
        dateRange: false,
        debug: false,
        defaultDate: void 0,
        display: {
          icons: {
            type: "icons",
            time: "fa-solid fa-clock",
            date: "fa-solid fa-calendar",
            up: "fa-solid fa-arrow-up",
            down: "fa-solid fa-arrow-down",
            previous: "fa-solid fa-chevron-left",
            next: "fa-solid fa-chevron-right",
            today: "fa-solid fa-calendar-check",
            clear: "fa-solid fa-trash",
            close: "fa-solid fa-xmark"
          },
          sideBySide: false,
          calendarWeeks: false,
          viewMode: "calendar",
          toolbarPlacement: "bottom",
          keepOpen: false,
          buttons: {
            today: false,
            clear: false,
            close: false
          },
          components: {
            calendar: true,
            date: true,
            month: true,
            year: true,
            decades: true,
            clock: true,
            hours: true,
            minutes: true,
            seconds: false,
            useTwentyfourHour: void 0
          },
          inline: false,
          theme: "auto",
          placement: "bottom"
        },
        keepInvalid: false,
        localization: defaultEnLocalization,
        meta: {},
        multipleDates: false,
        multipleDatesSeparator: "; ",
        promptTimeOnDateChange: false,
        promptTimeOnDateChangeTransitionDelay: 200,
        restrictions: {
          minDate: void 0,
          maxDate: void 0,
          disabledDates: [],
          enabledDates: [],
          daysOfWeekDisabled: [],
          disabledTimeIntervals: [],
          disabledHours: [],
          enabledHours: []
        },
        stepping: 1,
        useCurrent: true,
        viewDate: new DateTime2()
      };
      const DefaultEnLocalization = { ...defaultEnLocalization };
      function tryConvertToDateTime(d, localization) {
        if (!d)
          return null;
        if (d.constructor.name === DateTime2.name)
          return d;
        if (d.constructor.name === Date.name) {
          return DateTime2.convert(d);
        }
        if (typeof d === "string") {
          const dateTime = DateTime2.fromString(d, localization);
          if (JSON.stringify(dateTime) === "null") {
            return null;
          }
          return dateTime;
        }
        return null;
      }
      function convertToDateTime(d, optionName, localization) {
        if (typeof d === "string" && optionName !== "input") {
          Namespace.errorMessages.dateString();
        }
        const converted = tryConvertToDateTime(d, localization);
        if (!converted) {
          Namespace.errorMessages.failedToParseDate(optionName, d, optionName === "input");
        }
        return converted;
      }
      function typeCheckDateArray(optionName, value, providedType, localization = DefaultFormatLocalization$1) {
        if (!Array.isArray(value)) {
          Namespace.errorMessages.typeMismatch(optionName, providedType, "array of DateTime or Date");
        }
        for (let i = 0; i < value.length; i++) {
          const d = value[i];
          const dateTime = convertToDateTime(d, optionName, localization);
          dateTime.setLocalization(localization);
          value[i] = dateTime;
        }
      }
      function typeCheckNumberArray(optionName, value, providedType) {
        if (!Array.isArray(value) || value.some((x) => typeof x !== "number")) {
          Namespace.errorMessages.typeMismatch(optionName, providedType, "array of numbers");
        }
      }
      function mandatoryDate(key) {
        return ({ value, providedType, localization }) => {
          const dateTime = convertToDateTime(value, key, localization);
          if (dateTime !== void 0) {
            dateTime.setLocalization(localization);
            return dateTime;
          }
        };
      }
      function optionalDate(key) {
        const mandatory = mandatoryDate(key);
        return (args) => {
          if (args.value === void 0) {
            return args.value;
          }
          return mandatory(args);
        };
      }
      function numbersInRange(key, lower, upper) {
        return ({ value, providedType }) => {
          if (value === void 0) {
            return [];
          }
          typeCheckNumberArray(key, value, providedType);
          if (value.some((x) => x < lower || x > upper))
            Namespace.errorMessages.numbersOutOfRange(key, lower, upper);
          return value;
        };
      }
      function validHourRange(key) {
        return numbersInRange(key, 0, 23);
      }
      function validDateArray(key) {
        return ({ value, providedType, localization }) => {
          if (value === void 0) {
            return [];
          }
          typeCheckDateArray(key, value, providedType, localization);
          return value;
        };
      }
      function validKeyOption(keyOptions) {
        return ({ value, path }) => {
          if (!keyOptions.includes(value))
            Namespace.errorMessages.unexpectedOptionValue(path.substring(1), value, keyOptions);
          return value;
        };
      }
      const optionProcessors = Object.freeze({
        defaultDate: mandatoryDate("defaultDate"),
        viewDate: mandatoryDate("viewDate"),
        minDate: optionalDate("restrictions.minDate"),
        maxDate: optionalDate("restrictions.maxDate"),
        disabledHours: validHourRange("restrictions.disabledHours"),
        enabledHours: validHourRange("restrictions.enabledHours"),
        disabledDates: validDateArray("restrictions.disabledDates"),
        enabledDates: validDateArray("restrictions.enabledDates"),
        daysOfWeekDisabled: numbersInRange("restrictions.daysOfWeekDisabled", 0, 6),
        disabledTimeIntervals: ({ key, value, providedType, localization }) => {
          if (value === void 0) {
            return [];
          }
          if (!Array.isArray(value)) {
            Namespace.errorMessages.typeMismatch(key, providedType, "array of { from: DateTime|Date, to: DateTime|Date }");
          }
          const valueObject = value;
          for (let i = 0; i < valueObject.length; i++) {
            Object.keys(valueObject[i]).forEach((vk) => {
              const subOptionName = `${key}[${i}].${vk}`;
              const d = valueObject[i][vk];
              const dateTime = convertToDateTime(d, subOptionName, localization);
              dateTime.setLocalization(localization);
              valueObject[i][vk] = dateTime;
            });
          }
          return valueObject;
        },
        toolbarPlacement: validKeyOption(["top", "bottom", "default"]),
        type: validKeyOption(["icons", "sprites"]),
        viewMode: validKeyOption([
          "clock",
          "calendar",
          "months",
          "years",
          "decades"
        ]),
        theme: validKeyOption(["light", "dark", "auto"]),
        placement: validKeyOption(["top", "bottom"]),
        meta: ({ value }) => value,
        dayViewHeaderFormat: ({ value }) => value,
        container: ({ value, path }) => {
          if (value && !(value instanceof HTMLElement || value instanceof Element || value?.appendChild)) {
            Namespace.errorMessages.typeMismatch(path.substring(1), typeof value, "HTMLElement");
          }
          return value;
        },
        useTwentyfourHour: ({ value, path, providedType, defaultType }) => {
          Namespace.errorMessages.deprecatedWarning("useTwentyfourHour", 'Please use "options.localization.hourCycle" instead');
          if (value === void 0 || providedType === "boolean")
            return value;
          Namespace.errorMessages.typeMismatch(path, providedType, defaultType);
        },
        hourCycle: validKeyOption(["h11", "h12", "h23", "h24"])
      });
      const defaultProcessor = ({ value, defaultType, providedType, path }) => {
        switch (defaultType) {
          case "boolean":
            return value === "true" || value === true;
          case "number":
            return +value;
          case "string":
            return value.toString();
          case "object":
            return {};
          case "function":
            return value;
          default:
            Namespace.errorMessages.typeMismatch(path, providedType, defaultType);
        }
      };
      function processKey(args) {
        return (optionProcessors[args.key] || defaultProcessor)(args);
      }
      class OptionConverter {
        static deepCopy(input) {
          const o = {};
          Object.keys(input).forEach((key) => {
            const inputElement = input[key];
            if (inputElement instanceof DateTime2) {
              o[key] = inputElement.clone;
              return;
            } else if (inputElement instanceof Date) {
              o[key] = new Date(inputElement.valueOf());
              return;
            }
            o[key] = inputElement;
            if (typeof inputElement !== "object" || inputElement instanceof HTMLElement || inputElement instanceof Element)
              return;
            if (!Array.isArray(inputElement)) {
              o[key] = OptionConverter.deepCopy(inputElement);
            }
          });
          return o;
        }
        /**
         * Finds value out of an object based on a string, period delimited, path
         * @param paths
         * @param obj
         */
        static objectPath(paths, obj) {
          if (paths.charAt(0) === ".")
            paths = paths.slice(1);
          if (!paths)
            return obj;
          return paths.split(".").reduce((value, key) => OptionConverter.isValue(value) || OptionConverter.isValue(value[key]) ? value[key] : void 0, obj);
        }
        /**
         * The spread operator caused sub keys to be missing after merging.
         * This is to fix that issue by using spread on the child objects first.
         * Also handles complex options like disabledDates
         * @param provided An option from new providedOptions
         * @param copyTo Destination object. This was added to prevent reference copies
         * @param localization
         * @param path
         */
        static spread(provided, copyTo, localization, path = "") {
          const defaultOptions = OptionConverter.objectPath(path, DefaultOptions);
          const unsupportedOptions = Object.keys(provided).filter((x) => !Object.keys(defaultOptions).includes(x));
          if (unsupportedOptions.length > 0) {
            const flattenedOptions = OptionConverter.getFlattenDefaultOptions();
            const errors = unsupportedOptions.map((x) => {
              let error = `"${path}.${x}" in not a known option.`;
              const didYouMean = flattenedOptions.find((y) => y.includes(x));
              if (didYouMean)
                error += ` Did you mean "${didYouMean}"?`;
              return error;
            });
            Namespace.errorMessages.unexpectedOptions(errors);
          }
          Object.keys(provided).filter((key) => key !== "__proto__" && key !== "constructor").forEach((key) => {
            path += `.${key}`;
            if (path.charAt(0) === ".")
              path = path.slice(1);
            const defaultOptionValue = defaultOptions[key];
            const providedType = typeof provided[key];
            const defaultType = typeof defaultOptionValue;
            const value = provided[key];
            if (value === void 0 || value === null) {
              copyTo[key] = value;
              path = path.substring(0, path.lastIndexOf(`.${key}`));
              return;
            }
            if (typeof defaultOptionValue === "object" && !Array.isArray(provided[key]) && !(defaultOptionValue instanceof Date || OptionConverter.ignoreProperties.includes(key))) {
              OptionConverter.spread(provided[key], copyTo[key], localization, path);
            } else {
              copyTo[key] = OptionConverter.processKey(key, value, providedType, defaultType, path, localization);
            }
            path = path.substring(0, path.lastIndexOf(`.${key}`));
          });
        }
        static processKey(key, value, providedType, defaultType, path, localization) {
          return processKey({
            key,
            value,
            providedType,
            defaultType,
            path,
            localization
          });
        }
        static _mergeOptions(providedOptions, mergeTo) {
          const newConfig = OptionConverter.deepCopy(mergeTo);
          const localization = mergeTo.localization?.locale !== "default" ? mergeTo.localization : providedOptions?.localization || DefaultOptions.localization;
          OptionConverter.spread(providedOptions, newConfig, localization, "");
          return newConfig;
        }
        static _dataToOptions(element, options) {
          const eData = JSON.parse(JSON.stringify(element.dataset));
          if (eData?.tdTargetInput)
            delete eData.tdTargetInput;
          if (eData?.tdTargetToggle)
            delete eData.tdTargetToggle;
          if (!eData || Object.keys(eData).length === 0 || eData.constructor !== DOMStringMap)
            return options;
          const dataOptions = {};
          const objectToNormalized = (object) => {
            const lowered = {};
            Object.keys(object).forEach((x) => {
              lowered[x.toLowerCase()] = x;
            });
            return lowered;
          };
          const normalizeObject = this.normalizeObject(objectToNormalized);
          const optionsLower = objectToNormalized(options);
          Object.keys(eData).filter((x) => x.startsWith(Namespace.dataKey)).map((x) => x.substring(2)).forEach((key) => {
            let keyOption = optionsLower[key.toLowerCase()];
            if (key.includes("_")) {
              const split = key.split("_");
              keyOption = optionsLower[split[0].toLowerCase()];
              if (keyOption !== void 0 && options[keyOption].constructor === Object) {
                dataOptions[keyOption] = normalizeObject(split, 1, options[keyOption], eData[`td${key}`]);
              }
            } else if (keyOption !== void 0) {
              dataOptions[keyOption] = eData[`td${key}`];
            }
          });
          return this._mergeOptions(dataOptions, options);
        }
        //todo clean this up
        static normalizeObject(objectToNormalized) {
          const normalizeObject = (split, index, optionSubgroup, value) => {
            const normalizedOptions = objectToNormalized(optionSubgroup);
            const keyOption = normalizedOptions[split[index].toLowerCase()];
            const internalObject = {};
            if (keyOption === void 0)
              return internalObject;
            if (optionSubgroup[keyOption].constructor === Object) {
              index++;
              internalObject[keyOption] = normalizeObject(split, index, optionSubgroup[keyOption], value);
            } else {
              internalObject[keyOption] = value;
            }
            return internalObject;
          };
          return normalizeObject;
        }
        /**
         * Attempts to prove `d` is a DateTime or Date or can be converted into one.
         * @param d If a string will attempt creating a date from it.
         * @param localization object containing locale and format settings. Only used with the custom formats
         * @private
         */
        static _dateTypeCheck(d, localization) {
          return tryConvertToDateTime(d, localization);
        }
        /**
         * Type checks that `value` is an array of Date or DateTime
         * @param optionName Provides text to error messages e.g. disabledDates
         * @param value Option value
         * @param providedType Used to provide text to error messages
         * @param localization
         */
        static _typeCheckDateArray(optionName, value, providedType, localization) {
          return typeCheckDateArray(optionName, value, providedType, localization);
        }
        /**
         * Type checks that `value` is an array of numbers
         * @param optionName Provides text to error messages e.g. disabledDates
         * @param value Option value
         * @param providedType Used to provide text to error messages
         */
        static _typeCheckNumberArray(optionName, value, providedType) {
          return typeCheckNumberArray(optionName, value, providedType);
        }
        /**
         * Attempts to convert `d` to a DateTime object
         * @param d value to convert
         * @param optionName Provides text to error messages e.g. disabledDates
         * @param localization object containing locale and format settings. Only used with the custom formats
         */
        static dateConversion(d, optionName, localization) {
          return convertToDateTime(d, optionName, localization);
        }
        static getFlattenDefaultOptions() {
          if (this._flattenDefaults)
            return this._flattenDefaults;
          const deepKeys = (t, pre = []) => {
            if (Array.isArray(t))
              return [];
            if (Object(t) === t) {
              return Object.entries(t).flatMap(([k, v]) => deepKeys(v, [...pre, k]));
            } else {
              return pre.join(".");
            }
          };
          this._flattenDefaults = deepKeys(DefaultOptions);
          return this._flattenDefaults;
        }
        /**
         * Some options conflict like min/max date. Verify that these kinds of options
         * are set correctly.
         * @param config
         */
        static _validateConflicts(config) {
          if (config.display.sideBySide && (!config.display.components.clock || !(config.display.components.hours || config.display.components.minutes || config.display.components.seconds))) {
            Namespace.errorMessages.conflictingConfiguration("Cannot use side by side mode without the clock components");
          }
          if (config.restrictions.minDate && config.restrictions.maxDate) {
            if (config.restrictions.minDate.isAfter(config.restrictions.maxDate)) {
              Namespace.errorMessages.conflictingConfiguration("minDate is after maxDate");
            }
            if (config.restrictions.maxDate.isBefore(config.restrictions.minDate)) {
              Namespace.errorMessages.conflictingConfiguration("maxDate is before minDate");
            }
          }
          if (config.multipleDates && config.dateRange) {
            Namespace.errorMessages.conflictingConfiguration('Cannot uss option "multipleDates" with "dateRange"');
          }
        }
      }
      OptionConverter.ignoreProperties = [
        "meta",
        "dayViewHeaderFormat",
        "container",
        "dateForms",
        "ordinal"
      ];
      OptionConverter.isValue = (a) => a != null;
      class Dates {
        constructor() {
          this._dates = [];
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.validation = serviceLocator.locate(Validation);
          this._eventEmitters = serviceLocator.locate(EventEmitters);
        }
        /**
         * Returns the array of selected dates
         */
        get picked() {
          return [...this._dates];
        }
        /**
         * Returns the last picked value.
         */
        get lastPicked() {
          return this._dates[this.lastPickedIndex]?.clone;
        }
        /**
         * Returns the length of picked dates -1 or 0 if none are selected.
         */
        get lastPickedIndex() {
          if (this._dates.length === 0)
            return 0;
          return this._dates.length - 1;
        }
        /**
         * Formats a DateTime object to a string. Used when setting the input value.
         * @param date
         */
        formatInput(date) {
          if (!date)
            return "";
          date.localization = this.optionsStore.options.localization;
          return date.format();
        }
        /**
         * parse the value into a DateTime object.
         * this can be overwritten to supply your own parsing.
         */
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseInput(value) {
          return OptionConverter.dateConversion(value, "input", this.optionsStore.options.localization);
        }
        /**
         * Tries to convert the provided value to a DateTime object.
         * If value is null|undefined then clear the value of the provided index (or 0).
         * @param value Value to convert or null|undefined
         * @param index When using multidates this is the index in the array
         */
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFromInput(value, index) {
          if (!value) {
            this.setValue(void 0, index);
            return;
          }
          const converted = this.parseInput(value);
          if (converted) {
            converted.setLocalization(this.optionsStore.options.localization);
            this.setValue(converted, index);
          }
        }
        /**
         * Adds a new DateTime to selected dates array
         * @param date
         */
        add(date) {
          this._dates.push(date);
        }
        /**
         * Returns true if the `targetDate` is part of the selected dates array.
         * If `unit` is provided then a granularity to that unit will be used.
         * @param targetDate
         * @param unit
         */
        isPicked(targetDate, unit) {
          if (!DateTime2.isValid(targetDate))
            return false;
          if (!unit)
            return this._dates.find((x) => x.isSame(targetDate)) !== void 0;
          const format = getFormatByUnit(unit);
          const innerDateFormatted = targetDate.format(format);
          return this._dates.map((x) => x.format(format)).find((x) => x === innerDateFormatted) !== void 0;
        }
        /**
         * Returns the index at which `targetDate` is in the array.
         * This is used for updating or removing a date when multi-date is used
         * If `unit` is provided then a granularity to that unit will be used.
         * @param targetDate
         * @param unit
         */
        pickedIndex(targetDate, unit) {
          if (!DateTime2.isValid(targetDate))
            return -1;
          if (!unit)
            return this._dates.map((x) => x.valueOf()).indexOf(targetDate.valueOf());
          const format = getFormatByUnit(unit);
          const innerDateFormatted = targetDate.format(format);
          return this._dates.map((x) => x.format(format)).indexOf(innerDateFormatted);
        }
        /**
         * Clears all selected dates.
         */
        clear() {
          this.optionsStore.unset = true;
          this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.change,
            date: void 0,
            oldDate: this.lastPicked,
            isClear: true,
            isValid: true
          });
          this._dates = [];
          if (this.optionsStore.input)
            this.optionsStore.input.value = "";
          this._eventEmitters.updateDisplay.emit("all");
        }
        /**
         * Find the "book end" years given a `year` and a `factor`
         * @param factor e.g. 100 for decades
         * @param year e.g. 2021
         */
        static getStartEndYear(factor, year) {
          const step = factor / 10, startYear = Math.floor(year / factor) * factor, endYear = startYear + step * 9, focusValue = Math.floor(year / step) * step;
          return [startYear, endYear, focusValue];
        }
        updateInput(target) {
          if (!this.optionsStore.input)
            return;
          let newValue = this.formatInput(target);
          if (this.optionsStore.options.multipleDates || this.optionsStore.options.dateRange) {
            newValue = this._dates.map((d) => this.formatInput(d)).join(this.optionsStore.options.multipleDatesSeparator);
          }
          if (this.optionsStore.input.value != newValue)
            this.optionsStore.input.value = newValue;
        }
        /**
         * Attempts to either clear or set the `target` date at `index`.
         * If the `target` is null then the date will be cleared.
         * If multi-date is being used then it will be removed from the array.
         * If `target` is valid and multi-date is used then if `index` is
         * provided the date at that index will be replaced, otherwise it is appended.
         * @param target
         * @param index
         */
        setValue(target, index) {
          const noIndex = typeof index === "undefined", isClear = !target && noIndex;
          let oldDate = this.optionsStore.unset ? null : this._dates[index]?.clone;
          if (!oldDate && !this.optionsStore.unset && noIndex && isClear) {
            oldDate = this.lastPicked;
          }
          if (target && oldDate?.isSame(target)) {
            this.updateInput(target);
            return;
          }
          if (!target) {
            this._setValueNull(isClear, index, oldDate);
            return;
          }
          index = index || 0;
          target = target.clone;
          if (this.optionsStore.options.stepping !== 1) {
            target.minutes = Math.round(target.minutes / this.optionsStore.options.stepping) * this.optionsStore.options.stepping;
            target.startOf(exports2.Unit.minutes);
          }
          const onUpdate = (isValid) => {
            this._dates[index] = target;
            this._eventEmitters.updateViewDate.emit(target.clone);
            this.updateInput(target);
            this.optionsStore.unset = false;
            this._eventEmitters.updateDisplay.emit("all");
            this._eventEmitters.triggerEvent.emit({
              type: Namespace.events.change,
              date: target,
              oldDate,
              isClear,
              isValid
            });
          };
          if (this.validation.isValid(target) && this.validation.dateRangeIsValid(this.picked, index, target)) {
            onUpdate(true);
            return;
          }
          if (this.optionsStore.options.keepInvalid) {
            onUpdate(false);
          }
          this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.error,
            reason: Namespace.errorMessages.failedToSetInvalidDate,
            date: target,
            oldDate
          });
        }
        _setValueNull(isClear, index, oldDate) {
          if (!this.optionsStore.options.multipleDates || this._dates.length === 1 || isClear) {
            this.optionsStore.unset = true;
            this._dates = [];
          } else {
            this._dates.splice(index, 1);
          }
          this.updateInput();
          this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.change,
            date: void 0,
            oldDate,
            isClear,
            isValid: true
          });
          this._eventEmitters.updateDisplay.emit("all");
        }
      }
      var ActionTypes;
      (function(ActionTypes2) {
        ActionTypes2["next"] = "next";
        ActionTypes2["previous"] = "previous";
        ActionTypes2["changeCalendarView"] = "changeCalendarView";
        ActionTypes2["selectMonth"] = "selectMonth";
        ActionTypes2["selectYear"] = "selectYear";
        ActionTypes2["selectDecade"] = "selectDecade";
        ActionTypes2["selectDay"] = "selectDay";
        ActionTypes2["selectHour"] = "selectHour";
        ActionTypes2["selectMinute"] = "selectMinute";
        ActionTypes2["selectSecond"] = "selectSecond";
        ActionTypes2["incrementHours"] = "incrementHours";
        ActionTypes2["incrementMinutes"] = "incrementMinutes";
        ActionTypes2["incrementSeconds"] = "incrementSeconds";
        ActionTypes2["decrementHours"] = "decrementHours";
        ActionTypes2["decrementMinutes"] = "decrementMinutes";
        ActionTypes2["decrementSeconds"] = "decrementSeconds";
        ActionTypes2["toggleMeridiem"] = "toggleMeridiem";
        ActionTypes2["togglePicker"] = "togglePicker";
        ActionTypes2["showClock"] = "showClock";
        ActionTypes2["showHours"] = "showHours";
        ActionTypes2["showMinutes"] = "showMinutes";
        ActionTypes2["showSeconds"] = "showSeconds";
        ActionTypes2["clear"] = "clear";
        ActionTypes2["close"] = "close";
        ActionTypes2["today"] = "today";
      })(ActionTypes || (ActionTypes = {}));
      var ActionTypes$1 = ActionTypes;
      class DateDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.daysContainer);
          container.append(...this._daysOfTheWeek());
          if (this.optionsStore.options.display.calendarWeeks) {
            const div = document.createElement("div");
            div.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
            container.appendChild(div);
          }
          const { rangeHoverEvent, rangeHoverOutEvent } = this.handleMouseEvents(container);
          for (let i = 0; i < 42; i++) {
            if (i !== 0 && i % 7 === 0) {
              if (this.optionsStore.options.display.calendarWeeks) {
                const div2 = document.createElement("div");
                div2.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
                container.appendChild(div2);
              }
            }
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectDay);
            container.appendChild(div);
            if (matchMedia("(hover: hover)").matches && this.optionsStore.options.dateRange) {
              div.addEventListener("mouseover", rangeHoverEvent);
              div.addEventListener("mouseout", rangeHoverOutEvent);
            }
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const container = widget.getElementsByClassName(Namespace.css.daysContainer)[0];
          this._updateCalendarView(container);
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.month).startOf("weekDay", this.optionsStore.options.localization.startOfTheWeek).manipulate(12, exports2.Unit.hours);
          this._handleCalendarWeeks(container, innerDate.clone);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectDay}"]`).forEach((element) => {
            const classes = [];
            classes.push(Namespace.css.day);
            if (innerDate.isBefore(this.optionsStore.viewDate, exports2.Unit.month)) {
              classes.push(Namespace.css.old);
            }
            if (innerDate.isAfter(this.optionsStore.viewDate, exports2.Unit.month)) {
              classes.push(Namespace.css.new);
            }
            if (!this.optionsStore.unset && !this.optionsStore.options.dateRange && this.dates.isPicked(innerDate, exports2.Unit.date)) {
              classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, exports2.Unit.date)) {
              classes.push(Namespace.css.disabled);
            }
            if (innerDate.isSame(new DateTime2(), exports2.Unit.date)) {
              classes.push(Namespace.css.today);
            }
            if (innerDate.weekDay === 0 || innerDate.weekDay === 6) {
              classes.push(Namespace.css.weekend);
            }
            this._handleDateRange(innerDate, classes);
            paint(exports2.Unit.date, innerDate, classes, element);
            element.classList.remove(...element.classList);
            element.classList.add(...classes);
            element.setAttribute("data-value", this._dateToDataValue(innerDate));
            element.setAttribute("data-day", `${innerDate.date}`);
            element.innerText = innerDate.parts(void 0, {
              day: "numeric"
            }).day;
            innerDate.manipulate(1, exports2.Unit.date);
          });
        }
        _dateToDataValue(date) {
          if (!DateTime2.isValid(date))
            return "";
          return `${date.year}-${date.monthFormatted}-${date.dateFormatted}`;
        }
        _handleDateRange(innerDate, classes) {
          const rangeStart = this.dates.picked[0];
          const rangeEnd = this.dates.picked[1];
          if (this.optionsStore.options.dateRange) {
            if (innerDate.isBetween(rangeStart, rangeEnd, exports2.Unit.date)) {
              classes.push(Namespace.css.rangeIn);
            }
            if (innerDate.isSame(rangeStart, exports2.Unit.date)) {
              classes.push(Namespace.css.rangeStart);
            }
            if (innerDate.isSame(rangeEnd, exports2.Unit.date)) {
              classes.push(Namespace.css.rangeEnd);
            }
          }
        }
        handleMouseEvents(container) {
          const rangeHoverEvent = (e) => {
            const currentTarget = e?.currentTarget;
            if (this.dates.picked.length !== 1 || currentTarget.classList.contains(Namespace.css.disabled))
              return;
            const allDays = [...container.querySelectorAll(".day")];
            const attributeValue = currentTarget.getAttribute("data-value");
            const innerDate = DateTime2.fromString(attributeValue, {
              format: "yyyy-MM-dd"
            });
            const dayIndex = allDays.findIndex((e2) => e2.getAttribute("data-value") === attributeValue);
            const rangeStart = this.dates.picked[0];
            const rangeEnd = this.dates.picked[1];
            const rangeStartFormatted = this._dateToDataValue(rangeStart);
            const rangeStartIndex = allDays.findIndex((e2) => e2.getAttribute("data-value") === rangeStartFormatted);
            const rangeStartElement = allDays[rangeStartIndex];
            if (!innerDate.isSame(rangeStart, exports2.Unit.date)) {
              currentTarget.classList.remove(Namespace.css.rangeStart);
            }
            if (!innerDate.isSame(rangeEnd, exports2.Unit.date)) {
              currentTarget.classList.remove(Namespace.css.rangeEnd);
            }
            let lambda;
            if (innerDate.isBefore(rangeStart)) {
              currentTarget.classList.add(Namespace.css.rangeStart);
              rangeStartElement?.classList.remove(Namespace.css.rangeStart);
              rangeStartElement?.classList.add(Namespace.css.rangeEnd);
              lambda = (_, index) => index > dayIndex && index < rangeStartIndex;
            } else {
              currentTarget.classList.add(Namespace.css.rangeEnd);
              rangeStartElement?.classList.remove(Namespace.css.rangeEnd);
              rangeStartElement?.classList.add(Namespace.css.rangeStart);
              lambda = (_, index) => index < dayIndex && index > rangeStartIndex;
            }
            allDays.filter(lambda).forEach((e2) => {
              e2.classList.add(Namespace.css.rangeIn);
            });
          };
          const rangeHoverOutEvent = (e) => {
            const allDays = [...container.querySelectorAll(".day")];
            if (this.dates.picked.length === 1)
              allDays.forEach((e2) => e2.classList.remove(Namespace.css.rangeIn));
            if (this.dates.picked.length !== 1)
              return;
            const currentTarget = e?.currentTarget;
            const innerDate = new DateTime2(currentTarget.getAttribute("data-value"));
            if (!innerDate.isSame(this.dates.picked[0], exports2.Unit.date)) {
              currentTarget.classList.remove(Namespace.css.rangeStart);
            }
            if (!innerDate.isSame(this.dates.picked[1], exports2.Unit.date)) {
              currentTarget.classList.remove(Namespace.css.rangeEnd);
            }
          };
          return { rangeHoverEvent, rangeHoverOutEvent };
        }
        _updateCalendarView(container) {
          if (this.optionsStore.currentView !== "calendar")
            return;
          const [previous, switcher, next] = container.parentElement.getElementsByClassName(Namespace.css.calendarHeader)[0].getElementsByTagName("div");
          switcher.setAttribute(Namespace.css.daysContainer, this.optionsStore.viewDate.format(this.optionsStore.options.localization.dayViewHeaderFormat));
          this.optionsStore.options.display.components.month ? switcher.classList.remove(Namespace.css.disabled) : switcher.classList.add(Namespace.css.disabled);
          this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.month), exports2.Unit.month) ? previous.classList.remove(Namespace.css.disabled) : previous.classList.add(Namespace.css.disabled);
          this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, exports2.Unit.month), exports2.Unit.month) ? next.classList.remove(Namespace.css.disabled) : next.classList.add(Namespace.css.disabled);
        }
        /***
         * Generates a html row that contains the days of the week.
         * @private
         */
        _daysOfTheWeek() {
          const innerDate = this.optionsStore.viewDate.clone.startOf("weekDay", this.optionsStore.options.localization.startOfTheWeek).startOf(exports2.Unit.date);
          const row = [];
          document.createElement("div");
          if (this.optionsStore.options.display.calendarWeeks) {
            const htmlDivElement = document.createElement("div");
            htmlDivElement.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
            htmlDivElement.innerText = "#";
            row.push(htmlDivElement);
          }
          for (let i = 0; i < 7; i++) {
            const htmlDivElement = document.createElement("div");
            htmlDivElement.classList.add(Namespace.css.dayOfTheWeek, Namespace.css.noHighlight);
            htmlDivElement.innerText = innerDate.format({ weekday: "short" });
            innerDate.manipulate(1, exports2.Unit.date);
            row.push(htmlDivElement);
          }
          return row;
        }
        _handleCalendarWeeks(container, innerDate) {
          [...container.querySelectorAll(`.${Namespace.css.calendarWeeks}`)].filter((e) => e.innerText !== "#").forEach((element) => {
            element.innerText = `${innerDate.week}`;
            innerDate.manipulate(7, exports2.Unit.date);
          });
        }
      }
      class MonthDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.monthsContainer);
          for (let i = 0; i < 12; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectMonth);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const container = widget.getElementsByClassName(Namespace.css.monthsContainer)[0];
          if (this.optionsStore.currentView === "months") {
            const [previous, switcher, next] = container.parentElement.getElementsByClassName(Namespace.css.calendarHeader)[0].getElementsByTagName("div");
            switcher.setAttribute(Namespace.css.monthsContainer, this.optionsStore.viewDate.format({ year: "numeric" }));
            this.optionsStore.options.display.components.year ? switcher.classList.remove(Namespace.css.disabled) : switcher.classList.add(Namespace.css.disabled);
            this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.year), exports2.Unit.year) ? previous.classList.remove(Namespace.css.disabled) : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, exports2.Unit.year), exports2.Unit.year) ? next.classList.remove(Namespace.css.disabled) : next.classList.add(Namespace.css.disabled);
          }
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.year);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectMonth}"]`).forEach((containerClone, index) => {
            const classes = [];
            classes.push(Namespace.css.month);
            if (!this.optionsStore.unset && this.dates.isPicked(innerDate, exports2.Unit.month)) {
              classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, exports2.Unit.month)) {
              classes.push(Namespace.css.disabled);
            }
            paint(exports2.Unit.month, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${index}`);
            containerClone.innerText = `${innerDate.format({ month: "short" })}`;
            innerDate.manipulate(1, exports2.Unit.month);
          });
        }
      }
      class YearDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.yearsContainer);
          for (let i = 0; i < 12; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectYear);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          this._startYear = this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.year);
          this._endYear = this.optionsStore.viewDate.clone.manipulate(10, exports2.Unit.year);
          const container = widget.getElementsByClassName(Namespace.css.yearsContainer)[0];
          if (this.optionsStore.currentView === "years") {
            const [previous, switcher, next] = container.parentElement.getElementsByClassName(Namespace.css.calendarHeader)[0].getElementsByTagName("div");
            switcher.setAttribute(Namespace.css.yearsContainer, `${this._startYear.format({ year: "numeric" })}-${this._endYear.format({
              year: "numeric"
            })}`);
            this.optionsStore.options.display.components.decades ? switcher.classList.remove(Namespace.css.disabled) : switcher.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._startYear, exports2.Unit.year) ? previous.classList.remove(Namespace.css.disabled) : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._endYear, exports2.Unit.year) ? next.classList.remove(Namespace.css.disabled) : next.classList.add(Namespace.css.disabled);
          }
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.year).manipulate(-1, exports2.Unit.year);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectYear}"]`).forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.year);
            if (!this.optionsStore.unset && this.dates.isPicked(innerDate, exports2.Unit.year)) {
              classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, exports2.Unit.year)) {
              classes.push(Namespace.css.disabled);
            }
            paint(exports2.Unit.year, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${innerDate.year}`);
            containerClone.innerText = innerDate.format({ year: "numeric" });
            innerDate.manipulate(1, exports2.Unit.year);
          });
        }
      }
      class DecadeDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.decadesContainer);
          for (let i = 0; i < 12; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectDecade);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const [start, end] = Dates.getStartEndYear(100, this.optionsStore.viewDate.year);
          this._startDecade = this.optionsStore.viewDate.clone.startOf(exports2.Unit.year);
          this._startDecade.year = start;
          this._endDecade = this.optionsStore.viewDate.clone.startOf(exports2.Unit.year);
          this._endDecade.year = end;
          const container = widget.getElementsByClassName(Namespace.css.decadesContainer)[0];
          const [previous, switcher, next] = container.parentElement.getElementsByClassName(Namespace.css.calendarHeader)[0].getElementsByTagName("div");
          if (this.optionsStore.currentView === "decades") {
            switcher.setAttribute(Namespace.css.decadesContainer, `${this._startDecade.format({
              year: "numeric"
            })}-${this._endDecade.format({ year: "numeric" })}`);
            this.validation.isValid(this._startDecade, exports2.Unit.year) ? previous.classList.remove(Namespace.css.disabled) : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._endDecade, exports2.Unit.year) ? next.classList.remove(Namespace.css.disabled) : next.classList.add(Namespace.css.disabled);
          }
          const pickedYears = this.dates.picked.map((x) => x.year);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectDecade}"]`).forEach((containerClone, index) => {
            if (index === 0) {
              containerClone.classList.add(Namespace.css.old);
              if (this._startDecade.year - 10 < 0) {
                containerClone.textContent = " ";
                previous.classList.add(Namespace.css.disabled);
                containerClone.classList.add(Namespace.css.disabled);
                containerClone.setAttribute("data-value", "");
                return;
              } else {
                containerClone.innerText = this._startDecade.clone.manipulate(-10, exports2.Unit.year).format({ year: "numeric" });
                containerClone.setAttribute("data-value", `${this._startDecade.year}`);
                return;
              }
            }
            const classes = [];
            classes.push(Namespace.css.decade);
            const startDecadeYear = this._startDecade.year;
            const endDecadeYear = this._startDecade.year + 9;
            if (!this.optionsStore.unset && pickedYears.filter((x) => x >= startDecadeYear && x <= endDecadeYear).length > 0) {
              classes.push(Namespace.css.active);
            }
            paint("decade", this._startDecade, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${this._startDecade.year}`);
            containerClone.innerText = `${this._startDecade.format({
              year: "numeric"
            })}`;
            this._startDecade.manipulate(10, exports2.Unit.year);
          });
        }
      }
      class TimeDisplay {
        constructor() {
          this._gridColumns = "";
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the clock display
         * @private
         */
        getPicker(iconTag) {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.clockContainer);
          container.append(...this._grid(iconTag));
          return container;
        }
        /**
         * Populates the various elements with in the clock display
         * like the current hour and if the manipulation icons are enabled.
         * @private
         */
        _update(widget) {
          const timesDiv = widget.getElementsByClassName(Namespace.css.clockContainer)[0];
          let lastPicked = this.dates.lastPicked?.clone;
          if (!lastPicked && this.optionsStore.options.useCurrent)
            lastPicked = this.optionsStore.viewDate.clone;
          timesDiv.querySelectorAll(".disabled").forEach((element) => element.classList.remove(Namespace.css.disabled));
          if (this.optionsStore.options.display.components.hours) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, exports2.Unit.hours), exports2.Unit.hours)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.incrementHours}]`).classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.hours), exports2.Unit.hours)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.decrementHours}]`).classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${exports2.Unit.hours}]`).innerText = lastPicked ? lastPicked.getHoursFormatted(this.optionsStore.options.localization.hourCycle) : "--";
          }
          if (this.optionsStore.options.display.components.minutes) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, exports2.Unit.minutes), exports2.Unit.minutes)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.incrementMinutes}]`).classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.minutes), exports2.Unit.minutes)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.decrementMinutes}]`).classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${exports2.Unit.minutes}]`).innerText = lastPicked ? lastPicked.minutesFormatted : "--";
          }
          if (this.optionsStore.options.display.components.seconds) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, exports2.Unit.seconds), exports2.Unit.seconds)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.incrementSeconds}]`).classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, exports2.Unit.seconds), exports2.Unit.seconds)) {
              timesDiv.querySelector(`[data-action=${ActionTypes$1.decrementSeconds}]`).classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${exports2.Unit.seconds}]`).innerText = lastPicked ? lastPicked.secondsFormatted : "--";
          }
          if (this.optionsStore.isTwelveHour) {
            const toggle = timesDiv.querySelector(`[data-action=${ActionTypes$1.toggleMeridiem}]`);
            const meridiemDate = (lastPicked || this.optionsStore.viewDate).clone;
            toggle.innerText = meridiemDate.meridiem();
            if (!this.validation.isValid(meridiemDate.manipulate(meridiemDate.hours >= 12 ? -12 : 12, exports2.Unit.hours))) {
              toggle.classList.add(Namespace.css.disabled);
            } else {
              toggle.classList.remove(Namespace.css.disabled);
            }
          }
          timesDiv.style.gridTemplateAreas = `"${this._gridColumns}"`;
        }
        /**
         * Creates the table for the clock display depending on what options are selected.
         * @private
         */
        _grid(iconTag) {
          this._gridColumns = "";
          const top = [], middle = [], bottom = [], separator = document.createElement("div"), upIcon = iconTag(this.optionsStore.options.display.icons.up), downIcon = iconTag(this.optionsStore.options.display.icons.down);
          separator.classList.add(Namespace.css.separator, Namespace.css.noHighlight);
          const separatorColon = separator.cloneNode(true);
          separatorColon.innerHTML = ":";
          const getSeparator = (colon = false) => {
            return colon ? separatorColon.cloneNode(true) : separator.cloneNode(true);
          };
          if (this.optionsStore.options.display.components.hours) {
            let divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.incrementHour);
            divElement.setAttribute("data-action", ActionTypes$1.incrementHours);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.pickHour);
            divElement.setAttribute("data-action", ActionTypes$1.showHours);
            divElement.setAttribute("data-time-component", exports2.Unit.hours);
            middle.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.decrementHour);
            divElement.setAttribute("data-action", ActionTypes$1.decrementHours);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
            this._gridColumns += "a";
          }
          if (this.optionsStore.options.display.components.minutes) {
            this._gridColumns += " a";
            if (this.optionsStore.options.display.components.hours) {
              top.push(getSeparator());
              middle.push(getSeparator(true));
              bottom.push(getSeparator());
              this._gridColumns += " a";
            }
            let divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.incrementMinute);
            divElement.setAttribute("data-action", ActionTypes$1.incrementMinutes);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.pickMinute);
            divElement.setAttribute("data-action", ActionTypes$1.showMinutes);
            divElement.setAttribute("data-time-component", exports2.Unit.minutes);
            middle.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.decrementMinute);
            divElement.setAttribute("data-action", ActionTypes$1.decrementMinutes);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
          }
          if (this.optionsStore.options.display.components.seconds) {
            this._gridColumns += " a";
            if (this.optionsStore.options.display.components.minutes) {
              top.push(getSeparator());
              middle.push(getSeparator(true));
              bottom.push(getSeparator());
              this._gridColumns += " a";
            }
            let divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.incrementSecond);
            divElement.setAttribute("data-action", ActionTypes$1.incrementSeconds);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.pickSecond);
            divElement.setAttribute("data-action", ActionTypes$1.showSeconds);
            divElement.setAttribute("data-time-component", exports2.Unit.seconds);
            middle.push(divElement);
            divElement = document.createElement("div");
            divElement.setAttribute("title", this.optionsStore.options.localization.decrementSecond);
            divElement.setAttribute("data-action", ActionTypes$1.decrementSeconds);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
          }
          if (this.optionsStore.isTwelveHour) {
            this._gridColumns += " a";
            let divElement = getSeparator();
            top.push(divElement);
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("title", this.optionsStore.options.localization.toggleMeridiem);
            button.setAttribute("data-action", ActionTypes$1.toggleMeridiem);
            button.setAttribute("tabindex", "-1");
            if (Namespace.css.toggleMeridiem.includes(",")) {
              button.classList.add(...Namespace.css.toggleMeridiem.split(","));
            } else
              button.classList.add(Namespace.css.toggleMeridiem);
            divElement = document.createElement("div");
            divElement.classList.add(Namespace.css.noHighlight);
            divElement.appendChild(button);
            middle.push(divElement);
            divElement = getSeparator();
            bottom.push(divElement);
          }
          this._gridColumns = this._gridColumns.trim();
          return [...top, ...middle, ...bottom];
        }
      }
      class HourDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.hourContainer);
          for (let i = 0; i < (this.optionsStore.isTwelveHour ? 12 : 24); i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectHour);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const container = widget.getElementsByClassName(Namespace.css.hourContainer)[0];
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.date);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectHour}"]`).forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.hour);
            if (!this.validation.isValid(innerDate, exports2.Unit.hours)) {
              classes.push(Namespace.css.disabled);
            }
            paint(exports2.Unit.hours, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${innerDate.hours}`);
            containerClone.innerText = innerDate.getHoursFormatted(this.optionsStore.options.localization.hourCycle);
            innerDate.manipulate(1, exports2.Unit.hours);
          });
        }
      }
      class MinuteDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.minuteContainer);
          const step = this.optionsStore.options.stepping === 1 ? 5 : this.optionsStore.options.stepping;
          for (let i = 0; i < 60 / step; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectMinute);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const container = widget.getElementsByClassName(Namespace.css.minuteContainer)[0];
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.hours);
          const step = this.optionsStore.options.stepping === 1 ? 5 : this.optionsStore.options.stepping;
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectMinute}"]`).forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.minute);
            if (!this.validation.isValid(innerDate, exports2.Unit.minutes)) {
              classes.push(Namespace.css.disabled);
            }
            paint(exports2.Unit.minutes, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${innerDate.minutes}`);
            containerClone.innerText = innerDate.minutesFormatted;
            innerDate.manipulate(step, exports2.Unit.minutes);
          });
        }
      }
      class secondDisplay {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.validation = serviceLocator.locate(Validation);
        }
        /**
         * Build the container html for the display
         * @private
         */
        getPicker() {
          const container = document.createElement("div");
          container.classList.add(Namespace.css.secondContainer);
          for (let i = 0; i < 12; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.selectSecond);
            container.appendChild(div);
          }
          return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update(widget, paint) {
          const container = widget.getElementsByClassName(Namespace.css.secondContainer)[0];
          const innerDate = this.optionsStore.viewDate.clone.startOf(exports2.Unit.minutes);
          container.querySelectorAll(`[data-action="${ActionTypes$1.selectSecond}"]`).forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.second);
            if (!this.validation.isValid(innerDate, exports2.Unit.seconds)) {
              classes.push(Namespace.css.disabled);
            }
            paint(exports2.Unit.seconds, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute("data-value", `${innerDate.seconds}`);
            containerClone.innerText = innerDate.secondsFormatted;
            innerDate.manipulate(5, exports2.Unit.seconds);
          });
        }
      }
      class Collapse {
        /**
         * Flips the show/hide state of `target`
         * @param target html element to affect.
         */
        static toggle(target) {
          if (target.classList.contains(Namespace.css.show)) {
            this.hide(target);
          } else {
            this.show(target);
          }
        }
        /**
         * Skips any animation or timeouts and immediately set the element to show.
         * @param target
         */
        static showImmediately(target) {
          target.classList.remove(Namespace.css.collapsing);
          target.classList.add(Namespace.css.collapse, Namespace.css.show);
          target.style.height = "";
        }
        /**
         * If `target` is not already showing, then show after the animation.
         * @param target
         */
        static show(target) {
          if (target.classList.contains(Namespace.css.collapsing) || target.classList.contains(Namespace.css.show))
            return;
          const complete = () => {
            Collapse.showImmediately(target);
          };
          target.style.height = "0";
          target.classList.remove(Namespace.css.collapse);
          target.classList.add(Namespace.css.collapsing);
          setTimeout(complete, this.getTransitionDurationFromElement(target));
          target.style.height = `${target.scrollHeight}px`;
        }
        /**
         * Skips any animation or timeouts and immediately set the element to hide.
         * @param target
         */
        static hideImmediately(target) {
          if (!target)
            return;
          target.classList.remove(Namespace.css.collapsing, Namespace.css.show);
          target.classList.add(Namespace.css.collapse);
        }
        /**
         * If `target` is not already hidden, then hide after the animation.
         * @param target HTML Element
         */
        static hide(target) {
          if (target.classList.contains(Namespace.css.collapsing) || !target.classList.contains(Namespace.css.show))
            return;
          const complete = () => {
            Collapse.hideImmediately(target);
          };
          target.style.height = `${target.getBoundingClientRect()["height"]}px`;
          const reflow = (element) => element.offsetHeight;
          reflow(target);
          target.classList.remove(Namespace.css.collapse, Namespace.css.show);
          target.classList.add(Namespace.css.collapsing);
          target.style.height = "";
          setTimeout(complete, this.getTransitionDurationFromElement(target));
        }
      }
      Collapse.getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * 1e3;
      };
      class Display {
        constructor() {
          this._isVisible = false;
          this._documentClickEvent = (e) => {
            if (this.optionsStore.options.debug || window.debug)
              return;
            if (this._isVisible && !e.composedPath().includes(this.widget) && // click inside the widget
            !e.composedPath()?.includes(this.optionsStore.element)) {
              this.hide();
            }
          };
          this._actionsClickEvent = (e) => {
            this._eventEmitters.action.emit({ e });
          };
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.validation = serviceLocator.locate(Validation);
          this.dates = serviceLocator.locate(Dates);
          this.dateDisplay = serviceLocator.locate(DateDisplay);
          this.monthDisplay = serviceLocator.locate(MonthDisplay);
          this.yearDisplay = serviceLocator.locate(YearDisplay);
          this.decadeDisplay = serviceLocator.locate(DecadeDisplay);
          this.timeDisplay = serviceLocator.locate(TimeDisplay);
          this.hourDisplay = serviceLocator.locate(HourDisplay);
          this.minuteDisplay = serviceLocator.locate(MinuteDisplay);
          this.secondDisplay = serviceLocator.locate(secondDisplay);
          this._eventEmitters = serviceLocator.locate(EventEmitters);
          this._widget = void 0;
          this._eventEmitters.updateDisplay.subscribe((result) => {
            this._update(result);
          });
        }
        /**
         * Returns the widget body or undefined
         * @private
         */
        get widget() {
          return this._widget;
        }
        get dateContainer() {
          return this.widget?.querySelector(`div.${Namespace.css.dateContainer}`);
        }
        get timeContainer() {
          return this.widget?.querySelector(`div.${Namespace.css.timeContainer}`);
        }
        /**
         * Returns this visible state of the picker (shown)
         */
        get isVisible() {
          return this._isVisible;
        }
        /**
         * Updates the table for a particular unit. Used when an option as changed or
         * whenever the class list might need to be refreshed.
         * @param unit
         * @private
         */
        _update(unit) {
          if (!this.widget)
            return;
          switch (unit) {
            case exports2.Unit.seconds:
              this.secondDisplay._update(this.widget, this.paint);
              break;
            case exports2.Unit.minutes:
              this.minuteDisplay._update(this.widget, this.paint);
              break;
            case exports2.Unit.hours:
              this.hourDisplay._update(this.widget, this.paint);
              break;
            case exports2.Unit.date:
              this.dateDisplay._update(this.widget, this.paint);
              break;
            case exports2.Unit.month:
              this.monthDisplay._update(this.widget, this.paint);
              break;
            case exports2.Unit.year:
              this.yearDisplay._update(this.widget, this.paint);
              break;
            case "decade":
              this.decadeDisplay._update(this.widget, this.paint);
              break;
            case "clock":
              if (!this._hasTime)
                break;
              this.timeDisplay._update(this.widget);
              this._update(exports2.Unit.hours);
              this._update(exports2.Unit.minutes);
              this._update(exports2.Unit.seconds);
              break;
            case "calendar":
              this._update(exports2.Unit.date);
              this._update(exports2.Unit.year);
              this._update(exports2.Unit.month);
              this.decadeDisplay._update(this.widget, this.paint);
              this._updateCalendarHeader();
              break;
            case "all":
              if (this._hasTime) {
                this._update("clock");
              }
              if (this._hasDate) {
                this._update("calendar");
              }
          }
        }
        // noinspection JSUnusedLocalSymbols
        /**
         * Allows developers to add/remove classes from an element.
         * @param _unit
         * @param _date
         * @param _classes
         * @param _element
         */
        /* eslint-disable @typescript-eslint/no-unused-vars */
        paint(_unit, _date, _classes, _element) {
        }
        /**
         * Shows the picker and creates a Popper instance if needed.
         * Add document click event to hide when clicking outside the picker.
         * fires Events#show
         */
        show() {
          if (this.widget == void 0) {
            this._showSetDefaultIfNeeded();
            this._buildWidget();
            this._updateTheme();
            this._showSetupViewMode();
            if (!this.optionsStore.options.display.inline) {
              const container = this.optionsStore.options?.container || document.body;
              const placement = this.optionsStore.options?.display?.placement || "bottom";
              container.appendChild(this.widget);
              this.createPopup(this.optionsStore.element, this.widget, {
                modifiers: [{ name: "eventListeners", enabled: true }],
                //#2400
                placement: document.documentElement.dir === "rtl" ? `${placement}-end` : `${placement}-start`
              }).then();
            } else {
              this.optionsStore.element.appendChild(this.widget);
            }
            if (this.optionsStore.options.display.viewMode == "clock") {
              this._eventEmitters.action.emit({
                e: null,
                action: ActionTypes$1.showClock
              });
            }
            this.widget.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", this._actionsClickEvent));
            if (this._hasTime && this.optionsStore.options.display.sideBySide) {
              this.timeDisplay._update(this.widget);
              this.widget.getElementsByClassName(Namespace.css.clockContainer)[0].style.display = "grid";
            }
          }
          this.widget.classList.add(Namespace.css.show);
          if (!this.optionsStore.options.display.inline) {
            this.updatePopup();
            document.addEventListener("click", this._documentClickEvent);
          }
          this._eventEmitters.triggerEvent.emit({ type: Namespace.events.show });
          this._isVisible = true;
        }
        _showSetupViewMode() {
          const onlyClock = this._hasTime && !this._hasDate;
          if (onlyClock) {
            this.optionsStore.currentView = "clock";
            this._eventEmitters.action.emit({
              e: null,
              action: ActionTypes$1.showClock
            });
          } else if (!this.optionsStore.currentCalendarViewMode) {
            this.optionsStore.currentCalendarViewMode = this.optionsStore.minimumCalendarViewMode;
          }
          if (!onlyClock && this.optionsStore.options.display.viewMode !== "clock") {
            if (this._hasTime) {
              if (!this.optionsStore.options.display.sideBySide) {
                Collapse.hideImmediately(this.timeContainer);
              } else {
                Collapse.show(this.timeContainer);
              }
            }
            Collapse.show(this.dateContainer);
          }
          if (this._hasDate) {
            this._showMode();
          }
        }
        _showSetDefaultIfNeeded() {
          if (this.dates.picked.length != 0)
            return;
          if (this.optionsStore.options.useCurrent && !this.optionsStore.options.defaultDate) {
            const date = new DateTime2().setLocalization(this.optionsStore.options.localization);
            if (!this.optionsStore.options.keepInvalid) {
              let tries = 0;
              let direction = 1;
              if (this.optionsStore.options.restrictions.maxDate?.isBefore(date)) {
                direction = -1;
              }
              while (!this.validation.isValid(date) && tries > 31) {
                date.manipulate(direction, exports2.Unit.date);
                tries++;
              }
            }
            this.dates.setValue(date);
          }
          if (this.optionsStore.options.defaultDate) {
            this.dates.setValue(this.optionsStore.options.defaultDate);
          }
        }
        async createPopup(element, widget, options) {
          let createPopperFunction;
          if (window?.Popper) {
            createPopperFunction = window?.Popper?.createPopper;
          } else {
            const { createPopper } = await Promise.resolve().then(() => __toESM(require_popper()));
            createPopperFunction = createPopper;
          }
          if (createPopperFunction) {
            this._popperInstance = createPopperFunction(element, widget, options);
          }
        }
        updatePopup() {
          this._popperInstance?.update();
        }
        /**
         * Changes the calendar view mode. E.g. month <-> year
         * @param direction -/+ number to move currentViewMode
         * @private
         */
        _showMode(direction) {
          if (!this.widget) {
            return;
          }
          if (direction) {
            const max = Math.max(this.optionsStore.minimumCalendarViewMode, Math.min(3, this.optionsStore.currentCalendarViewMode + direction));
            if (this.optionsStore.currentCalendarViewMode == max)
              return;
            this.optionsStore.currentCalendarViewMode = max;
          }
          this.widget.querySelectorAll(`.${Namespace.css.dateContainer} > div:not(.${Namespace.css.calendarHeader}), .${Namespace.css.timeContainer} > div:not(.${Namespace.css.clockContainer})`).forEach((e) => e.style.display = "none");
          const datePickerMode = CalendarModes[this.optionsStore.currentCalendarViewMode];
          const picker = this.widget.querySelector(`.${datePickerMode.className}`);
          switch (datePickerMode.className) {
            case Namespace.css.decadesContainer:
              this.decadeDisplay._update(this.widget, this.paint);
              break;
            case Namespace.css.yearsContainer:
              this.yearDisplay._update(this.widget, this.paint);
              break;
            case Namespace.css.monthsContainer:
              this.monthDisplay._update(this.widget, this.paint);
              break;
            case Namespace.css.daysContainer:
              this.dateDisplay._update(this.widget, this.paint);
              break;
          }
          picker.style.display = "grid";
          if (this.optionsStore.options.display.sideBySide)
            this.widget.querySelectorAll(`.${Namespace.css.clockContainer}`)[0].style.display = "grid";
          this._updateCalendarHeader();
          this._eventEmitters.viewUpdate.emit();
        }
        /**
         * Changes the theme. E.g. light, dark or auto
         * @param theme the theme name
         * @private
         */
        _updateTheme(theme) {
          if (!this.widget) {
            return;
          }
          if (theme) {
            if (this.optionsStore.options.display.theme === theme)
              return;
            this.optionsStore.options.display.theme = theme;
          }
          this.widget.classList.remove("light", "dark");
          this.widget.classList.add(this._getThemeClass());
          if (this.optionsStore.options.display.theme === "auto") {
            window.matchMedia(Namespace.css.isDarkPreferredQuery).addEventListener("change", () => this._updateTheme());
          } else {
            window.matchMedia(Namespace.css.isDarkPreferredQuery).removeEventListener("change", () => this._updateTheme());
          }
        }
        _getThemeClass() {
          const currentTheme = this.optionsStore.options.display.theme || "auto";
          const isDarkMode = window.matchMedia && window.matchMedia(Namespace.css.isDarkPreferredQuery).matches;
          switch (currentTheme) {
            case "light":
              return Namespace.css.lightTheme;
            case "dark":
              return Namespace.css.darkTheme;
            case "auto":
              return isDarkMode ? Namespace.css.darkTheme : Namespace.css.lightTheme;
          }
        }
        _updateCalendarHeader() {
          if (!this._hasDate)
            return;
          const showing = [
            ...this.widget.querySelector(`.${Namespace.css.dateContainer} div[style*="display: grid"]`).classList
          ].find((x) => x.startsWith(Namespace.css.dateContainer));
          const [previous, switcher, next] = this.widget.getElementsByClassName(Namespace.css.calendarHeader)[0].getElementsByTagName("div");
          switch (showing) {
            case Namespace.css.decadesContainer:
              previous.setAttribute("title", this.optionsStore.options.localization.previousCentury);
              switcher.setAttribute("title", "");
              next.setAttribute("title", this.optionsStore.options.localization.nextCentury);
              break;
            case Namespace.css.yearsContainer:
              previous.setAttribute("title", this.optionsStore.options.localization.previousDecade);
              switcher.setAttribute("title", this.optionsStore.options.localization.selectDecade);
              next.setAttribute("title", this.optionsStore.options.localization.nextDecade);
              break;
            case Namespace.css.monthsContainer:
              previous.setAttribute("title", this.optionsStore.options.localization.previousYear);
              switcher.setAttribute("title", this.optionsStore.options.localization.selectYear);
              next.setAttribute("title", this.optionsStore.options.localization.nextYear);
              break;
            case Namespace.css.daysContainer:
              previous.setAttribute("title", this.optionsStore.options.localization.previousMonth);
              switcher.setAttribute("title", this.optionsStore.options.localization.selectMonth);
              next.setAttribute("title", this.optionsStore.options.localization.nextMonth);
              switcher.setAttribute(showing, this.optionsStore.viewDate.format(this.optionsStore.options.localization.dayViewHeaderFormat));
              break;
          }
          switcher.innerText = switcher.getAttribute(showing);
        }
        /**
         * Hides the picker if needed.
         * Remove document click event to hide when clicking outside the picker.
         * fires Events#hide
         */
        hide() {
          if (!this.widget || !this._isVisible)
            return;
          this.widget.classList.remove(Namespace.css.show);
          if (this._isVisible) {
            this._eventEmitters.triggerEvent.emit({
              type: Namespace.events.hide,
              date: this.optionsStore.unset ? null : this.dates.lastPicked?.clone
            });
            this._isVisible = false;
          }
          document.removeEventListener("click", this._documentClickEvent);
        }
        /**
         * Toggles the picker's open state. Fires a show/hide event depending.
         */
        toggle() {
          return this._isVisible ? this.hide() : this.show();
        }
        /**
         * Removes document and data-action click listener and reset the widget
         * @private
         */
        _dispose() {
          document.removeEventListener("click", this._documentClickEvent);
          if (!this.widget)
            return;
          this.widget.querySelectorAll("[data-action]").forEach((element) => element.removeEventListener("click", this._actionsClickEvent));
          this.widget.parentNode.removeChild(this.widget);
          this._widget = void 0;
        }
        /**
         * Builds the widgets html template.
         * @private
         */
        _buildWidget() {
          const template = document.createElement("div");
          template.classList.add(Namespace.css.widget);
          const dateView = document.createElement("div");
          dateView.classList.add(Namespace.css.dateContainer);
          dateView.append(this.getHeadTemplate(), this.decadeDisplay.getPicker(), this.yearDisplay.getPicker(), this.monthDisplay.getPicker(), this.dateDisplay.getPicker());
          const timeView = document.createElement("div");
          timeView.classList.add(Namespace.css.timeContainer);
          timeView.appendChild(this.timeDisplay.getPicker(this._iconTag.bind(this)));
          timeView.appendChild(this.hourDisplay.getPicker());
          timeView.appendChild(this.minuteDisplay.getPicker());
          timeView.appendChild(this.secondDisplay.getPicker());
          const toolbar = document.createElement("div");
          toolbar.classList.add(Namespace.css.toolbar);
          toolbar.append(...this.getToolbarElements());
          if (this.optionsStore.options.display.inline) {
            template.classList.add(Namespace.css.inline);
          }
          if (this.optionsStore.options.display.calendarWeeks) {
            template.classList.add("calendarWeeks");
          }
          if (this.optionsStore.options.display.sideBySide && this._hasDateAndTime) {
            this._buildWidgetSideBySide(template, dateView, timeView, toolbar);
            return;
          }
          if (this.optionsStore.options.display.toolbarPlacement === "top") {
            template.appendChild(toolbar);
          }
          const setupComponentView = (hasFirst, hasSecond, element, shouldShow) => {
            if (!hasFirst)
              return;
            if (hasSecond) {
              element.classList.add(Namespace.css.collapse);
              if (shouldShow)
                element.classList.add(Namespace.css.show);
            }
            template.appendChild(element);
          };
          setupComponentView(this._hasDate, this._hasTime, dateView, this.optionsStore.options.display.viewMode !== "clock");
          setupComponentView(this._hasTime, this._hasDate, timeView, this.optionsStore.options.display.viewMode === "clock");
          if (this.optionsStore.options.display.toolbarPlacement === "bottom") {
            template.appendChild(toolbar);
          }
          const arrow = document.createElement("div");
          arrow.classList.add("arrow");
          arrow.setAttribute("data-popper-arrow", "");
          template.appendChild(arrow);
          this._widget = template;
        }
        _buildWidgetSideBySide(template, dateView, timeView, toolbar) {
          template.classList.add(Namespace.css.sideBySide);
          if (this.optionsStore.options.display.toolbarPlacement === "top") {
            template.appendChild(toolbar);
          }
          const row = document.createElement("div");
          row.classList.add("td-row");
          dateView.classList.add("td-half");
          timeView.classList.add("td-half");
          row.appendChild(dateView);
          row.appendChild(timeView);
          template.appendChild(row);
          if (this.optionsStore.options.display.toolbarPlacement === "bottom") {
            template.appendChild(toolbar);
          }
          this._widget = template;
        }
        /**
         * Returns true if the hours, minutes, or seconds component is turned on
         */
        get _hasTime() {
          return this.optionsStore.options.display.components.clock && (this.optionsStore.options.display.components.hours || this.optionsStore.options.display.components.minutes || this.optionsStore.options.display.components.seconds);
        }
        /**
         * Returns true if the year, month, or date component is turned on
         */
        get _hasDate() {
          return this.optionsStore.options.display.components.calendar && (this.optionsStore.options.display.components.year || this.optionsStore.options.display.components.month || this.optionsStore.options.display.components.date);
        }
        get _hasDateAndTime() {
          return this._hasDate && this._hasTime;
        }
        /**
         * Get the toolbar html based on options like buttons => today
         * @private
         */
        getToolbarElements() {
          const toolbar = [];
          if (this.optionsStore.options.display.buttons.today) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.today);
            div.setAttribute("title", this.optionsStore.options.localization.today);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.today));
            toolbar.push(div);
          }
          if (!this.optionsStore.options.display.sideBySide && this._hasDate && this._hasTime) {
            let title, icon;
            if (this.optionsStore.options.display.viewMode === "clock") {
              title = this.optionsStore.options.localization.selectDate;
              icon = this.optionsStore.options.display.icons.date;
            } else {
              title = this.optionsStore.options.localization.selectTime;
              icon = this.optionsStore.options.display.icons.time;
            }
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.togglePicker);
            div.setAttribute("title", title);
            div.appendChild(this._iconTag(icon));
            toolbar.push(div);
          }
          if (this.optionsStore.options.display.buttons.clear) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.clear);
            div.setAttribute("title", this.optionsStore.options.localization.clear);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.clear));
            toolbar.push(div);
          }
          if (this.optionsStore.options.display.buttons.close) {
            const div = document.createElement("div");
            div.setAttribute("data-action", ActionTypes$1.close);
            div.setAttribute("title", this.optionsStore.options.localization.close);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.close));
            toolbar.push(div);
          }
          return toolbar;
        }
        /***
         * Builds the base header template with next and previous icons
         * @private
         */
        getHeadTemplate() {
          const calendarHeader = document.createElement("div");
          calendarHeader.classList.add(Namespace.css.calendarHeader);
          const previous = document.createElement("div");
          previous.classList.add(Namespace.css.previous);
          previous.setAttribute("data-action", ActionTypes$1.previous);
          previous.appendChild(this._iconTag(this.optionsStore.options.display.icons.previous));
          const switcher = document.createElement("div");
          switcher.classList.add(Namespace.css.switch);
          switcher.setAttribute("data-action", ActionTypes$1.changeCalendarView);
          const next = document.createElement("div");
          next.classList.add(Namespace.css.next);
          next.setAttribute("data-action", ActionTypes$1.next);
          next.appendChild(this._iconTag(this.optionsStore.options.display.icons.next));
          calendarHeader.append(previous, switcher, next);
          return calendarHeader;
        }
        /**
         * Builds an icon tag as either an `<i>`
         * or with icons => type is `sprites` then a svg tag instead
         * @param iconClass
         * @private
         */
        _iconTag(iconClass) {
          if (this.optionsStore.options.display.icons.type === "sprites") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const icon2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
            icon2.setAttribute("xlink:href", iconClass);
            icon2.setAttribute("href", iconClass);
            svg.appendChild(icon2);
            return svg;
          }
          const icon = document.createElement("i");
          icon.classList.add(...iconClass.split(" "));
          return icon;
        }
        /**
         * Causes the widget to get rebuilt on next show. If the picker is already open
         * then hide and reshow it.
         * @private
         */
        _rebuild() {
          const wasVisible = this._isVisible;
          this._dispose();
          if (wasVisible)
            this.show();
        }
        refreshCurrentView() {
          if (!this._isVisible)
            this._dispose();
          switch (this.optionsStore.currentView) {
            case "clock":
              this._update("clock");
              break;
            case "calendar":
              this._update(exports2.Unit.date);
              break;
            case "months":
              this._update(exports2.Unit.month);
              break;
            case "years":
              this._update(exports2.Unit.year);
              break;
            case "decades":
              this._update("decade");
              break;
          }
        }
      }
      class Actions {
        constructor() {
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.dates = serviceLocator.locate(Dates);
          this.validation = serviceLocator.locate(Validation);
          this.display = serviceLocator.locate(Display);
          this._eventEmitters = serviceLocator.locate(EventEmitters);
          this._eventEmitters.action.subscribe((result) => {
            this.do(result.e, result.action);
          });
        }
        /**
         * Performs the selected `action`. See ActionTypes
         * @param e This is normally a click event
         * @param action If not provided, then look for a [data-action]
         */
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        do(e, action) {
          const currentTarget = e?.currentTarget;
          if (currentTarget?.classList?.contains(Namespace.css.disabled))
            return;
          action = action || currentTarget?.dataset?.action;
          const lastPicked = (this.dates.lastPicked || this.optionsStore.viewDate).clone;
          switch (action) {
            case ActionTypes$1.next:
            case ActionTypes$1.previous:
              this.handleNextPrevious(action);
              break;
            case ActionTypes$1.changeCalendarView:
              this.display._showMode(1);
              this.display._updateCalendarHeader();
              break;
            case ActionTypes$1.selectMonth:
            case ActionTypes$1.selectYear:
            case ActionTypes$1.selectDecade:
              this.handleSelectCalendarMode(action, currentTarget);
              break;
            case ActionTypes$1.selectDay:
              this.handleSelectDay(currentTarget);
              break;
            case ActionTypes$1.selectHour: {
              let hour = +currentTarget.dataset.value;
              if (lastPicked.hours >= 12 && this.optionsStore.isTwelveHour)
                hour += 12;
              lastPicked.hours = hour;
              this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
              this.hideOrClock(e);
              break;
            }
            case ActionTypes$1.selectMinute: {
              lastPicked.minutes = +currentTarget.dataset.value;
              this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
              this.hideOrClock(e);
              break;
            }
            case ActionTypes$1.selectSecond: {
              lastPicked.seconds = +currentTarget.dataset.value;
              this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
              this.hideOrClock(e);
              break;
            }
            case ActionTypes$1.incrementHours:
              this.manipulateAndSet(lastPicked, exports2.Unit.hours);
              break;
            case ActionTypes$1.incrementMinutes:
              this.manipulateAndSet(lastPicked, exports2.Unit.minutes, this.optionsStore.options.stepping);
              break;
            case ActionTypes$1.incrementSeconds:
              this.manipulateAndSet(lastPicked, exports2.Unit.seconds);
              break;
            case ActionTypes$1.decrementHours:
              this.manipulateAndSet(lastPicked, exports2.Unit.hours, -1);
              break;
            case ActionTypes$1.decrementMinutes:
              this.manipulateAndSet(lastPicked, exports2.Unit.minutes, this.optionsStore.options.stepping * -1);
              break;
            case ActionTypes$1.decrementSeconds:
              this.manipulateAndSet(lastPicked, exports2.Unit.seconds, -1);
              break;
            case ActionTypes$1.toggleMeridiem:
              this.manipulateAndSet(lastPicked, exports2.Unit.hours, this.dates.lastPicked.hours >= 12 ? -12 : 12);
              break;
            case ActionTypes$1.togglePicker:
              this.handleToggle(currentTarget);
              break;
            case ActionTypes$1.showClock:
            case ActionTypes$1.showHours:
            case ActionTypes$1.showMinutes:
            case ActionTypes$1.showSeconds:
              if (!this.optionsStore.options.display.sideBySide && this.optionsStore.currentView !== "clock") {
                Collapse.hideImmediately(this.display.dateContainer);
                Collapse.showImmediately(this.display.timeContainer);
              }
              this.handleShowClockContainers(action);
              break;
            case ActionTypes$1.clear:
              this.dates.setValue(null);
              this.display._updateCalendarHeader();
              break;
            case ActionTypes$1.close:
              this.display.hide();
              break;
            case ActionTypes$1.today: {
              const today = new DateTime2().setLocalization(this.optionsStore.options.localization);
              this._eventEmitters.updateViewDate.emit(today);
              if (this.validation.isValid(today, exports2.Unit.date))
                this.dates.setValue(today, this.dates.lastPickedIndex);
              break;
            }
          }
        }
        handleShowClockContainers(action) {
          if (!this.display._hasTime) {
            Namespace.errorMessages.throwError("Cannot show clock containers when time is disabled.");
            return;
          }
          this.optionsStore.currentView = "clock";
          this.display.widget.querySelectorAll(`.${Namespace.css.timeContainer} > div`).forEach((htmlElement) => htmlElement.style.display = "none");
          let classToUse = "";
          switch (action) {
            case ActionTypes$1.showClock:
              classToUse = Namespace.css.clockContainer;
              this.display._update("clock");
              break;
            case ActionTypes$1.showHours:
              classToUse = Namespace.css.hourContainer;
              this.display._update(exports2.Unit.hours);
              break;
            case ActionTypes$1.showMinutes:
              classToUse = Namespace.css.minuteContainer;
              this.display._update(exports2.Unit.minutes);
              break;
            case ActionTypes$1.showSeconds:
              classToUse = Namespace.css.secondContainer;
              this.display._update(exports2.Unit.seconds);
              break;
          }
          this.display.widget.getElementsByClassName(classToUse)[0].style.display = "grid";
        }
        handleNextPrevious(action) {
          const { unit, step } = CalendarModes[this.optionsStore.currentCalendarViewMode];
          if (action === ActionTypes$1.next)
            this.optionsStore.viewDate.manipulate(step, unit);
          else
            this.optionsStore.viewDate.manipulate(step * -1, unit);
          this._eventEmitters.viewUpdate.emit();
          this.display._showMode();
        }
        /**
         * After setting the value it will either show the clock or hide the widget.
         * @param e
         */
        hideOrClock(e) {
          if (!this.optionsStore.isTwelveHour && !this.optionsStore.options.display.components.minutes && !this.optionsStore.options.display.keepOpen && !this.optionsStore.options.display.inline) {
            this.display.hide();
          } else {
            this.do(e, ActionTypes$1.showClock);
          }
        }
        /**
         * Common function to manipulate {@link lastPicked} by `unit`.
         * @param lastPicked
         * @param unit
         * @param value Value to change by
         */
        manipulateAndSet(lastPicked, unit, value = 1) {
          const newDate = lastPicked.manipulate(value, unit);
          if (this.validation.isValid(newDate, unit)) {
            this.dates.setValue(newDate, this.dates.lastPickedIndex);
          }
        }
        handleSelectCalendarMode(action, currentTarget) {
          const value = +currentTarget.dataset.value;
          switch (action) {
            case ActionTypes$1.selectMonth:
              this.optionsStore.viewDate.month = value;
              break;
            case ActionTypes$1.selectYear:
            case ActionTypes$1.selectDecade:
              this.optionsStore.viewDate.year = value;
              break;
          }
          this.dates.setValue(this.optionsStore.viewDate, this.dates.lastPickedIndex);
          if (this.optionsStore.currentCalendarViewMode === this.optionsStore.minimumCalendarViewMode) {
            if (!this.optionsStore.options.display.inline) {
              this.display.hide();
            }
          } else {
            this.display._showMode(-1);
          }
        }
        handleToggle(currentTarget) {
          if (currentTarget.getAttribute("title") === this.optionsStore.options.localization.selectDate) {
            currentTarget.setAttribute("title", this.optionsStore.options.localization.selectTime);
            currentTarget.innerHTML = this.display._iconTag(this.optionsStore.options.display.icons.time).outerHTML;
            this.display._updateCalendarHeader();
            this.optionsStore.refreshCurrentView();
          } else {
            currentTarget.setAttribute("title", this.optionsStore.options.localization.selectDate);
            currentTarget.innerHTML = this.display._iconTag(this.optionsStore.options.display.icons.date).outerHTML;
            if (this.display._hasTime) {
              this.handleShowClockContainers(ActionTypes$1.showClock);
              this.display._update("clock");
            }
          }
          this.display.widget.querySelectorAll(`.${Namespace.css.dateContainer}, .${Namespace.css.timeContainer}`).forEach((htmlElement) => Collapse.toggle(htmlElement));
          this._eventEmitters.viewUpdate.emit();
        }
        handleSelectDay(currentTarget) {
          const day = this.optionsStore.viewDate.clone;
          if (currentTarget.classList.contains(Namespace.css.old)) {
            day.manipulate(-1, exports2.Unit.month);
          }
          if (currentTarget.classList.contains(Namespace.css.new)) {
            day.manipulate(1, exports2.Unit.month);
          }
          day.date = +currentTarget.dataset.day;
          if (this.optionsStore.options.dateRange)
            this.handleDateRange(day);
          else if (this.optionsStore.options.multipleDates) {
            this.handleMultiDate(day);
          } else {
            this.dates.setValue(day, this.dates.lastPickedIndex);
          }
          if (!this.display._hasTime && !this.optionsStore.options.display.keepOpen && !this.optionsStore.options.display.inline && !this.optionsStore.options.multipleDates && !this.optionsStore.options.dateRange) {
            this.display.hide();
          }
        }
        handleMultiDate(day) {
          let index = this.dates.pickedIndex(day, exports2.Unit.date);
          console.log(index);
          if (index !== -1) {
            this.dates.setValue(null, index);
          } else {
            index = this.dates.lastPickedIndex + 1;
            if (this.dates.picked.length === 0)
              index = 0;
            this.dates.setValue(day, index);
          }
        }
        handleDateRange(day) {
          switch (this.dates.picked.length) {
            case 2: {
              this.dates.clear();
              break;
            }
            case 1: {
              const other = this.dates.picked[0];
              if (day.getTime() === other.getTime()) {
                this.dates.clear();
                break;
              }
              if (day.isBefore(other)) {
                this.dates.setValue(day, 0);
                this.dates.setValue(other, 1);
                return;
              } else {
                this.dates.setValue(day, 1);
                return;
              }
            }
          }
          this.dates.setValue(day, 0);
        }
      }
      class TempusDominus2 {
        constructor(element, options = {}) {
          this._subscribers = {};
          this._isDisabled = false;
          this._inputChangeEvent = (event) => {
            const internallyTriggered = event?.detail;
            if (internallyTriggered)
              return;
            const setViewDate = () => {
              if (this.dates.lastPicked)
                this.optionsStore.viewDate = this.dates.lastPicked.clone;
            };
            const value = this.optionsStore.input.value;
            if (this.optionsStore.options.multipleDates) {
              try {
                const valueSplit = value.split(this.optionsStore.options.multipleDatesSeparator);
                for (let i = 0; i < valueSplit.length; i++) {
                  this.dates.setFromInput(valueSplit[i], i);
                }
                setViewDate();
              } catch {
                console.warn("TD: Something went wrong trying to set the multipleDates values from the input field.");
              }
            } else {
              this.dates.setFromInput(value, 0);
              setViewDate();
            }
          };
          this._toggleClickEvent = () => {
            if (this.optionsStore.element?.disabled || this.optionsStore.input?.disabled || //if we just have the input and allow input toggle is enabled, then don't cause a toggle
            this._toggle.nodeName === "INPUT" && this._toggle?.type === "text" && this.optionsStore.options.allowInputToggle)
              return;
            this.toggle();
          };
          this._openClickEvent = () => {
            if (this.optionsStore.element?.disabled || this.optionsStore.input?.disabled)
              return;
            if (!this.display.isVisible)
              this.show();
          };
          setupServiceLocator();
          this._eventEmitters = serviceLocator.locate(EventEmitters);
          this.optionsStore = serviceLocator.locate(OptionsStore);
          this.display = serviceLocator.locate(Display);
          this.dates = serviceLocator.locate(Dates);
          this.actions = serviceLocator.locate(Actions);
          if (!element) {
            Namespace.errorMessages.mustProvideElement();
          }
          this.optionsStore.element = element;
          this._initializeOptions(options, DefaultOptions, true);
          this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
          this.optionsStore.unset = true;
          this._initializeInput();
          this._initializeToggle();
          if (this.optionsStore.options.display.inline)
            this.display.show();
          this._eventEmitters.triggerEvent.subscribe((e) => {
            this._triggerEvent(e);
          });
          this._eventEmitters.viewUpdate.subscribe(() => {
            this._viewUpdate();
          });
          this._eventEmitters.updateViewDate.subscribe((dateTime) => {
            this.viewDate = dateTime;
          });
        }
        get viewDate() {
          return this.optionsStore.viewDate;
        }
        set viewDate(value) {
          this.optionsStore.viewDate = value;
          this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
          this.display._update(this.optionsStore.currentView === "clock" ? "clock" : "calendar");
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Update the picker options. If `reset` is provide `options` will be merged with DefaultOptions instead.
         * @param options
         * @param reset
         * @public
         */
        updateOptions(options, reset = false) {
          if (reset)
            this._initializeOptions(options, DefaultOptions);
          else
            this._initializeOptions(options, this.optionsStore.options);
          this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
          this.display.refreshCurrentView();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Toggles the picker open or closed. If the picker is disabled, nothing will happen.
         * @public
         */
        toggle() {
          if (this._isDisabled)
            return;
          this.display.toggle();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Shows the picker unless the picker is disabled.
         * @public
         */
        show() {
          if (this._isDisabled)
            return;
          this.display.show();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Hides the picker unless the picker is disabled.
         * @public
         */
        hide() {
          this.display.hide();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Disables the picker and the target input field.
         * @public
         */
        disable() {
          this._isDisabled = true;
          this.optionsStore.input?.setAttribute("disabled", "disabled");
          this.display.hide();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Enables the picker and the target input field.
         * @public
         */
        enable() {
          this._isDisabled = false;
          this.optionsStore.input?.removeAttribute("disabled");
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Clears all the selected dates
         * @public
         */
        clear() {
          this.optionsStore.input.value = "";
          this.dates.clear();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Allows for a direct subscription to picker events, without having to use addEventListener on the element.
         * @param eventTypes See Namespace.Events
         * @param callbacks Function to call when event is triggered
         * @public
         */
        subscribe(eventTypes, callbacks) {
          if (typeof eventTypes === "string") {
            eventTypes = [eventTypes];
          }
          let callBackArray;
          if (!Array.isArray(callbacks)) {
            callBackArray = [callbacks];
          } else {
            callBackArray = callbacks;
          }
          if (eventTypes.length !== callBackArray.length) {
            Namespace.errorMessages.subscribeMismatch();
          }
          const returnArray = [];
          for (let i = 0; i < eventTypes.length; i++) {
            const eventType = eventTypes[i];
            if (!Array.isArray(this._subscribers[eventType])) {
              this._subscribers[eventType] = [];
            }
            this._subscribers[eventType].push(callBackArray[i]);
            returnArray.push({
              unsubscribe: this._unsubscribe.bind(this, eventType, this._subscribers[eventType].length - 1)
            });
            if (eventTypes.length === 1) {
              return returnArray[0];
            }
          }
          return returnArray;
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Hides the picker and removes event listeners
         */
        dispose() {
          this.display.hide();
          this.display._dispose();
          this._eventEmitters.destroy();
          this.optionsStore.input?.removeEventListener("change", this._inputChangeEvent);
          if (this.optionsStore.options.allowInputToggle) {
            this.optionsStore.input?.removeEventListener("click", this._openClickEvent);
            this.optionsStore.input?.removeEventListener("focus", this._openClickEvent);
          }
          this._toggle?.removeEventListener("click", this._toggleClickEvent);
          this._subscribers = {};
        }
        /**
         * Updates the options to use the provided language.
         * THe language file must be loaded first.
         * @param language
         */
        locale(language) {
          const asked = loadedLocales[language];
          if (!asked)
            return;
          this.updateOptions({
            localization: asked
          });
        }
        /**
         * Triggers an event like ChangeEvent when the picker has updated the value
         * of a selected date.
         * @param event Accepts a BaseEvent object.
         * @private
         */
        _triggerEvent(event) {
          event.viewMode = this.optionsStore.currentView;
          const isChangeEvent = event.type === Namespace.events.change;
          if (isChangeEvent) {
            const { date, oldDate, isClear } = event;
            if (date && oldDate && date.isSame(oldDate) || !isClear && !date && !oldDate) {
              return;
            }
            this._handleAfterChangeEvent(event);
            this.optionsStore.input?.dispatchEvent(
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              new CustomEvent("change", { detail: event })
            );
          }
          this.optionsStore.element.dispatchEvent(
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            new CustomEvent(event.type, { detail: event })
          );
          if (window.jQuery) {
            const $2 = window.jQuery;
            if (isChangeEvent && this.optionsStore.input) {
              $2(this.optionsStore.input).trigger(event);
            } else {
              $2(this.optionsStore.element).trigger(event);
            }
          }
          this._publish(event);
        }
        _publish(event) {
          if (!Array.isArray(this._subscribers[event.type])) {
            return;
          }
          this._subscribers[event.type].forEach((callback) => {
            callback(event);
          });
        }
        /**
         * Fires a ViewUpdate event when, for example, the month view is changed.
         * @private
         */
        _viewUpdate() {
          this._triggerEvent({
            type: Namespace.events.update,
            viewDate: this.optionsStore.viewDate.clone
          });
        }
        _unsubscribe(eventName, index) {
          this._subscribers[eventName].splice(index, 1);
        }
        /**
         * Merges two Option objects together and validates options type
         * @param config new Options
         * @param mergeTo Options to merge into
         * @param includeDataset When true, the elements data-td attributes will be included in the
         * @private
         */
        _initializeOptions(config, mergeTo, includeDataset = false) {
          let newConfig = OptionConverter.deepCopy(config);
          newConfig = OptionConverter._mergeOptions(newConfig, mergeTo);
          if (includeDataset)
            newConfig = OptionConverter._dataToOptions(this.optionsStore.element, newConfig);
          OptionConverter._validateConflicts(newConfig);
          newConfig.viewDate = newConfig.viewDate.setLocalization(newConfig.localization);
          if (!this.optionsStore.viewDate.isSame(newConfig.viewDate)) {
            this.optionsStore.viewDate = newConfig.viewDate;
          }
          if (newConfig.display.components.year) {
            this.optionsStore.minimumCalendarViewMode = 2;
          }
          if (newConfig.display.components.month) {
            this.optionsStore.minimumCalendarViewMode = 1;
          }
          if (newConfig.display.components.date) {
            this.optionsStore.minimumCalendarViewMode = 0;
          }
          this.optionsStore.currentCalendarViewMode = Math.max(this.optionsStore.minimumCalendarViewMode, this.optionsStore.currentCalendarViewMode);
          if (CalendarModes[this.optionsStore.currentCalendarViewMode].name !== newConfig.display.viewMode) {
            this.optionsStore.currentCalendarViewMode = Math.max(CalendarModes.findIndex((x) => x.name === newConfig.display.viewMode), this.optionsStore.minimumCalendarViewMode);
          }
          if (this.display?.isVisible) {
            this.display._update("all");
          }
          if (newConfig.display.components.useTwentyfourHour && newConfig.localization.hourCycle === void 0)
            newConfig.localization.hourCycle = "h24";
          else if (newConfig.localization.hourCycle === void 0) {
            newConfig.localization.hourCycle = guessHourCycle(newConfig.localization.locale);
          }
          if (newConfig.restrictions.maxDate && this.viewDate.isAfter(newConfig.restrictions.maxDate))
            this.viewDate = newConfig.restrictions.maxDate;
          if (newConfig.restrictions.minDate && this.viewDate.isBefore(newConfig.restrictions.minDate))
            this.viewDate = newConfig.restrictions.minDate;
          this.optionsStore.options = newConfig;
        }
        /**
         * Checks if an input field is being used, attempts to locate one and sets an
         * event listener if found.
         * @private
         */
        _initializeInput() {
          if (this.optionsStore.element.tagName == "INPUT") {
            this.optionsStore.input = this.optionsStore.element;
          } else {
            const query = this.optionsStore.element.dataset.tdTargetInput;
            if (query == void 0 || query == "nearest") {
              this.optionsStore.input = this.optionsStore.element.querySelector("input");
            } else {
              this.optionsStore.input = this.optionsStore.element.querySelector(query);
            }
          }
          if (!this.optionsStore.input)
            return;
          if (!this.optionsStore.input.value && this.optionsStore.options.defaultDate)
            this.optionsStore.input.value = this.dates.formatInput(this.optionsStore.options.defaultDate);
          this.optionsStore.input.addEventListener("change", this._inputChangeEvent);
          if (this.optionsStore.options.allowInputToggle) {
            this.optionsStore.input.addEventListener("click", this._openClickEvent);
            this.optionsStore.input.addEventListener("focus", this._openClickEvent);
          }
          if (this.optionsStore.input.value) {
            this._inputChangeEvent();
          }
        }
        /**
         * Attempts to locate a toggle for the picker and sets an event listener
         * @private
         */
        _initializeToggle() {
          if (this.optionsStore.options.display.inline)
            return;
          let query = this.optionsStore.element.dataset.tdTargetToggle;
          if (query == "nearest") {
            query = '[data-td-toggle="datetimepicker"]';
          }
          this._toggle = query == void 0 ? this.optionsStore.element : this.optionsStore.element.querySelector(query);
          this._toggle.addEventListener("click", this._toggleClickEvent);
        }
        /**
         * If the option is enabled this will render the clock view after a date pick.
         * @param e change event
         * @private
         */
        _handleAfterChangeEvent(e) {
          if (
            // options is disabled
            !this.optionsStore.options.promptTimeOnDateChange || this.optionsStore.options.multipleDates || this.optionsStore.options.display.inline || this.optionsStore.options.display.sideBySide || // time is disabled
            !this.display._hasTime || // clock component is already showing
            this.display.widget?.getElementsByClassName(Namespace.css.show)[0].classList.contains(Namespace.css.timeContainer)
          )
            return;
          if (!e.oldDate && this.optionsStore.options.useCurrent || e.oldDate && e.date?.isSame(e.oldDate)) {
            return;
          }
          clearTimeout(this._currentPromptTimeTimeout);
          this._currentPromptTimeTimeout = setTimeout(() => {
            if (this.display.widget) {
              this._eventEmitters.action.emit({
                e: {
                  currentTarget: this.display.widget.querySelector('[data-action="togglePicker"]')
                },
                action: ActionTypes$1.togglePicker
              });
            }
          }, this.optionsStore.options.promptTimeOnDateChangeTransitionDelay);
        }
      }
      const loadedLocales = {};
      const loadLocale = (l2) => {
        if (loadedLocales[l2.name])
          return;
        loadedLocales[l2.name] = l2.localization;
      };
      const locale = (l2) => {
        const asked = loadedLocales[l2];
        if (!asked)
          return;
        DefaultOptions.localization = asked;
      };
      const extend = function(plugin, option = void 0) {
        if (!plugin)
          return tempusDominus;
        if (!plugin.installed) {
          plugin(option, { TempusDominus: TempusDominus2, Dates, Display, DateTime: DateTime2, Namespace }, tempusDominus);
          plugin.installed = true;
        }
        return tempusDominus;
      };
      const version = "6.7.13";
      const tempusDominus = {
        TempusDominus: TempusDominus2,
        extend,
        loadLocale,
        locale,
        Namespace,
        DefaultOptions,
        DateTime: DateTime2,
        Unit: exports2.Unit,
        version,
        DefaultEnLocalization
      };
      exports2.DateTime = DateTime2;
      exports2.DefaultEnLocalization = DefaultEnLocalization;
      exports2.DefaultOptions = DefaultOptions;
      exports2.Namespace = Namespace;
      exports2.TempusDominus = TempusDominus2;
      exports2.extend = extend;
      exports2.loadLocale = loadLocale;
      exports2.locale = locale;
      exports2.version = version;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/knockout/build/output/knockout-latest.js
var require_knockout_latest = __commonJS({
  "node_modules/knockout/build/output/knockout-latest.js"(exports, module2) {
    (function() {
      (function(n) {
        var A = this || (0, eval)("this"), w = A.document, R = A.navigator, v = A.jQuery, H = A.JSON;
        v || "undefined" === typeof jQuery || (v = jQuery);
        (function(n2) {
          "function" === typeof define && define.amd ? define(["exports", "require"], n2) : "object" === typeof exports && "object" === typeof module2 ? n2(module2.exports || exports) : n2(A.ko = {});
        })(function(S, T) {
          function K(a2, c) {
            return null === a2 || typeof a2 in W ? a2 === c : false;
          }
          function X(b, c) {
            var d;
            return function() {
              d || (d = a.a.setTimeout(function() {
                d = n;
                b();
              }, c));
            };
          }
          function Y(b, c) {
            var d;
            return function() {
              clearTimeout(d);
              d = a.a.setTimeout(b, c);
            };
          }
          function Z(a2, c) {
            c && "change" !== c ? "beforeChange" === c ? this.pc(a2) : this.gb(a2, c) : this.qc(a2);
          }
          function aa(a2, c) {
            null !== c && c.s && c.s();
          }
          function ba(a2, c) {
            var d = this.qd, e = d[r];
            e.ra || (this.Qb && this.mb[c] ? (d.uc(c, a2, this.mb[c]), this.mb[c] = null, --this.Qb) : e.I[c] || d.uc(c, a2, e.J ? { da: a2 } : d.$c(a2)), a2.Ja && a2.gd());
          }
          var a = "undefined" !== typeof S ? S : {};
          a.b = function(b, c) {
            for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++)
              e = e[d[f]];
            e[d[d.length - 1]] = c;
          };
          a.L = function(a2, c, d) {
            a2[c] = d;
          };
          a.version = "3.5.1";
          a.b(
            "version",
            a.version
          );
          a.options = { deferUpdates: false, useOnlyNativeEvents: false, foreachHidesDestroyed: false };
          a.a = function() {
            function b(a2, b2) {
              for (var c2 in a2)
                f.call(a2, c2) && b2(c2, a2[c2]);
            }
            function c(a2, b2) {
              if (b2)
                for (var c2 in b2)
                  f.call(b2, c2) && (a2[c2] = b2[c2]);
              return a2;
            }
            function d(a2, b2) {
              a2.__proto__ = b2;
              return a2;
            }
            function e(b2, c2, d2, e2) {
              var l3 = b2[c2].match(q) || [];
              a.a.D(d2.match(q), function(b3) {
                a.a.Na(l3, b3, e2);
              });
              b2[c2] = l3.join(" ");
            }
            var f = Object.prototype.hasOwnProperty, g = { __proto__: [] } instanceof Array, h = "function" === typeof Symbol, m = {}, k = {};
            m[R && /Firefox\/2/i.test(R.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"];
            m.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
            b(m, function(a2, b2) {
              if (b2.length)
                for (var c2 = 0, d2 = b2.length; c2 < d2; c2++)
                  k[b2[c2]] = a2;
            });
            var l2 = { propertychange: true }, p = w && function() {
              for (var a2 = 3, b2 = w.createElement("div"), c2 = b2.getElementsByTagName("i"); b2.innerHTML = "<!--[if gt IE " + ++a2 + "]><i></i><![endif]-->", c2[0]; )
                ;
              return 4 < a2 ? a2 : n;
            }(), q = /\S+/g, t;
            return {
              Jc: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
              D: function(a2, b2, c2) {
                for (var d2 = 0, e2 = a2.length; d2 < e2; d2++)
                  b2.call(c2, a2[d2], d2, a2);
              },
              A: "function" == typeof Array.prototype.indexOf ? function(a2, b2) {
                return Array.prototype.indexOf.call(a2, b2);
              } : function(a2, b2) {
                for (var c2 = 0, d2 = a2.length; c2 < d2; c2++)
                  if (a2[c2] === b2)
                    return c2;
                return -1;
              },
              Lb: function(a2, b2, c2) {
                for (var d2 = 0, e2 = a2.length; d2 < e2; d2++)
                  if (b2.call(c2, a2[d2], d2, a2))
                    return a2[d2];
                return n;
              },
              Pa: function(b2, c2) {
                var d2 = a.a.A(b2, c2);
                0 < d2 ? b2.splice(d2, 1) : 0 === d2 && b2.shift();
              },
              wc: function(b2) {
                var c2 = [];
                b2 && a.a.D(b2, function(b3) {
                  0 > a.a.A(c2, b3) && c2.push(b3);
                });
                return c2;
              },
              Mb: function(a2, b2, c2) {
                var d2 = [];
                if (a2)
                  for (var e2 = 0, l3 = a2.length; e2 < l3; e2++)
                    d2.push(b2.call(c2, a2[e2], e2));
                return d2;
              },
              jb: function(a2, b2, c2) {
                var d2 = [];
                if (a2)
                  for (var e2 = 0, l3 = a2.length; e2 < l3; e2++)
                    b2.call(c2, a2[e2], e2) && d2.push(a2[e2]);
                return d2;
              },
              Nb: function(a2, b2) {
                if (b2 instanceof Array)
                  a2.push.apply(a2, b2);
                else
                  for (var c2 = 0, d2 = b2.length; c2 < d2; c2++)
                    a2.push(b2[c2]);
                return a2;
              },
              Na: function(b2, c2, d2) {
                var e2 = a.a.A(a.a.bc(b2), c2);
                0 > e2 ? d2 && b2.push(c2) : d2 || b2.splice(e2, 1);
              },
              Ba: g,
              extend: c,
              setPrototypeOf: d,
              Ab: g ? d : c,
              P: b,
              Ga: function(a2, b2, c2) {
                if (!a2)
                  return a2;
                var d2 = {}, e2;
                for (e2 in a2)
                  f.call(a2, e2) && (d2[e2] = b2.call(c2, a2[e2], e2, a2));
                return d2;
              },
              Tb: function(b2) {
                for (; b2.firstChild; )
                  a.removeNode(b2.firstChild);
              },
              Yb: function(b2) {
                b2 = a.a.la(b2);
                for (var c2 = (b2[0] && b2[0].ownerDocument || w).createElement("div"), d2 = 0, e2 = b2.length; d2 < e2; d2++)
                  c2.appendChild(a.oa(b2[d2]));
                return c2;
              },
              Ca: function(b2, c2) {
                for (var d2 = 0, e2 = b2.length, l3 = []; d2 < e2; d2++) {
                  var k2 = b2[d2].cloneNode(true);
                  l3.push(c2 ? a.oa(k2) : k2);
                }
                return l3;
              },
              va: function(b2, c2) {
                a.a.Tb(b2);
                if (c2)
                  for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                    b2.appendChild(c2[d2]);
              },
              Xc: function(b2, c2) {
                var d2 = b2.nodeType ? [b2] : b2;
                if (0 < d2.length) {
                  for (var e2 = d2[0], l3 = e2.parentNode, k2 = 0, f2 = c2.length; k2 < f2; k2++)
                    l3.insertBefore(c2[k2], e2);
                  k2 = 0;
                  for (f2 = d2.length; k2 < f2; k2++)
                    a.removeNode(d2[k2]);
                }
              },
              Ua: function(a2, b2) {
                if (a2.length) {
                  for (b2 = 8 === b2.nodeType && b2.parentNode || b2; a2.length && a2[0].parentNode !== b2; )
                    a2.splice(0, 1);
                  for (; 1 < a2.length && a2[a2.length - 1].parentNode !== b2; )
                    a2.length--;
                  if (1 < a2.length) {
                    var c2 = a2[0], d2 = a2[a2.length - 1];
                    for (a2.length = 0; c2 !== d2; )
                      a2.push(c2), c2 = c2.nextSibling;
                    a2.push(d2);
                  }
                }
                return a2;
              },
              Zc: function(a2, b2) {
                7 > p ? a2.setAttribute("selected", b2) : a2.selected = b2;
              },
              Db: function(a2) {
                return null === a2 || a2 === n ? "" : a2.trim ? a2.trim() : a2.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
              },
              Ud: function(a2, b2) {
                a2 = a2 || "";
                return b2.length > a2.length ? false : a2.substring(0, b2.length) === b2;
              },
              vd: function(a2, b2) {
                if (a2 === b2)
                  return true;
                if (11 === a2.nodeType)
                  return false;
                if (b2.contains)
                  return b2.contains(1 !== a2.nodeType ? a2.parentNode : a2);
                if (b2.compareDocumentPosition)
                  return 16 == (b2.compareDocumentPosition(a2) & 16);
                for (; a2 && a2 != b2; )
                  a2 = a2.parentNode;
                return !!a2;
              },
              Sb: function(b2) {
                return a.a.vd(b2, b2.ownerDocument.documentElement);
              },
              kd: function(b2) {
                return !!a.a.Lb(b2, a.a.Sb);
              },
              R: function(a2) {
                return a2 && a2.tagName && a2.tagName.toLowerCase();
              },
              Ac: function(b2) {
                return a.onError ? function() {
                  try {
                    return b2.apply(this, arguments);
                  } catch (c2) {
                    throw a.onError && a.onError(c2), c2;
                  }
                } : b2;
              },
              setTimeout: function(b2, c2) {
                return setTimeout(a.a.Ac(b2), c2);
              },
              Gc: function(b2) {
                setTimeout(function() {
                  a.onError && a.onError(b2);
                  throw b2;
                }, 0);
              },
              B: function(b2, c2, d2) {
                var e2 = a.a.Ac(d2);
                d2 = l2[c2];
                if (a.options.useOnlyNativeEvents || d2 || !v)
                  if (d2 || "function" != typeof b2.addEventListener)
                    if ("undefined" != typeof b2.attachEvent) {
                      var k2 = function(a2) {
                        e2.call(b2, a2);
                      }, f2 = "on" + c2;
                      b2.attachEvent(
                        f2,
                        k2
                      );
                      a.a.K.za(b2, function() {
                        b2.detachEvent(f2, k2);
                      });
                    } else
                      throw Error("Browser doesn't support addEventListener or attachEvent");
                  else
                    b2.addEventListener(c2, e2, false);
                else
                  t || (t = "function" == typeof v(b2).on ? "on" : "bind"), v(b2)[t](c2, e2);
              },
              Fb: function(b2, c2) {
                if (!b2 || !b2.nodeType)
                  throw Error("element must be a DOM node when calling triggerEvent");
                var d2;
                "input" === a.a.R(b2) && b2.type && "click" == c2.toLowerCase() ? (d2 = b2.type, d2 = "checkbox" == d2 || "radio" == d2) : d2 = false;
                if (a.options.useOnlyNativeEvents || !v || d2)
                  if ("function" == typeof w.createEvent)
                    if ("function" == typeof b2.dispatchEvent)
                      d2 = w.createEvent(k[c2] || "HTMLEvents"), d2.initEvent(c2, true, true, A, 0, 0, 0, 0, 0, false, false, false, false, 0, b2), b2.dispatchEvent(d2);
                    else
                      throw Error("The supplied element doesn't support dispatchEvent");
                  else if (d2 && b2.click)
                    b2.click();
                  else if ("undefined" != typeof b2.fireEvent)
                    b2.fireEvent("on" + c2);
                  else
                    throw Error("Browser doesn't support triggering events");
                else
                  v(b2).trigger(c2);
              },
              f: function(b2) {
                return a.O(b2) ? b2() : b2;
              },
              bc: function(b2) {
                return a.O(b2) ? b2.v() : b2;
              },
              Eb: function(b2, c2, d2) {
                var l3;
                c2 && ("object" === typeof b2.classList ? (l3 = b2.classList[d2 ? "add" : "remove"], a.a.D(c2.match(q), function(a2) {
                  l3.call(b2.classList, a2);
                })) : "string" === typeof b2.className.baseVal ? e(b2.className, "baseVal", c2, d2) : e(b2, "className", c2, d2));
              },
              Bb: function(b2, c2) {
                var d2 = a.a.f(c2);
                if (null === d2 || d2 === n)
                  d2 = "";
                var e2 = a.h.firstChild(b2);
                !e2 || 3 != e2.nodeType || a.h.nextSibling(e2) ? a.h.va(b2, [b2.ownerDocument.createTextNode(d2)]) : e2.data = d2;
                a.a.Ad(b2);
              },
              Yc: function(a2, b2) {
                a2.name = b2;
                if (7 >= p)
                  try {
                    var c2 = a2.name.replace(/[&<>'"]/g, function(a3) {
                      return "&#" + a3.charCodeAt(0) + ";";
                    });
                    a2.mergeAttributes(w.createElement("<input name='" + c2 + "'/>"), false);
                  } catch (d2) {
                  }
              },
              Ad: function(a2) {
                9 <= p && (a2 = 1 == a2.nodeType ? a2 : a2.parentNode, a2.style && (a2.style.zoom = a2.style.zoom));
              },
              wd: function(a2) {
                if (p) {
                  var b2 = a2.style.width;
                  a2.style.width = 0;
                  a2.style.width = b2;
                }
              },
              Pd: function(b2, c2) {
                b2 = a.a.f(b2);
                c2 = a.a.f(c2);
                for (var d2 = [], e2 = b2; e2 <= c2; e2++)
                  d2.push(e2);
                return d2;
              },
              la: function(a2) {
                for (var b2 = [], c2 = 0, d2 = a2.length; c2 < d2; c2++)
                  b2.push(a2[c2]);
                return b2;
              },
              Da: function(a2) {
                return h ? Symbol(a2) : a2;
              },
              Zd: 6 === p,
              $d: 7 === p,
              W: p,
              Lc: function(b2, c2) {
                for (var d2 = a.a.la(b2.getElementsByTagName("input")).concat(a.a.la(b2.getElementsByTagName("textarea"))), e2 = "string" == typeof c2 ? function(a2) {
                  return a2.name === c2;
                } : function(a2) {
                  return c2.test(a2.name);
                }, l3 = [], k2 = d2.length - 1; 0 <= k2; k2--)
                  e2(d2[k2]) && l3.push(d2[k2]);
                return l3;
              },
              Nd: function(b2) {
                return "string" == typeof b2 && (b2 = a.a.Db(b2)) ? H && H.parse ? H.parse(b2) : new Function("return " + b2)() : null;
              },
              hc: function(b2, c2, d2) {
                if (!H || !H.stringify)
                  throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                return H.stringify(a.a.f(b2), c2, d2);
              },
              Od: function(c2, d2, e2) {
                e2 = e2 || {};
                var l3 = e2.params || {}, k2 = e2.includeFields || this.Jc, f2 = c2;
                if ("object" == typeof c2 && "form" === a.a.R(c2))
                  for (var f2 = c2.action, h2 = k2.length - 1; 0 <= h2; h2--)
                    for (var g2 = a.a.Lc(c2, k2[h2]), m2 = g2.length - 1; 0 <= m2; m2--)
                      l3[g2[m2].name] = g2[m2].value;
                d2 = a.a.f(d2);
                var p2 = w.createElement("form");
                p2.style.display = "none";
                p2.action = f2;
                p2.method = "post";
                for (var q2 in d2)
                  c2 = w.createElement("input"), c2.type = "hidden", c2.name = q2, c2.value = a.a.hc(a.a.f(d2[q2])), p2.appendChild(c2);
                b(l3, function(a2, b2) {
                  var c3 = w.createElement("input");
                  c3.type = "hidden";
                  c3.name = a2;
                  c3.value = b2;
                  p2.appendChild(c3);
                });
                w.body.appendChild(p2);
                e2.submitter ? e2.submitter(p2) : p2.submit();
                setTimeout(function() {
                  p2.parentNode.removeChild(p2);
                }, 0);
              }
            };
          }();
          a.b("utils", a.a);
          a.b("utils.arrayForEach", a.a.D);
          a.b("utils.arrayFirst", a.a.Lb);
          a.b("utils.arrayFilter", a.a.jb);
          a.b("utils.arrayGetDistinctValues", a.a.wc);
          a.b("utils.arrayIndexOf", a.a.A);
          a.b("utils.arrayMap", a.a.Mb);
          a.b("utils.arrayPushAll", a.a.Nb);
          a.b("utils.arrayRemoveItem", a.a.Pa);
          a.b("utils.cloneNodes", a.a.Ca);
          a.b(
            "utils.createSymbolOrString",
            a.a.Da
          );
          a.b("utils.extend", a.a.extend);
          a.b("utils.fieldsIncludedWithJsonPost", a.a.Jc);
          a.b("utils.getFormFields", a.a.Lc);
          a.b("utils.objectMap", a.a.Ga);
          a.b("utils.peekObservable", a.a.bc);
          a.b("utils.postJson", a.a.Od);
          a.b("utils.parseJson", a.a.Nd);
          a.b("utils.registerEventHandler", a.a.B);
          a.b("utils.stringifyJson", a.a.hc);
          a.b("utils.range", a.a.Pd);
          a.b("utils.toggleDomNodeCssClass", a.a.Eb);
          a.b("utils.triggerEvent", a.a.Fb);
          a.b("utils.unwrapObservable", a.a.f);
          a.b("utils.objectForEach", a.a.P);
          a.b(
            "utils.addOrRemoveItem",
            a.a.Na
          );
          a.b("utils.setTextContent", a.a.Bb);
          a.b("unwrap", a.a.f);
          Function.prototype.bind || (Function.prototype.bind = function(a2) {
            var c = this;
            if (1 === arguments.length)
              return function() {
                return c.apply(a2, arguments);
              };
            var d = Array.prototype.slice.call(arguments, 1);
            return function() {
              var e = d.slice(0);
              e.push.apply(e, arguments);
              return c.apply(a2, e);
            };
          });
          a.a.g = new function() {
            var b = 0, c = "__ko__" + (/* @__PURE__ */ new Date()).getTime(), d = {}, e, f;
            a.a.W ? (e = function(a2, e2) {
              var f2 = a2[c];
              if (!f2 || "null" === f2 || !d[f2]) {
                if (!e2)
                  return n;
                f2 = a2[c] = "ko" + b++;
                d[f2] = {};
              }
              return d[f2];
            }, f = function(a2) {
              var b2 = a2[c];
              return b2 ? (delete d[b2], a2[c] = null, true) : false;
            }) : (e = function(a2, b2) {
              var d2 = a2[c];
              !d2 && b2 && (d2 = a2[c] = {});
              return d2;
            }, f = function(a2) {
              return a2[c] ? (delete a2[c], true) : false;
            });
            return { get: function(a2, b2) {
              var c2 = e(a2, false);
              return c2 && c2[b2];
            }, set: function(a2, b2, c2) {
              (a2 = e(a2, c2 !== n)) && (a2[b2] = c2);
            }, Ub: function(a2, b2, c2) {
              a2 = e(a2, true);
              return a2[b2] || (a2[b2] = c2);
            }, clear: f, Z: function() {
              return b++ + c;
            } };
          }();
          a.b("utils.domData", a.a.g);
          a.b("utils.domData.clear", a.a.g.clear);
          a.a.K = new function() {
            function b(b2, c2) {
              var d2 = a.a.g.get(b2, e);
              d2 === n && c2 && (d2 = [], a.a.g.set(b2, e, d2));
              return d2;
            }
            function c(c2) {
              var e2 = b(c2, false);
              if (e2)
                for (var e2 = e2.slice(0), k = 0; k < e2.length; k++)
                  e2[k](c2);
              a.a.g.clear(c2);
              a.a.K.cleanExternalData(c2);
              g[c2.nodeType] && d(c2.childNodes, true);
            }
            function d(b2, d2) {
              for (var e2 = [], l2, f2 = 0; f2 < b2.length; f2++)
                if (!d2 || 8 === b2[f2].nodeType) {
                  if (c(e2[e2.length] = l2 = b2[f2]), b2[f2] !== l2)
                    for (; f2-- && -1 == a.a.A(e2, b2[f2]); )
                      ;
                }
            }
            var e = a.a.g.Z(), f = { 1: true, 8: true, 9: true }, g = { 1: true, 9: true };
            return { za: function(a2, c2) {
              if ("function" != typeof c2)
                throw Error("Callback must be a function");
              b(a2, true).push(c2);
            }, yb: function(c2, d2) {
              var f2 = b(c2, false);
              f2 && (a.a.Pa(f2, d2), 0 == f2.length && a.a.g.set(c2, e, n));
            }, oa: function(b2) {
              a.u.G(function() {
                f[b2.nodeType] && (c(b2), g[b2.nodeType] && d(b2.getElementsByTagName("*")));
              });
              return b2;
            }, removeNode: function(b2) {
              a.oa(b2);
              b2.parentNode && b2.parentNode.removeChild(b2);
            }, cleanExternalData: function(a2) {
              v && "function" == typeof v.cleanData && v.cleanData([a2]);
            } };
          }();
          a.oa = a.a.K.oa;
          a.removeNode = a.a.K.removeNode;
          a.b("cleanNode", a.oa);
          a.b("removeNode", a.removeNode);
          a.b("utils.domNodeDisposal", a.a.K);
          a.b(
            "utils.domNodeDisposal.addDisposeCallback",
            a.a.K.za
          );
          a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.K.yb);
          (function() {
            var b = [0, "", ""], c = [1, "<table>", "</table>"], d = [3, "<table><tbody><tr>", "</tr></tbody></table>"], e = [1, "<select multiple='multiple'>", "</select>"], f = { thead: c, tbody: c, tfoot: c, tr: [2, "<table><tbody>", "</tbody></table>"], td: d, th: d, option: e, optgroup: e }, g = 8 >= a.a.W;
            a.a.ua = function(c2, d2) {
              var e2;
              if (v)
                if (v.parseHTML)
                  e2 = v.parseHTML(c2, d2) || [];
                else {
                  if ((e2 = v.clean([c2], d2)) && e2[0]) {
                    for (var l2 = e2[0]; l2.parentNode && 11 !== l2.parentNode.nodeType; )
                      l2 = l2.parentNode;
                    l2.parentNode && l2.parentNode.removeChild(l2);
                  }
                }
              else {
                (e2 = d2) || (e2 = w);
                var l2 = e2.parentWindow || e2.defaultView || A, p = a.a.Db(c2).toLowerCase(), q = e2.createElement("div"), t;
                t = (p = p.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/)) && f[p[1]] || b;
                p = t[0];
                t = "ignored<div>" + t[1] + c2 + t[2] + "</div>";
                "function" == typeof l2.innerShiv ? q.appendChild(l2.innerShiv(t)) : (g && e2.body.appendChild(q), q.innerHTML = t, g && q.parentNode.removeChild(q));
                for (; p--; )
                  q = q.lastChild;
                e2 = a.a.la(q.lastChild.childNodes);
              }
              return e2;
            };
            a.a.Md = function(b2, c2) {
              var d2 = a.a.ua(
                b2,
                c2
              );
              return d2.length && d2[0].parentElement || a.a.Yb(d2);
            };
            a.a.fc = function(b2, c2) {
              a.a.Tb(b2);
              c2 = a.a.f(c2);
              if (null !== c2 && c2 !== n)
                if ("string" != typeof c2 && (c2 = c2.toString()), v)
                  v(b2).html(c2);
                else
                  for (var d2 = a.a.ua(c2, b2.ownerDocument), e2 = 0; e2 < d2.length; e2++)
                    b2.appendChild(d2[e2]);
            };
          })();
          a.b("utils.parseHtmlFragment", a.a.ua);
          a.b("utils.setHtml", a.a.fc);
          a.aa = function() {
            function b(c2, e) {
              if (c2) {
                if (8 == c2.nodeType) {
                  var f = a.aa.Uc(c2.nodeValue);
                  null != f && e.push({ ud: c2, Kd: f });
                } else if (1 == c2.nodeType)
                  for (var f = 0, g = c2.childNodes, h = g.length; f < h; f++)
                    b(
                      g[f],
                      e
                    );
              }
            }
            var c = {};
            return { Xb: function(a2) {
              if ("function" != typeof a2)
                throw Error("You can only pass a function to ko.memoization.memoize()");
              var b2 = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
              c[b2] = a2;
              return "<!--[ko_memo:" + b2 + "]-->";
            }, bd: function(a2, b2) {
              var f = c[a2];
              if (f === n)
                throw Error("Couldn't find any memo with ID " + a2 + ". Perhaps it's already been unmemoized.");
              try {
                return f.apply(null, b2 || []), true;
              } finally {
                delete c[a2];
              }
            }, cd: function(c2, e) {
              var f = [];
              b(c2, f);
              for (var g = 0, h = f.length; g < h; g++) {
                var m = f[g].ud, k = [m];
                e && a.a.Nb(k, e);
                a.aa.bd(f[g].Kd, k);
                m.nodeValue = "";
                m.parentNode && m.parentNode.removeChild(m);
              }
            }, Uc: function(a2) {
              return (a2 = a2.match(/^\[ko_memo\:(.*?)\]$/)) ? a2[1] : null;
            } };
          }();
          a.b("memoization", a.aa);
          a.b("memoization.memoize", a.aa.Xb);
          a.b("memoization.unmemoize", a.aa.bd);
          a.b("memoization.parseMemoText", a.aa.Uc);
          a.b("memoization.unmemoizeDomNodeAndDescendants", a.aa.cd);
          a.na = function() {
            function b() {
              if (f) {
                for (var b2 = f, c2 = 0, d2; h < f; )
                  if (d2 = e[h++]) {
                    if (h > b2) {
                      if (5e3 <= ++c2) {
                        h = f;
                        a.a.Gc(Error("'Too much recursion' after processing " + c2 + " task groups."));
                        break;
                      }
                      b2 = f;
                    }
                    try {
                      d2();
                    } catch (p) {
                      a.a.Gc(p);
                    }
                  }
              }
            }
            function c() {
              b();
              h = f = e.length = 0;
            }
            var d, e = [], f = 0, g = 1, h = 0;
            A.MutationObserver ? d = function(a2) {
              var b2 = w.createElement("div");
              new MutationObserver(a2).observe(b2, { attributes: true });
              return function() {
                b2.classList.toggle("foo");
              };
            }(c) : d = w && "onreadystatechange" in w.createElement("script") ? function(a2) {
              var b2 = w.createElement("script");
              b2.onreadystatechange = function() {
                b2.onreadystatechange = null;
                w.documentElement.removeChild(b2);
                b2 = null;
                a2();
              };
              w.documentElement.appendChild(b2);
            } : function(a2) {
              setTimeout(a2, 0);
            };
            return { scheduler: d, zb: function(b2) {
              f || a.na.scheduler(c);
              e[f++] = b2;
              return g++;
            }, cancel: function(a2) {
              a2 = a2 - (g - f);
              a2 >= h && a2 < f && (e[a2] = null);
            }, resetForTesting: function() {
              var a2 = f - h;
              h = f = e.length = 0;
              return a2;
            }, Sd: b };
          }();
          a.b("tasks", a.na);
          a.b("tasks.schedule", a.na.zb);
          a.b("tasks.runEarly", a.na.Sd);
          a.Ta = { throttle: function(b, c) {
            b.throttleEvaluation = c;
            var d = null;
            return a.$({ read: b, write: function(e) {
              clearTimeout(d);
              d = a.a.setTimeout(
                function() {
                  b(e);
                },
                c
              );
            } });
          }, rateLimit: function(a2, c) {
            var d, e, f;
            "number" == typeof c ? d = c : (d = c.timeout, e = c.method);
            a2.Hb = false;
            f = "function" == typeof e ? e : "notifyWhenChangesStop" == e ? Y : X;
            a2.ub(function(a3) {
              return f(a3, d, c);
            });
          }, deferred: function(b, c) {
            if (true !== c)
              throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
            b.Hb || (b.Hb = true, b.ub(function(c2) {
              var e, f = false;
              return function() {
                if (!f) {
                  a.na.cancel(e);
                  e = a.na.zb(c2);
                  try {
                    f = true, b.notifySubscribers(n, "dirty");
                  } finally {
                    f = false;
                  }
                }
              };
            }));
          }, notify: function(a2, c) {
            a2.equalityComparer = "always" == c ? null : K;
          } };
          var W = { undefined: 1, "boolean": 1, number: 1, string: 1 };
          a.b("extenders", a.Ta);
          a.ic = function(b, c, d) {
            this.da = b;
            this.lc = c;
            this.mc = d;
            this.Ib = false;
            this.fb = this.Jb = null;
            a.L(this, "dispose", this.s);
            a.L(this, "disposeWhenNodeIsRemoved", this.l);
          };
          a.ic.prototype.s = function() {
            this.Ib || (this.fb && a.a.K.yb(this.Jb, this.fb), this.Ib = true, this.mc(), this.da = this.lc = this.mc = this.Jb = this.fb = null);
          };
          a.ic.prototype.l = function(b) {
            this.Jb = b;
            a.a.K.za(b, this.fb = this.s.bind(this));
          };
          a.T = function() {
            a.a.Ab(this, D);
            D.qb(this);
          };
          var D = {
            qb: function(a2) {
              a2.U = { change: [] };
              a2.sc = 1;
            },
            subscribe: function(b, c, d) {
              var e = this;
              d = d || "change";
              var f = new a.ic(e, c ? b.bind(c) : b, function() {
                a.a.Pa(e.U[d], f);
                e.hb && e.hb(d);
              });
              e.Qa && e.Qa(d);
              e.U[d] || (e.U[d] = []);
              e.U[d].push(f);
              return f;
            },
            notifySubscribers: function(b, c) {
              c = c || "change";
              "change" === c && this.Gb();
              if (this.Wa(c)) {
                var d = "change" === c && this.ed || this.U[c].slice(0);
                try {
                  a.u.xc();
                  for (var e = 0, f; f = d[e]; ++e)
                    f.Ib || f.lc(b);
                } finally {
                  a.u.end();
                }
              }
            },
            ob: function() {
              return this.sc;
            },
            Dd: function(a2) {
              return this.ob() !== a2;
            },
            Gb: function() {
              ++this.sc;
            },
            ub: function(b) {
              var c = this, d = a.O(c), e, f, g, h, m;
              c.gb || (c.gb = c.notifySubscribers, c.notifySubscribers = Z);
              var k = b(function() {
                c.Ja = false;
                d && h === c && (h = c.nc ? c.nc() : c());
                var a2 = f || m && c.sb(g, h);
                m = f = e = false;
                a2 && c.gb(g = h);
              });
              c.qc = function(a2, b2) {
                b2 && c.Ja || (m = !b2);
                c.ed = c.U.change.slice(0);
                c.Ja = e = true;
                h = a2;
                k();
              };
              c.pc = function(a2) {
                e || (g = a2, c.gb(a2, "beforeChange"));
              };
              c.rc = function() {
                m = true;
              };
              c.gd = function() {
                c.sb(g, c.v(true)) && (f = true);
              };
            },
            Wa: function(a2) {
              return this.U[a2] && this.U[a2].length;
            },
            Bd: function(b) {
              if (b)
                return this.U[b] && this.U[b].length || 0;
              var c = 0;
              a.a.P(this.U, function(a2, b2) {
                "dirty" !== a2 && (c += b2.length);
              });
              return c;
            },
            sb: function(a2, c) {
              return !this.equalityComparer || !this.equalityComparer(a2, c);
            },
            toString: function() {
              return "[object Object]";
            },
            extend: function(b) {
              var c = this;
              b && a.a.P(b, function(b2, e) {
                var f = a.Ta[b2];
                "function" == typeof f && (c = f(c, e) || c);
              });
              return c;
            }
          };
          a.L(D, "init", D.qb);
          a.L(D, "subscribe", D.subscribe);
          a.L(D, "extend", D.extend);
          a.L(D, "getSubscriptionsCount", D.Bd);
          a.a.Ba && a.a.setPrototypeOf(
            D,
            Function.prototype
          );
          a.T.fn = D;
          a.Qc = function(a2) {
            return null != a2 && "function" == typeof a2.subscribe && "function" == typeof a2.notifySubscribers;
          };
          a.b("subscribable", a.T);
          a.b("isSubscribable", a.Qc);
          a.S = a.u = function() {
            function b(a2) {
              d.push(e);
              e = a2;
            }
            function c() {
              e = d.pop();
            }
            var d = [], e, f = 0;
            return {
              xc: b,
              end: c,
              cc: function(b2) {
                if (e) {
                  if (!a.Qc(b2))
                    throw Error("Only subscribable things can act as dependencies");
                  e.od.call(e.pd, b2, b2.fd || (b2.fd = ++f));
                }
              },
              G: function(a2, d2, e2) {
                try {
                  return b(), a2.apply(d2, e2 || []);
                } finally {
                  c();
                }
              },
              qa: function() {
                if (e)
                  return e.o.qa();
              },
              Va: function() {
                if (e)
                  return e.o.Va();
              },
              Ya: function() {
                if (e)
                  return e.Ya;
              },
              o: function() {
                if (e)
                  return e.o;
              }
            };
          }();
          a.b("computedContext", a.S);
          a.b("computedContext.getDependenciesCount", a.S.qa);
          a.b("computedContext.getDependencies", a.S.Va);
          a.b("computedContext.isInitial", a.S.Ya);
          a.b("computedContext.registerDependency", a.S.cc);
          a.b("ignoreDependencies", a.Yd = a.u.G);
          var I = a.a.Da("_latestValue");
          a.ta = function(b) {
            function c() {
              if (0 < arguments.length)
                return c.sb(c[I], arguments[0]) && (c.ya(), c[I] = arguments[0], c.xa()), this;
              a.u.cc(c);
              return c[I];
            }
            c[I] = b;
            a.a.Ba || a.a.extend(c, a.T.fn);
            a.T.fn.qb(c);
            a.a.Ab(c, F);
            a.options.deferUpdates && a.Ta.deferred(c, true);
            return c;
          };
          var F = { equalityComparer: K, v: function() {
            return this[I];
          }, xa: function() {
            this.notifySubscribers(this[I], "spectate");
            this.notifySubscribers(this[I]);
          }, ya: function() {
            this.notifySubscribers(this[I], "beforeChange");
          } };
          a.a.Ba && a.a.setPrototypeOf(F, a.T.fn);
          var G = a.ta.Ma = "__ko_proto__";
          F[G] = a.ta;
          a.O = function(b) {
            if ((b = "function" == typeof b && b[G]) && b !== F[G] && b !== a.o.fn[G])
              throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
            return !!b;
          };
          a.Za = function(b) {
            return "function" == typeof b && (b[G] === F[G] || b[G] === a.o.fn[G] && b.Nc);
          };
          a.b("observable", a.ta);
          a.b("isObservable", a.O);
          a.b("isWriteableObservable", a.Za);
          a.b("isWritableObservable", a.Za);
          a.b("observable.fn", F);
          a.L(F, "peek", F.v);
          a.L(F, "valueHasMutated", F.xa);
          a.L(F, "valueWillMutate", F.ya);
          a.Ha = function(b) {
            b = b || [];
            if ("object" != typeof b || !("length" in b))
              throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
            b = a.ta(b);
            a.a.Ab(
              b,
              a.Ha.fn
            );
            return b.extend({ trackArrayChanges: true });
          };
          a.Ha.fn = { remove: function(b) {
            for (var c = this.v(), d = [], e = "function" != typeof b || a.O(b) ? function(a2) {
              return a2 === b;
            } : b, f = 0; f < c.length; f++) {
              var g = c[f];
              if (e(g)) {
                0 === d.length && this.ya();
                if (c[f] !== g)
                  throw Error("Array modified during remove; cannot remove item");
                d.push(g);
                c.splice(f, 1);
                f--;
              }
            }
            d.length && this.xa();
            return d;
          }, removeAll: function(b) {
            if (b === n) {
              var c = this.v(), d = c.slice(0);
              this.ya();
              c.splice(0, c.length);
              this.xa();
              return d;
            }
            return b ? this.remove(function(c2) {
              return 0 <= a.a.A(b, c2);
            }) : [];
          }, destroy: function(b) {
            var c = this.v(), d = "function" != typeof b || a.O(b) ? function(a2) {
              return a2 === b;
            } : b;
            this.ya();
            for (var e = c.length - 1; 0 <= e; e--) {
              var f = c[e];
              d(f) && (f._destroy = true);
            }
            this.xa();
          }, destroyAll: function(b) {
            return b === n ? this.destroy(function() {
              return true;
            }) : b ? this.destroy(function(c) {
              return 0 <= a.a.A(b, c);
            }) : [];
          }, indexOf: function(b) {
            var c = this();
            return a.a.A(c, b);
          }, replace: function(a2, c) {
            var d = this.indexOf(a2);
            0 <= d && (this.ya(), this.v()[d] = c, this.xa());
          }, sorted: function(a2) {
            var c = this().slice(0);
            return a2 ? c.sort(a2) : c.sort();
          }, reversed: function() {
            return this().slice(0).reverse();
          } };
          a.a.Ba && a.a.setPrototypeOf(a.Ha.fn, a.ta.fn);
          a.a.D("pop push reverse shift sort splice unshift".split(" "), function(b) {
            a.Ha.fn[b] = function() {
              var a2 = this.v();
              this.ya();
              this.zc(a2, b, arguments);
              var d = a2[b].apply(a2, arguments);
              this.xa();
              return d === a2 ? this : d;
            };
          });
          a.a.D(["slice"], function(b) {
            a.Ha.fn[b] = function() {
              var a2 = this();
              return a2[b].apply(a2, arguments);
            };
          });
          a.Pc = function(b) {
            return a.O(b) && "function" == typeof b.remove && "function" == typeof b.push;
          };
          a.b("observableArray", a.Ha);
          a.b("isObservableArray", a.Pc);
          a.Ta.trackArrayChanges = function(b, c) {
            function d() {
              function c2() {
                if (m) {
                  var d2 = [].concat(b.v() || []), e2;
                  if (b.Wa("arrayChange")) {
                    if (!f || 1 < m)
                      f = a.a.Pb(k, d2, b.Ob);
                    e2 = f;
                  }
                  k = d2;
                  f = null;
                  m = 0;
                  e2 && e2.length && b.notifySubscribers(e2, "arrayChange");
                }
              }
              e ? c2() : (e = true, h = b.subscribe(function() {
                ++m;
              }, null, "spectate"), k = [].concat(b.v() || []), f = null, g = b.subscribe(c2));
            }
            b.Ob = {};
            c && "object" == typeof c && a.a.extend(b.Ob, c);
            b.Ob.sparse = true;
            if (!b.zc) {
              var e = false, f = null, g, h, m = 0, k, l2 = b.Qa, p = b.hb;
              b.Qa = function(a2) {
                l2 && l2.call(b, a2);
                "arrayChange" === a2 && d();
              };
              b.hb = function(a2) {
                p && p.call(b, a2);
                "arrayChange" !== a2 || b.Wa("arrayChange") || (g && g.s(), h && h.s(), h = g = null, e = false, k = n);
              };
              b.zc = function(b2, c2, d2) {
                function l3(a2, b3, c3) {
                  return k2[k2.length] = { status: a2, value: b3, index: c3 };
                }
                if (e && !m) {
                  var k2 = [], p2 = b2.length, g2 = d2.length, h2 = 0;
                  switch (c2) {
                    case "push":
                      h2 = p2;
                    case "unshift":
                      for (c2 = 0; c2 < g2; c2++)
                        l3("added", d2[c2], h2 + c2);
                      break;
                    case "pop":
                      h2 = p2 - 1;
                    case "shift":
                      p2 && l3("deleted", b2[h2], h2);
                      break;
                    case "splice":
                      c2 = Math.min(Math.max(0, 0 > d2[0] ? p2 + d2[0] : d2[0]), p2);
                      for (var p2 = 1 === g2 ? p2 : Math.min(c2 + (d2[1] || 0), p2), g2 = c2 + g2 - 2, h2 = Math.max(p2, g2), U = [], L = [], n2 = 2; c2 < h2; ++c2, ++n2)
                        c2 < p2 && L.push(l3("deleted", b2[c2], c2)), c2 < g2 && U.push(l3("added", d2[n2], c2));
                      a.a.Kc(L, U);
                      break;
                    default:
                      return;
                  }
                  f = k2;
                }
              };
            }
          };
          var r = a.a.Da("_state");
          a.o = a.$ = function(b, c, d) {
            function e() {
              if (0 < arguments.length) {
                if ("function" === typeof f)
                  f.apply(g.nb, arguments);
                else
                  throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                return this;
              }
              g.ra || a.u.cc(e);
              (g.ka || g.J && e.Xa()) && e.ha();
              return g.X;
            }
            "object" === typeof b ? d = b : (d = d || {}, b && (d.read = b));
            if ("function" != typeof d.read)
              throw Error("Pass a function that returns the value of the ko.computed");
            var f = d.write, g = { X: n, sa: true, ka: true, rb: false, jc: false, ra: false, wb: false, J: false, Wc: d.read, nb: c || d.owner, l: d.disposeWhenNodeIsRemoved || d.l || null, Sa: d.disposeWhen || d.Sa, Rb: null, I: {}, V: 0, Ic: null };
            e[r] = g;
            e.Nc = "function" === typeof f;
            a.a.Ba || a.a.extend(e, a.T.fn);
            a.T.fn.qb(e);
            a.a.Ab(e, C);
            d.pure ? (g.wb = true, g.J = true, a.a.extend(e, da)) : d.deferEvaluation && a.a.extend(e, ea);
            a.options.deferUpdates && a.Ta.deferred(e, true);
            g.l && (g.jc = true, g.l.nodeType || (g.l = null));
            g.J || d.deferEvaluation || e.ha();
            g.l && e.ja() && a.a.K.za(g.l, g.Rb = function() {
              e.s();
            });
            return e;
          };
          var C = {
            equalityComparer: K,
            qa: function() {
              return this[r].V;
            },
            Va: function() {
              var b = [];
              a.a.P(this[r].I, function(a2, d) {
                b[d.Ka] = d.da;
              });
              return b;
            },
            Vb: function(b) {
              if (!this[r].V)
                return false;
              var c = this.Va();
              return -1 !== a.a.A(c, b) ? true : !!a.a.Lb(c, function(a2) {
                return a2.Vb && a2.Vb(b);
              });
            },
            uc: function(a2, c, d) {
              if (this[r].wb && c === this)
                throw Error("A 'pure' computed must not be called recursively");
              this[r].I[a2] = d;
              d.Ka = this[r].V++;
              d.La = c.ob();
            },
            Xa: function() {
              var a2, c, d = this[r].I;
              for (a2 in d)
                if (Object.prototype.hasOwnProperty.call(d, a2) && (c = d[a2], this.Ia && c.da.Ja || c.da.Dd(c.La)))
                  return true;
            },
            Jd: function() {
              this.Ia && !this[r].rb && this.Ia(false);
            },
            ja: function() {
              var a2 = this[r];
              return a2.ka || 0 < a2.V;
            },
            Rd: function() {
              this.Ja ? this[r].ka && (this[r].sa = true) : this.Hc();
            },
            $c: function(a2) {
              if (a2.Hb) {
                var c = a2.subscribe(this.Jd, this, "dirty"), d = a2.subscribe(
                  this.Rd,
                  this
                );
                return { da: a2, s: function() {
                  c.s();
                  d.s();
                } };
              }
              return a2.subscribe(this.Hc, this);
            },
            Hc: function() {
              var b = this, c = b.throttleEvaluation;
              c && 0 <= c ? (clearTimeout(this[r].Ic), this[r].Ic = a.a.setTimeout(function() {
                b.ha(true);
              }, c)) : b.Ia ? b.Ia(true) : b.ha(true);
            },
            ha: function(b) {
              var c = this[r], d = c.Sa, e = false;
              if (!c.rb && !c.ra) {
                if (c.l && !a.a.Sb(c.l) || d && d()) {
                  if (!c.jc) {
                    this.s();
                    return;
                  }
                } else
                  c.jc = false;
                c.rb = true;
                try {
                  e = this.zd(b);
                } finally {
                  c.rb = false;
                }
                return e;
              }
            },
            zd: function(b) {
              var c = this[r], d = false, e = c.wb ? n : !c.V, d = { qd: this, mb: c.I, Qb: c.V };
              a.u.xc({
                pd: d,
                od: ba,
                o: this,
                Ya: e
              });
              c.I = {};
              c.V = 0;
              var f = this.yd(c, d);
              c.V ? d = this.sb(c.X, f) : (this.s(), d = true);
              d && (c.J ? this.Gb() : this.notifySubscribers(c.X, "beforeChange"), c.X = f, this.notifySubscribers(c.X, "spectate"), !c.J && b && this.notifySubscribers(c.X), this.rc && this.rc());
              e && this.notifySubscribers(c.X, "awake");
              return d;
            },
            yd: function(b, c) {
              try {
                var d = b.Wc;
                return b.nb ? d.call(b.nb) : d();
              } finally {
                a.u.end(), c.Qb && !b.J && a.a.P(c.mb, aa), b.sa = b.ka = false;
              }
            },
            v: function(a2) {
              var c = this[r];
              (c.ka && (a2 || !c.V) || c.J && this.Xa()) && this.ha();
              return c.X;
            },
            ub: function(b) {
              a.T.fn.ub.call(this, b);
              this.nc = function() {
                this[r].J || (this[r].sa ? this.ha() : this[r].ka = false);
                return this[r].X;
              };
              this.Ia = function(a2) {
                this.pc(this[r].X);
                this[r].ka = true;
                a2 && (this[r].sa = true);
                this.qc(this, !a2);
              };
            },
            s: function() {
              var b = this[r];
              !b.J && b.I && a.a.P(b.I, function(a2, b2) {
                b2.s && b2.s();
              });
              b.l && b.Rb && a.a.K.yb(b.l, b.Rb);
              b.I = n;
              b.V = 0;
              b.ra = true;
              b.sa = false;
              b.ka = false;
              b.J = false;
              b.l = n;
              b.Sa = n;
              b.Wc = n;
              this.Nc || (b.nb = n);
            }
          }, da = { Qa: function(b) {
            var c = this, d = c[r];
            if (!d.ra && d.J && "change" == b) {
              d.J = false;
              if (d.sa || c.Xa())
                d.I = null, d.V = 0, c.ha() && c.Gb();
              else {
                var e = [];
                a.a.P(d.I, function(a2, b2) {
                  e[b2.Ka] = a2;
                });
                a.a.D(e, function(a2, b2) {
                  var e2 = d.I[a2], m = c.$c(e2.da);
                  m.Ka = b2;
                  m.La = e2.La;
                  d.I[a2] = m;
                });
                c.Xa() && c.ha() && c.Gb();
              }
              d.ra || c.notifySubscribers(d.X, "awake");
            }
          }, hb: function(b) {
            var c = this[r];
            c.ra || "change" != b || this.Wa("change") || (a.a.P(c.I, function(a2, b2) {
              b2.s && (c.I[a2] = { da: b2.da, Ka: b2.Ka, La: b2.La }, b2.s());
            }), c.J = true, this.notifySubscribers(n, "asleep"));
          }, ob: function() {
            var b = this[r];
            b.J && (b.sa || this.Xa()) && this.ha();
            return a.T.fn.ob.call(this);
          } }, ea = { Qa: function(a2) {
            "change" != a2 && "beforeChange" != a2 || this.v();
          } };
          a.a.Ba && a.a.setPrototypeOf(C, a.T.fn);
          var N = a.ta.Ma;
          C[N] = a.o;
          a.Oc = function(a2) {
            return "function" == typeof a2 && a2[N] === C[N];
          };
          a.Fd = function(b) {
            return a.Oc(b) && b[r] && b[r].wb;
          };
          a.b("computed", a.o);
          a.b("dependentObservable", a.o);
          a.b("isComputed", a.Oc);
          a.b("isPureComputed", a.Fd);
          a.b("computed.fn", C);
          a.L(C, "peek", C.v);
          a.L(C, "dispose", C.s);
          a.L(C, "isActive", C.ja);
          a.L(C, "getDependenciesCount", C.qa);
          a.L(C, "getDependencies", C.Va);
          a.xb = function(b, c) {
            if ("function" === typeof b)
              return a.o(
                b,
                c,
                { pure: true }
              );
            b = a.a.extend({}, b);
            b.pure = true;
            return a.o(b, c);
          };
          a.b("pureComputed", a.xb);
          (function() {
            function b(a2, f, g) {
              g = g || new d();
              a2 = f(a2);
              if ("object" != typeof a2 || null === a2 || a2 === n || a2 instanceof RegExp || a2 instanceof Date || a2 instanceof String || a2 instanceof Number || a2 instanceof Boolean)
                return a2;
              var h = a2 instanceof Array ? [] : {};
              g.save(a2, h);
              c(a2, function(c2) {
                var d2 = f(a2[c2]);
                switch (typeof d2) {
                  case "boolean":
                  case "number":
                  case "string":
                  case "function":
                    h[c2] = d2;
                    break;
                  case "object":
                  case "undefined":
                    var l2 = g.get(d2);
                    h[c2] = l2 !== n ? l2 : b(d2, f, g);
                }
              });
              return h;
            }
            function c(a2, b2) {
              if (a2 instanceof Array) {
                for (var c2 = 0; c2 < a2.length; c2++)
                  b2(c2);
                "function" == typeof a2.toJSON && b2("toJSON");
              } else
                for (c2 in a2)
                  b2(c2);
            }
            function d() {
              this.keys = [];
              this.values = [];
            }
            a.ad = function(c2) {
              if (0 == arguments.length)
                throw Error("When calling ko.toJS, pass the object you want to convert.");
              return b(c2, function(b2) {
                for (var c3 = 0; a.O(b2) && 10 > c3; c3++)
                  b2 = b2();
                return b2;
              });
            };
            a.toJSON = function(b2, c2, d2) {
              b2 = a.ad(b2);
              return a.a.hc(b2, c2, d2);
            };
            d.prototype = { constructor: d, save: function(b2, c2) {
              var d2 = a.a.A(
                this.keys,
                b2
              );
              0 <= d2 ? this.values[d2] = c2 : (this.keys.push(b2), this.values.push(c2));
            }, get: function(b2) {
              b2 = a.a.A(this.keys, b2);
              return 0 <= b2 ? this.values[b2] : n;
            } };
          })();
          a.b("toJS", a.ad);
          a.b("toJSON", a.toJSON);
          a.Wd = function(b, c, d) {
            function e(c2) {
              var e2 = a.xb(b, d).extend({ ma: "always" }), h = e2.subscribe(function(a2) {
                a2 && (h.s(), c2(a2));
              });
              e2.notifySubscribers(e2.v());
              return h;
            }
            return "function" !== typeof Promise || c ? e(c.bind(d)) : new Promise(e);
          };
          a.b("when", a.Wd);
          (function() {
            a.w = { M: function(b) {
              switch (a.a.R(b)) {
                case "option":
                  return true === b.__ko__hasDomDataOptionValue__ ? a.a.g.get(b, a.c.options.$b) : 7 >= a.a.W ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value;
                case "select":
                  return 0 <= b.selectedIndex ? a.w.M(b.options[b.selectedIndex]) : n;
                default:
                  return b.value;
              }
            }, cb: function(b, c, d) {
              switch (a.a.R(b)) {
                case "option":
                  "string" === typeof c ? (a.a.g.set(b, a.c.options.$b, n), "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__, b.value = c) : (a.a.g.set(b, a.c.options.$b, c), b.__ko__hasDomDataOptionValue__ = true, b.value = "number" === typeof c ? c : "");
                  break;
                case "select":
                  if ("" === c || null === c)
                    c = n;
                  for (var e = -1, f = 0, g = b.options.length, h; f < g; ++f)
                    if (h = a.w.M(b.options[f]), h == c || "" === h && c === n) {
                      e = f;
                      break;
                    }
                  if (d || 0 <= e || c === n && 1 < b.size)
                    b.selectedIndex = e, 6 === a.a.W && a.a.setTimeout(function() {
                      b.selectedIndex = e;
                    }, 0);
                  break;
                default:
                  if (null === c || c === n)
                    c = "";
                  b.value = c;
              }
            } };
          })();
          a.b("selectExtensions", a.w);
          a.b("selectExtensions.readValue", a.w.M);
          a.b("selectExtensions.writeValue", a.w.cb);
          a.m = function() {
            function b(b2) {
              b2 = a.a.Db(b2);
              123 === b2.charCodeAt(0) && (b2 = b2.slice(
                1,
                -1
              ));
              b2 += "\n,";
              var c2 = [], d2 = b2.match(e), p, q = [], h2 = 0;
              if (1 < d2.length) {
                for (var x = 0, B; B = d2[x]; ++x) {
                  var u = B.charCodeAt(0);
                  if (44 === u) {
                    if (0 >= h2) {
                      c2.push(p && q.length ? { key: p, value: q.join("") } : { unknown: p || q.join("") });
                      p = h2 = 0;
                      q = [];
                      continue;
                    }
                  } else if (58 === u) {
                    if (!h2 && !p && 1 === q.length) {
                      p = q.pop();
                      continue;
                    }
                  } else if (47 === u && 1 < B.length && (47 === B.charCodeAt(1) || 42 === B.charCodeAt(1)))
                    continue;
                  else
                    47 === u && x && 1 < B.length ? (u = d2[x - 1].match(f)) && !g[u[0]] && (b2 = b2.substr(b2.indexOf(B) + 1), d2 = b2.match(e), x = -1, B = "/") : 40 === u || 123 === u || 91 === u ? ++h2 : 41 === u || 125 === u || 93 === u ? --h2 : p || q.length || 34 !== u && 39 !== u || (B = B.slice(1, -1));
                  q.push(B);
                }
                if (0 < h2)
                  throw Error("Unbalanced parentheses, braces, or brackets");
              }
              return c2;
            }
            var c = ["true", "false", "null", "undefined"], d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, e = RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]", "g"), f = /[\])"'A-Za-z0-9_$]+$/, g = { "in": 1, "return": 1, "typeof": 1 }, h = {};
            return { Ra: [], wa: h, ac: b, vb: function(e2, f2) {
              function l2(b2, e3) {
                var f3;
                if (!x) {
                  var k = a.getBindingHandler(b2);
                  if (k && k.preprocess && !(e3 = k.preprocess(e3, b2, l2)))
                    return;
                  if (k = h[b2])
                    f3 = e3, 0 <= a.a.A(c, f3) ? f3 = false : (k = f3.match(d), f3 = null === k ? false : k[1] ? "Object(" + k[1] + ")" + k[2] : f3), k = f3;
                  k && q.push("'" + ("string" == typeof h[b2] ? h[b2] : b2) + "':function(_z){" + f3 + "=_z}");
                }
                g2 && (e3 = "function(){return " + e3 + " }");
                p.push("'" + b2 + "':" + e3);
              }
              f2 = f2 || {};
              var p = [], q = [], g2 = f2.valueAccessors, x = f2.bindingParams, B = "string" === typeof e2 ? b(e2) : e2;
              a.a.D(B, function(a2) {
                l2(
                  a2.key || a2.unknown,
                  a2.value
                );
              });
              q.length && l2("_ko_property_writers", "{" + q.join(",") + " }");
              return p.join(",");
            }, Id: function(a2, b2) {
              for (var c2 = 0; c2 < a2.length; c2++)
                if (a2[c2].key == b2)
                  return true;
              return false;
            }, eb: function(b2, c2, d2, e2, f2) {
              if (b2 && a.O(b2))
                !a.Za(b2) || f2 && b2.v() === e2 || b2(e2);
              else if ((b2 = c2.get("_ko_property_writers")) && b2[d2])
                b2[d2](e2);
            } };
          }();
          a.b("expressionRewriting", a.m);
          a.b("expressionRewriting.bindingRewriteValidators", a.m.Ra);
          a.b("expressionRewriting.parseObjectLiteral", a.m.ac);
          a.b("expressionRewriting.preProcessBindings", a.m.vb);
          a.b(
            "expressionRewriting._twoWayBindings",
            a.m.wa
          );
          a.b("jsonExpressionRewriting", a.m);
          a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.m.vb);
          (function() {
            function b(a2) {
              return 8 == a2.nodeType && g.test(f ? a2.text : a2.nodeValue);
            }
            function c(a2) {
              return 8 == a2.nodeType && h.test(f ? a2.text : a2.nodeValue);
            }
            function d(d2, e2) {
              for (var f2 = d2, h2 = 1, g2 = []; f2 = f2.nextSibling; ) {
                if (c(f2) && (a.a.g.set(f2, k, true), h2--, 0 === h2))
                  return g2;
                g2.push(f2);
                b(f2) && h2++;
              }
              if (!e2)
                throw Error("Cannot find closing comment tag to match: " + d2.nodeValue);
              return null;
            }
            function e(a2, b2) {
              var c2 = d(a2, b2);
              return c2 ? 0 < c2.length ? c2[c2.length - 1].nextSibling : a2.nextSibling : null;
            }
            var f = w && "<!--test-->" === w.createComment("test").text, g = f ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, h = f ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, m = { ul: true, ol: true }, k = "__ko_matchedEndComment__";
            a.h = { ea: {}, childNodes: function(a2) {
              return b(a2) ? d(a2) : a2.childNodes;
            }, Ea: function(c2) {
              if (b(c2)) {
                c2 = a.h.childNodes(c2);
                for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                  a.removeNode(c2[d2]);
              } else
                a.a.Tb(c2);
            }, va: function(c2, d2) {
              if (b(c2)) {
                a.h.Ea(c2);
                for (var e2 = c2.nextSibling, f2 = 0, k2 = d2.length; f2 < k2; f2++)
                  e2.parentNode.insertBefore(d2[f2], e2);
              } else
                a.a.va(c2, d2);
            }, Vc: function(a2, c2) {
              var d2;
              b(a2) ? (d2 = a2.nextSibling, a2 = a2.parentNode) : d2 = a2.firstChild;
              d2 ? c2 !== d2 && a2.insertBefore(c2, d2) : a2.appendChild(c2);
            }, Wb: function(c2, d2, e2) {
              e2 ? (e2 = e2.nextSibling, b(c2) && (c2 = c2.parentNode), e2 ? d2 !== e2 && c2.insertBefore(d2, e2) : c2.appendChild(d2)) : a.h.Vc(c2, d2);
            }, firstChild: function(a2) {
              if (b(a2))
                return !a2.nextSibling || c(a2.nextSibling) ? null : a2.nextSibling;
              if (a2.firstChild && c(a2.firstChild))
                throw Error("Found invalid end comment, as the first child of " + a2);
              return a2.firstChild;
            }, nextSibling: function(d2) {
              b(d2) && (d2 = e(d2));
              if (d2.nextSibling && c(d2.nextSibling)) {
                var f2 = d2.nextSibling;
                if (c(f2) && !a.a.g.get(f2, k))
                  throw Error("Found end comment without a matching opening comment, as child of " + d2);
                return null;
              }
              return d2.nextSibling;
            }, Cd: b, Vd: function(a2) {
              return (a2 = (f ? a2.text : a2.nodeValue).match(g)) ? a2[1] : null;
            }, Sc: function(d2) {
              if (m[a.a.R(d2)]) {
                var f2 = d2.firstChild;
                if (f2) {
                  do
                    if (1 === f2.nodeType) {
                      var k2;
                      k2 = f2.firstChild;
                      var h2 = null;
                      if (k2) {
                        do
                          if (h2)
                            h2.push(k2);
                          else if (b(k2)) {
                            var g2 = e(k2, true);
                            g2 ? k2 = g2 : h2 = [k2];
                          } else
                            c(k2) && (h2 = [k2]);
                        while (k2 = k2.nextSibling);
                      }
                      if (k2 = h2)
                        for (h2 = f2.nextSibling, g2 = 0; g2 < k2.length; g2++)
                          h2 ? d2.insertBefore(k2[g2], h2) : d2.appendChild(k2[g2]);
                    }
                  while (f2 = f2.nextSibling);
                }
              }
            } };
          })();
          a.b("virtualElements", a.h);
          a.b("virtualElements.allowedBindings", a.h.ea);
          a.b("virtualElements.emptyNode", a.h.Ea);
          a.b("virtualElements.insertAfter", a.h.Wb);
          a.b("virtualElements.prepend", a.h.Vc);
          a.b("virtualElements.setDomNodeChildren", a.h.va);
          (function() {
            a.ga = function() {
              this.nd = {};
            };
            a.a.extend(a.ga.prototype, {
              nodeHasBindings: function(b) {
                switch (b.nodeType) {
                  case 1:
                    return null != b.getAttribute("data-bind") || a.j.getComponentNameForNode(b);
                  case 8:
                    return a.h.Cd(b);
                  default:
                    return false;
                }
              },
              getBindings: function(b, c) {
                var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b) : null;
                return a.j.tc(d, b, c, false);
              },
              getBindingAccessors: function(b, c) {
                var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b, { valueAccessors: true }) : null;
                return a.j.tc(d, b, c, true);
              },
              getBindingsString: function(b) {
                switch (b.nodeType) {
                  case 1:
                    return b.getAttribute("data-bind");
                  case 8:
                    return a.h.Vd(b);
                  default:
                    return null;
                }
              },
              parseBindingsString: function(b, c, d, e) {
                try {
                  var f = this.nd, g = b + (e && e.valueAccessors || ""), h;
                  if (!(h = f[g])) {
                    var m, k = "with($context){with($data||{}){return{" + a.m.vb(b, e) + "}}}";
                    m = new Function("$context", "$element", k);
                    h = f[g] = m;
                  }
                  return h(c, d);
                } catch (l2) {
                  throw l2.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + l2.message, l2;
                }
              }
            });
            a.ga.instance = new a.ga();
          })();
          a.b("bindingProvider", a.ga);
          (function() {
            function b(b2) {
              var c2 = (b2 = a.a.g.get(b2, z)) && b2.N;
              c2 && (b2.N = null, c2.Tc());
            }
            function c(c2, d2, e2) {
              this.node = c2;
              this.yc = d2;
              this.kb = [];
              this.H = false;
              d2.N || a.a.K.za(c2, b);
              e2 && e2.N && (e2.N.kb.push(c2), this.Kb = e2);
            }
            function d(a2) {
              return function() {
                return a2;
              };
            }
            function e(a2) {
              return a2();
            }
            function f(b2) {
              return a.a.Ga(a.u.G(b2), function(a2, c2) {
                return function() {
                  return b2()[c2];
                };
              });
            }
            function g(b2, c2, e2) {
              return "function" === typeof b2 ? f(b2.bind(null, c2, e2)) : a.a.Ga(b2, d);
            }
            function h(a2, b2) {
              return f(this.getBindings.bind(this, a2, b2));
            }
            function m(b2, c2) {
              var d2 = a.h.firstChild(c2);
              if (d2) {
                var e2, f2 = a.ga.instance, l3 = f2.preprocessNode;
                if (l3) {
                  for (; e2 = d2; )
                    d2 = a.h.nextSibling(e2), l3.call(f2, e2);
                  d2 = a.h.firstChild(c2);
                }
                for (; e2 = d2; )
                  d2 = a.h.nextSibling(e2), k(b2, e2);
              }
              a.i.ma(c2, a.i.H);
            }
            function k(b2, c2) {
              var d2 = b2, e2 = 1 === c2.nodeType;
              e2 && a.h.Sc(c2);
              if (e2 || a.ga.instance.nodeHasBindings(c2))
                d2 = p(c2, null, b2).bindingContextForDescendants;
              d2 && !u[a.a.R(c2)] && m(d2, c2);
            }
            function l2(b2) {
              var c2 = [], d2 = {}, e2 = [];
              a.a.P(b2, function ca(f2) {
                if (!d2[f2]) {
                  var k2 = a.getBindingHandler(f2);
                  k2 && (k2.after && (e2.push(f2), a.a.D(k2.after, function(c3) {
                    if (b2[c3]) {
                      if (-1 !== a.a.A(e2, c3))
                        throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + e2.join(", "));
                      ca(c3);
                    }
                  }), e2.length--), c2.push({ key: f2, Mc: k2 }));
                  d2[f2] = true;
                }
              });
              return c2;
            }
            function p(b2, c2, d2) {
              var f2 = a.a.g.Ub(b2, z, {}), k2 = f2.hd;
              if (!c2) {
                if (k2)
                  throw Error("You cannot apply bindings multiple times to the same element.");
                f2.hd = true;
              }
              k2 || (f2.context = d2);
              f2.Zb || (f2.Zb = {});
              var g2;
              if (c2 && "function" !== typeof c2)
                g2 = c2;
              else {
                var p2 = a.ga.instance, q2 = p2.getBindingAccessors || h, m2 = a.$(function() {
                  if (g2 = c2 ? c2(d2, b2) : q2.call(p2, b2, d2)) {
                    if (d2[t])
                      d2[t]();
                    if (d2[B])
                      d2[B]();
                  }
                  return g2;
                }, null, { l: b2 });
                g2 && m2.ja() || (m2 = null);
              }
              var x2 = d2, u2;
              if (g2) {
                var J2 = function() {
                  return a.a.Ga(m2 ? m2() : g2, e);
                }, r2 = m2 ? function(a2) {
                  return function() {
                    return e(m2()[a2]);
                  };
                } : function(a2) {
                  return g2[a2];
                };
                J2.get = function(a2) {
                  return g2[a2] && e(r2(a2));
                };
                J2.has = function(a2) {
                  return a2 in g2;
                };
                a.i.H in g2 && a.i.subscribe(b2, a.i.H, function() {
                  var c3 = (0, g2[a.i.H])();
                  if (c3) {
                    var d3 = a.h.childNodes(b2);
                    d3.length && c3(d3, a.Ec(d3[0]));
                  }
                });
                a.i.pa in g2 && (x2 = a.i.Cb(b2, d2), a.i.subscribe(b2, a.i.pa, function() {
                  var c3 = (0, g2[a.i.pa])();
                  c3 && a.h.firstChild(b2) && c3(b2);
                }));
                f2 = l2(g2);
                a.a.D(f2, function(c3) {
                  var d3 = c3.Mc.init, e2 = c3.Mc.update, f3 = c3.key;
                  if (8 === b2.nodeType && !a.h.ea[f3])
                    throw Error("The binding '" + f3 + "' cannot be used with virtual elements");
                  try {
                    "function" == typeof d3 && a.u.G(function() {
                      var a2 = d3(b2, r2(f3), J2, x2.$data, x2);
                      if (a2 && a2.controlsDescendantBindings) {
                        if (u2 !== n)
                          throw Error("Multiple bindings (" + u2 + " and " + f3 + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                        u2 = f3;
                      }
                    }), "function" == typeof e2 && a.$(function() {
                      e2(b2, r2(f3), J2, x2.$data, x2);
                    }, null, { l: b2 });
                  } catch (k3) {
                    throw k3.message = 'Unable to process binding "' + f3 + ": " + g2[f3] + '"\nMessage: ' + k3.message, k3;
                  }
                });
              }
              f2 = u2 === n;
              return { shouldBindDescendants: f2, bindingContextForDescendants: f2 && x2 };
            }
            function q(b2, c2) {
              return b2 && b2 instanceof a.fa ? b2 : new a.fa(b2, n, n, c2);
            }
            var t = a.a.Da("_subscribable"), x = a.a.Da("_ancestorBindingInfo"), B = a.a.Da("_dataDependency");
            a.c = {};
            var u = { script: true, textarea: true, template: true };
            a.getBindingHandler = function(b2) {
              return a.c[b2];
            };
            var J = {};
            a.fa = function(b2, c2, d2, e2, f2) {
              function k2() {
                var b3 = p2 ? h2() : h2, f3 = a.a.f(b3);
                c2 ? (a.a.extend(l3, c2), x in c2 && (l3[x] = c2[x])) : (l3.$parents = [], l3.$root = f3, l3.ko = a);
                l3[t] = q2;
                g2 ? f3 = l3.$data : (l3.$rawData = b3, l3.$data = f3);
                d2 && (l3[d2] = f3);
                e2 && e2(l3, c2, f3);
                if (c2 && c2[t] && !a.S.o().Vb(c2[t]))
                  c2[t]();
                m2 && (l3[B] = m2);
                return l3.$data;
              }
              var l3 = this, g2 = b2 === J, h2 = g2 ? n : b2, p2 = "function" == typeof h2 && !a.O(h2), q2, m2 = f2 && f2.dataDependency;
              f2 && f2.exportDependencies ? k2() : (q2 = a.xb(k2), q2.v(), q2.ja() ? q2.equalityComparer = null : l3[t] = n);
            };
            a.fa.prototype.createChildContext = function(b2, c2, d2, e2) {
              !e2 && c2 && "object" == typeof c2 && (e2 = c2, c2 = e2.as, d2 = e2.extend);
              if (c2 && e2 && e2.noChildContext) {
                var f2 = "function" == typeof b2 && !a.O(b2);
                return new a.fa(J, this, null, function(a2) {
                  d2 && d2(a2);
                  a2[c2] = f2 ? b2() : b2;
                }, e2);
              }
              return new a.fa(
                b2,
                this,
                c2,
                function(a2, b3) {
                  a2.$parentContext = b3;
                  a2.$parent = b3.$data;
                  a2.$parents = (b3.$parents || []).slice(0);
                  a2.$parents.unshift(a2.$parent);
                  d2 && d2(a2);
                },
                e2
              );
            };
            a.fa.prototype.extend = function(b2, c2) {
              return new a.fa(J, this, null, function(c3) {
                a.a.extend(c3, "function" == typeof b2 ? b2(c3) : b2);
              }, c2);
            };
            var z = a.a.g.Z();
            c.prototype.Tc = function() {
              this.Kb && this.Kb.N && this.Kb.N.sd(this.node);
            };
            c.prototype.sd = function(b2) {
              a.a.Pa(this.kb, b2);
              !this.kb.length && this.H && this.Cc();
            };
            c.prototype.Cc = function() {
              this.H = true;
              this.yc.N && !this.kb.length && (this.yc.N = null, a.a.K.yb(this.node, b), a.i.ma(this.node, a.i.pa), this.Tc());
            };
            a.i = { H: "childrenComplete", pa: "descendantsComplete", subscribe: function(b2, c2, d2, e2, f2) {
              var k2 = a.a.g.Ub(b2, z, {});
              k2.Fa || (k2.Fa = new a.T());
              f2 && f2.notifyImmediately && k2.Zb[c2] && a.u.G(d2, e2, [b2]);
              return k2.Fa.subscribe(d2, e2, c2);
            }, ma: function(b2, c2) {
              var d2 = a.a.g.get(b2, z);
              if (d2 && (d2.Zb[c2] = true, d2.Fa && d2.Fa.notifySubscribers(b2, c2), c2 == a.i.H)) {
                if (d2.N)
                  d2.N.Cc();
                else if (d2.N === n && d2.Fa && d2.Fa.Wa(a.i.pa))
                  throw Error("descendantsComplete event not supported for bindings on this node");
              }
            }, Cb: function(b2, d2) {
              var e2 = a.a.g.Ub(b2, z, {});
              e2.N || (e2.N = new c(b2, e2, d2[x]));
              return d2[x] == e2 ? d2 : d2.extend(function(a2) {
                a2[x] = e2;
              });
            } };
            a.Td = function(b2) {
              return (b2 = a.a.g.get(b2, z)) && b2.context;
            };
            a.ib = function(b2, c2, d2) {
              1 === b2.nodeType && a.h.Sc(b2);
              return p(b2, c2, q(d2));
            };
            a.ld = function(b2, c2, d2) {
              d2 = q(d2);
              return a.ib(b2, g(c2, d2, b2), d2);
            };
            a.Oa = function(a2, b2) {
              1 !== b2.nodeType && 8 !== b2.nodeType || m(q(a2), b2);
            };
            a.vc = function(a2, b2, c2) {
              !v && A.jQuery && (v = A.jQuery);
              if (2 > arguments.length) {
                if (b2 = w.body, !b2)
                  throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");
              } else if (!b2 || 1 !== b2.nodeType && 8 !== b2.nodeType)
                throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
              k(q(a2, c2), b2);
            };
            a.Dc = function(b2) {
              return !b2 || 1 !== b2.nodeType && 8 !== b2.nodeType ? n : a.Td(b2);
            };
            a.Ec = function(b2) {
              return (b2 = a.Dc(b2)) ? b2.$data : n;
            };
            a.b("bindingHandlers", a.c);
            a.b("bindingEvent", a.i);
            a.b("bindingEvent.subscribe", a.i.subscribe);
            a.b("bindingEvent.startPossiblyAsyncContentBinding", a.i.Cb);
            a.b("applyBindings", a.vc);
            a.b("applyBindingsToDescendants", a.Oa);
            a.b("applyBindingAccessorsToNode", a.ib);
            a.b("applyBindingsToNode", a.ld);
            a.b("contextFor", a.Dc);
            a.b("dataFor", a.Ec);
          })();
          (function(b) {
            function c(c2, e2) {
              var k = Object.prototype.hasOwnProperty.call(f, c2) ? f[c2] : b, l2;
              k ? k.subscribe(e2) : (k = f[c2] = new a.T(), k.subscribe(e2), d(c2, function(b2, d2) {
                var e3 = !(!d2 || !d2.synchronous);
                g[c2] = { definition: b2, Gd: e3 };
                delete f[c2];
                l2 || e3 ? k.notifySubscribers(b2) : a.na.zb(function() {
                  k.notifySubscribers(b2);
                });
              }), l2 = true);
            }
            function d(a2, b2) {
              e("getConfig", [a2], function(c2) {
                c2 ? e("loadComponent", [a2, c2], function(a3) {
                  b2(
                    a3,
                    c2
                  );
                }) : b2(null, null);
              });
            }
            function e(c2, d2, f2, l2) {
              l2 || (l2 = a.j.loaders.slice(0));
              var g2 = l2.shift();
              if (g2) {
                var q = g2[c2];
                if (q) {
                  var t = false;
                  if (q.apply(g2, d2.concat(function(a2) {
                    t ? f2(null) : null !== a2 ? f2(a2) : e(c2, d2, f2, l2);
                  })) !== b && (t = true, !g2.suppressLoaderExceptions))
                    throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
                } else
                  e(c2, d2, f2, l2);
              } else
                f2(null);
            }
            var f = {}, g = {};
            a.j = { get: function(d2, e2) {
              var f2 = Object.prototype.hasOwnProperty.call(g, d2) ? g[d2] : b;
              f2 ? f2.Gd ? a.u.G(function() {
                e2(f2.definition);
              }) : a.na.zb(function() {
                e2(f2.definition);
              }) : c(d2, e2);
            }, Bc: function(a2) {
              delete g[a2];
            }, oc: e };
            a.j.loaders = [];
            a.b("components", a.j);
            a.b("components.get", a.j.get);
            a.b("components.clearCachedDefinition", a.j.Bc);
          })();
          (function() {
            function b(b2, c2, d2, e2) {
              function g2() {
                0 === --B && e2(h2);
              }
              var h2 = {}, B = 2, u = d2.template;
              d2 = d2.viewModel;
              u ? f(c2, u, function(c3) {
                a.j.oc("loadTemplate", [b2, c3], function(a2) {
                  h2.template = a2;
                  g2();
                });
              }) : g2();
              d2 ? f(c2, d2, function(c3) {
                a.j.oc("loadViewModel", [b2, c3], function(a2) {
                  h2[m] = a2;
                  g2();
                });
              }) : g2();
            }
            function c(a2, b2, d2) {
              if ("function" === typeof b2)
                d2(function(a3) {
                  return new b2(a3);
                });
              else if ("function" === typeof b2[m])
                d2(b2[m]);
              else if ("instance" in b2) {
                var e2 = b2.instance;
                d2(function() {
                  return e2;
                });
              } else
                "viewModel" in b2 ? c(a2, b2.viewModel, d2) : a2("Unknown viewModel value: " + b2);
            }
            function d(b2) {
              switch (a.a.R(b2)) {
                case "script":
                  return a.a.ua(b2.text);
                case "textarea":
                  return a.a.ua(b2.value);
                case "template":
                  if (e(b2.content))
                    return a.a.Ca(b2.content.childNodes);
              }
              return a.a.Ca(b2.childNodes);
            }
            function e(a2) {
              return A.DocumentFragment ? a2 instanceof DocumentFragment : a2 && 11 === a2.nodeType;
            }
            function f(a2, b2, c2) {
              "string" === typeof b2.require ? T || A.require ? (T || A.require)([b2.require], function(a3) {
                a3 && "object" === typeof a3 && a3.Xd && a3["default"] && (a3 = a3["default"]);
                c2(a3);
              }) : a2("Uses require, but no AMD loader is present") : c2(b2);
            }
            function g(a2) {
              return function(b2) {
                throw Error("Component '" + a2 + "': " + b2);
              };
            }
            var h = {};
            a.j.register = function(b2, c2) {
              if (!c2)
                throw Error("Invalid configuration for " + b2);
              if (a.j.tb(b2))
                throw Error("Component " + b2 + " is already registered");
              h[b2] = c2;
            };
            a.j.tb = function(a2) {
              return Object.prototype.hasOwnProperty.call(h, a2);
            };
            a.j.unregister = function(b2) {
              delete h[b2];
              a.j.Bc(b2);
            };
            a.j.Fc = { getConfig: function(b2, c2) {
              c2(a.j.tb(b2) ? h[b2] : null);
            }, loadComponent: function(a2, c2, d2) {
              var e2 = g(a2);
              f(e2, c2, function(c3) {
                b(a2, e2, c3, d2);
              });
            }, loadTemplate: function(b2, c2, f2) {
              b2 = g(b2);
              if ("string" === typeof c2)
                f2(a.a.ua(c2));
              else if (c2 instanceof Array)
                f2(c2);
              else if (e(c2))
                f2(a.a.la(c2.childNodes));
              else if (c2.element)
                if (c2 = c2.element, A.HTMLElement ? c2 instanceof HTMLElement : c2 && c2.tagName && 1 === c2.nodeType)
                  f2(d(c2));
                else if ("string" === typeof c2) {
                  var h2 = w.getElementById(c2);
                  h2 ? f2(d(h2)) : b2("Cannot find element with ID " + c2);
                } else
                  b2("Unknown element type: " + c2);
              else
                b2("Unknown template value: " + c2);
            }, loadViewModel: function(a2, b2, d2) {
              c(g(a2), b2, d2);
            } };
            var m = "createViewModel";
            a.b("components.register", a.j.register);
            a.b("components.isRegistered", a.j.tb);
            a.b("components.unregister", a.j.unregister);
            a.b("components.defaultLoader", a.j.Fc);
            a.j.loaders.push(a.j.Fc);
            a.j.dd = h;
          })();
          (function() {
            function b(b2, e) {
              var f = b2.getAttribute("params");
              if (f) {
                var f = c.parseBindingsString(f, e, b2, { valueAccessors: true, bindingParams: true }), f = a.a.Ga(f, function(c2) {
                  return a.o(c2, null, { l: b2 });
                }), g = a.a.Ga(
                  f,
                  function(c2) {
                    var e2 = c2.v();
                    return c2.ja() ? a.o({ read: function() {
                      return a.a.f(c2());
                    }, write: a.Za(e2) && function(a2) {
                      c2()(a2);
                    }, l: b2 }) : e2;
                  }
                );
                Object.prototype.hasOwnProperty.call(g, "$raw") || (g.$raw = f);
                return g;
              }
              return { $raw: {} };
            }
            a.j.getComponentNameForNode = function(b2) {
              var c2 = a.a.R(b2);
              if (a.j.tb(c2) && (-1 != c2.indexOf("-") || "[object HTMLUnknownElement]" == "" + b2 || 8 >= a.a.W && b2.tagName === c2))
                return c2;
            };
            a.j.tc = function(c2, e, f, g) {
              if (1 === e.nodeType) {
                var h = a.j.getComponentNameForNode(e);
                if (h) {
                  c2 = c2 || {};
                  if (c2.component)
                    throw Error('Cannot use the "component" binding on a custom element matching a component');
                  var m = { name: h, params: b(e, f) };
                  c2.component = g ? function() {
                    return m;
                  } : m;
                }
              }
              return c2;
            };
            var c = new a.ga();
            9 > a.a.W && (a.j.register = function(a2) {
              return function(b2) {
                return a2.apply(this, arguments);
              };
            }(a.j.register), w.createDocumentFragment = function(b2) {
              return function() {
                var c2 = b2(), f = a.j.dd, g;
                for (g in f)
                  ;
                return c2;
              };
            }(w.createDocumentFragment));
          })();
          (function() {
            function b(b2, c2, d2) {
              c2 = c2.template;
              if (!c2)
                throw Error("Component '" + b2 + "' has no template");
              b2 = a.a.Ca(c2);
              a.h.va(d2, b2);
            }
            function c(a2, b2, c2) {
              var d2 = a2.createViewModel;
              return d2 ? d2.call(
                a2,
                b2,
                c2
              ) : b2;
            }
            var d = 0;
            a.c.component = { init: function(e, f, g, h, m) {
              function k() {
                var a2 = l2 && l2.dispose;
                "function" === typeof a2 && a2.call(l2);
                q && q.s();
                p = l2 = q = null;
              }
              var l2, p, q, t = a.a.la(a.h.childNodes(e));
              a.h.Ea(e);
              a.a.K.za(e, k);
              a.o(function() {
                var g2 = a.a.f(f()), h2, u;
                "string" === typeof g2 ? h2 = g2 : (h2 = a.a.f(g2.name), u = a.a.f(g2.params));
                if (!h2)
                  throw Error("No component name specified");
                var n2 = a.i.Cb(e, m), z = p = ++d;
                a.j.get(h2, function(d2) {
                  if (p === z) {
                    k();
                    if (!d2)
                      throw Error("Unknown component '" + h2 + "'");
                    b(h2, d2, e);
                    var f2 = c(d2, u, { element: e, templateNodes: t });
                    d2 = n2.createChildContext(f2, { extend: function(a2) {
                      a2.$component = f2;
                      a2.$componentTemplateNodes = t;
                    } });
                    f2 && f2.koDescendantsComplete && (q = a.i.subscribe(e, a.i.pa, f2.koDescendantsComplete, f2));
                    l2 = f2;
                    a.Oa(d2, e);
                  }
                });
              }, null, { l: e });
              return { controlsDescendantBindings: true };
            } };
            a.h.ea.component = true;
          })();
          var V = { "class": "className", "for": "htmlFor" };
          a.c.attr = { update: function(b, c) {
            var d = a.a.f(c()) || {};
            a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              var g = c2.indexOf(":"), g = "lookupNamespaceURI" in b && 0 < g && b.lookupNamespaceURI(c2.substr(0, g)), h = false === d2 || null === d2 || d2 === n;
              h ? g ? b.removeAttributeNS(g, c2) : b.removeAttribute(c2) : d2 = d2.toString();
              8 >= a.a.W && c2 in V ? (c2 = V[c2], h ? b.removeAttribute(c2) : b[c2] = d2) : h || (g ? b.setAttributeNS(g, c2, d2) : b.setAttribute(c2, d2));
              "name" === c2 && a.a.Yc(b, h ? "" : d2);
            });
          } };
          (function() {
            a.c.checked = { after: ["value", "attr"], init: function(b, c, d) {
              function e() {
                var e2 = b.checked, f2 = g();
                if (!a.S.Ya() && (e2 || !m && !a.S.qa())) {
                  var k2 = a.u.G(c);
                  if (l2) {
                    var q2 = p ? k2.v() : k2, z = t;
                    t = f2;
                    z !== f2 ? e2 && (a.a.Na(q2, f2, true), a.a.Na(q2, z, false)) : a.a.Na(q2, f2, e2);
                    p && a.Za(k2) && k2(q2);
                  } else
                    h && (f2 === n ? f2 = e2 : e2 || (f2 = n)), a.m.eb(
                      k2,
                      d,
                      "checked",
                      f2,
                      true
                    );
                }
              }
              function f() {
                var d2 = a.a.f(c()), e2 = g();
                l2 ? (b.checked = 0 <= a.a.A(d2, e2), t = e2) : b.checked = h && e2 === n ? !!d2 : g() === d2;
              }
              var g = a.xb(function() {
                if (d.has("checkedValue"))
                  return a.a.f(d.get("checkedValue"));
                if (q)
                  return d.has("value") ? a.a.f(d.get("value")) : b.value;
              }), h = "checkbox" == b.type, m = "radio" == b.type;
              if (h || m) {
                var k = c(), l2 = h && a.a.f(k) instanceof Array, p = !(l2 && k.push && k.splice), q = m || l2, t = l2 ? g() : n;
                m && !b.name && a.c.uniqueName.init(b, function() {
                  return true;
                });
                a.o(e, null, { l: b });
                a.a.B(b, "click", e);
                a.o(f, null, { l: b });
                k = n;
              }
            } };
            a.m.wa.checked = true;
            a.c.checkedValue = { update: function(b, c) {
              b.value = a.a.f(c());
            } };
          })();
          a.c["class"] = { update: function(b, c) {
            var d = a.a.Db(a.a.f(c()));
            a.a.Eb(b, b.__ko__cssValue, false);
            b.__ko__cssValue = d;
            a.a.Eb(b, d, true);
          } };
          a.c.css = { update: function(b, c) {
            var d = a.a.f(c());
            null !== d && "object" == typeof d ? a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              a.a.Eb(b, c2, d2);
            }) : a.c["class"].update(b, c);
          } };
          a.c.enable = { update: function(b, c) {
            var d = a.a.f(c());
            d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = true);
          } };
          a.c.disable = { update: function(b, c) {
            a.c.enable.update(b, function() {
              return !a.a.f(c());
            });
          } };
          a.c.event = { init: function(b, c, d, e, f) {
            var g = c() || {};
            a.a.P(g, function(g2) {
              "string" == typeof g2 && a.a.B(b, g2, function(b2) {
                var k, l2 = c()[g2];
                if (l2) {
                  try {
                    var p = a.a.la(arguments);
                    e = f.$data;
                    p.unshift(e);
                    k = l2.apply(e, p);
                  } finally {
                    true !== k && (b2.preventDefault ? b2.preventDefault() : b2.returnValue = false);
                  }
                  false === d.get(g2 + "Bubble") && (b2.cancelBubble = true, b2.stopPropagation && b2.stopPropagation());
                }
              });
            });
          } };
          a.c.foreach = { Rc: function(b) {
            return function() {
              var c = b(), d = a.a.bc(c);
              if (!d || "number" == typeof d.length)
                return { foreach: c, templateEngine: a.ba.Ma };
              a.a.f(c);
              return { foreach: d.data, as: d.as, noChildContext: d.noChildContext, includeDestroyed: d.includeDestroyed, afterAdd: d.afterAdd, beforeRemove: d.beforeRemove, afterRender: d.afterRender, beforeMove: d.beforeMove, afterMove: d.afterMove, templateEngine: a.ba.Ma };
            };
          }, init: function(b, c) {
            return a.c.template.init(b, a.c.foreach.Rc(c));
          }, update: function(b, c, d, e, f) {
            return a.c.template.update(b, a.c.foreach.Rc(c), d, e, f);
          } };
          a.m.Ra.foreach = false;
          a.h.ea.foreach = true;
          a.c.hasfocus = { init: function(b, c, d) {
            function e(e2) {
              b.__ko_hasfocusUpdating = true;
              var f2 = b.ownerDocument;
              if ("activeElement" in f2) {
                var g2;
                try {
                  g2 = f2.activeElement;
                } catch (l2) {
                  g2 = f2.body;
                }
                e2 = g2 === b;
              }
              f2 = c();
              a.m.eb(f2, d, "hasfocus", e2, true);
              b.__ko_hasfocusLastValue = e2;
              b.__ko_hasfocusUpdating = false;
            }
            var f = e.bind(null, true), g = e.bind(null, false);
            a.a.B(b, "focus", f);
            a.a.B(b, "focusin", f);
            a.a.B(b, "blur", g);
            a.a.B(b, "focusout", g);
            b.__ko_hasfocusLastValue = false;
          }, update: function(b, c) {
            var d = !!a.a.f(c());
            b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue === d || (d ? b.focus() : b.blur(), !d && b.__ko_hasfocusLastValue && b.ownerDocument.body.focus(), a.u.G(a.a.Fb, null, [b, d ? "focusin" : "focusout"]));
          } };
          a.m.wa.hasfocus = true;
          a.c.hasFocus = a.c.hasfocus;
          a.m.wa.hasFocus = "hasfocus";
          a.c.html = { init: function() {
            return { controlsDescendantBindings: true };
          }, update: function(b, c) {
            a.a.fc(b, c());
          } };
          (function() {
            function b(b2, d, e) {
              a.c[b2] = { init: function(b3, c, h, m, k) {
                var l2, p, q = {}, t, x, n2;
                if (d) {
                  m = h.get("as");
                  var u = h.get("noChildContext");
                  n2 = !(m && u);
                  q = { as: m, noChildContext: u, exportDependencies: n2 };
                }
                x = (t = "render" == h.get("completeOn")) || h.has(a.i.pa);
                a.o(function() {
                  var h2 = a.a.f(c()), m2 = !e !== !h2, u2 = !p, r2;
                  if (n2 || m2 !== l2) {
                    x && (k = a.i.Cb(b3, k));
                    if (m2) {
                      if (!d || n2)
                        q.dataDependency = a.S.o();
                      r2 = d ? k.createChildContext("function" == typeof h2 ? h2 : c, q) : a.S.qa() ? k.extend(null, q) : k;
                    }
                    u2 && a.S.qa() && (p = a.a.Ca(a.h.childNodes(b3), true));
                    m2 ? (u2 || a.h.va(b3, a.a.Ca(p)), a.Oa(r2, b3)) : (a.h.Ea(b3), t || a.i.ma(b3, a.i.H));
                    l2 = m2;
                  }
                }, null, { l: b3 });
                return { controlsDescendantBindings: true };
              } };
              a.m.Ra[b2] = false;
              a.h.ea[b2] = true;
            }
            b("if");
            b("ifnot", false, true);
            b("with", true);
          })();
          a.c.let = { init: function(b, c, d, e, f) {
            c = f.extend(c);
            a.Oa(c, b);
            return { controlsDescendantBindings: true };
          } };
          a.h.ea.let = true;
          var Q = {};
          a.c.options = { init: function(b) {
            if ("select" !== a.a.R(b))
              throw Error("options binding applies only to SELECT elements");
            for (; 0 < b.length; )
              b.remove(0);
            return { controlsDescendantBindings: true };
          }, update: function(b, c, d) {
            function e() {
              return a.a.jb(b.options, function(a2) {
                return a2.selected;
              });
            }
            function f(a2, b2, c2) {
              var d2 = typeof b2;
              return "function" == d2 ? b2(a2) : "string" == d2 ? a2[b2] : c2;
            }
            function g(c2, d2) {
              if (x && l2)
                a.i.ma(b, a.i.H);
              else if (t.length) {
                var e2 = 0 <= a.a.A(t, a.w.M(d2[0]));
                a.a.Zc(d2[0], e2);
                x && !e2 && a.u.G(a.a.Fb, null, [b, "change"]);
              }
            }
            var h = b.multiple, m = 0 != b.length && h ? b.scrollTop : null, k = a.a.f(c()), l2 = d.get("valueAllowUnset") && d.has("value"), p = d.get("optionsIncludeDestroyed");
            c = {};
            var q, t = [];
            l2 || (h ? t = a.a.Mb(e(), a.w.M) : 0 <= b.selectedIndex && t.push(a.w.M(b.options[b.selectedIndex])));
            k && ("undefined" == typeof k.length && (k = [k]), q = a.a.jb(k, function(b2) {
              return p || b2 === n || null === b2 || !a.a.f(b2._destroy);
            }), d.has("optionsCaption") && (k = a.a.f(d.get("optionsCaption")), null !== k && k !== n && q.unshift(Q)));
            var x = false;
            c.beforeRemove = function(a2) {
              b.removeChild(a2);
            };
            k = g;
            d.has("optionsAfterRender") && "function" == typeof d.get("optionsAfterRender") && (k = function(b2, c2) {
              g(0, c2);
              a.u.G(d.get("optionsAfterRender"), null, [c2[0], b2 !== Q ? b2 : n]);
            });
            a.a.ec(b, q, function(c2, e2, g2) {
              g2.length && (t = !l2 && g2[0].selected ? [a.w.M(g2[0])] : [], x = true);
              e2 = b.ownerDocument.createElement("option");
              c2 === Q ? (a.a.Bb(e2, d.get("optionsCaption")), a.w.cb(e2, n)) : (g2 = f(c2, d.get("optionsValue"), c2), a.w.cb(e2, a.a.f(g2)), c2 = f(c2, d.get("optionsText"), g2), a.a.Bb(e2, c2));
              return [e2];
            }, c, k);
            if (!l2) {
              var B;
              h ? B = t.length && e().length < t.length : B = t.length && 0 <= b.selectedIndex ? a.w.M(b.options[b.selectedIndex]) !== t[0] : t.length || 0 <= b.selectedIndex;
              B && a.u.G(a.a.Fb, null, [b, "change"]);
            }
            (l2 || a.S.Ya()) && a.i.ma(b, a.i.H);
            a.a.wd(b);
            m && 20 < Math.abs(m - b.scrollTop) && (b.scrollTop = m);
          } };
          a.c.options.$b = a.a.g.Z();
          a.c.selectedOptions = { init: function(b, c, d) {
            function e() {
              var e2 = c(), f2 = [];
              a.a.D(b.getElementsByTagName("option"), function(b2) {
                b2.selected && f2.push(a.w.M(b2));
              });
              a.m.eb(
                e2,
                d,
                "selectedOptions",
                f2
              );
            }
            function f() {
              var d2 = a.a.f(c()), e2 = b.scrollTop;
              d2 && "number" == typeof d2.length && a.a.D(b.getElementsByTagName("option"), function(b2) {
                var c2 = 0 <= a.a.A(d2, a.w.M(b2));
                b2.selected != c2 && a.a.Zc(b2, c2);
              });
              b.scrollTop = e2;
            }
            if ("select" != a.a.R(b))
              throw Error("selectedOptions binding applies only to SELECT elements");
            var g;
            a.i.subscribe(b, a.i.H, function() {
              g ? e() : (a.a.B(b, "change", e), g = a.o(f, null, { l: b }));
            }, null, { notifyImmediately: true });
          }, update: function() {
          } };
          a.m.wa.selectedOptions = true;
          a.c.style = { update: function(b, c) {
            var d = a.a.f(c() || {});
            a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              if (null === d2 || d2 === n || false === d2)
                d2 = "";
              if (v)
                v(b).css(c2, d2);
              else if (/^--/.test(c2))
                b.style.setProperty(c2, d2);
              else {
                c2 = c2.replace(/-(\w)/g, function(a2, b2) {
                  return b2.toUpperCase();
                });
                var g = b.style[c2];
                b.style[c2] = d2;
                d2 === g || b.style[c2] != g || isNaN(d2) || (b.style[c2] = d2 + "px");
              }
            });
          } };
          a.c.submit = { init: function(b, c, d, e, f) {
            if ("function" != typeof c())
              throw Error("The value for a submit binding must be a function");
            a.a.B(b, "submit", function(a2) {
              var d2, e2 = c();
              try {
                d2 = e2.call(f.$data, b);
              } finally {
                true !== d2 && (a2.preventDefault ? a2.preventDefault() : a2.returnValue = false);
              }
            });
          } };
          a.c.text = { init: function() {
            return { controlsDescendantBindings: true };
          }, update: function(b, c) {
            a.a.Bb(b, c());
          } };
          a.h.ea.text = true;
          (function() {
            if (A && A.navigator) {
              var b = function(a2) {
                if (a2)
                  return parseFloat(a2[1]);
              }, c = A.navigator.userAgent, d, e, f, g, h;
              (d = A.opera && A.opera.version && parseInt(A.opera.version())) || (h = b(c.match(/Edge\/([^ ]+)$/))) || b(c.match(/Chrome\/([^ ]+)/)) || (e = b(c.match(/Version\/([^ ]+) Safari/))) || (f = b(c.match(/Firefox\/([^ ]+)/))) || (g = a.a.W || b(c.match(/MSIE ([^ ]+)/))) || (g = b(c.match(/rv:([^ )]+)/)));
            }
            if (8 <= g && 10 > g)
              var m = a.a.g.Z(), k = a.a.g.Z(), l2 = function(b2) {
                var c2 = this.activeElement;
                (c2 = c2 && a.a.g.get(c2, k)) && c2(b2);
              }, p = function(b2, c2) {
                var d2 = b2.ownerDocument;
                a.a.g.get(d2, m) || (a.a.g.set(d2, m, true), a.a.B(d2, "selectionchange", l2));
                a.a.g.set(b2, k, c2);
              };
            a.c.textInput = { init: function(b2, c2, k2) {
              function l3(c3, d2) {
                a.a.B(b2, c3, d2);
              }
              function m2() {
                var d2 = a.a.f(c2());
                if (null === d2 || d2 === n)
                  d2 = "";
                L !== n && d2 === L ? a.a.setTimeout(m2, 4) : b2.value !== d2 && (y = true, b2.value = d2, y = false, v2 = b2.value);
              }
              function r2() {
                w2 || (L = b2.value, w2 = a.a.setTimeout(
                  z,
                  4
                ));
              }
              function z() {
                clearTimeout(w2);
                L = w2 = n;
                var d2 = b2.value;
                v2 !== d2 && (v2 = d2, a.m.eb(c2(), k2, "textInput", d2));
              }
              var v2 = b2.value, w2, L, A2 = 9 == a.a.W ? r2 : z, y = false;
              g && l3("keypress", z);
              11 > g && l3("propertychange", function(a2) {
                y || "value" !== a2.propertyName || A2(a2);
              });
              8 == g && (l3("keyup", z), l3("keydown", z));
              p && (p(b2, A2), l3("dragend", r2));
              (!g || 9 <= g) && l3("input", A2);
              5 > e && "textarea" === a.a.R(b2) ? (l3("keydown", r2), l3("paste", r2), l3("cut", r2)) : 11 > d ? l3("keydown", r2) : 4 > f ? (l3("DOMAutoComplete", z), l3("dragdrop", z), l3("drop", z)) : h && "number" === b2.type && l3("keydown", r2);
              l3(
                "change",
                z
              );
              l3("blur", z);
              a.o(m2, null, { l: b2 });
            } };
            a.m.wa.textInput = true;
            a.c.textinput = { preprocess: function(a2, b2, c2) {
              c2("textInput", a2);
            } };
          })();
          a.c.uniqueName = { init: function(b, c) {
            if (c()) {
              var d = "ko_unique_" + ++a.c.uniqueName.rd;
              a.a.Yc(b, d);
            }
          } };
          a.c.uniqueName.rd = 0;
          a.c.using = { init: function(b, c, d, e, f) {
            var g;
            d.has("as") && (g = { as: d.get("as"), noChildContext: d.get("noChildContext") });
            c = f.createChildContext(c, g);
            a.Oa(c, b);
            return { controlsDescendantBindings: true };
          } };
          a.h.ea.using = true;
          a.c.value = { init: function(b, c, d) {
            var e = a.a.R(b), f = "input" == e;
            if (!f || "checkbox" != b.type && "radio" != b.type) {
              var g = [], h = d.get("valueUpdate"), m = false, k = null;
              h && ("string" == typeof h ? g = [h] : g = a.a.wc(h), a.a.Pa(g, "change"));
              var l2 = function() {
                k = null;
                m = false;
                var e2 = c(), f2 = a.w.M(b);
                a.m.eb(e2, d, "value", f2);
              };
              !a.a.W || !f || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete || -1 != a.a.A(g, "propertychange") || (a.a.B(b, "propertychange", function() {
                m = true;
              }), a.a.B(b, "focus", function() {
                m = false;
              }), a.a.B(b, "blur", function() {
                m && l2();
              }));
              a.a.D(g, function(c2) {
                var d2 = l2;
                a.a.Ud(c2, "after") && (d2 = function() {
                  k = a.w.M(b);
                  a.a.setTimeout(l2, 0);
                }, c2 = c2.substring(5));
                a.a.B(b, c2, d2);
              });
              var p;
              p = f && "file" == b.type ? function() {
                var d2 = a.a.f(c());
                null === d2 || d2 === n || "" === d2 ? b.value = "" : a.u.G(l2);
              } : function() {
                var f2 = a.a.f(c()), g2 = a.w.M(b);
                if (null !== k && f2 === k)
                  a.a.setTimeout(p, 0);
                else if (f2 !== g2 || g2 === n)
                  "select" === e ? (g2 = d.get("valueAllowUnset"), a.w.cb(b, f2, g2), g2 || f2 === a.w.M(b) || a.u.G(l2)) : a.w.cb(b, f2);
              };
              if ("select" === e) {
                var q;
                a.i.subscribe(
                  b,
                  a.i.H,
                  function() {
                    q ? d.get("valueAllowUnset") ? p() : l2() : (a.a.B(b, "change", l2), q = a.o(p, null, { l: b }));
                  },
                  null,
                  { notifyImmediately: true }
                );
              } else
                a.a.B(b, "change", l2), a.o(p, null, { l: b });
            } else
              a.ib(b, { checkedValue: c });
          }, update: function() {
          } };
          a.m.wa.value = true;
          a.c.visible = { update: function(b, c) {
            var d = a.a.f(c()), e = "none" != b.style.display;
            d && !e ? b.style.display = "" : !d && e && (b.style.display = "none");
          } };
          a.c.hidden = { update: function(b, c) {
            a.c.visible.update(b, function() {
              return !a.a.f(c());
            });
          } };
          (function(b) {
            a.c[b] = { init: function(c, d, e, f, g) {
              return a.c.event.init.call(this, c, function() {
                var a2 = {};
                a2[b] = d();
                return a2;
              }, e, f, g);
            } };
          })("click");
          a.ca = function() {
          };
          a.ca.prototype.renderTemplateSource = function() {
            throw Error("Override renderTemplateSource");
          };
          a.ca.prototype.createJavaScriptEvaluatorBlock = function() {
            throw Error("Override createJavaScriptEvaluatorBlock");
          };
          a.ca.prototype.makeTemplateSource = function(b, c) {
            if ("string" == typeof b) {
              c = c || w;
              var d = c.getElementById(b);
              if (!d)
                throw Error("Cannot find template with ID " + b);
              return new a.C.F(d);
            }
            if (1 == b.nodeType || 8 == b.nodeType)
              return new a.C.ia(b);
            throw Error("Unknown template type: " + b);
          };
          a.ca.prototype.renderTemplate = function(a2, c, d, e) {
            a2 = this.makeTemplateSource(a2, e);
            return this.renderTemplateSource(a2, c, d, e);
          };
          a.ca.prototype.isTemplateRewritten = function(a2, c) {
            return false === this.allowTemplateRewriting ? true : this.makeTemplateSource(a2, c).data("isRewritten");
          };
          a.ca.prototype.rewriteTemplate = function(a2, c, d) {
            a2 = this.makeTemplateSource(a2, d);
            c = c(a2.text());
            a2.text(c);
            a2.data("isRewritten", true);
          };
          a.b("templateEngine", a.ca);
          a.kc = function() {
            function b(b2, c2, d2, h) {
              b2 = a.m.ac(b2);
              for (var m = a.m.Ra, k = 0; k < b2.length; k++) {
                var l2 = b2[k].key;
                if (Object.prototype.hasOwnProperty.call(
                  m,
                  l2
                )) {
                  var p = m[l2];
                  if ("function" === typeof p) {
                    if (l2 = p(b2[k].value))
                      throw Error(l2);
                  } else if (!p)
                    throw Error("This template engine does not support the '" + l2 + "' binding within its templates");
                }
              }
              d2 = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.m.vb(b2, { valueAccessors: true }) + " } })()},'" + d2.toLowerCase() + "')";
              return h.createJavaScriptEvaluatorBlock(d2) + c2;
            }
            var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
            return { xd: function(b2, c2, d2) {
              c2.isTemplateRewritten(b2, d2) || c2.rewriteTemplate(b2, function(b3) {
                return a.kc.Ld(b3, c2);
              }, d2);
            }, Ld: function(a2, f) {
              return a2.replace(c, function(a3, c2, d2, e, l2) {
                return b(l2, c2, d2, f);
              }).replace(d, function(a3, c2) {
                return b(c2, "<!-- ko -->", "#comment", f);
              });
            }, md: function(b2, c2) {
              return a.aa.Xb(function(d2, h) {
                var m = d2.nextSibling;
                m && m.nodeName.toLowerCase() === c2 && a.ib(m, b2, h);
              });
            } };
          }();
          a.b("__tr_ambtns", a.kc.md);
          (function() {
            a.C = {};
            a.C.F = function(b2) {
              if (this.F = b2) {
                var c2 = a.a.R(b2);
                this.ab = "script" === c2 ? 1 : "textarea" === c2 ? 2 : "template" == c2 && b2.content && 11 === b2.content.nodeType ? 3 : 4;
              }
            };
            a.C.F.prototype.text = function() {
              var b2 = 1 === this.ab ? "text" : 2 === this.ab ? "value" : "innerHTML";
              if (0 == arguments.length)
                return this.F[b2];
              var c2 = arguments[0];
              "innerHTML" === b2 ? a.a.fc(this.F, c2) : this.F[b2] = c2;
            };
            var b = a.a.g.Z() + "_";
            a.C.F.prototype.data = function(c2) {
              if (1 === arguments.length)
                return a.a.g.get(this.F, b + c2);
              a.a.g.set(this.F, b + c2, arguments[1]);
            };
            var c = a.a.g.Z();
            a.C.F.prototype.nodes = function() {
              var b2 = this.F;
              if (0 == arguments.length) {
                var e = a.a.g.get(b2, c) || {}, f = e.lb || (3 === this.ab ? b2.content : 4 === this.ab ? b2 : n);
                if (!f || e.jd) {
                  var g = this.text();
                  g && g !== e.bb && (f = a.a.Md(g, b2.ownerDocument), a.a.g.set(b2, c, { lb: f, bb: g, jd: true }));
                }
                return f;
              }
              e = arguments[0];
              this.ab !== n && this.text("");
              a.a.g.set(b2, c, { lb: e });
            };
            a.C.ia = function(a2) {
              this.F = a2;
            };
            a.C.ia.prototype = new a.C.F();
            a.C.ia.prototype.constructor = a.C.ia;
            a.C.ia.prototype.text = function() {
              if (0 == arguments.length) {
                var b2 = a.a.g.get(this.F, c) || {};
                b2.bb === n && b2.lb && (b2.bb = b2.lb.innerHTML);
                return b2.bb;
              }
              a.a.g.set(
                this.F,
                c,
                { bb: arguments[0] }
              );
            };
            a.b("templateSources", a.C);
            a.b("templateSources.domElement", a.C.F);
            a.b("templateSources.anonymousTemplate", a.C.ia);
          })();
          (function() {
            function b(b2, c2, d2) {
              var e2;
              for (c2 = a.h.nextSibling(c2); b2 && (e2 = b2) !== c2; )
                b2 = a.h.nextSibling(e2), d2(e2, b2);
            }
            function c(c2, d2) {
              if (c2.length) {
                var e2 = c2[0], f2 = c2[c2.length - 1], g2 = e2.parentNode, h2 = a.ga.instance, m2 = h2.preprocessNode;
                if (m2) {
                  b(e2, f2, function(a2, b2) {
                    var c3 = a2.previousSibling, d3 = m2.call(h2, a2);
                    d3 && (a2 === e2 && (e2 = d3[0] || b2), a2 === f2 && (f2 = d3[d3.length - 1] || c3));
                  });
                  c2.length = 0;
                  if (!e2)
                    return;
                  e2 === f2 ? c2.push(e2) : (c2.push(e2, f2), a.a.Ua(c2, g2));
                }
                b(e2, f2, function(b2) {
                  1 !== b2.nodeType && 8 !== b2.nodeType || a.vc(d2, b2);
                });
                b(e2, f2, function(b2) {
                  1 !== b2.nodeType && 8 !== b2.nodeType || a.aa.cd(b2, [d2]);
                });
                a.a.Ua(c2, g2);
              }
            }
            function d(a2) {
              return a2.nodeType ? a2 : 0 < a2.length ? a2[0] : null;
            }
            function e(b2, e2, f2, h2, m2) {
              m2 = m2 || {};
              var n2 = (b2 && d(b2) || f2 || {}).ownerDocument, B = m2.templateEngine || g;
              a.kc.xd(f2, B, n2);
              f2 = B.renderTemplate(f2, h2, m2, n2);
              if ("number" != typeof f2.length || 0 < f2.length && "number" != typeof f2[0].nodeType)
                throw Error("Template engine must return an array of DOM nodes");
              n2 = false;
              switch (e2) {
                case "replaceChildren":
                  a.h.va(
                    b2,
                    f2
                  );
                  n2 = true;
                  break;
                case "replaceNode":
                  a.a.Xc(b2, f2);
                  n2 = true;
                  break;
                case "ignoreTargetNode":
                  break;
                default:
                  throw Error("Unknown renderMode: " + e2);
              }
              n2 && (c(f2, h2), m2.afterRender && a.u.G(m2.afterRender, null, [f2, h2[m2.as || "$data"]]), "replaceChildren" == e2 && a.i.ma(b2, a.i.H));
              return f2;
            }
            function f(b2, c2, d2) {
              return a.O(b2) ? b2() : "function" === typeof b2 ? b2(c2, d2) : b2;
            }
            var g;
            a.gc = function(b2) {
              if (b2 != n && !(b2 instanceof a.ca))
                throw Error("templateEngine must inherit from ko.templateEngine");
              g = b2;
            };
            a.dc = function(b2, c2, h2, m2, t) {
              h2 = h2 || {};
              if ((h2.templateEngine || g) == n)
                throw Error("Set a template engine before calling renderTemplate");
              t = t || "replaceChildren";
              if (m2) {
                var x = d(m2);
                return a.$(function() {
                  var g2 = c2 && c2 instanceof a.fa ? c2 : new a.fa(c2, null, null, null, { exportDependencies: true }), n2 = f(b2, g2.$data, g2), g2 = e(m2, t, n2, g2, h2);
                  "replaceNode" == t && (m2 = g2, x = d(m2));
                }, null, { Sa: function() {
                  return !x || !a.a.Sb(x);
                }, l: x && "replaceNode" == t ? x.parentNode : x });
              }
              return a.aa.Xb(function(d2) {
                a.dc(b2, c2, h2, d2, "replaceNode");
              });
            };
            a.Qd = function(b2, d2, g2, h2, m2) {
              function x(b3, c2) {
                a.u.G(a.a.ec, null, [h2, b3, u, g2, r2, c2]);
                a.i.ma(h2, a.i.H);
              }
              function r2(a2, b3) {
                c(b3, v2);
                g2.afterRender && g2.afterRender(b3, a2);
                v2 = null;
              }
              function u(a2, c2) {
                v2 = m2.createChildContext(a2, { as: z, noChildContext: g2.noChildContext, extend: function(a3) {
                  a3.$index = c2;
                  z && (a3[z + "Index"] = c2);
                } });
                var d3 = f(b2, a2, v2);
                return e(h2, "ignoreTargetNode", d3, v2, g2);
              }
              var v2, z = g2.as, w2 = false === g2.includeDestroyed || a.options.foreachHidesDestroyed && !g2.includeDestroyed;
              if (w2 || g2.beforeRemove || !a.Pc(d2))
                return a.$(function() {
                  var b3 = a.a.f(d2) || [];
                  "undefined" == typeof b3.length && (b3 = [b3]);
                  w2 && (b3 = a.a.jb(b3, function(b4) {
                    return b4 === n || null === b4 || !a.a.f(b4._destroy);
                  }));
                  x(b3);
                }, null, { l: h2 });
              x(d2.v());
              var A2 = d2.subscribe(function(a2) {
                x(d2(), a2);
              }, null, "arrayChange");
              A2.l(h2);
              return A2;
            };
            var h = a.a.g.Z(), m = a.a.g.Z();
            a.c.template = { init: function(b2, c2) {
              var d2 = a.a.f(c2());
              if ("string" == typeof d2 || "name" in d2)
                a.h.Ea(b2);
              else if ("nodes" in d2) {
                d2 = d2.nodes || [];
                if (a.O(d2))
                  throw Error('The "nodes" option must be a plain, non-observable array.');
                var e2 = d2[0] && d2[0].parentNode;
                e2 && a.a.g.get(e2, m) || (e2 = a.a.Yb(d2), a.a.g.set(e2, m, true));
                new a.C.ia(b2).nodes(e2);
              } else if (d2 = a.h.childNodes(b2), 0 < d2.length)
                e2 = a.a.Yb(d2), new a.C.ia(b2).nodes(e2);
              else
                throw Error("Anonymous template defined, but no template content was provided");
              return { controlsDescendantBindings: true };
            }, update: function(b2, c2, d2, e2, f2) {
              var g2 = c2();
              c2 = a.a.f(g2);
              d2 = true;
              e2 = null;
              "string" == typeof c2 ? c2 = {} : (g2 = "name" in c2 ? c2.name : b2, "if" in c2 && (d2 = a.a.f(c2["if"])), d2 && "ifnot" in c2 && (d2 = !a.a.f(c2.ifnot)), d2 && !g2 && (d2 = false));
              "foreach" in c2 ? e2 = a.Qd(g2, d2 && c2.foreach || [], c2, b2, f2) : d2 ? (d2 = f2, "data" in c2 && (d2 = f2.createChildContext(c2.data, { as: c2.as, noChildContext: c2.noChildContext, exportDependencies: true })), e2 = a.dc(g2, d2, c2, b2)) : a.h.Ea(b2);
              f2 = e2;
              (c2 = a.a.g.get(b2, h)) && "function" == typeof c2.s && c2.s();
              a.a.g.set(b2, h, !f2 || f2.ja && !f2.ja() ? n : f2);
            } };
            a.m.Ra.template = function(b2) {
              b2 = a.m.ac(b2);
              return 1 == b2.length && b2[0].unknown || a.m.Id(b2, "name") ? null : "This template engine does not support anonymous templates nested within its templates";
            };
            a.h.ea.template = true;
          })();
          a.b("setTemplateEngine", a.gc);
          a.b("renderTemplate", a.dc);
          a.a.Kc = function(a2, c, d) {
            if (a2.length && c.length) {
              var e, f, g, h, m;
              for (e = f = 0; (!d || e < d) && (h = a2[f]); ++f) {
                for (g = 0; m = c[g]; ++g)
                  if (h.value === m.value) {
                    h.moved = m.index;
                    m.moved = h.index;
                    c.splice(g, 1);
                    e = g = 0;
                    break;
                  }
                e += g;
              }
            }
          };
          a.a.Pb = function() {
            function b(b2, d, e, f, g) {
              var h = Math.min, m = Math.max, k = [], l2, p = b2.length, q, n2 = d.length, r2 = n2 - p || 1, v2 = p + n2 + 1, u, w2, z;
              for (l2 = 0; l2 <= p; l2++)
                for (w2 = u, k.push(u = []), z = h(n2, l2 + r2), q = m(0, l2 - 1); q <= z; q++)
                  u[q] = q ? l2 ? b2[l2 - 1] === d[q - 1] ? w2[q - 1] : h(w2[q] || v2, u[q - 1] || v2) + 1 : q + 1 : l2 + 1;
              h = [];
              m = [];
              r2 = [];
              l2 = p;
              for (q = n2; l2 || q; )
                n2 = k[l2][q] - 1, q && n2 === k[l2][q - 1] ? m.push(h[h.length] = { status: e, value: d[--q], index: q }) : l2 && n2 === k[l2 - 1][q] ? r2.push(h[h.length] = { status: f, value: b2[--l2], index: l2 }) : (--q, --l2, g.sparse || h.push({ status: "retained", value: d[q] }));
              a.a.Kc(r2, m, !g.dontLimitMoves && 10 * p);
              return h.reverse();
            }
            return function(a2, d, e) {
              e = "boolean" === typeof e ? { dontLimitMoves: e } : e || {};
              a2 = a2 || [];
              d = d || [];
              return a2.length < d.length ? b(a2, d, "added", "deleted", e) : b(d, a2, "deleted", "added", e);
            };
          }();
          a.b("utils.compareArrays", a.a.Pb);
          (function() {
            function b(b2, c2, d2, h, m) {
              var k = [], l2 = a.$(function() {
                var l3 = c2(d2, m, a.a.Ua(k, b2)) || [];
                0 < k.length && (a.a.Xc(k, l3), h && a.u.G(h, null, [d2, l3, m]));
                k.length = 0;
                a.a.Nb(k, l3);
              }, null, { l: b2, Sa: function() {
                return !a.a.kd(k);
              } });
              return { Y: k, $: l2.ja() ? l2 : n };
            }
            var c = a.a.g.Z(), d = a.a.g.Z();
            a.a.ec = function(e, f, g, h, m, k) {
              function l2(b2) {
                y = { Aa: b2, pb: a.ta(w2++) };
                v2.push(y);
                r2 || F2.push(y);
              }
              function p(b2) {
                y = t[b2];
                w2 !== y.pb.v() && D2.push(y);
                y.pb(w2++);
                a.a.Ua(y.Y, e);
                v2.push(y);
              }
              function q(b2, c2) {
                if (b2)
                  for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                    a.a.D(c2[d2].Y, function(a2) {
                      b2(a2, d2, c2[d2].Aa);
                    });
              }
              f = f || [];
              "undefined" == typeof f.length && (f = [f]);
              h = h || {};
              var t = a.a.g.get(e, c), r2 = !t, v2 = [], u = 0, w2 = 0, z = [], A2 = [], C2 = [], D2 = [], F2 = [], y, I2 = 0;
              if (r2)
                a.a.D(f, l2);
              else {
                if (!k || t && t._countWaitingForRemove) {
                  var E = a.a.Mb(t, function(a2) {
                    return a2.Aa;
                  });
                  k = a.a.Pb(E, f, { dontLimitMoves: h.dontLimitMoves, sparse: true });
                }
                for (var E = 0, G2, H2, K2; G2 = k[E]; E++)
                  switch (H2 = G2.moved, K2 = G2.index, G2.status) {
                    case "deleted":
                      for (; u < K2; )
                        p(u++);
                      H2 === n && (y = t[u], y.$ && (y.$.s(), y.$ = n), a.a.Ua(y.Y, e).length && (h.beforeRemove && (v2.push(y), I2++, y.Aa === d ? y = null : C2.push(y)), y && z.push.apply(z, y.Y)));
                      u++;
                      break;
                    case "added":
                      for (; w2 < K2; )
                        p(u++);
                      H2 !== n ? (A2.push(v2.length), p(H2)) : l2(G2.value);
                  }
                for (; w2 < f.length; )
                  p(u++);
                v2._countWaitingForRemove = I2;
              }
              a.a.g.set(e, c, v2);
              q(h.beforeMove, D2);
              a.a.D(
                z,
                h.beforeRemove ? a.oa : a.removeNode
              );
              var M, O, P;
              try {
                P = e.ownerDocument.activeElement;
              } catch (N2) {
              }
              if (A2.length)
                for (; (E = A2.shift()) != n; ) {
                  y = v2[E];
                  for (M = n; E; )
                    if ((O = v2[--E].Y) && O.length) {
                      M = O[O.length - 1];
                      break;
                    }
                  for (f = 0; u = y.Y[f]; M = u, f++)
                    a.h.Wb(e, u, M);
                }
              for (E = 0; y = v2[E]; E++) {
                y.Y || a.a.extend(y, b(e, g, y.Aa, m, y.pb));
                for (f = 0; u = y.Y[f]; M = u, f++)
                  a.h.Wb(e, u, M);
                !y.Ed && m && (m(y.Aa, y.Y, y.pb), y.Ed = true, M = y.Y[y.Y.length - 1]);
              }
              P && e.ownerDocument.activeElement != P && P.focus();
              q(h.beforeRemove, C2);
              for (E = 0; E < C2.length; ++E)
                C2[E].Aa = d;
              q(h.afterMove, D2);
              q(h.afterAdd, F2);
            };
          })();
          a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.ec);
          a.ba = function() {
            this.allowTemplateRewriting = false;
          };
          a.ba.prototype = new a.ca();
          a.ba.prototype.constructor = a.ba;
          a.ba.prototype.renderTemplateSource = function(b, c, d, e) {
            if (c = (9 > a.a.W ? 0 : b.nodes) ? b.nodes() : null)
              return a.a.la(c.cloneNode(true).childNodes);
            b = b.text();
            return a.a.ua(b, e);
          };
          a.ba.Ma = new a.ba();
          a.gc(a.ba.Ma);
          a.b("nativeTemplateEngine", a.ba);
          (function() {
            a.$a = function() {
              var a2 = this.Hd = function() {
                if (!v || !v.tmpl)
                  return 0;
                try {
                  if (0 <= v.tmpl.tag.tmpl.open.toString().indexOf("__"))
                    return 2;
                } catch (a3) {
                }
                return 1;
              }();
              this.renderTemplateSource = function(b2, e, f, g) {
                g = g || w;
                f = f || {};
                if (2 > a2)
                  throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
                var h = b2.data("precompiled");
                h || (h = b2.text() || "", h = v.template(null, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), b2.data("precompiled", h));
                b2 = [e.$data];
                e = v.extend({ koBindingContext: e }, f.templateOptions);
                e = v.tmpl(h, b2, e);
                e.appendTo(g.createElement("div"));
                v.fragments = {};
                return e;
              };
              this.createJavaScriptEvaluatorBlock = function(a3) {
                return "{{ko_code ((function() { return " + a3 + " })()) }}";
              };
              this.addTemplate = function(a3, b2) {
                w.write("<script type='text/html' id='" + a3 + "'>" + b2 + "</script>");
              };
              0 < a2 && (v.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, v.tmpl.tag.ko_with = { open: "with($1) {", close: "} " });
            };
            a.$a.prototype = new a.ca();
            a.$a.prototype.constructor = a.$a;
            var b = new a.$a();
            0 < b.Hd && a.gc(b);
            a.b("jqueryTmplTemplateEngine", a.$a);
          })();
        });
      })();
    })();
  }
});

// src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspect.ts
var DatePickerAspect_exports = {};
__export(DatePickerAspect_exports, {
  DatePickerAspect: () => DatePickerAspect
});
module.exports = __toCommonJS(DatePickerAspect_exports);
var import_tempus_dominus = __toESM(require_tempus_dominus());

// src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts
var setting = {
  type: "widget",
  "priority": 6e3,
  "designer": {
    "allowInPortalDesigner": false,
    "allowInSharedoPortalDesigner": false,
    "allowAspectAdapter": true,
    "title": "Date Picker Aspect",
    "icon": "fa-cog",
    "description": "Date Picker Aspect",
    "categories": [],
    "isConfigurable": true,
    "configurationWidget": null,
    "defaultConfigurationJson": {
      "formBuilderField": "eDiscoveryUpdatePlannedDate",
      "title": "Updated planned due date:",
      "pickerEnabled": true,
      "eventToFireOnUpdate": ["IDEAspects.DatePickerAspect.Update"],
      "defaultDateFromNowHours": 24,
      "datePickerOptions": {
        "display": {
          "inline": true,
          "sideBySide": true,
          "theme": "light"
        }
      },
      "debug": {
        "enabled": true,
        "logToConsole": true,
        "showInAspect": true
      }
    }
  },
  "scripts": [],
  "styles": [
    "DatePickerAspect.css"
  ],
  "templates": [
    "DatePickerAspect.html"
  ],
  "menuTemplates": [],
  "components": []
};

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
var ko2 = __toESM(require_knockout_latest());

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/WebBased/Common/EventsHelper.ts
function fireEvent(event) {
  $ui.events.broadcast(event.eventPath, event);
}

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env || "GITEA_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2[IS_EMPTY] ? "" : string;
  }
  let styler = self2[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/Common/StackHelper.ts
function extractLineNumberFromStack(stack) {
  if (!stack)
    return null;
  const stackLines = stack.split("\n");
  const errorLine = stackLines[1] || "";
  const match = errorLine.match(/:(\d+):(\d+)$/);
  return match ? parseInt(match[1]) : null;
}
function extractCallerFromStack(stack) {
  if (!stack)
    return null;
  const stackLines = stack.split("\n");
  const callerLine = stackLines[2] || "";
  const match = callerLine.match(/at ([\w.<>]+)/);
  return match ? match[1] : null;
}

// src/Common/Log.ts
source_default.level = 3;
var defaultMode = source_default.reset;
var lastSec;
function clearSec() {
  if (lastSec?.group) {
    for (let i = 0; i < lastSec?.group; i++) {
      console.groupEnd();
    }
  }
  lastSec = new Section("Root", defaultMode);
}
var Section = class {
  constructor(sectionName, c, section) {
    this.indent = 0;
    this.indentPad = "";
    this.group = 0;
    this.c = c;
    this.sectionName = sectionName;
    if (section) {
      this.indent = section.indent + 1;
      this.indentPad = "-".repeat(this.indent * 2) + " ";
    }
    lastSec = this;
    this.parent = section;
  }
  log(...args) {
    console.log(defaultMode(args));
  }
  lh1(heading) {
    return lh1(this.indentPad + heading, this);
  }
  lh2(heading) {
    return lh2(this.indentPad + heading, this);
  }
  lh3(heading) {
    return lh3(this.indentPad + heading, this);
  }
  l(...args) {
    return l(this, ...args);
  }
};
function l(...args) {
  let sec = lastSec;
  let firstArg;
  let firstArgModifed;
  args.forEach((arg) => {
    if (arg instanceof Section) {
      sec = arg;
    }
    if (!firstArg && arg.constructor.name === "String") {
      firstArg = args.shift();
    }
  });
  args = args.filter((arg) => {
    return !(arg instanceof Section);
  });
  let c = defaultMode;
  let indentPad = sec?.indentPad || "";
  if (!firstArg) {
    firstArg = "";
  }
  firstArgModifed = firstArg;
  firstArgModifed = indentPad + firstArg;
  let totLen = firstArgModifed.length - firstArgModifed.replace(/\u001b\[.*?m/g, "").length - 2;
  console.log(firstArgModifed);
  args.forEach((arg) => {
    console.log(arg);
  });
}
function logHeadingSection(c, heading, section) {
  let sec = new Section(heading, c, section);
  let time = new Date(Date.now()).toLocaleString();
  let path = "";
  if (section) {
    path = section.sectionName;
    while (section.parent) {
      section = section.parent;
      path = section.sectionName + " -> " + path;
    }
  }
  if (path.length > 0) {
    path += " -> ";
  }
  path += heading;
  console.groupCollapsed(c(path));
  sec.group++;
  return sec;
}
function lh1(heading, section = lastSec) {
  let c = source_default.bgBlack.greenBright.bold;
  return logHeadingSection(c, heading, section);
}
function lh2(heading, section = lastSec) {
  let c = source_default.bgGray.cyanBright.bold;
  return logHeadingSection(c, heading, section);
}
function lh3(heading, section = lastSec) {
  let c = source_default.bgGray.magentaBright.bold;
  return logHeadingSection(c, heading, section);
}
var inf = (text) => {
  let c = source_default.blue.bold;
  return c(text);
};
var wrn = (text) => {
  let c = source_default.yellow.bold;
  return c(text);
};
var err = (text) => {
  let er = new Error();
  let lineNo = extractLineNumberFromStack(er.stack);
  let caller = extractCallerFromStack(er.stack);
  let preText = `[${caller}:${lineNo}]`;
  text = preText + " " + text;
  console.log(er);
  let c = source_default.red.bold;
  return c(text);
};
var nv = (name, value) => {
  return source_default.bgBlueBright(name.padEnd(30, " ")) + " : " + source_default.cyanBright(value);
};
clearSec();

// src/WebBased/IDEAspects/BaseClasses/KOConverter.ts
var ko = __toESM(require_knockout_latest());
function toObservableObject(obj, existing) {
  if (!existing)
    existing = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
      const value = obj[key];
      if (Array.isArray(value)) {
        if (!existing[key]) {
          existing[key] = ko.observableArray(value.map((item) => toObservableObject(item, {})));
        } else {
          existing[key](value.map((item) => toObservableObject(item, {})));
        }
      } else if (value !== null && typeof value === "object") {
        if (!existing[key]) {
          existing[key] = ko.observable(toObservableObject(value, {}));
        } else {
          existing[key](toObservableObject(value, existing[key]()));
        }
      } else {
        if (!existing[key]) {
          existing[key] = ko.observable(value);
        } else {
          existing[key](value);
        }
      }
    }
  }
  return existing;
}

// src/WebBased/Common/ObjectHelper.ts
function setNestedProperty(obj, propertyPath, value) {
  const properties = propertyPath.split(".");
  let current = obj;
  for (let i = 0; i < properties.length - 1; i++) {
    const prop = properties[i];
    if (!current[prop]) {
      current[prop] = {};
    }
    current = current[prop];
  }
  current[properties[properties.length - 1]] = value;
}
function getNestedProperty(obj, propertyPath) {
  l(inf(`getNestedProperty(${propertyPath})`), obj);
  const properties = propertyPath.split(".");
  let current = obj;
  for (const prop of properties) {
    const matches = prop.match(/^([a-zA-Z0-9_]+)\[([0-9]+)\]$/);
    if (matches) {
      const arrayProp = matches[1];
      const index = parseInt(matches[2], 10);
      if (!Array.isArray(current[arrayProp]) || current[arrayProp][index] === void 0) {
        l(err(`getNestedProperty(${propertyPath}): arrayProp or index is undefined`), obj);
        return void 0;
      }
      current = current[arrayProp][index];
    } else if (current[prop] === void 0) {
      l(err(`getNestedProperty(${propertyPath}): prop is undefined`), obj);
      return void 0;
    } else {
      current = current[prop];
    }
  }
  return current;
}

// src/Common/HtmlHelper.ts
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// src/Common/JsonToHTMLConverter.ts
var JsonToHtmlConverter = class {
  static convert(json2) {
    if (json2 == null)
      return this.escapeHtml("<em>null</em>");
    if (typeof json2 !== "object")
      return this.escapeHtml(json2.toString());
    if (Array.isArray(json2)) {
      return this.arrayToHtml(json2);
    } else {
      return this.objectToHtml(json2);
    }
  }
  static arrayToHtml(arr) {
    const itemsHtml = arr.map((item) => `<li>${this.convert(item)}</li>`).join("");
    return `<ul>${itemsHtml}</ul>`;
  }
  static objectToHtml(obj) {
    const propertiesHtml = Object.keys(obj).map((key) => `<li>${this.escapeHtml(key)}: ${this.convert(obj[key])}</li>`).join("");
    return `<ul>${propertiesHtml}</ul>`;
  }
  static escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};
var json = {
  code: "ERROR_CODE",
  message: "Something went wrong",
  details: {
    info: "Detailed information about the error",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    items: [1, 2, 3]
  }
};

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
console.log("v: - 5.27");
var FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
var ERROR_DIV_SELECTOR = "#render-errors-here";
function getFormBuilderFieldPath(formBuilderField) {
  return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
var BaseIDEAspect = class {
  constructor(...arr) {
    this.widgetSettings = this.setWidgetJsonSettings();
    this.thisComponentName = this.setThisComponentName();
    this.defaults = this.setDefaults();
    this.errorDivSelector = ERROR_DIV_SELECTOR;
    this.errors = ko2.observableArray();
    if (arr.length === 0) {
      return;
    }
    if (arr.length === 3) {
      this.uniqueId = v4_default();
      this._initialise(arr[0], arr[1], arr[2]);
      this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
      this.fireEvent("onSetup", this.model);
      this.setup();
      this.fireEvent("afterSetup", this.model);
      this.setupLiveConfig();
      this.setupErrorManager();
      this.addAspectLogOutput();
      return;
    }
  }
  _initialise(element, configuration, baseModel) {
    this.element = element;
    this.originalConfiguration = configuration;
    this.baseModel = baseModel;
    let baseDefaults = {
      debug: {
        enabled: false,
        logToConsole: false,
        showInAspect: false,
        liveConfig: false
      }
    };
    configuration.debug = $.extend(baseDefaults.debug, configuration.debug);
    this.configuration = $.extend(this.defaults, this.originalConfiguration);
    this.model = this.configuration._host.model;
    this.enabled = this.model.canEdit;
    this.blade = this.configuration._host.blade;
    this.loaded = this.loaded || ko2.observable(false);
    this.sharedoId = this.configuration._host?.model.id;
    if (!this.sharedoId || this.sharedoId()) {
      this.log("No sharedoId found");
    }
    this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
    if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
      this.log("No sharedoTypeSystemName found");
    }
    this.options = toObservableObject(this.configuration, this.options);
    this.validation = {};
    this.validationErrorCount = this.validationErrorCount || ko2.observable(0);
    this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
    this.fireEvent("onInitialise", this.model);
  }
  clearErrors() {
    this.errors?.removeAll();
  }
  setupErrorManager() {
    this.l("Setting up error manager");
    this.errors?.subscribe((newValue) => {
      this.inf("Errors changed", newValue);
      this.buildErrorDiv();
    });
  }
  setupLiveConfig() {
    this.options.debug.subscribe((newValue) => {
      if (newValue.liveConfig) {
        this.activateLiveConfig(newValue.liveConfig);
      }
    });
    this.activateLiveConfig(this.options.debug().liveConfig());
  }
  activateLiveConfig(active) {
    if (!active) {
      this.liveConfigDiv?.remove();
      return;
    }
    if (this.liveConfigDiv) {
      return;
    }
    this.l("Setting up live config");
    const serializedData = JSON.stringify(this.configuration, (key, value) => {
      if (key === "_host") {
        return void 0;
      }
      return value;
    }, 4);
    let config = ko2.observable(serializedData);
    this.liveConfigData = {
      config
    };
    let timeout = false;
    this.liveConfigDiv = this.createLiveConfigDiv();
    this.element.prepend(this.liveConfigDiv);
    setTimeout(() => {
      config.subscribe((newValue) => {
        if (timeout) {
          return;
        }
        setTimeout(() => {
          timeout = false;
          let newConfig = JSON.parse(config());
          this._initialise(this.element, newConfig, this.baseModel);
          this.reset(newConfig);
        }, 500);
        timeout = true;
      });
    }, 3e3);
  }
  ensureStylesLoaded(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    }
  }
  createLiveConfigDiv() {
    const outerDiv = document.createElement("div");
    outerDiv.className = "col-sm-12 formbuilder-editor-json";
    const innerDiv = document.createElement("div");
    innerDiv.id = "liveConfig";
    innerDiv.className = "form-control textarea";
    innerDiv.style.height = "300px";
    innerDiv.setAttribute("data-bind", "syntaxEditor: liveConfigData.config");
    outerDiv.appendChild(innerDiv);
    return outerDiv;
  }
  get data() {
    if (this.LocationToSaveOrLoadData === void 0) {
      this.log("No location to load data from set - this method should be overriden", "red");
      return this._data;
    }
    let nestedData = getNestedProperty(this.model, this.LocationToSaveOrLoadData);
    this.log("Data found at location", "green", nestedData);
    let retValue = ko2.toJS(nestedData);
    this.log("Data found at location", "green", retValue);
    return retValue;
  }
  buildErrorDiv() {
    this.inf("Building error div");
    let errorDiv = this.element.querySelector(this.errorDivSelector);
    if (!errorDiv) {
      return;
    }
    l("errorDiv.innerHTML");
    errorDiv.innerHTML = "";
    if (!this.errors) {
      this.errors = ko2.observableArray();
    }
    if (this.errors().length === 0) {
      return;
    }
    let errorContainerDiv = document.createElement("div");
    errorDiv.appendChild(errorContainerDiv);
    errorContainerDiv.className = "ide-aspect-error-container";
    let titleDiv = document.createElement("div");
    titleDiv.className = "ide-aspect-error-title";
    titleDiv.innerText = "There has been an error:";
    errorContainerDiv.appendChild(titleDiv);
    let foreachDiv = document.createElement("div");
    errorContainerDiv.appendChild(foreachDiv);
    this.errors().forEach((error) => {
      let userMessageDiv = document.createElement("div");
      userMessageDiv.className = "ide-aspect-error-user-message";
      userMessageDiv.innerHTML = error.userMessage;
      userMessageDiv.onclick = () => {
        let detailedMessageDiv = document.createElement("div");
        detailedMessageDiv.className = "ide-aspect-error-detailed-message";
        const code = escapeHtml(error.code || "");
        const message = escapeHtml(error.message || "");
        const userMessage = escapeHtml(error.userMessage || "");
        const errorStack = escapeHtml(error.errorStack || "");
        const additionalInfo = JsonToHtmlConverter.convert(error.additionalInfo || {});
        const html = `
                            <div>
                            <h2>Error: ${code}</h2>
                            <p><strong>Message:</strong> ${message}</p>
                            <p><strong>User Message:</strong> ${userMessage}</p>
                            <p><strong>Stack:</strong> ${errorStack}</p>
                            <p><strong>Additional Info:</strong> ${additionalInfo}</p>
                            </div>`;
        detailedMessageDiv.innerHTML = html;
        $ui.errorDialog(detailedMessageDiv);
      };
      foreachDiv.appendChild(userMessageDiv);
      if (error.suggestions && error.suggestions.length > 0) {
        let suggestionsDiv = document.createElement("div");
        suggestionsDiv.className = "ide-aspect-error-suggestions";
        suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
        foreachDiv.appendChild(suggestionsDiv);
      }
      if (error.actions && error.actions.length > 0) {
        let actionsDiv = document.createElement("div");
        actionsDiv.className = "ide-aspect-error-actions";
        actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
        foreachDiv.appendChild(actionsDiv);
      }
      if (error.internalSuggestions && error.internalSuggestions.length > 0) {
        let internalSuggestionsDiv = document.createElement("div");
        internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
        internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
        foreachDiv.appendChild(internalSuggestionsDiv);
      }
    });
    if (this.options.debug().supportRequestEnabled) {
      let actionDiv = document.createElement("div");
      actionDiv.className = "ide-aspect-error-support-action";
      errorContainerDiv.appendChild(actionDiv);
      let button = document.createElement("button");
      button.className = "btn btn-primary";
      button.innerText = "Create Support Task";
      actionDiv.appendChild(button);
    }
  }
  set data(value) {
    if (this.LocationToSaveOrLoadData === void 0) {
      this.log("No location to save data to set - this method should be overriden", "red");
      this._data = value;
      return;
    }
    let valueToSet = value;
    this.log("Setting data at location", "green", valueToSet);
    setNestedProperty(this.model, this.LocationToSaveOrLoadData, valueToSet);
    this.fireEvent("onDataChanged", this.model);
  }
  // abstract setDependantScriptFiles(): string[];
  // abstract setDependantStyleFiles(): string[];
  // abstract setDependantTemplateFiles(): string[];
  // abstract setDependantMenuTemplateFiles(): string[];
  // abstract setDependantComponentFiles(): string[];
  // abstract setWidgetDesignerSettings(): IWidgetJsonDesigner;
  // abstract setPriority() : number;
  /**
   * Called by the aspect IDE adapter when the model is saved. Manipulate the
   * model as required.
   */
  onSave(model) {
    this.fireEvent("onSave", model);
    this.log("Saving, model passed in we need to persist to", "green", this.data);
    if (this.LocationToSaveOrLoadData === void 0) {
      this.log("No location to save data to set - this method should be overriden", "red");
      return;
    }
    let dataToPersist = this.data;
    let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
    if (currentData) {
      this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
    }
    if (!currentData) {
    }
    this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
    setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);
  }
  onDestroy(model) {
    this.log("IDEAspects.Example : onDestroy");
    this.fireEvent("onDestroy", model);
  }
  /**
   * Called by the UI framework after initial creation and binding to load data
   * into it's model
   */
  loadAndBind() {
    this.log("IDEAspects.Example : loadAndBind");
    this.log("Loading data (model:any) passed in", "green");
    this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
    this.fireEvent("onLoad", this.model);
  }
  /**
   * Called by the aspect IDE adapter before the model is saved
   */
  onBeforeSave(model) {
    this.log("IDEAspects.Example : onBeforeSave");
    this.fireEvent("onBeforeSave", model);
  }
  /**
   * Called by the aspect IDE adapter after the model has been saved.
   */
  onAfterSave(model) {
    this.log("IDEAspects.Example : onAfterSave");
    this.fireEvent("onAfterSave", model);
  }
  /**
   * Called by the aspect IDE adapter when it reloads aspect data
   */
  onReload(model) {
    this.log("IDEAspects.Example : onReload");
    this.fireEvent("onReload", model);
  }
  /**
   * Provides logging for the component based on the debug configuration
   * @param message 
   * @param color 
   * @param data 
   */
  log(message, color, data) {
    if (this.configuration.debug?.enabled) {
      if (this.configuration.debug.logToConsole) {
        if (!color)
          color = "black";
        console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
      }
    }
  }
  canLog() {
    return this.configuration.debug?.enabled;
  }
  logToConsole() {
    return this.canLog() && this.configuration.debug?.logToConsole;
  }
  logToAspect() {
    return this.canLog() && this.configuration.debug?.showInAspect;
  }
  inf(message, ...args) {
    if (this.logToConsole()) {
      l(inf(message), ...args);
    }
  }
  wrn(message, ...args) {
    if (this.logToConsole()) {
      l(wrn(message), ...args);
    }
  }
  err(message, ...args) {
    if (this.logToConsole()) {
      l(err(message), ...args);
    }
  }
  nv(name, value) {
    if (this.logToConsole()) {
      l(nv(name, value));
    }
  }
  lh1(message, ...args) {
    if (this.logToConsole()) {
      l(lh1(message), ...args);
    }
  }
  clearSec() {
    clearSec();
  }
  l(message, ...args) {
    if (this.logToConsole()) {
      l(message, ...args);
    }
    if (this.logToAspect()) {
      let aspectLogOutput = this.aspectLogOutput;
      if (aspectLogOutput) {
        aspectLogOutput.innerText += `${message}
`;
      }
    }
  }
  addAspectLogOutput() {
    if (!this.logToAspect()) {
      return;
    }
    ;
    this.aspectLogOutput = document.createElement("div");
    let aspectLogOutput = this.aspectLogOutput;
    aspectLogOutput.id = `aspectLogOutput-${this.uniqueId}`;
    aspectLogOutput.style.border = "1px solid black";
    aspectLogOutput.style.padding = "5px";
    aspectLogOutput.style.margin = "5px";
    aspectLogOutput.style.height = "200px";
    aspectLogOutput.style.overflow = "auto";
    aspectLogOutput.style.backgroundColor = "white";
    aspectLogOutput.style.color = "black";
    aspectLogOutput.style.fontSize = "10px";
    aspectLogOutput.style.fontFamily = "monospace";
    aspectLogOutput.style.whiteSpace = "pre-wrap";
    aspectLogOutput.style.wordWrap = "break-word";
    aspectLogOutput.style.display = "none";
    aspectLogOutput.style.position = "relative";
    aspectLogOutput.style.zIndex = "1000";
    aspectLogOutput.style.bottom = "0px";
    aspectLogOutput.style.left = "0px";
    aspectLogOutput.style.right = "0px";
    aspectLogOutput.style.marginLeft = "auto";
    aspectLogOutput.style.marginRight = "auto";
    aspectLogOutput.style.marginBottom = "auto";
    aspectLogOutput.style.marginTop = "auto";
    aspectLogOutput.style.backgroundColor = "rgba(255,255,255,0.8)";
    aspectLogOutput.style.borderRadius = "5px";
    aspectLogOutput.style.padding = "5px";
    aspectLogOutput.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";
    this.element.prepend(aspectLogOutput);
  }
  fireEvent(eventName, data) {
    let event = {
      eventPath: this.thisComponentName + "." + eventName,
      eventName,
      source: this,
      data
    };
    fireEvent(event);
  }
  /**
   * 
   * @returns Formbuild if it exists or creates it if it does not
   * 
   */
  formbuilder() {
    if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
      this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
    } else {
      this.log("blade.model.aspectData.formBuilder.formData found", "green");
    }
    this.blade = this.blade || {};
    return this.ensureFormbuilder(this.blade.model);
  }
  /**
   * Ensures there is a form builder in the passed in model and returns it
   * @param model 
   * @returns 
   */
  ensureFormbuilder(model) {
    if (!model?.aspectData?.formBuilder?.formData) {
      this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
    } else {
      this.log("blade.model.aspectData.formBuilder.formData found", "green");
    }
    model = model || {};
    model.aspectData = model.aspectData || {};
    model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };
    return model.aspectData.formBuilder.formData;
  }
  formbuilderField(formbuilderField, setValue) {
    if (!this.formbuilder()) {
      this.log("Form builder does not exist! ", "red");
      throw new Error("Form builder does not exist!");
    }
    let foundValue = this.formbuilder()[formbuilderField];
    if (!foundValue) {
      this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
      this.log(`Creating field ${formbuilderField} `, "blue");
      this.formbuilder()[formbuilderField] = void 0;
    }
    if (setValue) {
      this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
      this.formbuilder()[formbuilderField] = setValue;
      return setValue;
    }
    return foundValue;
  }
};

// src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspect.ts
var DatePickerAspect = class extends BaseIDEAspect {
  refresh(newConfig) {
  }
  reset(newConfig) {
  }
  // constructor(element: HTMLElement, configuration: IDatePickerAspectOptions, baseModel: any) {
  //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
  // }
  //Abstract methods - must be implemented by the derived class
  setThisComponentName() {
    return "DatePickerAspect";
  }
  setup() {
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);
  }
  setWidgetJsonSettings() {
    return setting;
  }
  setDefaults() {
    return {
      // Aspect widget config parameters
      title: void 0,
      formBuilderField: void 0,
      pickerEnabled: true,
      eventToFireOnUpdate: ["IDEAspects.DatePickerAspect.Update"],
      defaultDateFromNowHours: 3,
      datePickerOptions: {
        display: {
          inline: true,
          sideBySide: true,
          theme: "light"
        }
      },
      debug: {
        enabled: false,
        logToConsole: false,
        showInAspect: false
      },
      eventsToReactTo: []
    };
  }
  //Abstract methods - must be implemented by the derived class
  setLocationOfDataToLoadAndSave() {
    if (!this.configuration.formBuilderField) {
      this.log("No formbuilder field set in configuration - check aspect configuration", "red");
      throw new Error("No formbuilder field set in configuration - check aspect configuration");
    }
    return getFormBuilderFieldPath(this.configuration.formBuilderField);
  }
  setPickerEnabledState(newValue) {
    if (!this.datePickerDiv) {
      return;
    }
    if (newValue) {
      this.datePickerDiv.classList.toggle("disabled", false);
    } else {
      this.datePickerDiv.classList.toggle("disabled", true);
    }
  }
  /**
   * Sanatise the data before saving, form build data needs to be a string
   */
  set modelDataAsDate(newValue) {
    this.data = newValue?.toISOString() || void 0;
  }
  /**
   * Gets the data from form builder and converts to DateTime
   */
  get modelDataAsDate() {
    let retValue;
    let foundValue = this.data;
    if (!foundValue) {
      foundValue = this.generateDefaultDate();
    }
    retValue = this.ensureDate(foundValue);
    this.modelDataAsDate = retValue;
    return retValue;
  }
  /**
   * @returns get today date + defaultDateFromNowHours (if set in configuration)
   */
  generateDefaultDate() {
    let defaultDate = new import_tempus_dominus.DateTime(import_tempus_dominus.DateTime.now());
    if (this.configuration.defaultDateFromNowHours) {
      defaultDate.setHours(defaultDate.getHours() + this.configuration.defaultDateFromNowHours);
    }
    return defaultDate;
  }
  /**
   * Called by the UI framework after initial creation and binding to load data
   * into it's model
   */
  loadAndBind() {
    if (this.element === void 0) {
      return;
    }
    let element = this.element.querySelector(".IDEAspects-DatePickerAspect");
    if (!element) {
      this.log("No element found", "red");
      return;
    }
    if (this.datePickerDiv) {
      this.log("Already exists", "red");
      this.datePickerDiv.remove();
      return;
    }
    this.datePickerDiv = document.createElement("div");
    this.datePickerDiv.classList.add("the-picker");
    this.datePickerDiv.classList.add("log-event");
    this.datePickerDiv.id = this.uniqueId;
    let input = document.createElement("input");
    input.id = this.uniqueId + "Input";
    input.type = "text";
    input.classList.add("form-control");
    input.setAttribute("data-td-target", "#" + this.uniqueId);
    this.datePickerDiv.appendChild(input);
    element.appendChild(this.datePickerDiv);
    this.dateTimePicker = new import_tempus_dominus.TempusDominus(this.datePickerDiv, this.configuration.datePickerOptions || {});
    this.options.datePickerOptions.subscribe((newValue) => {
      this.loadAndBind();
    });
    this.setPickerEnabledState(this.options.pickerEnabled());
    this.dateTimePicker.dates.setValue(
      this.modelDataAsDate,
      this.dateTimePicker.dates.lastPickedIndex
    );
    this.dateTimePicker.subscribe("change.td", (e) => {
      this.log("Date Changed", "red", e);
      this.options.eventToFireOnUpdate()?.forEach((event) => {
        $ui.events.broadcast(
          event,
          {
            source: this,
            formbuilderField: this.formbuilderField,
            value: this.getCurrentSelectedDate()
          }
        );
      });
      this.modelDataAsDate = this.getCurrentSelectedDate();
    });
  }
  /**
   * Ensure the date is a valid date
      * @param d
      * @returns a DateTime based on the input or a default date if the input is not valid
  **/
  ensureDate(d) {
    let retValue;
    if (d instanceof import_tempus_dominus.DateTime) {
      return d;
    }
    try {
      retValue = new import_tempus_dominus.DateTime(import_tempus_dominus.DateTime.parse(d));
      if (!import_tempus_dominus.DateTime.isValid(retValue)) {
        retValue = this.generateDefaultDate();
        ;
      }
    } catch (e) {
      this.log(`Unable to parse date ${d} (setting date to default date) - check aspect configuration `, "red");
      retValue = this.generateDefaultDate();
    }
    return retValue;
  }
  load(model) {
    this.log("Load");
  }
  reload(model) {
    this.log("Reload");
  }
  getCurrentSelectedDate() {
    return this.dateTimePicker?.dates.picked[0];
  }
  onSave(model) {
    this.log("Save");
    this.modelDataAsDate = this.getCurrentSelectedDate();
    super.onSave(model);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePickerAspect
});
/*! Bundled license information:

@eonasdan/tempus-dominus/dist/js/tempus-dominus.js:
  (*!
    * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
    * Copyright 2013-2023 Jonathan Peterson
    * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
    *)

knockout/build/output/knockout-latest.js:
  (*!
   * Knockout JavaScript library v3.5.1
   * (c) The Knockout.js team - http://knockoutjs.com/
   * License: MIT (http://www.opensource.org/licenses/mit-license.php)
   *)
*/
