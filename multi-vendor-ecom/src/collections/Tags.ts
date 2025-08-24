import type { CollectionConfig, CollectionSlug } from 'payload';

export const Tags: CollectionConfig = {
    slug: 'tags',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products' as CollectionSlug,
            hasMany: true,
        }
    ]
};
