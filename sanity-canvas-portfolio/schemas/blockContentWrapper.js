import { defineType, defineField } from "sanity"

export default defineType({
    name: 'blockContentWrapper',
    title: 'Block Content Wrapper',
    type: 'object',
    fields: [
        defineField({
            name: 'blockContent',
            title: 'Block Content',
            type: 'array',
            of: [{ type: "block" }],
        }),
    ],
})
