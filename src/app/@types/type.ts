interface RegisterTypes {
  id?: string;
  name: string;
  email: string;
  password: string;
  image: any;
}
interface SessionProps {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  name: string;
  picture: string;
  sub: string;
}

interface PostProps {
  id: string;
  content: string;
  createdAt: string;
  updateAt: string;
  userId: string;
  comment:CommentsProps[]
}

interface CommentsProps {
  id: string;
  context: string;
  createdAt: string;
  userId: string;
  postId: string;
}
