import { defineType, defineField } from "sanity"

export default defineType({
    name: 'aboutMe',
    title: 'About Me',
    type: 'document',
    fields: [
        defineField({
            name: 'aboutMeEntries',
            title: 'About Me Einträge',
            type: 'array',
            of: [{ type: "aboutMeEntry" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "About Me" }
        }
    },
})
