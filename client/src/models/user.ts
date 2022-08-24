import { Post } from "./post"
import { Comment } from "./comment"
import { Bookmark } from "./bookmark"

export interface User {
    id: string
    username: string
    posts: Post[]
    comments: Comment[]
    bookmarks: Bookmark[]
}