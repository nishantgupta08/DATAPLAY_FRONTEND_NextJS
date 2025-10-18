// Centralized Schema Exports
export * from './organization';
export * from './course';
export * from './breadcrumb';
export * from './event';
export * from './faq';
export * from './review';
export * from './website';

// Combined schema generator for pages
export const generatePageSchemas = (schemas: Record<string, unknown>[]) => {
  return schemas.map((schema, index) => ({
    key: `schema-${index}`,
    type: 'application/ld+json',
    content: JSON.stringify(schema)
  }));
};
