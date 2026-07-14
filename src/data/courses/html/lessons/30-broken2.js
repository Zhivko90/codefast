// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/30-broken2.json
//
// Развалината. Проверките са СКРИТИ — целият смисъл е човек да ги намери сам.
// Обяснението е общо: посока, не отговор.
//
// ⚠ Пазачите на съдържанието (p1–p4) НЕ са скрити. Те не са загадка —
// те казват „изтри вместо да поправиш“. Иначе развалината се минава с Delete.
export default {
  id: 30,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale
    <h1>What is included</h1>

    <p>Price: <strong>18 leva</p></strong>

    <ul>
      <li>Frame
      <li>Bell</li>
      - Front wheel<br>
      - Rear wheel
    </ul>

    <p>A friend said: "Best bike ever."</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", hidden: true, err: "not-closed", weight: 900, guard: true },

    { id: "t2", type: "dom_count", value: "h1", min: 1, max: 1, hidden: true, err: "two-h1", weight: 120 },
    { id: "t3", type: "dom_text_contains", value: "h2", text: "what is included", hidden: true, err: "two-h1", weight: 115 },
    { id: "t4", type: "dom_count", value: "ul li", min: 4, hidden: true, err: "fake-list", weight: 110 },
    { id: "t5", type: "text_not_contains", value: "- front wheel", hidden: true, err: "fake-list", weight: 105 },
    { id: "t6", type: "dom_count", value: "br", max: 0, hidden: true, err: "fake-list", weight: 100 },
    { id: "t7", type: "dom_text_contains", value: "blockquote", text: "best bike ever", hidden: true, err: "no-quote", weight: 95 },
    { id: "t8", type: "text_not_contains", value: "\"best bike ever", hidden: true, err: "no-quote", weight: 90 },

    { id: "p1", type: "dom_text_contains", value: "h1", text: "bike for sale", err: "lost-content", weight: 60 },
    { id: "p2", type: "dom_text_contains", value: "li", text: "front wheel", err: "lost-content", weight: 58 },
    { id: "p3", type: "dom_text_contains", value: "li", text: "rear wheel", err: "lost-content", weight: 56 },
    { id: "p4", type: "dom_text_contains", value: "strong", text: "18 leva", err: "lost-content", weight: 54 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "30-broken2"
};