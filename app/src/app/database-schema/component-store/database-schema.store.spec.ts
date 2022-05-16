import { DatabaseSchemaStore } from './database-schema.store';

describe('DatabaseSchemaStore', () => {
  const componentStore = new DatabaseSchemaStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
