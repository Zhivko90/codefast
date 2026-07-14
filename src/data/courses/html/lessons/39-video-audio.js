// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/39-video-audio.json
export default {
  id: 39,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Watch it in action:</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "video", min: 1, err: "no-video", weight: 150 },
    { id: "t3", type: "dom_attr", value: "video", attr: "src", err: "no-src", weight: 140 },
    { id: "t4", type: "dom_has", value: "video[controls]", err: "no-controls", weight: 120 },
    { id: "t5", type: "dom_not_has", value: "video[autoplay], audio[autoplay]", err: "autoplay", weight: 200 },
    { id: "t6", type: "dom_has", value: "video[src='/uroci/bike.mp4']", err: "wrong-path", weight: 100 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<video src=\"/uroci/bike.mp4\" controls></video>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "39-video-audio"
};