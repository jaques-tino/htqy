import { DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if ('native' in binding.modifiers) {
      ;(el.children?.[0] as HTMLElement).focus()
      return
    }
    el.focus()
  }
}
