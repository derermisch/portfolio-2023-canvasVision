import { defineType, defineField } from "sanity"

export default defineType({
    name: 'projects',
    title: 'Projekte',
    type: 'document',
    fields: [
        defineField({
            name: "projectsHeading",
            title: "Projektseite - Überschrift",
            type: "array",
            of: [{ type: "string" }]
        }),
        defineField({
            name: "projectsSubheading",
            title: "Projektseite - Subheading",
            type: "array",
            of: [{ type: "string" }]
        }),
        defineField({
            name: 'projectItems',
            title: 'Projekt Einträge',
            type: 'array',
            of: [{ type: "projectItem" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "Projekte" }
        }
    },
})
