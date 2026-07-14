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
    { id: "t1", type: "code_contains", value: "<video", err: "no-video" },
    { id: "t2", type: "code_contains", value: "controls", err: "no-controls" },
    { id: "t3", type: "code_not_contains", value: "autoplay", err: "autoplay" },
    { id: "t4", type: "balanced", err: "not-closed" },
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