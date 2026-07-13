// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/27-nested-lists.json
export default {
  id: 27,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>What the price includes:</p>

    <ul>
      <li>Frame</li>
      <li>Tyres</li>
      <li>Front</li>
      <li>Rear</li>
      <li>Bell</li>
    </ul>
  </body>
</html>`,
  expected: "<ul>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text",
      bbg: "Списъкът излиза с пет точки, всичките еднакви. Той твърди, че „Front\" е такова нещо, каквото е „Frame\" и „Bell\" — отделна част от велосипеда. А то не е. То е част ОТ гумите."
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
      type: "code",
      code: `<ul>
  <li>Frame</li>
  <li>Tyres
    <ul>
      <li>Front</li>
      <li>Rear</li>
    </ul>
  </li>
  <li>Bell</li>
</ul>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>What the price includes:</p><ul><li>Frame</li><li>Tyres<ul><li>Front</li><li>Rear</li></ul></li><li>Bell</li></ul>",
      height: 220,
      url: "index.html"
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
  slug: "27-nested-lists"
};
