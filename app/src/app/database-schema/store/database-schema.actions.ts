import { createAction, props } from '@ngrx/store';

export const loadDatabaseSchemas = createAction(
  '[DatabaseSchema] Load DatabaseSchemas'
);

export const loadDatabaseSchemasSuccess = createAction(
  '[DatabaseSchema] Load DatabaseSchemas Success',
  props<{ data: any }>()
);

export const loadDatabaseSchemasFailure = createAction(
  '[DatabaseSchema] Load DatabaseSchemas Failure',
  props<{ error: any }>()
);
