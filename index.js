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

let str = `
<div>
<p>A new peer-reviewed scientific paper, titled <em>An integrated landfill gas-to-energy and Bitcoin mining framework, </em>appearing in the Aug. 29 edition of the <em>Journal of Cleaner Production, </em>demonstrated how Bitcoin (<a data-ct-non-breakable="null" href="https://cointelegraph.com/bitcoin-price" rel="null" target="null" text="null">BTC</a>) mining could reduce methane emissions.</p><p>The research paper detailed how Bitcoin miners are uniquely positioned to leverage "Landfill Gas to Energy" (LFGTE) systems that capture and convert methane gas from garbage landfills into usable energy — sequestering the greenhouse gas and reducing its harmful effects on the atmosphere.</p><figure><img alt="" name="" src="https://s3.cointelegraph.com/uploads/2024-08/0191a548-993f-7b1c-85e8-b2d702115967"></img><figcaption><p><em>A breakdown of the energy chain resulting from LFGTE. Source: </em><a data-ct-non-breakable="null" href="https://www.sciencedirect.com/science/article/pii/S0959652624029652?via%3Dihub" rel="nofollow noopener" target="_blank" text="null"><em>Science Direct</em></a></p></figcaption></figure><p>Bitcoin mining features the proper incentive structure for such a capital-intensive, long-term commitment project, which other private enterprises lack due to the absence of sustainable revenue generation and cost recovery strategies, the authors of the paper argued. According to the researchers:</p><blockquote><p>"Bitcoin’s economic incentives, available globally for miners in any location, may offer an innovative solution for encouraging methane mitigation without the need for government incentives—presenting a scalable and novel solution for rapid deployment."</p></blockquote><p>Additionally, the researchers noted that this incentive structure isn't limited to methane emissions, but could also be used to recycle underutilized energy in the form of "Orphaned oil, gas wells, wastewater treatment plants, farms, and agricultural processing operations."</p><p><em><strong>Related:</strong></em><a data-ct-non-breakable="null" href="https://cointelegraph.com/news/no-more-range-anxiety-how-depin-transforms-the-ev-charging-ecosystem" rel="null" target="null" text="null"><em><strong> No more range anxiety: How DePIN transforms the EV charging ecosystem</strong></em></a></p><h2>Marathon Digital capitalizes on LFGTE systems </h2><p>In 2023, MARA, formerly known as Marathon Digital, teamed up with Nodal Power to mine Bitcoin <a data-ct-non-breakable="null" href="https://cointelegraph.com/news/marathon-digital-landfill-methane-mine-bitcoin-utah-pilot-project" rel="null" target="null" text="null">using methane gas</a> in Utah. At the time the 280-kilowatt initiative was first<a data-ct-non-breakable="null" href="https://ir.mara.com/investors/news-events/press-releases/detail/1330/marathon-digital-holdings-announces-energization-of-its-first-bitcoin-mining-pilot-project-powered-by-renewable-off-grid-energy-from-a-landfill" rel="null" target="null" text="null"> announced</a>, MARA Chairman and CEO Fred Thiel had this to say:</p><blockquote><p>“At Marathon, we are constantly seeking innovative ways to diversify our operations, lower our energy costs, and leverage the unique aspects of Bitcoin mining to better the environments in which we operate.”</p></blockquote><p>In May 2024, the company furthered this mission statement by signing a deal with the Kenyan government to<a data-ct-non-breakable="null" href="https://cointelegraph.com/news/marathon-digital-kenya-renewable-energy" rel="null" target="null" text="null"> develop renewable energy</a> infrastructure inside the country.</p><h3>Findings corroborated by other research papers</h3><p>The recent research paper appearing in the <em>Journal of Cleaner Production</em> wasn't the first to touch on the theme of Bitcoin miners reducing emissions by repurposing underused energy sources.</p><p>In 2023, a research study published by the Institute of Risk Management found that Bitcoin mining operations could <a data-ct-non-breakable="null" href="https://cointelegraph.com/news/bitcoin-mining-reduce-8-global-emissions-study" rel="null" target="null" text="null">reduce global emissions</a> by around 8% by 2030.</p><p><em><strong>Magazine:</strong></em><a data-ct-non-breakable="null" href="https://cointelegraph.com/magazine/ai-more-power-hungry-bitcoin-profits-pose-risks-bitcoin-miners/" rel="null" target="null" text="null"><em><strong> AI may already use more power than Bitcoin — and it threatens Bitcoin mining</strong></em></a></p><subscription_form label="Subscription Form: Nifty Newsletter" type="nifty_newsletter"><p></p></subscription_form><p><hard_break></hard_break></p>
</div>
`;

str = str.replaceAll("\n", "")

const yXmlElement = await HTMLParser(`${str}`);
const readyDoc = insertYXmlElementToYdoc(yXmlElement)
const result = readyDoc.getXmlFragment(docname).toJSON();
console.log(str)
console.log('-------------')
console.log(result)
console.log(str === result)
