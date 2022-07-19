import { Post } from "./post"
import { User } from "./user"

export interface Comment {
    content: string
    created_at: string
    uuid: string
    post_uuid: string
    user_id: string
    post: Post
    user: User
}