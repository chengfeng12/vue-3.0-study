<script>
import { h } from "vue";
// Vue3中函数式组件只能用函数式声明
function heading(props, context) {
  console.log(props, context)
  // return h(`h${props.level}`, context, props.test)
  return h(`h${props.level}`, context, context.slots)
}
heading.props = ['level']; // 静态属性声明，如果未定义，则获取不到值
export default heading
</script>
