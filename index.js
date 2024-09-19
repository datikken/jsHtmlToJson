import { DOMParser } from '@xmldom/xmldom';
import { treeYxml } from "./treeYXmlElement.js";
import * as Y from 'yjs';
import {insertYXmlElementToYdoc} from "./helpers.js";

const docname = 'test';
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

const str = "<article_widget author='Jamie Redman' id='4076' imageUrl='https://s3.cointelegraph.com/storage/uploads/view/9f2d09c6d70d278ec087939975dc4f0a.png' languageId='1' publishedAt='2015-04-25T16:23:19.000Z' title='Bitcoin Is Not A Sprint, Its A Marathon (Op-Ed)'><p></p></article_widget> <h3>dfdsfsdfdsf<em>knkkkfs sfsdfsf</em> f dsfsd sfawd<strong>awdawdawdawd</strong> </h3><p>dsfsf</p><figure> <img alt='Richard Carter' img_link='https://gitlab.ctgroup.io/' img_link_title='gitlab' name='' src='https://s3.cointelegraph.com/uploads/2024-08/01919626-6073-7beb-ab4d-191cd84c33f8' title='gitlab'> </img> <figcaption> <p>Edit caption here or remove text</p> </figcaption> </figure>";
const yXmlElement = await HTMLParser(`<div>${str}</div>`);
const readyDoc = insertYXmlElementToYdoc(yXmlElement)
console.log(readyDoc.getXmlFragment(docname).toJSON())
