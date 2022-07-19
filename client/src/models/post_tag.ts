import { Post } from "./post"
import { Tag } from "./tag"

export interface PostTag {
    uuid: string
    post_uuid: string
    tag_ui: string
    post: Post
    tag: Tag
}