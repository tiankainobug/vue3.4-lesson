import {isObject} from "@vue/shared";

export function reactive(target) {
    return createReactiveObject(target)
}

const reavtiveMap = new WeakMap()
enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

const mutableHandlers:  ProxyHandler<any> = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
    },
    set(target, key, value, receiver) {
        return true
    }
}

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
