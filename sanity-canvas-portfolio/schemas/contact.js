import { defineType, defineField } from "sanity"

export default defineType({
    name: 'contact',
    title: '[3]Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Überschrift',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'email',
            title: 'E-Mail',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'message',
            title: 'Nachricht',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'lawText',
            title: 'Rechtshinweis',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'sendMessage',
            title: 'Nachricht Senden',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: "reqSuccess",
            title: "Anfrage Erfolg",
            type: "array",
            of: [{ type: "string" }]
        }),
        defineField({
            name: "reqFail",
            title: "Anfrage Technischer Fehler",
            type: "array",
            of: [{ type: "string" }]
        }),
    ],

    preview: {
        prepare() {
            return { title: "Contactsite" }
        }
    },
})
