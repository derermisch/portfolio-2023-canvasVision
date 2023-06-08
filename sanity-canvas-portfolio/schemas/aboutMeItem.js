import { defineType, defineField } from "sanity"

export default defineType({
    title: "AboutMe Eintrag",
    name: 'aboutMeData',
    type: 'object',
    fields: [
        defineField({
            name: 'itemHeading',
            title: 'Item Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'itemTextDe',
            title: 'Item Text Deutsch',
            type: 'blockContent',
        }),
        defineField({
            name: 'itemTextEn',
            title: 'Item Text English',
            type: 'blockContent',
        }),
    ],
})
