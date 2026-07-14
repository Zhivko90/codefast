// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/37-alt.json
//
// ⚠ Тук машината опира до тавана си. alt="bike" минава всичко долу.
// Единственият истински съдник е човек — или AI подсказка.
// axe-core ще хване ЛИПСВАЩ alt, но не и безполезен. Не чакай него.
export default {
  id: 37,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Here is a photo of it:</p>
    <img src="/uroci/bike-missing.jpg">

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "img", min: 1, err: "lost-img", weight: 200 },
    { id: "t3", type: "dom_attr", value: "img", attr: "alt", err: "no-alt", weight: 150 },
    { id: "t4", type: "dom_not_has", value: "img[alt*='photo' i]", err: "useless-alt", weight: 130 },
    { id: "t5", type: "dom_not_has", value: "img[alt*='image' i]", err: "useless-alt", weight: 128 },
    { id: "t6", type: "dom_not_has", value: "img[alt*='picture' i]", err: "useless-alt", weight: 126 },
    { id: "t7", type: "dom_not_has", value: "img[alt$='.jpg' i]", err: "filename-alt", weight: 120 },
    { id: "t8", type: "dom_not_has", value: "img[alt='bike' i]", err: "too-short", weight: 110 },
    { id: "t9", type: "dom_text_contains", value: "strong", text: "18 leva", err: "lost-price", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<img src=\"/uroci/bike.jpg\" alt=\"Blue mountain bike, side view\">" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "37-alt"
};