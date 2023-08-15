import { User } from './user.model';

describe('User Models', () => {
  fit('should create a User instance', () => {
    const user: User = {
      username: 'admin123',
      password: 'securePassword',
      role: 'ADMIN'
    };
    expect(user).toBeTruthy();
    expect(user.username).toBe('admin123');
    expect(user.password).toBe('securePassword');
    expect(user.role).toBe('ADMIN');
  });

  fit('should create a User instance with default values', () => {
    const user: User = {
      username: 'organizer456',
      password: 'anotherPassword',
      role: 'ORGANIZER'
    };
    expect(user).toBeTruthy();
    expect(user.username).toBe('organizer456');
    expect(user.password).toBe('anotherPassword');
    expect(user.role).toBe('ORGANIZER');
  });
});
