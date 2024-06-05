# houdini-talk

Conference talk "Houdini's Magic Trick for the Enterprise" about the eminent problem-solving utility of little [**web components**](https://www.webcomponents.org/) that do one thing, but do it well.

## Preparation

I tried to loosely follow
https://nathanbrixius.wordpress.com/2020/01/29/how-i-create-presentation-content/.

However, preparing the short essay mutated into full-blown
word-by-word speaker notes eventually.

And I decided to make the slides as conventional, individual HTML web
pages. This turned out to be a good decision, because it allowed me to
embed live demos right inside presentation slides &mdash; avoiding all
the usual hassle with switching tabs or even applications for demoing
stuff.

I did not have time to share styling between slides, which is one
thing I would improve. I would also standardize a skeleton of slides,
use a static site generator to share fragments across pages, and use
the newfangled view transitions for page-to-page animation.

## Giving the talk

I presented this talk at AXA DevCon 2024, an internal developer
conference of AXA Switzerland held on June 4, 2024, in Winterthur.

## How to run the presentation

1. Install [bun](https://bun.sh/).
2. `bun install`
3. `bun start`
4. Point your browser at http://localhost:8080
5. Press SPACE to advance to next slide.
6. Slides 20 and 33 benefit from switching languages by way of the
language selector in the top right corner.

## Reactions during the Question Period

I got an interesting question that expressed curiousity or even doubt
about slide 33. The audience member asked to see the page source.

Using `View Page Source` on that very slide I could demonstrate that,
indeed, there was no hidden magic or precompilation involved, just
composition of few custom elements and normal HTML tags.

I also showed that in the Elements tab of Chrome Developer Tools one
can see that both the &lt;sig-nal&gt; and &lt;trans-late&gt; web
components are of the self-vanishing type, as explained in the speaker
notes.
