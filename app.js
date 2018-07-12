function createVDOM(type = "", props = {}, ...children) {
  let dummy = {
    type: type,
    props: props,
    children: children,
  };
  return dummy;
}

function createElement(node) {
  let newElement = document.createElement(node.type);
  // let newChild = document.createElement("a");
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      let newChild;
      if (typeof child === "string") {
        newChild = document.createTextNode(child);
      } else {
        newChild = document.createElement(child.type);
      }
      newElement.appendChild(newChild);
    });
  }
  // newElement.appendChild(newChild);
  return newElement;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement(target, newNode, oldNode) {}

module.exports = {
  createVDOM,
  createElement,
  changed,
  updateElement,
};
