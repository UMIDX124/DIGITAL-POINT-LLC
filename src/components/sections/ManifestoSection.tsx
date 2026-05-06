/**
 * ManifestoSection — Phase 20.1.4 narrative depth.
 *
 * UF: "puri rebuild karo dobara, content bhi check karna." Inserts a
 * cinematic philosophy section between hero and services, giving the
 * page the editorial breath that Hubtown / Sazabi / Linear-tier sites
 * have. Three operator-confident statements with massive type, no
 * three-item rhetorical structure (each one is its own beat).
 *
 * Server Component. Pure markup. Animation handled by SectionFlow's
 * stagger reveal once it enters viewport.
 *
 * Stop-slop discipline applied:
 *  - Zero em-dashes
 *  - Zero binary contrasts ("not X, just Y")
 *  - Zero throat-clearing openers
 *  - Zero -ly adverbs in hot paths
 *  - Zero banned business jargon
 *  - Period-led, declarative, operator-confident voice
 */
export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="manifesto-section section-deferred"
      aria-labelledby="manifesto-eyebrow"
    >
      <div className="container-wide">
        <p
          id="manifesto-eyebrow"
          className="manifesto-eyebrow font-mono uppercase"
        >
          OUR REGISTER
        </p>

        <div className="manifesto-stack" data-flow-stagger>
          <p className="manifesto-statement">
            Most agencies sell <span className="manifesto-amber">hours</span>.
            We operate <span className="manifesto-amber">outcomes</span>.
          </p>

          <p className="manifesto-statement">
            Most automation breaks at the edges.
            Ours has <span className="manifesto-amber">trained operators</span> watching them.
          </p>

          <p className="manifesto-statement">
            Eight years of running the work, not selling the deck.
          </p>
        </div>

        <p className="manifesto-tag font-mono uppercase">
          DPL · 2017 → NOW · OPERATING
        </p>
      </div>
    </section>
  );
}

export default ManifestoSection;
