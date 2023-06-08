import { defineType, defineField } from "sanity"

export default defineType({
    name: 'home',
    title: '[0]Startseite',
    type: 'document',
    fields: [
        defineField({
            name: 'headingLeft',
            title: 'Überschrift linke Seite',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'subheadingLeft',
            title: 'Subheading linke Seite',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'callToActionBtnLeft',
            title: 'Call to action Button',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'imgRight',
            title: 'Bild rechte Seite',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],

    preview: {
        prepare(){
            return {title: "Startseite"}
        }
    },
})
