import {reactive} from "@vue/reactivity";

const person = reactive({
    name: '张三',
    get aliasName() {
        return this.name + '帅气'
    }
})

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        console.log('key:', key)
        // target[key] 不会触发get
        // receiver[key] 会一直触发get 死循环
        return Reflect.get(target, key, receiver)
    },
})

console.log(proxyPerson.aliasName)
