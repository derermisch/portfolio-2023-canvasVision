import { defineType, defineField } from "sanity"

export default defineType({
    name: 'aboutMeEntry',
    title: 'About Me Eintrag',
    type: 'object',
    fields: [
        defineField({
            name: 'img',
            title: 'Profile pic',
            type: 'image',
        }),
        defineField({
            name: 'heading',
            title: 'Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'text',
            title: 'About me text',
            type: 'array',
            of: [{ type: "blockContentWrapper" }],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social links',
            type: 'array',
            of: [{ type: "socialLink" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "(Doppelklick)" }
        }
    },
})
