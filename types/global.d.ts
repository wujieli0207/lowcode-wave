import type { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
  declare type Nullable<T> = T | null

  declare type MergeIntersection<A> = A extends infer T ? { [K in keyof T]: T[K] } : never

  declare type ValueOf<T> = T[keyof T]
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
