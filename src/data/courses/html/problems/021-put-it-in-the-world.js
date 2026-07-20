// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/021.json
//
// ПОСТРОЙ ОТ НУЛА. ТРУДНА. ФИНАЛНАТА — целият курс наведнъж.
//
// ⚠ НИЩО НОВО. Всеки таг тук е минат. Трудното е ОБХВАТЪТ:
//   скелет (11) · глава: viewport 64, og 65 · семантика (47)
//   списък (26) · таблица (53) · снимка + alt (37) · форма (58)
//   пътища (34) · специални знаци (23)
//
// ⚠ Урок 67 НЯМА проверки — той е за качване. Затова задачата
//   не иска нищо ново; тя е изпитът преди Upload.
//
// ⚠ ВСИЧКИ ПРАЗНИ АТРИБУТИ се ловят с двойка count + dom_attr.
//   Проверено в 009 и 015: празният атрибут СЪЩЕСТВУВА.
//
// СКРИТИТЕ: трите неща, които на екрана изглеждат готови —
//   autoplay, layout-таблица, заглавие от удебелен абзац.
// ============================================
export default {
  id: 21,
  slug: 'put-it-in-the-world',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['finish', 'everything'],
  lesson: 67,

  starterCode: '',

  targetCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dobrich Photo Club — meetings, walks and darkroom</title>
  <meta property="og:title" content="Dobrich Photo Club">
  <meta property="og:image" content="images/club.jpg">
</head>
<body>
  <header>
    <h1>Dobrich Photo Club</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="pages/walks.html">Walks</a></li>
        <li><a href="https://example.com/gallery">Gallery</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>What we do</h2>
      <p>We meet every Thursday, walk on Sundays and print on the first Saturday of the month.</p>
      <img src="images/club.jpg" alt="Six people with cameras on a bridge at sunrise">

      <h3>Bring with you</h3>
      <ul>
        <li>A camera, any camera</li>
        <li>Comfortable shoes</li>
        <li>Water</li>
      </ul>

      <h3>Meeting times</h3>
      <table>
        <caption>Regular meetings, autumn 2025</caption>
        <tr>
          <th>What</th>
          <th>Day</th>
          <th>Time</th>
        </tr>
        <tr>
          <th>Meeting</th>
          <td>Thursday</td>
          <td>19:00</td>
        </tr>
        <tr>
          <th>Photo walk</th>
          <td>Sunday</td>
          <td>07:00</td>
        </tr>
        <tr>
          <th>Darkroom</th>
          <td>Saturday</td>
          <td>10:00</td>
        </tr>
      </table>

      <h3>A note on gear</h3>
      <p>Write your settings as &lt;aperture&gt; and &lt;shutter&gt; in the shared sheet.</p>
    </article>

    <aside>
      <h2>Nearby</h2>
      <ul>
        <li><a href="pages/darkroom.html">The darkroom</a></li>
        <li><a href="pages/archive.html">Old photos</a></li>
      </ul>
    </aside>

    <section>
      <h2>Join us</h2>
      <form>
        <label for="name">Your name</label>
        <input id="name" name="name" type="text">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>Written by Ivan. All rights reserved.</p>
  </footer>
</body>
</html>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    // ── СКЕЛЕТЪТ (11, 64, 65) ──
    { id: 't2', type: 'code_contains', value: '<!doctype', err: 'no-doctype', weight: 500 },
    { id: 't3', type: 'dom_count', value: 'html[lang]', min: 1, err: 'no-lang', weight: 495 },
    { id: 't4', type: 'dom_attr', value: 'html', attr: 'lang', err: 'no-lang', weight: 490 },
    { id: 't5', type: 'dom_count', value: 'meta[charset]', min: 1, err: 'no-charset', weight: 485 },
    { id: 't6', type: 'dom_attr', value: 'meta[charset]', attr: 'charset', err: 'no-charset', weight: 480 },
    { id: 't7', type: 'dom_text_not_empty', value: 'head title', err: 'no-title', weight: 475 },
    { id: 't8', type: 'dom_count', value: 'meta[name="viewport"]', min: 1, err: 'no-viewport', weight: 470 },
    { id: 't9', type: 'dom_attr', value: 'meta[name="viewport"]', attr: 'content', err: 'no-viewport', weight: 465 },
    { id: 't10', type: 'dom_count', value: 'meta[property="og:title"], meta[property="og:image"]', min: 2, err: 'no-og', weight: 460 },
    { id: 't11', type: 'dom_attr', value: 'meta[property^="og:"]', attr: 'content', err: 'no-og', weight: 455 },

    // ── СЕМАНТИКАТА (47) ──
    { id: 't12', type: 'dom_has', value: 'header', err: 'no-landmarks', weight: 420 },
    { id: 't13', type: 'dom_count', value: 'main', min: 1, max: 1, err: 'no-landmarks', weight: 415 },
    { id: 't14', type: 'dom_has', value: 'footer', err: 'no-landmarks', weight: 410 },
    { id: 't15', type: 'dom_has', value: 'header nav', err: 'no-nav', weight: 405 },
    { id: 't16', type: 'dom_has', value: 'main article', err: 'no-article', weight: 400 },
    { id: 't17', type: 'dom_has', value: 'main aside', err: 'no-aside', weight: 395 },
    { id: 't18', type: 'dom_not_has', value: 'article aside, div', err: 'wrong-nesting', weight: 390 },

    // ── ЗАГЛАВИЯТА ──
    { id: 't19', type: 'dom_count', value: 'h1', min: 1, max: 1, err: 'h1-count', weight: 370 },
    { id: 't20', type: 'dom_text_not_empty', value: 'h1', err: 'h1-count', weight: 365 },
    { id: 't21', type: 'dom_count', value: 'h2', min: 3, err: 'few-h2', weight: 360 },
    { id: 't22', type: 'dom_count', value: 'h3', min: 3, err: 'few-h3', weight: 355 },
    { id: 't23', type: 'axe_clean', value: 'heading-order', err: 'heading-order', weight: 350 },

    // ── ВРЪЗКИТЕ И ПЪТИЩАТА (34, 35, 37) ──
    { id: 't24', type: 'dom_count', value: 'nav ul li a', min: 3, err: 'nav-not-list', weight: 320 },
    { id: 't25', type: 'dom_count', value: 'a[href]', min: 5, err: 'few-links', weight: 315 },
    { id: 't26', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 310 },
    { id: 't27', type: 'dom_has', value: 'a[href^="https://"]', err: 'no-external', weight: 305 },
    { id: 't28', type: 'dom_count', value: 'a[href*="/"]:not([href^="http"])', min: 1, err: 'no-subfolder', weight: 300 },
    { id: 't29', type: 'axe_clean', value: 'link-name', err: 'no-link-name', weight: 295 },

    // ── СНИМКАТА (12, 37) ──
    { id: 't30', type: 'dom_count', value: 'img[alt]', min: 1, err: 'no-alt', weight: 270 },
    { id: 't31', type: 'dom_attr', value: 'img', attr: 'alt', err: 'no-alt', weight: 265 },
    { id: 't32', type: 'dom_attr', value: 'img', attr: 'src', err: 'no-src', weight: 260 },

    // ── СПИСЪЦИТЕ (26) ──
    { id: 't33', type: 'dom_count', value: 'ul', min: 3, err: 'few-lists', weight: 240 },
    { id: 't34', type: 'dom_text_not_empty', value: 'li', err: 'empty-li', weight: 235 },
    { id: 't35', type: 'dom_count', value: 'br', max: 0, err: 'br-instead', weight: 230 },

    // ── ТАБЛИЦАТА (53) ──
    { id: 't36', type: 'dom_count', value: 'table', min: 1, max: 1, err: 'table-count', weight: 210 },
    { id: 't37', type: 'dom_count', value: 'table tr', min: 4, err: 'few-rows', weight: 205 },
    { id: 't38', type: 'dom_count', value: 'table th', min: 6, err: 'few-th', weight: 200 },
    { id: 't39', type: 'dom_count', value: 'tr th:first-child', min: 4, err: 'no-row-names', weight: 195 },
    { id: 't40', type: 'dom_text_not_empty', value: 'caption', err: 'no-caption', weight: 190 },

    // ── ФОРМАТА (58) ──
    { id: 't41', type: 'dom_has', value: 'form', err: 'no-form', weight: 170 },
    { id: 't42', type: 'dom_count', value: 'form input', min: 2, err: 'few-fields', weight: 165 },
    { id: 't43', type: 'axe_clean', value: 'label', err: 'no-labels', weight: 160 },
    { id: 't44', type: 'dom_has', value: 'input[type="email"]', err: 'no-email-type', weight: 155 },
    { id: 't45', type: 'dom_has', value: 'input[required]', err: 'no-required', weight: 150 },
    { id: 't46', type: 'dom_attr', value: 'input', attr: 'name', err: 'no-name', weight: 145 },
    { id: 't47', type: 'dom_has', value: 'form button', err: 'no-button', weight: 140 },

    // ── СПЕЦИАЛНИТЕ ЗНАЦИ (23) ──
    { id: 't48', type: 'text_contains', value: '<', err: 'no-entities', weight: 120 },
    { id: 't49', type: 'text_contains', value: '>', err: 'no-entities', weight: 115 },

    // ── ТЕКСТЪТ ──
    { id: 't50', type: 'dom_text_not_empty', value: 'p', err: 'empty-p', weight: 100 },
    { id: 't51', type: 'dom_text_not_empty', value: 'footer p', err: 'no-footer-text', weight: 95 },

    // ── СКРИТИТЕ: изглеждат готови на екрана ──
    { id: 'h1', type: 'dom_not_has', value: '[autoplay]', err: 'autoplay', weight: 70, hidden: true },
    { id: 'h2', type: 'dom_not_has', value: 'table nav, table header, table footer, table main, td ul', err: 'layout-table', weight: 68, hidden: true },
    { id: 'h3', type: 'dom_count', value: 'p strong, p b', max: 0, err: 'fake-heading', weight: 66, hidden: true },
  ],
};