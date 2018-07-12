function createVDOM(type = "", props = {}, ...children) {
  let dummy = {
    type: type,
    props: props,
    children: children,
  };
  return dummy;
}

function createElement(node) {
  function recurse(childNode) {
    let newRecurseChild = document.createElement(childNode.type);
    if (childNode.children && childNode.children.length > 0) {
      childNode.children.forEach((child) => {
        let newChild;
        if (typeof child === "string") {
          newChild = document.createTextNode(child);
        } else {
          newChild = recurse(child);
        }
        newRecurseChild.appendChild(newChild);
      });
    }
    return newRecurseChild;
  }

  let masterElement = recurse(node);
  return masterElement;
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
