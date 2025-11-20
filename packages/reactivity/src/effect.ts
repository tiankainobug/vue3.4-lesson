export function effect(fn, options = {}) {
    // 创建一个响应式 effect，数据变化后可以重新执行

    // 创建一个 effect，只要依赖的属性变化了，就要执行回调
    const _effect = new ReactiveEffect(fn, () => {
        _effect.run()
    })
    _effect.run()
}

export let activeEffect: ReactiveEffect

class ReactiveEffect {
    _trackId = 0
    deps = []
    _depsLength = 0
    public active = true

    // fn: 用户传入的函数
    // scheduler: 响应式数据变化时，需要执行的函数
    constructor(
        public fn: Function,
        public scheduler: Function
    ) {}

    run() {
        if (!this.active) {
            return this.fn() // 不是激活的，执行后，怎么都不用做
        }
        let lastEffect = activeEffect
        try {
            activeEffect = this
            return this.fn()
        } finally {
            activeEffect = lastEffect
        }
    }
}

export const trackEffect = (effect, dep) => {
    dep.set(effect, effect._trackId)

    // 让effect 和 dep 关联起来
    effect.deps[effect._depsLength++] = dep
}

export const triggerEffect = (dep) => {
    for (const effect of dep.keys()) {
        if (effect.scheduler) {
            effect.scheduler()
        }
    }
}
