import React, { Fragment, Component } from 'react';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { partition, hierarchy } from 'd3-hierarchy';
import { arc } from 'd3-shape';
import { radiansToDegrees, midAngle, positionFromAngle, noop, withTheme, withDimensions, getAccessorFor, getLabelGenerator, Container, SvgWrapper, ResponsiveWrapper } from '@nivo/core';
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors';
import { BasicTooltip } from '@nivo/tooltip';

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
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
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;
    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

var sliceStyle = {
  pointerEvents: 'none'
};
var SunburstLabels = function (_Component) {
  _inherits(SunburstLabels, _Component);
  var _super = _createSuper(SunburstLabels);
  function SunburstLabels() {
    _classCallCheck(this, SunburstLabels);
    return _super.apply(this, arguments);
  }
  _createClass(SunburstLabels, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          nodes = _this$props.nodes,
          label = _this$props.label,
          skipAngle = _this$props.skipAngle,
          textColor = _this$props.textColor,
          theme = _this$props.theme;
      var centerRadius = false;
      return React.createElement(Fragment, null, nodes.filter(function (node) {
        return node.depth === 1;
      }).map(function (node) {
        if (!centerRadius) {
          var innerRadius = Math.sqrt(node.y0);
          var outerRadius = Math.sqrt(node.y1);
          centerRadius = innerRadius + (outerRadius - innerRadius) / 2;
        }
        var startAngle = node.x0;
        var endAngle = node.x1;
        var angle = Math.abs(endAngle - startAngle);
        var angleDeg = radiansToDegrees(angle);
        if (angleDeg <= skipAngle) return null;
        var middleAngle = midAngle({
          startAngle: startAngle,
          endAngle: endAngle
        }) - Math.PI / 2;
        var position = positionFromAngle(middleAngle, centerRadius);
        return React.createElement("g", {
          key: node.data.id,
          transform: "translate(".concat(position.x, ", ").concat(position.y, ")"),
          style: sliceStyle
        }, React.createElement("text", {
          textAnchor: "middle",
          style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
            fill: textColor(node.data, theme)
          })
        }, label(node.data)));
      }));
    }
  }]);
  return SunburstLabels;
}(Component);
SunburstLabels.defaultProps = {
  skipAngle: 0
};

var SunburstArc = function SunburstArc(_ref) {
  var node = _ref.node,
      path = _ref.path,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip,
      tooltip = _ref.tooltip,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave;
  var handleTooltip = function handleTooltip(e) {
    return showTooltip(tooltip, e);
  };
  var handleMouseEnter = function handleMouseEnter(e) {
    onMouseEnter(node.data, e);
    showTooltip(tooltip, e);
  };
  var handleMouseLeave = function handleMouseLeave(e) {
    onMouseLeave(node.data, e);
    hideTooltip(e);
  };
  return React.createElement("path", {
    d: path,
    fill: node.data.color,
    stroke: borderColor,
    strokeWidth: borderWidth,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleTooltip,
    onMouseLeave: handleMouseLeave,
    onClick: onClick
  });
};
var enhance = compose(withPropsOnChange(['node', 'arcGenerator'], function (_ref2) {
  var node = _ref2.node,
      arcGenerator = _ref2.arcGenerator;
  return {
    path: arcGenerator(node)
  };
}), withPropsOnChange(['node', 'onClick'], function (_ref3) {
  var node = _ref3.node,
      _onClick = _ref3.onClick;
  return {
    onClick: function onClick(event) {
      return _onClick(node.data, event);
    }
  };
}), withPropsOnChange(['node', 'theme', 'tooltip', 'tooltipFormat'], function (_ref4) {
  var node = _ref4.node,
      theme = _ref4.theme,
      tooltip = _ref4.tooltip,
      tooltipFormat = _ref4.tooltipFormat;
  return {
    tooltip: React.createElement(BasicTooltip, {
      id: node.data.id,
      value: "".concat(node.data.percentage.toFixed(2), "%"),
      enableChip: true,
      color: node.data.color,
      theme: theme,
      format: tooltipFormat,
      renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread2({}, node.data)) : null
    })
  };
}), pure);
var SunburstArc$1 = enhance(SunburstArc);

