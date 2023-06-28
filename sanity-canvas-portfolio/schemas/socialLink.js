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
        defineField({
            name: 'linkAddress',
            title: 'Link Addresse',
            type: 'string',
        }),
    ],

    preview: {
        prepare() {
            return { title: "Social link" }
        }
    },
})
