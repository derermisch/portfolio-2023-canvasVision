import { defineType, defineField } from "sanity"

export default defineType({
    name: 'navlink',
    title: 'Nav-Link',
    type: 'object',
    fields: [
        defineField({
            name: 'navlink',
            title: 'Nav Link',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string'
        }),
        defineField({
            name: 'route',
            title: 'Route',
            type: 'string'
        }),
        defineField({
            name: 'scrollToClassName',
            title: 'Scroll To Klassen Name',
            type: 'string'
        }),
    ],

    preview: {
        prepare() {
            return { title: "(Doppelklick)" }
        }
    },
})
