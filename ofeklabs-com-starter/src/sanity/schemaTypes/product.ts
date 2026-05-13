export const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'Product ID',
            type: 'slug',
            description: 'Unique identifier (e.g., shifter, horizon-flux)',
            validation: (Rule: any) => Rule.required(),
            options: {
                source: 'title',
                maxLength: 50,
            },
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Short one-liner for the product',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Live', value: 'active' },
                    { title: 'Beta', value: 'beta' },
                    { title: 'Development', value: 'dev' },
                    { title: 'Coming Soon', value: 'coming-soon' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            description: 'Badge to display (e.g., LIVE, BETA, NEW)',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'url',
            title: 'Product URL',
            type: 'url',
            description: 'e.g., https://shifter.ofeklabs.com',
            validation: (Rule: any) => Rule.required().uri({
                scheme: ['http', 'https']
            }),
        },
        {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule: any) => Rule.required().min(1),
        },
        {
            name: 'screenshot',
            title: 'Product Screenshot',
            type: 'image',
            description: 'Screenshot or mockup of the product',
            options: {
                hotspot: true,
            },
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
            title: 'title',
            subtitle: 'badge',
            media: 'screenshot',
        },
    },
};
