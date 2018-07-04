function createVDOM(type, props, ...children) {}

function createElement(node) {}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement(target, newNode, oldNode) {}

module.exports = { createVDOM, createElement, changed, updateElement };
