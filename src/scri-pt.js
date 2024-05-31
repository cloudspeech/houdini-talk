class ScriPt extends HTMLElement {
  connectedCallback() {
    if (this.getAttribute("when") === "visible") {
      const observer = new IntersectionObserver(
        entries =>
          entries[0].isIntersecting && this.#load() && observer.disconnect(),
      );
      return observer.observe(this);
    }
    requestIdleCallback(this.#load);
  }

  #load = () =>
    this.appendChild(this.firstElementChild.content.cloneNode(true));
}

customElements.define("scri-pt", ScriPt);
