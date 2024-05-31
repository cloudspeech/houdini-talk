const textNodes = new Map();

const getPageLanguage = () => document.documentElement.getAttribute("lang");

let pageLanguage = getPageLanguage();

const observer = new MutationObserver(() => {
  const language = getPageLanguage();
  for (let [textNode, translations] of textNodes) {
    textNode.textContent = translations[language];
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"],
});

class TransLate extends HTMLElement {
  connectedCallback() {
    const text = this.textContent.trim();
    const textNode = new Text(text);
    const translations = { [pageLanguage]: text };
    this.querySelectorAll("template").forEach(template => {
      const language = template.getAttribute("lang");
      const text = template.content.textContent.trim();
      translations[language] = text;
    });
    textNodes.set(textNode, translations);
    this.replaceWith(textNode);
  }
}

customElements.define("trans-late", TransLate);
