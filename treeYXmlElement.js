import * as Y from 'yjs';

export const treeYxml = (element, object) => {
    const nodeList = element.childNodes;
    if (nodeList) {
        if (nodeList.length) {
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].nodeType === 3) {
                    if (nodeList[i].nodeValue) {
                        object.insert(object.length + 1, [new Y.XmlText(nodeList[i].nodeValue)])
                    }
                } else {
                    const nextXmlObject = new Y.XmlElement(nodeList[i].nodeName)
                    object.insert(object.length + 1, [nextXmlObject])
                    treeYxml(nodeList[i], nextXmlObject);
                }
            }
        }
    }
    if (element.attributes !== null) {
        if (element.attributes.length) {
            object.attributes = {};
            for (let i = 0; i < element.attributes.length; i++) {
                const attrName = element.attributes[i].nodeName;
                const attrVal = element.attributes[i].nodeValue;
                object.setAttribute(attrName, attrVal)
            }
        }
    }
};
