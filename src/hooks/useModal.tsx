import { isFunction } from 'lodash-es'
import {
  ComponentInternalInstance,
  PropType,
  computed,
  createApp,
  defineComponent,
  getCurrentInstance,
  isVNode,
  ref
} from 'vue'
import { ElButton, ElDialog } from 'element-plus'

interface IModalOptions {
  title?: string
  content: ComponentInternalInstance | (() => JSX.Element)
  onComfirm?: () => void
  onCancel?: () => void
  props?: {
    [propName: string]: unknown
  }
}

const Modal = defineComponent({
  props: {
    options: {
      type: Object as PropType<IModalOptions>,
      default: () => {}
    }
  },
  setup(props) {
    const instance = getCurrentInstance()!

    const isShow = ref(false)
    const getOptions = computed({
      get: () => props.options,
      set: (options: IModalOptions) => {
        return options
      }
    })

    const methods = {
      service: (options: IModalOptions) => {
        getOptions.value = options
        methods.show()
      },
      show: () => (isShow.value = true),
      hide: () => (isShow.value = false)
    }

    const handlder = {
      onComfirm: () => {
        if (getOptions.value.onComfirm?.()) {
          methods.hide()
        }
      },
      onCancel: () => {
        if (getOptions.value.onCancel?.()) {
          methods.hide()
        }
      }
    }

    Object.assign(instance.proxy!, methods)

    return () => (
      <ElDialog v-model={isShow.value} title={getOptions.value.title}>
        {{
          default: () =>
            isVNode(getOptions.value.content) ? (
              <content />
            ) : isFunction(getOptions.value.content) ? (
              getOptions.value.content()
            ) : null,
          footer: () => (
            <>
              {getOptions.value.onCancel && <ElButton onClick={handlder.onCancel}>取消</ElButton>}
              {getOptions.value.onComfirm && (
                <ElButton type="primary" onClick={handlder.onComfirm}>
                  确定
                </ElButton>
              )}
            </>
          )
        }}
      </ElDialog>
    )
  }
})

export const useModal = (() => {
  let instance: any
  return (options: IModalOptions) => {
    // TODO: 暂时不复用，传进来的内容可能不是响应式的
    // if (instance) {
    //   instance.service(options)
    //   return instance
    // }

    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(Modal, { options })
    instance = app.mount(div)

    instance.service(options)
    return instance
  }
})()
