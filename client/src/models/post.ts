import { Bookmark } from "./bookmark"
import { Comment } from "./comment"
import { PostTag } from "./post_tag"
import { User } from "./user"
import { Aggregate } from "./aggregate"

export interface Post {
    uuid: string
    url: string
    created_at: string
    user_id: string
    description: string
    title: string
    user: User
    comments: Comment[]
    comments_aggregate: Aggregate
    bookmarks: Bookmark[]
    post_tags: PostTag[]
}