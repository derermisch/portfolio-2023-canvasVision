import { defineType, defineField } from "sanity"

export default defineType({
    name: 'aboutmesite',
    title: '[2]About Me',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'aboutMeArray',
            title: 'AboutMe Einträge',
            type: 'array',
            of: [{ type: 'aboutMeData' }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "AboutMe" }
        }
    },
})
