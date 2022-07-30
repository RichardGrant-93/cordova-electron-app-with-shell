import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DatabaseSchemaEffects } from './database-schema.effects';

describe('DatabaseSchemaEffects', () => {
  let actions$: Observable<any>;
  let effects: DatabaseSchemaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseSchemaEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DatabaseSchemaEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
