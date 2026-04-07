import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
