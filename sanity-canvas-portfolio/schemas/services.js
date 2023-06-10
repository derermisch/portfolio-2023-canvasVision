import { defineType, defineField } from "sanity"

export default defineType({
    name: 'services',
    title: '[2]Services',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'serviceItemsArray',
            title: 'Service Items',
            type: 'array',
            of: [{ type: 'serviceItems' }],
        }),
        defineField({
            name: 'contactBtn',
            title: 'Kontakt Button',
            type: 'array',
            of: [{ type: "string" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "Services" }
        }
    },
})
