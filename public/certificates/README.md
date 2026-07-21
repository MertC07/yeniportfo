# Certificate files

Drop certificate PDFs or images here, then point the matching entry's
`href` in `lib/data.ts` and `lib/data.tr.ts` at them:

```ts
{
  title: "C# Programlama",
  issuer: "BTK Akademi",
  issued: "Eyl 2025",
  href: "/certificates/csharp-btk.pdf",
}
```

Clicking anywhere on the card opens the file in a new tab. Entries
without an `href` still render — they just aren't clickable.

Keep filenames lowercase with dashes, no spaces or Turkish characters,
so the URLs stay clean.
