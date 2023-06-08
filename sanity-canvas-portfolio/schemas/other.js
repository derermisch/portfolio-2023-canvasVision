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
    ],

    preview: {
        prepare() {
            return { title: "[OTHER]" }
        }
    },
})
