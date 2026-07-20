export default {
  id: 106,
  type: "review",
  label: "concept",
  groups: [
    {
      items: [
        { code: "hsl(25 76% 31%)\nhsl(25 76% 55%)" },
        { code: "rgb(0 0 0 / 0.15)" },
        { code: ":root {\n  --brand: hsl(25 76% 31%);\n}\n\nh1 {\n  color: var(--brand);\n}" },
      ]
    },
    {
      items: [
        { code: "background-color: var(--brand-dark);\nbackground-image: url(\"hero.jpg\");\nbackground-size: cover;" },
        { code: "background-image:\n  linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)),\n  url(\"hero.jpg\");" },
        { code: "box-shadow:\n  0 1px 2px rgb(0 0 0 / 0.06),\n  0 4px 12px rgb(0 0 0 / 0.1);" },
      ]
    },
    {
      items: [
        {},
        {},
        { code: "border: 1px solid hsl(25 76% 31);" },
      ]
    },
  ],
  slug: "R6-review-colors"
};