import * as Y from "yjs";

export const insertYXmlElementToYdoc = (yXmlElement) => {
    const doc = new Y.Doc();
    const docname = 'test';
    const yfragment = doc.get(docname, Y.XmlFragment);
    yfragment.push([yXmlElement]);

    const update = Y.encodeStateAsUpdate(doc);
    doc.transact(() => {
        Y.applyUpdate(doc, update);
    });
    Y.applyUpdate(doc, Y.encodeStateAsUpdate(doc));
    return doc;
}
