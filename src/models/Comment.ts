
export class Comment {
  id: number;
  content: string;
  userid: number;
  postid: number;

  constructor(data: { id: number; content: string; userid: number; postid: number }) {
    this.id = data.id;
    this.content = data.content;
    this.userid = data.userid;
    this.postid = data.postid;
  }
}
