import { defineType, defineField } from "sanity"

export default defineType({
    name: 'nav',
    title: '[Navigation]',
    type: 'document',
    fields: [
        defineField({
            name: 'navlink',
            title: 'Links',
            type: 'array',
            of: [{ type: "navlink" }],
        }),
    ],

    preview: {
        select: {
            title: 'heading',
        },
    },
})
