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
  image: string;
  sub: string;
}

interface PostProps {
  id: string;
  content: string;
  createdAt: string;
  updateAt: string;
  userId: string;
  user:RegisterTypes
  comment:CommentsProps[]
  like:LikesProps[]
}

interface LikesProps {
  id:string;
  postId:string;
  userId:string;
}

interface CommentsProps {
  id: string;
  context: string;
  createdAt: string;
  userId: string;
  postId: string;
}

