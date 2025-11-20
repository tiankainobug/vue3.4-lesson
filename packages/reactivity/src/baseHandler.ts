import { activeEffect } from './effect'
import { track, trigger } from './effectAcive'

export enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
}

// proxy 需要搭配 reflect 来使用
export const mutableHandlers: ProxyHandler<any> = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }

        // 取值的时候 让响应式属性和 effect 映射起来

        // 依赖收集
        track(target, key)

        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        // 找到属性 让对应的effect重新执行
        let oldValue = target[key]

        let result = Reflect.set(target, key, value, receiver)

        if (oldValue !== value) {
            // 需要触发更新
            trigger(target, key, value, oldValue)
            return result
        }
        return result
    },
}
