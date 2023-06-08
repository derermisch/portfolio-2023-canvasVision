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
    ],

    preview: {
        prepare(){
            return {title: "(Doppelklick)"}
        }
    },
})
