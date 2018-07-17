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
  for (let childItr = 0; childItr < newNode.children.length; childItr++) {
    if (childItr > 0) {
      htmlChild = htmlChild.nextSibling;
    }
    if (newNode.children[childItr]) {
      if (!oldNode.children[childItr]) {
        let brandNewChild = createElement(newNode.children[childItr]);
        target.appendChild(brandNewChild);
      } else if (newNode.children[childItr] === null) {
        target.removeChild(htmlChild);
      } else {
        updateElement(
          htmlChild,
          newNode.children[childItr],
          oldNode.children[childItr]
        );
      }
    }
  }
  // if (changed(newNode.props, oldNode.props)) {
  //   console.log("props have changed");
  // }
  // if (newNode.children.length > oldNode.children.length) {
  //   // USED FOR ADDING NODES!
  //   let oldNodeIter = 0;
  //   let targetLength = oldNode.children.length;
  //   let referenceNode = target.firstChild /* (oldNode.children[oldNodeIter].type) */;
  //   for (let childIter = 0; childIter < newNode.children.length; childIter++) {
  //     if (
  //       childIter >= targetLength ||
  //       changed(
  //         newNode.children[childIter].type,
  //         oldNode.children[oldNodeIter].type
  //       )
  //     ) {
  //       if (typeof newNode.children[childIter] === 'string') {
  //         newChild = document.createTextNode(newNode.children[childIter]);
  //       } else {
  //         newChild = createElement(newNode.children[childIter]);

  //       }

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
  // } else if (newNode.children.length < oldNode.children.length) {
  //   // USED FOR REMOVING NODES
  //   let referenceOfNode = target.firstChild;
  //   for (let childIter = 0; childIter < newNode.children.length; childIter++) {
  //     for (let oldIter = 0; oldIter < oldNode.children.length; oldIter++) {
  //       if (newNode.children[childIter] === oldNode.children[oldIter]) {
  //         referenceOfNode = referenceOfNode.nextSibling;
  //         continue;
  //       }
  //     }
  //     if (referenceOfNode !== null) {
  //       target.removeChild(referenceOfNode);
  //     }
  //   }
  // }

  // console.log("stop!");
  // if(target.childNodes[1])
  //   console.log(target.childNodes[1].childNodes);
}

module.exports = {
  createVDOM,
  createElement,
  changed,
  updateElement,
};
