import { defineType, defineField } from "sanity"

export default defineType({
    name: 'projectsite',
    title: '[1]Projektseite',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'projectsArray',
            title: 'Alle Projekte',
            type: 'array',
            of: [{ type: 'projectData' }],
        }),
    ],

    preview: {
        prepare(){
            return {title: "Projektseite"}
        }
    },
})
