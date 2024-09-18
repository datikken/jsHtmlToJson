export const treeHTML = (element, object) => {
    object.type = element.nodeName;
    const nodeList = element.childNodes;
    if (nodeList !== null) {
        if (nodeList.length) {
            object.content = [];
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].nodeType === 3) {
                    if (nodeList[i].nodeValue) {
                        object.content.push(nodeList[i].nodeValue);
                    }
                } else {
                    object.content.push({});
                    treeHTML(nodeList[i], object.content[object.content.length - 1]);
                }
            }
        }
    }
    if (element.attributes !== null) {
        if (element.attributes.length) {
            object.attributes = {};
            for (let i = 0; i < element.attributes.length; i++) {
                object.attributes[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
            }
        }
    }
};
