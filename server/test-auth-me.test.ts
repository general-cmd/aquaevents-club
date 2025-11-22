import { describe, it, expect } from 'vitest';
import { getUser } from './server/db';

describe('Auth.me endpoint test', () => {
  it('should return user with userType and role fields', async () => {
    const user = await getUser('iwsTGnfwAcRK3m3JEmXKDb');
    
    console.log('User object from getUser():');
    console.log(JSON.stringify(user, null, 2));
    
    expect(user).toBeDefined();
    expect(user?.userType).toBe('other');
    expect(user?.role).toBe('admin');
    expect(user?.preferredDisciplines).toBe('["Otros"]');
  });
});
