import { PropType, defineComponent } from 'vue'
import uiComponents from '@/components/UIComponents'
import type { IFieldConfig } from '#/editor'

export default defineComponent({
  name: 'RenderComp',
  props: {
    element: {
      type: Object as PropType<IFieldConfig>,
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
