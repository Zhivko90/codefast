// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/46-div-problem.json
export default {
  id: 46,
  type: "web",
  label: "concept",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <div class="top">
      <div class="logo">Bike Shop</div>
      <div class="menu">
        <div class="item"><a href="/index.html">Home</a></div>
        <div class="item"><a href="/contact.html">Contact</a></div>
      </div>
    </div>

    <div class="middle">
      <div class="big-text">Bikes for sale</div>

      <div class="listings">
        <div class="listing">
          <div class="name">Black bike</div>
          <div class="text">21 gears, almost new.</div>
          <div class="price">18 leva</div>
        </div>
        <div class="listing">
          <div class="name">Red bike</div>
          <div class="text">Needs a new chain.</div>
          <div class="price">12 leva</div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="small">Written by Ivan. All rights reserved.</div>
    </div>
  </body>
</html>`,
  expected: "",
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "quote"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "46-div-problem"
};
