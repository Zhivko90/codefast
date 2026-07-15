// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/R9-review-forms.json
export default {
  id: 109,
  type: "review",
  label: "concept",
  groups: [
    { items: [{ code: "<form action=\"/send\" method=\"post\">\n  <input type=\"email\" name=\"email\" required>\n  <button type=\"submit\">Прати</button>\n</form>" }, {}, {}] },
    { items: [{ code: "<label for=\"email\">Имейл</label>\n<input id=\"email\" name=\"email\">" }, { code: "<select name=\"bike\">\n  <option value=\"mtb\">Планински</option>\n</select>" }, {}] },
    { items: [{ code: "<textarea name=\"msg\"></textarea>" }, { code: "<button type=\"submit\">Прати</button>" }] },
  ],
  slug: "R9-review-forms"
};