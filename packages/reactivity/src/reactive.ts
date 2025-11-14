import { isObject } from '@vue/shared'
import { mutableHandlers, ReactiveFlags } from './baseHandler'

const reavtiveMap = new WeakMap()

function createReactiveObject(target) {
    // 统一做判断，响应式对象必须是对象才可以
    if (!isObject(target)) {
        return target
    }

    // 如果是响应式的，直接返回
    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target
    }

    let proxy = new Proxy(target, mutableHandlers)

    // 取缓存，如果有则直接返回
    const exitsProxy = reavtiveMap.get(target)
    if (exitsProxy) {
        return exitsProxy
    }

    // 存进缓存
    reavtiveMap.set(target, proxy)
    return proxy
}

export function reactive(target) {
    return createReactiveObject(target)
}
