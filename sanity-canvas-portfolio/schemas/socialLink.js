import { defineType, defineField } from "sanity"

export default defineType({
    name: 'socialLink',
    title: 'Social Link',
    type: 'object',
    fields: [
        defineField({
            name: 'linkName',
            title: 'Link Name',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'iconPng',
            title: 'Icon',
            type: 'image',
        }),
    ],

    preview: {
        prepare() {
            return { title: "(Doppelklick)" }
        }
    },
})
