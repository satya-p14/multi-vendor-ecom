import type { CollectionConfig,  } from 'payload'
import { CollectionSlug } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'color',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo:"categories" as CollectionSlug,
      hasMany: false,
    },
    {
      name: 'subcategories',
      type: 'join',
      collection:"categories" as CollectionSlug,
      on: 'parent',
      hasMany: true,
    }

  ]
}
