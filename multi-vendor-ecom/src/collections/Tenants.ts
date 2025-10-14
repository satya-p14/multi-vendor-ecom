import type { CollectionConfig } from 'payload';

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    admin: {
        useAsTitle: 'slug', //subdomain
    },
    fields: [
        {
            name: "name",
            required: true,
            type: "text",
            label: "Store Name",
            admin: {
                description: "This is the name of store ( e.g. Satya's Store)."
            }
        },
        {
            name: "slug", // subdomain
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                description: "This is the sub-domain of store ( e.g. [slug].satyastore.com)."
            }
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            admin: {
                readOnly: true
            }
        },
        {
            name: "stripeDetailsSubmitted",
            type: "checkbox",            
            admin: {
                readOnly: true,
                description:"You cannot create products until you submit your Stripe details."
            }
        }
    ],
};
