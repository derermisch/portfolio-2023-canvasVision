import { defineType, defineField } from "sanity"

export default defineType({
    name: 'impressum',
    title: '[Impressum]',
    type: 'document',
    fields: [
        defineField({
            name: 'text_de',
            title: 'Impressum Text',
            type: 'blockContent',
        }),
        defineField({
            name: 'text_en',
            title: 'Impressum Text Englisch',
            type: 'blockContent',
        }),
    ],

    preview: {
        prepare(){
            return {title: "Impressum"}
        }
    },
})
