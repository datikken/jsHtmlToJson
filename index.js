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

console.log(
    JSON.stringify(await HTMLParser("<p>test<p>123<subscription_form test='123'>321</subscription_form></p></p>"))
)
