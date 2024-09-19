import { DOMParser } from '@xmldom/xmldom';
import { treeHTML} from "./treeHTML.js";

const treeObject = {};

async function HTMLParser(element, json) {
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

            resolve(json ? JSON.stringify(treeObject) : treeObject);
        } catch (e) {
            reject(e);
        }
    });
}

const str = "<p>test123<subscription_form test='123'>321</subscription_form></p><h1>test 2</h1>";
console.log(
    JSON.stringify(await HTMLParser(`<div>${str}</div>`))
)
