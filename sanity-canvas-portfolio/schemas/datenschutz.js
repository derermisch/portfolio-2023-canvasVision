import { defineType, defineField } from "sanity"

export default defineType({
    name: 'datenschutz',
    title: '[Datenschutz]',
    type: 'document',
    fields: [
        defineField({
            name: 'text_de',
            title: 'Datenschutz Text',
            type: 'blockContent',
        }),
        defineField({
            name: 'text_en',
            title: 'Datenschutz Text Englisch',
            type: 'blockContent',
        }),
    ],

    preview: {
        prepare(){
            return {title: "Datenschutz"}
        }
    },
})
