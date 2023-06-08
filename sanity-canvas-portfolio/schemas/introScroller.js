import { defineType, defineField } from "sanity"

export default defineType({
    name: 'introScrollerSite',
    title: '[1]Intro Scroller',
    type: 'document',
    fields: [
        defineField({
            name: 'heading1',
            title: 'Überschrift 1',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'heading2',
            title: 'Überschrift 2',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'buttonTop',
            title: 'Oberer Button',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'buttonBottom',
            title: 'Unterer Button',
            type: 'array',
            of: [{ type: "string" }],
        }),
    ],

    preview: {
        prepare() {
            return { title: "Intro Scroller" }
        }
    },
})
