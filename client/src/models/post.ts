import { Bookmark } from "./bookmark"
import { Comment } from "./comment"
import { PostTag } from "./post_tag"
import { User } from "./user"

export interface Post {
    uuid: string
    url: string
    created_at: string
    user_id: string
    description: string
    user: User
    comments: Comment[]
    bookmarks: Bookmark[]
    post_tags: PostTag[]
}