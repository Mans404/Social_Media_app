export type ActionType = 'like' | 'dislike' | 'save';

export class Action {
  id: number;
  type: ActionType;
  userid: number;
  postid: number | null;
  commentid: number | null;

  constructor(data: { id: number; type: ActionType; userid: number; postid?: number | null; commentid?: number | null }) {
    this.id = data.id;
    this.type = data.type;
    this.userid = data.userid;
    this.postid = data.postid ?? null;
    this.commentid = data.commentid ?? null;
  }
}
