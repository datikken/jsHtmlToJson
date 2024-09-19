import * as Y from "yjs";

const doc = new Y.Doc();
const docname = 'test';
const yfragment = doc.get(docname, Y.XmlFragment);

const wrapxmlel = new Y.XmlElement('div');
const newElement = new Y.XmlElement('p');
newElement.insert(0, [new Y.XmlText('test insert')]);
wrapxmlel.insert(0, [newElement]);

yfragment.push([wrapxmlel]);

const update = Y.encodeStateAsUpdate(doc);
doc.transact(() => {
    Y.applyUpdate(doc, update);
});

Y.applyUpdate(doc, Y.encodeStateAsUpdate(doc));
console.log(
    doc.getXmlFragment(docname).toJSON()
)

