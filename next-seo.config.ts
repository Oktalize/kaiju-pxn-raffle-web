export const title = 'Kaiju PXN Raffle'
const description = 'Run the raffle from the contract'
const url = 'https://kaijukingz.io'

const SEO = {
    title,
    description,
    canonical: url,
    openGraph: {
        type: 'website',
        url,
        title,
        description
    },
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.png'
        }
    ]
}

export default SEO
