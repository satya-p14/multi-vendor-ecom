import type { CollectionConfig, CollectionSlug,  } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                step: 0.01,
                description: 'In INR'
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: 'categories' as CollectionSlug,
            hasMany: false,
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: 'tags' as CollectionSlug,
            hasMany: true,
        },
        {
            name: "images",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "refundPolicy",
            type: "select",
            options: [
                { label: "No Refund", value: "noRefund" },
                { label: "7 Days", value: "7Days" },
                { label: "30 Days", value: "30Days" },
                { label: "60 Days", value: "60Days" },
            ],
            defaultValue: "30Days",
        },
        {
            name: "isActive",
            type: "checkbox",
            defaultValue: true,
        }
        // Add other fields as necessary
    ],

};