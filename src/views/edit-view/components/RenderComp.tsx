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
    const renderFn = uiComponents[props.element.type].render
    return renderFn
  }
})
