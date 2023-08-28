import { PropType, defineComponent } from 'vue'
import uiComponents from '@/components/UIComponents'
import type { IUIComponent } from '#/components'

export default defineComponent({
  name: 'RenderComp',
  props: {
    element: {
      type: Object as PropType<IUIComponent>,
      default: () => {}
    }
  },
  setup(props) {
    return () => {
      return uiComponents[props.element.type].render({
        props: props.element.props || {}
      })
    }
  }
})
