import { defineType, defineField } from "sanity"

export default defineType({
    title: "Projekt Item",
    name: 'projectItem',
    type: 'object',
    fields: [
        defineField({
            name: 'desktopImage',
            title: 'Desktop Image',
            type: 'image',
        }),
        defineField({
            name: 'mobileImage',
            title: 'Mobile Image',
            type: 'image',
        }),
        defineField({
            name: 'projectHeading',
            title: 'Projekt Überschrift',
            type: 'array',
            of: [{ type: "string" }]
        }),
        defineField({
            name: 'projectDescription',
            title: 'Projekt Beschreibung',
            type: 'array',
            of: [{ type: "string" }]
        }),
        defineField({
            name: 'callToActionText',
            title: 'Call to Action Text Button',
            type: 'array',
            of: [{ type: "string" }]
        }),
        defineField({
            name: 'backgroundColor',
            title: "Hintergrundfarbe",
            type: "string"
        }),
        defineField({
            name: 'callToActionColor',
            title: "Call to action Farbe",
            type: "string"
        }),
        defineField({
            name: "callToActionLink",
            title: "Link Adresse",
            type: "string"
        })
    ],
})
