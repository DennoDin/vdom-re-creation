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
  let diff = {
    add: {},
    remove: {},
  };

  // TYPE
  if (changed(newNode, oldNode)) {
    console.log("different type, do something!");
  }

  // PROPS
  if (newNode.props && Object.entries(newNode.props).length > 0) {
    diff.add.props = {};
    let newPropEntries = Object.entries(newNode.props);
    // let oldPropEntries

    Object.keys(newNode.props).forEach((key) => {
      if (changed(newNode.props[key], oldNode.props[key])) {
        diff.add.props[key] = newNode.props[key];
      }
    });
  }

  /*
  newNode = 
  child1 div
  child2 a
  child3 span

  oldNode = 
  child1 div
  child2 a
  */

  // CHILDREN
  // if (newNode.children && oldNode.children) {
  //   if (newNode.children.length > oldNode.children.length){
  //     diff.add.children = [];
  //     let extraChildren = newNode.children.length - oldNode.children.length;
  //     for(let i = oldNode.children.length; i < newNode.children.length; i++){
  //       diff.add.children.push(newNode.children[i]);
  //     }
  //     // diff.add.children =
  //     // find out what we need to add.
  //     // figure out where to add it (the different node).
  //   } else if(newNode.children.length < oldNode.children.length){
  //     diff.remove.children = [];
  //     // find out what to remove
  //     // figure out where to remove the node
  //   }

  //   // else

  //   let iIterator = Math.min(newNode.children.length, oldNode.children.length);
  //   for (let i = 0; i < iIterator; i++) {
  //     // if(changed(newNode.children[i], oldNode.children[i])){
  //       diff.add.children.push(getDiff(newNode.children[i], oldNode.children[i]));

  //     // }
  //   }
  // }

  return diff;
}

function applyUpdate(target, diff) {
  if (diff.add.props) {
    for (let key in diff.add.props) {
      target.setAttribute(key, diff.add.props[key]);
    }
  }
  // if (diff.children) {
  //   diff.children.forEach((child, i) => {
  //     let newChild;
  //     if (typeof child === "string") {
  //       newChild = document.createTextNode(child);
  //     } else {
  //       newChild = applyUpdate(target.children[i], child);
  //     }
  //     target.appendChild(newChild);
  //   });
  // }
  return target;
}

function updateElement(target, newNode, oldNode) {
  // compare newNode to oldNode
  let diff = getDiff(newNode, oldNode);
  console.log(JSON.stringify(diff));

  // write differences to newNode
  applyUpdate(target, diff);

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
