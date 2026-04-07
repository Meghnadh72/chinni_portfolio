import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Exhibition", value: "Exhibition" },
          { title: "Workshop", value: "Workshop" },
          { title: "Shoot", value: "Shoot" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({ name: "date", title: "Start Date", type: "datetime" }),
    defineField({ name: "endDate", title: "End Date", type: "datetime" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "registrationUrl", title: "Registration URL", type: "url" }),
  ],
  orderings: [
    { title: "Date (Upcoming)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "eventType" },
  },
});
