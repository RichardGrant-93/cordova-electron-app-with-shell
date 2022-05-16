import { DetailsStore } from './details.store';

describe('DetailsStore', () => {
  const componentStore = new DetailsStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
