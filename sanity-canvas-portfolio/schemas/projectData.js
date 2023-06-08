import { defineType, defineField } from "sanity"

export default defineType({
    title: "Projekt-Daten",
    name: 'projectData',
    type: 'object',
    fieldsets: [
        { name: "projectData", title: "Projekt erstellen / überarbeiten" }
    ],
    fields: [
        defineField({
            name: 'projectImg',
            title: 'Projekt Bild',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'projektHeading',
            title: 'Projekt Name',
            type: 'array',
            of: [{ type: "string" }],
        }),
        defineField({
            name: 'projectLiveLink',
            title: 'Link zum live Projekt',
            type: 'url'
        }),
        defineField({
            name: 'projectGithubLink',
            title: 'Link zum GithubRepo',
            type: 'url'
        }),
    ],
})
