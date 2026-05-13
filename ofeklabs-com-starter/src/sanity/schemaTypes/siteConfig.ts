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
        {
            name: 'subdomains',
            title: 'Product Subdomains',
            type: 'array',
            description: 'List of subdomains to auto-discover products from (e.g., "shifter" for shifter.ofeklabs.com)',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'slug',
                            title: 'Subdomain Slug',
                            type: 'string',
                            description: 'Just the subdomain part (e.g., "shifter")',
                            validation: (Rule: any) => Rule.required().regex(/^[a-z0-9-]+$/, { name: 'slug', invert: false }),
                        },
                        {
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        },
                        {
                            name: 'overrideName',
                            title: 'Override Display Name',
                            type: 'string',
                            description: 'Optional: override the scraped product name',
                        },
                        {
                            name: 'overrideTagline',
                            title: 'Override Tagline',
                            type: 'string',
                            description: 'Optional: override the scraped tagline',
                        },
                        {
                            name: 'status',
                            title: 'Product Status',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Active', value: 'active' },
                                    { title: 'Beta', value: 'beta' },
                                    { title: 'In Development', value: 'dev' },
                                    { title: 'Coming Soon', value: 'coming-soon' },
                                ],
                            },
                            initialValue: 'active',
                        },
                        {
                            name: 'order',
                            title: 'Display Order',
                            type: 'number',
                            description: 'Lower numbers appear first',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'slug',
                            subtitle: 'status',
                        },
                        prepare({ title, subtitle }: { title: string; subtitle: string }) {
                            return {
                                title: `${title}.ofeklabs.com`,
                                subtitle: subtitle || 'active',
                            };
                        },
                    },
                },
            ],
        },
    ],
};
