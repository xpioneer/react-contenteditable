"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditable = void 0;
var react_1 = __importStar(require("react"));
require("./style.less");
exports.ContentEditable = react_1.forwardRef(function (props, ref) {
    var placeholder = props.placeholder, style = props.style, _a = props.className, className = _a === void 0 ? '' : _a, _b = props.editable, editable = _b === void 0 ? true : _b, _c = props.delimiter, delimiter = _c === void 0 ? '#' : _c, value = props.value, _d = props.keyWords, keyWords = _d === void 0 ? '' : _d, onChange = props.onChange, onKeyWord = props.onKeyWord;
    var editableRef = react_1.createRef();
    var beforeInsertOffsetRef = react_1.useRef(0);
    var curNodeRef = react_1.useRef();
    var enteredRef = react_1.useRef(false);
    var codeRef = react_1.useRef();
    var onInput = function (e) {
        var selection = document.getSelection();
        var currentNode = selection.anchorNode;
        var $ref = editableRef.current;
        var children = $ref.childNodes;
        enteredRef.current = true;
        if (currentNode.nodeType === 3) { // text node
            var nodeVal = currentNode.nodeValue;
            var offset = selection.anchorOffset;
            // save current node & position
            curNodeRef.current = currentNode;
            beforeInsertOffsetRef.current = offset;
            var txt = nodeVal.substring(0, offset);
            onChange && onChange($ref.innerHTML);
            if (txt.endsWith(delimiter) && codeRef.current !== 'Backspace') {
                // fire onKeyWord
                onKeyWord && onKeyWord();
            }
        }
        else if ($ref === currentNode && children.length === 0) {
            onChange && onChange(undefined);
        }
    };
    var onKeyDown = function (e) {
        var code = e.code;
        if (code === 'Enter') {
            e.preventDefault();
            return;
        }
        codeRef.current = code;
        var $ref = editableRef.current, nodes = $ref.childNodes, len = nodes.length;
        var selection = document.getSelection(), offset = selection.anchorOffset, currentNode = nodes[offset];
        if (offset < len && code === 'ArrowRight') {
            e.preventDefault();
            var range = selection.getRangeAt(0);
            range.setStartAfter(currentNode);
        }
    };
    react_1.useEffect(function () {
        if (keyWords && keyWords.length > 0) {
            var vals = [];
            if (typeof keyWords === 'string') {
                vals = [keyWords];
            }
            else {
                vals = keyWords;
            }
            var $ref = editableRef.current;
            var currentNode = curNodeRef.current;
            var nodeVal = currentNode.nodeValue;
            var offset = beforeInsertOffsetRef.current;
            var arr = [], beforeStr = nodeVal.slice(0, offset - 1), afterStr = nodeVal.slice(offset, nodeVal.length);
            var hasTail = false;
            if (beforeStr !== '') {
                arr.push(document.createTextNode(beforeStr));
            }
            var nodes = vals.map(function (v) {
                var node = document.createElement('span');
                node.contentEditable = 'false';
                node.innerText = "#" + v + "#";
                return node;
            });
            arr.splice.apply(arr, __spreadArray([1, 0], nodes));
            if (afterStr !== '') {
                hasTail = true;
                arr.push(document.createTextNode(afterStr));
            }
            var fragment_1 = document.createDocumentFragment();
            arr.forEach(function (n) {
                fragment_1.appendChild(n);
            });
            $ref.insertBefore(fragment_1, currentNode);
            $ref.removeChild(currentNode);
            var range = document.getSelection().getRangeAt(0);
            if (hasTail) {
                range.setStartBefore(arr[arr.length - 1]);
            }
            else {
                range.setStartAfter(arr[arr.length - 1]);
            }
            onChange && onChange($ref.innerHTML);
        }
    }, [keyWords]);
    react_1.useEffect(function () {
        // Trigger only under non-input conditions(use innerHTML)
        if (enteredRef.current === false) {
            editableRef.current.innerHTML = value === undefined ? '' : value;
        }
    }, [value]);
    var $className = className + " editable-area";
    return <div placeholder={placeholder} style={style} contentEditable={editable} className={$className} ref={editableRef} onInput={onInput} onKeyDown={onKeyDown} onPaste={function (e) { return e.preventDefault(); }}></div>;
});
