function createVDOM(type = "", props = {}, ...children) {
  let dummy = {
    type: type,
    props: props,
    children: children,
  };
  return dummy;
}

function createElement(node) {
  let newChild;
  if (typeof node === "string") {
    newChild = document.createTextNode(node);
  } else {
    newChild = document.createElement(node.type);
    if (node.props && Object.keys(node.props).length > 0) {
      let propKey = Object.keys(node.props);
      if (propKey.length > 0) {
        for (let propItr = 0; propItr < propKey.length; propItr++) {
          newChild.setAttribute(propKey[0], node.props[propKey[0]]);
        }
      }
    }
    if (node.children.length > 0) {
      node.children.forEach((child) => {
        newChild.appendChild(createElement(child));
      });
    }
  }
  return newChild;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement(target, newNode, oldNode) {
  let newChild;
  if (!oldNode || changed(newNode, oldNode)) {
    let parentNode = target.parentNode;
    newChild = createElement(newNode);
    parentNode.appendChild(newChild);
  }
  let htmlChild = target.firstChild;
  for (let childItr = 0; childItr < oldNode.children.length; childItr++) {
    let htmlChildPrev = htmlChild;
    if (htmlChild) {
      htmlChild = htmlChild.nextSibling;
    }
    if (htmlChildPrev) {
      target.removeChild(htmlChildPrev);
    }
  }
  for (let childItr = 0; childItr < newNode.children.length; childItr++) {
    newChild = createElement(newNode.children[childItr]);
    target.appendChild(newChild);
  }

  //       // if (newNode.children[childIter].props) {
  //       //   let propKey = Object.keys(newNode.children[childIter].props);
  //       //   if (propKey.length > 0) {
  //       //     for (let propItr = 0; propItr < propKey.length; propItr++){
  //       //       newChild.setAttribute(propKey[propItr], newNode.children[childIter].props[propKey[propItr]]);
  //       //     }
  //       //   }
  //       // }
  //       if (newNode.children[childIter].children) {
  //         for (
  //           let grandChildItr = 0;
  //           grandChildItr < newNode.children[childIter].children.length;
  //           grandChildItr++
  //         ) {
  //           updateElement(newChild, newNode.children, oldNode.children)
  //         }
  //       }
  //       target.insertBefore(newChild, referenceNode);
  //       targetLength++;
  //     } else {
  //       oldNodeIter++;
  //       referenceNode = referenceNode.nextSibling;
  //     }
  //   }
}

module.exports = {
  createVDOM,
  createElement,
  changed,
  updateElement,
};
