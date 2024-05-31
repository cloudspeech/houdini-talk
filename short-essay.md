# Houdini's Magic Trick for the Enterprise
> Talk by Markus Walther, AXA DevCon, June 4, 2024 @ Winterthur, Switzerland

![Harry_Houdini](https://github.com/cloudspeech/houdini-talk/assets/850521/b515b10a-2313-4bd9-9ed4-9e88a2e9f2d1)

## I am Markus, but Who was Houdini?

Harry Houdini was a professional American magician and escape
artist.

He was famous at the start of the last century for his stunts in which
he invariably escaped impossible-looking situations.

In the [Washington DC prison
escape](https://parkviewdc.com/2010/10/01/houdinis-escape-from-the-10th-precinct/)
of 19-oh-6 it took him all of 18 minutes to defeat his
handcuffs, open 5 locks of his cell, and get his clothes from the
neighbouring cell.

> "Stone walls and chains do not make a prison - for Houdini"

reads the caption of his photo.

## And What is Enterprise?

Enterprise IT serves the needs of a large business organization &mdash; an enterprise &mdash; not just an individual user.

Things have grown over the years, one has to protect against hostile
actors from outside, auditing requirements need to be met, users have
access rights and restrictions.  

For a frontend software engineer working in Enterprise, terms like
stonewalls, chains, prison feel familiar - your hands are often tied,
you can't move fast and break things, things are locked down, yet the
show must go on and your web site must be up and running 24/7.

Where's Houdini in that situation?

### What is Enterprise Frontend like?

As everybody knows, frontend deals with HTML - the structure, 'what is what' -, CSS - the
styling, 'how it looks', and JavaScript - the interactivity, 'how it responds'.

Now typical enterprise restrictions are:

- traditional, web pages dominate, lots and lots of HTML. __Not__ SPAs, __not__ PWAs.
- you don't own the whole page
- you can't run JavaScript on the server
- SEO is crucial

So, out goes:

- most frontend frameworks, and
- whole-page performance optimization

Houdini, please help!

## Here comes The Magic Trick

Whenever you're stuck in yet another impossible Enterprise situation,
do this:

> write a web component!

That's it, that's the escape, that's Houdini's magic trick for the enterprise,
you can do it basically every single time.

&lt;web-component&gt;s are HTML tags with a dash in the name that you
define yourself with a little JavaScript. All major browsers support
them.

And since the foundation is always HTML, we can always use that trick.

How?

I'll show you now.

## Here's five typical situations where the trick works

### 1. Situation: UI components

Most people know this one already.

A design system is good for enterprise
brand identity and includes UI components like buttons, form input
elements, date pickers and so on.

AXA's design system is open source and built with web
components since 2019.

It's called the
[AXA Pattern Library](https://axa-ch-webhub-cloud.github.io/plib-feature/develop/?path=/story/welcome--to-pattern-library).

Those web components are live on every page of [axa.ch](https://axa.ch).

Houdini's trick simply works. These days many enterprises do the same.

Therefore, let's move on to the next situation.

### 2. Situation: Slow Page Performance

So your boss tells you to make things load faster, because the Google
rating dropped...

"Oh", he says, "and can you please make it happen by tomorrow?"

But you don't own
the pages, hundreds of kilobytes of JavaScript and CSS assets must
stay.

Those assets are loaded via `<script>` and `<link>` tags,
which _also_ have to stay in place.

Should you give up, or can you escape the impossible situation? 

Of course, you can escape!

Just use Houdini's trick!

Step 1: wish yourself a new HTML tag called script-with-a-dash
(`<scri-pt>`) with new
behaviour.

Here we want to delay loading an asset until the
browser is idle, has _time_, or until you scroll down _so much_ so that the
new tag becomes visible.

Step 2: invent your own attributes to control that
new behaviour.

`when` reads nice as an attribute name here, "script
when visible, script when idle":

```html
<scri-pt when="visible">...</scri-pt>
<scri-pt when="idle">...</scri-pt>
```

Step 3: compose your markup as a mix of old tags and the new one.

Because nothing loads automatically inside a `<template>` tag, we can
wrap the things to load with a template and then put
script-with-a-dash around it:

```html
<scri-pt when="visible">
  <template>
    <script src="big-fat-bundle.js"></script>
  </template>
</scri-pt>
```

That snippet means:

load that big fat bundle _only_ when the user
scrolled down _so much_ that script-with-a-dash is visible.

Step 4: now do-it-yourself, define the new behaviour &mdash; and just that,
please, keep it simple &mdash; in plain old JavaScript:

```js
class ScriPt extends HTMLElement {
  connectedCallback() {
    if (this.getAttribute("when") === "visible") {
      const observer = new IntersectionObserver( entries => entries[0].isIntersecting && this.#load() && observer.disconnect() );
      return observer.observe(this);
    }
    requestIdleCallback(this.#load);
  }

  #load = () => this.appendChild(this.firstElementChild.content.cloneNode(true));
}

customElements.define("scri-pt", ScriPt);
```

Aaand... in just 11 lines of code, Houdini's escape is perfect, because
script-with-a-dash does the trick!

To see this live in production &mdash; under the alias axa-script,&mdash; visit _any_ [axa.ch](https://axa.ch) web page.

### 3. Microfrontends

The idea of Microfrontends is to embed apps inside plain old HTML
pages. If you do it right, teams can then deploy and maintain those
apps independent of your site releases, which is a huge win.

But not all apps are alike, for example some need to navigate to a
login page first for user authentication, then come back and start the
app. Others are of the type where you want to wait till all the HTML
is parsed, that is until DOM is loaded.

How can you model such microfrontend embedding in Enterprise HTML?

Easy, step 1 again: wish yourself `<micro-frontend>`, which knows how
to embed a microfrontend and start it.

Step 2, add attributes.

Use `type` to indicate which kind of microfrontend it is: `type="auth"` or `type="dom-loaded"` etc.

Step 3, compose:

```html
<micro-frontend type="dom-loaded">
  <scri-pt when="visible" for="parentNode">
    <template>
      <script type="module" src="my-big-app-bundle.js"></script>
    </template>
  </scri-pt>
</micro-frontend>
```

Notice how we did not define app-loading, but reused scri-pt?
That's the power of HTML composition at work!

Step 4: do-it-yourself, define micro-frontend in JavaScript.

I will spare you the details, but it's only 3.4 kiloBytes compressed.

See it live on [axa.ch](https://axa.ch) pages under the nickname webhub-pod.

### 4. Internationalization

Imagine customer research has found that expats hate full-page reloads
to switch languages when emailed marketing links are in German. You
are tasked to redo internationalization, but leave everything else
intact. And no performance regression, please.

Impossible situation again, or not?

How about... step 1: wish yourself `<trans-late>`, which knows how to
translate text when the page language changes.

Then step 2: no attributes needed, because it depends on the page
language

```html
<html lang="en">
```

Step 3: compose:

```html
<trans-late>Houdini's Magic Trick for the Enterprise
    <template lang="de">Houdini's Magischer Trick für Enterprise Frontend</template>
</trans-late>
```

Anything under template is not rendered by the browser, so we're fine
visually. The HTML speaks for itself.

Step 4: do-it-yourself, define trans-late in JavaScript.

```js
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

```
28 lines of easy-to-understand JavaScript for Houdini's trick are enough here.

### 5. Server-Side Rendering for the Enterprise

So you discover it's impossible to do Server-Side Rendering in your
organization.

You know, that frontend hype thingie where you run JavaScript
server-side to pump out web pages.

You can't do that because you are rendering server-side already, your
super-expensive Enterprise CMS written in Java pumps out web pages!

And they are composed out of server-side components, available since
forever.

So you whine because you work in the enterprise and your boring CV
doesn't mention the latest frontend hypes.

If you could only sprinkle a little magic interactivity here and there
in the components' HTML, you could escape the impossible situation...

And there's this other hot frontend hype, signals, for fine-grained
reactive updating over time. Can we please have that too?

Step 1: Wish yourself <`sig-nal>`, which knows how to react and apply updates to a
certain place in your HTML.

Step 2: add attributes.

Use `ref` to reference a place by name:

```html
<signal ref="inc">+</sig-nal>
```

By default, that place is the parent node of `<sig-nal>`.

Use `new` to do the same but also create a named signal:

```html
<signal new="counter">Initial value of counter</sig-nal>
```

Use `type` to convert the initial signal value:

```html
<signal new="counter" type="number">3</sig-nal>
```

Use `hydrate` to express your interactivity:

```html
<sig-nal hydrate>
      { /* JavaScript object expressing how to react
           and how to update */
      }
</sig-nal>
```

Step 3: compose

```html
    <template shadowrootmode="open">
      <link rel="stylesheet" href="./counterdemo.css"/>
      <h3>Interactive island</h3>
      <p>The server supplied the initial value <b>3.</b></p>
      <div>
        <button @click="counter"><sig-nal ref="dec">-</sig-nal></button>
        <div .textContent="counter"><sig-nal new="counter" type="number">3</sig-nal></div>
        <button @click="counter"><sig-nal ref="inc">+</sig-nal></button>
        <sig-nal hydrate>
          {
          counter: { ".textContent": rerender },
          inc: { "@click": ({ signal }) => signal.value++ },
          dec: { "@click": ({ signal }) => signal.value-- }
          }
        </sig-nal>
      </div>
    </template>
```

Step 4: do-it-yourself, define sig-nal in JavaScript. Under 1 KB
compressed, that's all you need. Open-sourced [here](https://github.com/cloudspeech/sig-nal).

This is Houdini's trick at it's peak. Pure no-build goodness,
[Lighthouse-100 performance](https://cloudspeech.github.io/sig-nal/counter.html).

## Haters gonna hate, but Enterprise knows better

I am not living under a rock.

Of course I know about blog posts like that one from the creator of Svelte,
[Rich Harris: Why I don't use web
components](https://dev.to/richharris/why-i-don-t-use-web-components-2cia).

But Enterprise has overwhelmingly voted with their feet, see [arewebcomponentsathingyet.com](https://arewebcomponentsathingyet.com/):

<img width="479" alt="Screenshot 2024-05-31 at 13 37 48" src="https://github.com/cloudspeech/houdini-talk/assets/850521/f9fc74a7-2c7c-4817-85c8-179cb9782575">

So haters gonna hate, but they can't touch Houdini.

## Happy escaping!

I work in Enterprise frontend, that's where the jobs are.

And I discovered Houdini's magic trick:

There's an ~~app~~ web component for that!

I am happy again because I can help myself in every impossible
situation where I cannot change much around me, but I can bend HTML to
my will.

That's what web components do for you, a principled way to escape.

Happy escaping to all of you, and thanks for listening!


