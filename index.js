import { DOMParser } from '@xmldom/xmldom';
import { treeHTML} from "./treeHTML.js";
import { treeYxml } from "./treeYXmlElement.js";
import * as Y from 'yjs';
import {insertYXmlElementToYdoc} from "./helpers.js";

const treeObject = {};

const doc = new Y.Doc();
const docname = 'test';
const yxmlfragment = doc.get(docname, Y.XmlFragment);
const wrapxmlel = new Y.XmlElement('div');

async function HTMLParser(element) {
    return await new Promise((resolve, reject) => {
        try {
            let elementToParse;

            // If string convert to document Node
            if (typeof element === 'string') {
                const parser = new DOMParser();
                const docNode = parser.parseFromString(element, 'text/xml');
                if (docNode.firstChild) {
                    elementToParse = docNode.firstChild;
                }
            } else {
                elementToParse = element;
            }

            // @ts-expect-error
            // treeHTML(elementToParse, treeObject);
            treeYxml(elementToParse, wrapxmlel);

            resolve(wrapxmlel);
        } catch (e) {
            reject(e);
        }
    });
}

const str = "<p class='test'>test123<span>spanCont<h1>tEST</h1></span></p>";
const yXmlElement = await HTMLParser(str);
const readyDoc = insertYXmlElementToYdoc(yXmlElement)
console.log(readyDoc.getXmlFragment(docname).toJSON())
