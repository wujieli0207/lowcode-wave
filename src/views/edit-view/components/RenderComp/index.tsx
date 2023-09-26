import { PropType, defineComponent } from 'vue'
import FieldToolbar from '../FieldToolbar'
import uiComponents from '@/components/UIComponents'
import type { IFieldConfig, IPageConfig } from '#/editor'
import styles from './index.module.scss'
import { useGlobalConfigStore } from '@/stores/modules/globalConfig'

export default defineComponent({
  name: 'RenderComp',
  props: {
    element: {
      type: Object as PropType<IFieldConfig>,
      default: () => {}
    },
    pageChildren: {
      type: Array as PropType<IPageConfig['children']>,
      default: () => {}
    }
  },
  setup(props) {
    const { globalConfig } = useGlobalConfigStore()

    return () => {
      return (
        <div class={styles['container']}>
          {props.element.isFocus && !globalConfig.isPreview && (
            <div class={styles['feild-toolbar']}>
              <FieldToolbar element={props.element} pageChildren={props.pageChildren} />
            </div>
          )}

          <div>
            {uiComponents[props.element.type].render({
              props: props.element.props || {},
              styles: props.element.styles || {},
              element: props.element
            })}
          </div>
        </div>
      )
    }
  }
})
