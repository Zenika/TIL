import { Post } from "./post"
import { User } from "./user"

export interface Bookmark {
    uuid: string
    created_at: string
    post_uuid: string
    user_id: string
    post: Post
    user: User
}