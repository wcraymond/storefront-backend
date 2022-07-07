import { UserStore } from '../../../../src/models/user';

const userStore = new UserStore();

describe('User model', () => {
  it('should have an index method', () => {
    expect(userStore.index).toBeDefined();
  });
  
  it('should have a show method', () => {
    expect(userStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(userStore.delete).toBeDefined();
  });

  it('index method should list all users', async () => {
    const result = await userStore.index();
    expect(result).toEqual([]);
  });

  it('create method should add user', async () => {
    const result = await userStore.create({
      first_name: 'William',
      last_name: 'Raymond',
      password: 'badPassword'
    });
    expect(result).toEqual({
      id: 2,
      first_name: 'William',
      last_name: 'Raymond',
      password: 'badPassword'
    });
  });

  it('show method should return the specified user', async () => {
    const result = await userStore.show('2');
    expect(result).toEqual({
      id: 2,
      first_name: 'William',
      last_name: 'Raymond',
      password: 'badPassword'
    });
  });

  it('update method should update a user', async () => {
    const result = await userStore.update({
      id: 2,
      first_name: 'Caroline',
      last_name: 'Chen',
      password: 'newPassword'
    });
    expect(result).toEqual({
      id: 2,
      first_name: 'Caroline',
      last_name: 'Chen',
      password: 'newPassword'
    });
  });

  it('delete method should remove a user', async () => {
    await userStore.delete('2');
    const result = await userStore.index();
    expect(result).toEqual([]);
  });
});
