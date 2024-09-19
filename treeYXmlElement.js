import * as Y from 'yjs';

export const treeYxml = (element, object) => {
    // console.log(object)
    // console.log("\n")
    // return
    // object.type = element.nodeName;
    const nodeList = element.childNodes;
    if (nodeList !== null) {
        if (nodeList.length) {
            // object.content = [];
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].nodeType === 3) {
                    if (nodeList[i].nodeValue) {
                        object.insert(0, [new Y.XmlText(nodeList[i].nodeValue)])
                        // object.content.push(nodeList[i].nodeValue);
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
