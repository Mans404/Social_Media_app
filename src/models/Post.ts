export type PostType = 'text' | 'video';

export class Post {
  id: number;
  title: string;
  userid: number;
  content: string;
  type: PostType;

  constructor(data: { id: number; title: string; userid: number; content: string; type: PostType }) {
    this.id = data.id;
    this.title = data.title;
    this.userid = data.userid;
    this.content = data.content;
    this.type = data.type;
  }
}
