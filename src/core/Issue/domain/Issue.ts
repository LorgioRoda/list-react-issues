import { Comment } from "../../comments/domain/Comment"

export interface Issue {
    id: string,
    title: string,
    state: State,
    comments: Comment[],
    url: string
}

export enum State {
    open= 'open',
    close = 'closed'
}