var getAncestor = function getAncestor(node) {
  if (node.depth === 1) return node;
  if (node.parent) return getAncestor(node.parent);
  return node;
};
var Sunburst = function Sunburst(_ref) {
  var nodes = _ref.nodes,
      margin = _ref.margin,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      arcGenerator = _ref.arcGenerator,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableSlicesLabels = _ref.enableSlicesLabels,
      getSliceLabel = _ref.getSliceLabel,
      slicesLabelsSkipAngle = _ref.slicesLabelsSkipAngle,
      slicesLabelsTextColor = _ref.slicesLabelsTextColor,
      theme = _ref.theme,
      role = _ref.role,
      isInteractive = _ref.isInteractive,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave;
  return React.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: false
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement(SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      theme: theme,
      role: role
    }, React.createElement("g", {
      transform: "translate(".concat(centerX, ", ").concat(centerY, ")")
    }, nodes.filter(function (node) {
      return node.depth > 0;
    }).map(function (node, i) {
      return React.createElement(SunburstArc$1, {
        key: i,
        node: node,
        arcGenerator: arcGenerator,
        borderWidth: borderWidth,
        borderColor: borderColor,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        theme: theme
      });
    }), enableSlicesLabels && React.createElement(SunburstLabels, {
      nodes: nodes,
      theme: theme,
      label: getSliceLabel,
      skipAngle: slicesLabelsSkipAngle,
      textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'labels.text.fill')
    })));
  });
};
var SunburstDefaultProps = {
  identity: 'id',
  value: 'value',
  cornerRadius: 0,
  colors: {
    scheme: 'nivo'
  },
  borderWidth: 1,
  borderColor: 'white',
  childColor: {
    from: 'color'
  },
  role: 'img',
  enableSlicesLabels: false,
  sliceLabel: 'value',
  slicesLabelsTextColor: 'theme',
  isInteractive: true,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
};
var enhance$1 = compose(defaultProps(SunburstDefaultProps), withTheme(), withDimensions(), withPropsOnChange(['colors'], function (_ref3) {
  var colors = _ref3.colors;
  return {
    getColor: getOrdinalColorScale(colors, 'id')
  };
}), withProps(function (_ref4) {
  var width = _ref4.width,
      height = _ref4.height;
  var radius = Math.min(width, height) / 2;
  var partition$1 = partition().size([2 * Math.PI, radius * radius]);
  return {
    radius: radius,
    partition: partition$1,
    centerX: width / 2,
    centerY: height / 2
  };
}), withPropsOnChange(['cornerRadius'], function (_ref5) {
  var cornerRadius = _ref5.cornerRadius;
  return {
    arcGenerator: arc().startAngle(function (d) {
      return d.x0;
    }).endAngle(function (d) {
      return d.x1;
    }).innerRadius(function (d) {
      return Math.sqrt(d.y0);
    }).outerRadius(function (d) {
      return Math.sqrt(d.y1);
    }).cornerRadius(cornerRadius)
  };
}), withPropsOnChange(['identity'], function (_ref6) {
  var identity = _ref6.identity;
  return {
    getIdentity: getAccessorFor(identity)
  };
}), withPropsOnChange(['value'], function (_ref7) {
  var value = _ref7.value;
  return {
    getValue: getAccessorFor(value)
  };
}), withPropsOnChange(['data', 'getValue'], function (_ref8) {
  var data = _ref8.data,
      getValue = _ref8.getValue;
  return {
    data: hierarchy(data).sum(getValue)
  };
}), withPropsOnChange(['childColor', 'theme'], function (_ref9) {
  var childColor = _ref9.childColor,
      theme = _ref9.theme;
  return {
    getChildColor: getInheritedColorGenerator(childColor, theme)
  };
}), withPropsOnChange(['data', 'partition', 'getIdentity', 'getChildColor'], function (_ref10) {
  var data = _ref10.data,
      partition = _ref10.partition,
      getIdentity = _ref10.getIdentity,
      getColor = _ref10.getColor,
      childColor = _ref10.childColor,
      getChildColor = _ref10.getChildColor;
  var total = data.value;
  var nodes = sortBy(partition(cloneDeep(data)).descendants(), 'depth');
  nodes.forEach(function (node) {
    var ancestor = getAncestor(node).data;
    delete node.children;
    delete node.data.children;
    Object.assign(node.data, {
      id: getIdentity(node.data),
      value: node.value,
      percentage: 100 * node.value / total,
      depth: node.depth,
      ancestor: ancestor
    });
    if (node.depth === 1 || childColor === 'noinherit') {
      node.data.color = getColor(node.data);
    } else if (node.depth > 1) {
      node.data.color = getChildColor(node.parent.data);
    }
  });
  return {
    nodes: nodes
  };
}), withPropsOnChange(['sliceLabel'], function (_ref11) {
  var sliceLabel = _ref11.sliceLabel;
  return {
    getSliceLabel: getLabelGenerator(sliceLabel)
  };
}), pure);
var enhancedSunburst = enhance$1(Sunburst);
enhancedSunburst.displayName = 'Sunburst';

var ResponsiveSunburst = function ResponsiveSunburst(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedSunburst, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { ResponsiveSunburst, enhancedSunburst as Sunburst, SunburstDefaultProps };
//# sourceMappingURL=nivo-sunburst.es.js.map
