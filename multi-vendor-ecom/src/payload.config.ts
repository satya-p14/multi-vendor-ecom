// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Tenants } from './collections/Tenants';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';
import { Products } from './collections/Products';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media , Categories , Products , Tags , Tenants],
  cookiePrefix: 'mv-tenant',
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin(
      {
        collections: {
          // Add valid collection configuration here if needed, e.g. 'users'
          products:{}
        },
        tenantsArrayField: {
          includeDefaultField: false,
        },
        userHasAccessToAllTenants: (user: any) => Array.isArray(user?.roles) && user.roles.includes("super-admin")
        // userHasAccessToAllTenants: (user:any) => Boolean(user?.roles?.includes("super-admin"))
      })
    // storage-adapter-placeholder
  ],
});
