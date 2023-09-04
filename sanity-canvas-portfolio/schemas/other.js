import { defineType, defineField } from "sanity"

export default defineType({
    name: 'other',
    title: '[OTHER]',
    type: 'document',
    fields: [
        defineField({
            name: 'spacerSvgCode',
            title: 'Spacer svg code',
            type: 'string',
        }),
        defineField({
            name: "spacerImg",
            title: "Spacer Image",
            type: "image"
        }),
        defineField({
            name: 'backgroundImages',
            title: 'Background Images',
            type: 'array',
            of: [{ type: "image" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "[OTHER]" }
        }
    },
})
