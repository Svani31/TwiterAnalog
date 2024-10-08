interface RegisterTypes {
  id?: string;
  name: string;
  email: string;
  password: string;
  image: any;
  myChat?:ChatProps
  message?:MessageProps[]
}
interface SessionProps {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  name: string;
  image: string;
  sub: string;
  id:string;
}

interface PostProps {
  id: string;
  content: string;
  createdAt: string;
  image:string;
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

interface ChatProps {
  id:string;
  myUserId:string;
  reciverUserId:string
  message:MessageProps[]
}

interface MessageProps {
  id:string;
  context:string;
  image:string;
  userId:string;
  createdAt:string;
  chatId:string
}