import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Note } from '../notes/entities/note.entity';
import { Tenant } from '../notes/entities/tenant.entity';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10) || 5433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Tenant, Note],
  synchronize: false,
  logging: false,
});

async function seedTenants() {
  await dataSource.initialize();
  try {
    const repo = dataSource.getRepository(Tenant);

    const desired = ['tenant1'];

    for (const tenantId of desired) {
      const existing = await repo.findOne({ where: { tenantId } });
      if (!existing) {
        const t = repo.create({ tenantId });
        await repo.save(t);
        console.log(`Inserted tenant: ${tenantId}`);
      } else {
        console.log(`Tenant already exists: ${tenantId}`);
      }
    }
  } finally {
    await dataSource.destroy();
  }
}

seedTenants().catch((err) => {
  console.error('Tenant seed failed:', err);
  process.exit(1);
});
