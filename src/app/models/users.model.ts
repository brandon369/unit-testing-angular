export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role?: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<User, 'id'>{
  avatar?: string
}
