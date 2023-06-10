import { defineType, defineField } from "sanity"

export default defineType({
    title: "Service Eintrag",
    name: 'serviceItems',
    type: 'object',
    fields: [
        defineField({
            name: 'serviceItem',
            title: 'Service',
            type: 'array',
            of: [{ type: "string" }],
        }),
    ],
})
