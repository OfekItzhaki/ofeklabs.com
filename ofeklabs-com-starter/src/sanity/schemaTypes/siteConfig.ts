export const siteConfig = {
    name: 'siteConfig',
    title: 'Site Configuration',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Company Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'tagline',
            title: 'Company Tagline',
            type: 'string',
            description: 'Short tagline for the hero section',
        },
        {
            name: 'description',
            title: 'Company Description',
            type: 'text',
            description: 'Used in meta description and about section',
        },
        {
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule: any) => Rule.email(),
        },
        {
            name: 'whatsapp',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'Format: +[country][number]',
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        },
        {
            name: 'socials',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'github', title: 'GitHub URL', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
                { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
            ]
        },
        {
            name: 'legal',
            title: 'Legal Links',
            type: 'object',
            fields: [
                { name: 'privacy', title: 'Privacy Policy URL', type: 'url' },
                { name: 'terms', title: 'Terms of Service URL', type: 'url' },
            ]
        },
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    validation: (Rule: any) => Rule.max(80),
                },
                {
                    name: 'subheadline',
                    title: 'Subheadline',
                    type: 'string',
                    validation: (Rule: any) => Rule.max(160),
                },
                {
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    validation: (Rule: any) => Rule.max(30),
                },
                {
                    name: 'ctaTarget',
                    title: 'CTA Target',
                    type: 'string',
                    description: 'Section ID (e.g., #products) or external URL',
                },
            ],
        },
    ],
};
