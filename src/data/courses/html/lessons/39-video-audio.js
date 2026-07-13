// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/39-video-audio.json
export default {
  id: 39,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>Watch it in action:</p>

    <video src="/uroci/bike.mp4" width="480"></video>

    <p>And this is the bell:</p>

    <audio src="/uroci/bell.mp3"></audio>
  </body>
</html>`,
  expected: "controls",
  checkCode: true,
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
      type: "code",
      code: `<video src="/uroci/bike.mp4" controls></video>

<audio src="/uroci/bell.mp3" controls></audio>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Watch it in action:</p><video src=\"/uroci/bike.mp4\" controls style=\"max-width:100%\"></video><p>And this is the bell:</p><audio src=\"/uroci/bell.mp3\" controls></audio>",
      height: 330,
      url: "index.html"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: `<video src="/uroci/bike.mp4" controls>
  Your browser cannot play this video.
</video>`
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "code",
      code: "<video src=\"/uroci/bike.mp4\" controls poster=\"/uroci/bike.jpg\"></video>"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "39-video-audio"
};
