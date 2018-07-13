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
    if (childNode.props) {
      let propKey = Object.keys(childNode.props);
      if (propKey.length > 0) {
        newRecurseChild.setAttribute(propKey[0], childNode.props[propKey[0]]);
      }
    }
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

function getDiff(newNode, oldNode) {
  let diff = {};

  // console.log(changed(newNode, oldNode));
  // console.log(newNode.props);
  // console.log(oldNode.props);
  // for(key in newNode.props){
  if (!newNode.props || Object.entries(newNode.props) > 0) {
    diff.props = {};
    let newPropEntries = Object.entries(newNode.props);

    Object.keys(newNode.props).forEach((key) => {
      if (changed(newNode.props[key], oldNode.props[key])) {
        diff.props[key] = newNode.props[key];
      }
      console.log(key);
      // console.log(newNode.props[key], oldNode.props[key]);
      // console.log(changed(newNode.props[key], oldNode.props[key]));
    });
  }

  // }
  // console.log(changed(newNode.props, oldNode.props));

  if (newNode.children && oldNode.children) {
    let iIterator = Math.min(newNode.children.length, oldNode.children.length);
    for (let i = 0; i < iIterator; i++) {
      getDiff(newNode.children[i], oldNode.children[i]);
    }
  }

  // if(newNode.children && oldNode.children){
  //   for(let nIterator = 0; nIterator < newNode.children.length; nIterator++){
  //     for(let oIterator = 0; oIterator < oldNode.children.length; oIterator++){
  //       if(nIterator === oIterator){
  //         diff(newNode.children[nIterator], oldNode.chidlren[oIterator]);
  //       }
  //     }
  //   }
  // }

  return diff;
}

function applyUpdate(target, diff) {
  if (diff.props) {
    for (let key of diff.props) {
      target.setAttribute(key, diff.props[key]);
    }
  }
  if (diff.children) {
    diff.children.forEach((child) => {
      let newChild;
      if (typeof child === "string") {
        newChild = document.createTextNode(child);
      } else {
        newChild = recurse(child);
      }
      target.appendChild(newChild);
    });
  }
  return target;
}

function updateElement(target, newNode, oldNode) {
  // compare newNode to oldNode
  let diff = getDiff(newNode, oldNode);
  // console.log(diff);

  // write differences to newNode
  // applyUpdate(target, diff);

  // append differences to target
  let newElement = createElement("span");
  target.appendChild(newElement);
}

module.exports = {
  createVDOM,
  createElement,
  changed,
  updateElement,
};
