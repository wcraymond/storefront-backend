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

  it('index method should list all users', async () => {
    const result = await userStore.index();
    expect(result).toEqual([
      {
        id: 1,
        username: 'raymondw',
        first_name: 'William',
        last_name: 'Raymond',
        password: result[0].password
      },
      {
        id: 2,
        username: 'newuser',
        first_name: 'New',
        last_name: 'User',
        password: result[1].password
      }
    ]);
  });

  it('create method should add user', async () => {
    const result = await userStore.create({
      username: 'chenc',
      first_name: 'Caroline',
      last_name: 'Chen',
      password: 'badPassword'
    });
    expect(result).toEqual({
      id: 3,
      username: 'chenc',
      first_name: 'Caroline',
      last_name: 'Chen',
      password: result.password
    });
  });

  it('show method should return the specified user', async () => {
    const result = await userStore.show('3');
    expect(result).toEqual({
      id: 3,
      username: 'chenc',
      first_name: 'Caroline',
      last_name: 'Chen',
      password: result.password
    });
  });

  it('should authenticate a user with the correct password', async () => {
    const result = await userStore.authenticate('chenc', 'badPassword');
    expect(result).toEqual({
      id: 3,
      username: 'chenc',
      first_name: 'Caroline',
      last_name: 'Chen',
      password: result?.password as string
    })
  });

  it('should not authenticate a user with an incorrect password', async () => {
    const result = await userStore.authenticate('chenc', 'incorrectPassword');
    expect(result).toBeNull();
  });

  it('should not authenticate a user that does not exist', async () => {
    const result = await userStore.authenticate('bogusUsername', 'bogusPassword');
    expect(result).toBeNull();
  });
});
