import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string | null;
  }

  interface Session {
    user: {
      id?: string | null;
    } & DefaultSession['user'];
  }
}