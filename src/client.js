import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: "9066j25b",
  dataset: 'production',
  apiVersion: '2021-10-21', // use a UTC date string
  token: '', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})