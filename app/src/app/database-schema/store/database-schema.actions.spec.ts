import * as fromDatabaseSchema from './database-schema.actions';

describe('loadDatabaseSchemas', () => {
  it('should return an action', () => {
    expect(fromDatabaseSchema.loadDatabaseSchemas().type).toBe('[DatabaseSchema] Load DatabaseSchemas');
  });
});
