import { DOMParser } from '@xmldom/xmldom';
import { treeHTML} from "./treeHTML.js";
import * as Y from 'yjs';

const treeObject = {};

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
            treeHTML(elementToParse, treeObject);

            resolve(treeObject);
        } catch (e) {
            reject(e);
        }
    });
}

const str = "<p>test123</p>";
const res = await HTMLParser(`<div>${str}</div>`);
console.log(JSON.stringify(res))
