import { activeEffect, trackEffect, triggerEffect } from './effect'

const targetMap = new WeakMap()

export const createDep = (cleanup, key) => {
    const dep = new Map() as any
    dep.cleanup = cleanup
    dep.name = key
    return dep
}

export function track(target, key) {
    // activeEffect 有这个属性，说明这个 key是在effect 中访问的，没有说明在 effect 之外不用处理

    if (activeEffect) {
        let depsMap = targetMap.get(target)

        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }

        let dep = depsMap.get(key)

        if (!dep) {
            depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key)))
        }

        // 将当前 effect 放入dep 中，后续可以根据值的变化触发此 dep中存放的 effect
        trackEffect(activeEffect, dep)
    }
}

export function trigger(target, key, value, oldValue) {
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }

    const dep: Map<any, any> = depsMap.get(key)
    if (dep) {
        triggerEffect(dep)
    }
}
