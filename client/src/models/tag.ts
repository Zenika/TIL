import { PostTag } from "./post_tag"

export interface Tag {
    uuid: string
    name: string
    post_tags: PostTag[]
}