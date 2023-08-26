interface IBaseDef {
  key: PropertyKey
  value: string | number
  label: string
}

type ToPropertyPrefix<N extends string = ''> = N extends '' ? '' : `${N}_`
type ToProperty<Property extends string, N extends string = ''> = N extends ''
  ? Property
  : `${ToPropertyPrefix<N>}${Property}`

type ToKeys<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
      readonly key: infer K
    }
    ? B['length'] extends 0
      ? [K]
      : [K, ...ToKeys<B>]
    : never
  : []
type ToValues<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
      readonly value: infer K
    }
    ? B['length'] extends 0
      ? [K]
      : [K, ...ToValues<B>]
    : never
  : []

type ToSingleKeyValue<T> = T extends {
  readonly key: infer K
  readonly value: infer V
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: V
      }
    : never
  : never

type ToKeyValue<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyValue<A>
    : MergeIntersection<ToSingleKeyValue<A> & ToKeyValue<B>>
  : []

type ToSingleKeyLabel<T> = T extends {
  readonly key: infer K
  readonly label: infer V
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: V
      }
    : never
  : never

type ToKeyLabel<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyLabel<A>
    : MergeIntersection<ToSingleKeyLabel<A> & ToKeyLabel<B>>
  : []

type ToSingleValueLabel<T> = T extends {
  readonly value: infer K
  readonly label: infer V
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: V
      }
    : never
  : never

type ToValueLabel<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleValueLabel<A>
    : MergeIntersection<ToSingleValueLabel<A> & ToValueLabel<B>>
  : []

type ToSingleKeyMap<T> = T extends {
  readonly key: infer K
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: T
      }
    : never
  : never

type ToKeyMap<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyMap<A>
    : MergeIntersection<ToSingleKeyMap<A> & ToKeyMap<B>>
  : []

/**
 *
 * @param defs 字典定义
 * @param namespace 命名空间前缀
 * @description 定义字典常量
 */
export function defineConstants<T extends readonly IBaseDef[], N extends string>(
  defs: T,
  namespace: N
) {
  const prefix = namespace ? `${namespace}_` : ''

  return {
    [`${prefix}KEYS`]: defs.map((item) => item.key),
    [`${prefix}VALUES`]: defs.map((item) => item.value),
    [`${prefix}KV`]: defs.reduce((map, item) => {
      return {
        ...map,
        [item.key]: item.value
      }
    }, {}),
    [`${prefix}KL`]: defs.reduce((map, item) => {
      return {
        ...map,
        [item.key]: item.label
      }
    }, {}),
    [`${prefix}VL`]: defs.reduce((map, item) => {
      return {
        ...map,
        [item.value]: item.label
      }
    }, {}),
    [`${prefix}MAP_BY_KEY`]: defs.reduce((map, item) => {
      return {
        ...map,
        [item.key]: item
      }
    }, {}),
    [`${prefix}LIST`]: defs
  } as MergeIntersection<
    {
      [K in ToProperty<'KEYS', N>]: ToKeys<T>
    } & {
      [K in ToProperty<'VALUES', N>]: ToValues<T>
    } & {
      [K in ToProperty<'KV', N>]: ToKeyValue<T>
    } & {
      [K in ToProperty<'KL', N>]: ToKeyLabel<T>
    } & {
      [K in ToProperty<'VL', N>]: ToValueLabel<T>
    } & {
      [K in ToProperty<'MAP_BY_KEY', N>]: ToKeyMap<T>
    } & {
      [K in ToProperty<'LIST', N>]: T
    }
  >
}

// example
// export const {
//   EXAMPLE_KEYS,
//   EXAMPLE_VALUES,
//   EXAMPLE_KV,
//   EXAMPLE_KL,
//   EXAMPLE_VL,
//   EXAMPLE_MAP_BY_KEY,
//   EXAMPLE_LIST,
// } = defineConstants(
//   [
//     {
//       key: 'INPUT',
//       value: 'input',
//       label: '输入框',
//     },
//     {
//       key: 'SELECT',
//       value: 'select',
//       label: '选择框',
//     },
//   ] as const,
//   'EXAMPLE'
// )
