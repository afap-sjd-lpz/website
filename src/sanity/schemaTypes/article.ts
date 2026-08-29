import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Artículo",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "summary",
      title: "Resumen",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),

    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "accessibleImage",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "content",
      title: "Contenido",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "topics",
      title: "Temáticas",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "topic" }],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "date",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "reviewedAt",
      title: "Última revisión",
      type: "date",
    }),

    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      date: "publishedAt",
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? `Publicado: ${date}` : "Sin fecha de publicación",
      };
    },
  },
});
