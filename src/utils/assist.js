
/**
 * 向上找到最近的指定组件
 * @param {*} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找的组件的 name
 */
function findComponentUpward (context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name

    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

/**
 * 向上找到所有的指定组件
 * @param {*} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找的组件的 name
 */
function findComponentsUpward (context, componentName) {
    let parents = []
    const parent = context.$parent

    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}

/**
 * 向下找到最近的指定组件
 * @param {*} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找的组件的 name
 */
function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null

    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name

            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}

/**
 * 向下找到所有指定的组件
 * @param {*} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找的组件的 name
 */
function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}

/**
 * 找到指定组件的兄弟组件
 * @param {*} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {*} componentName 要找的组件的 name
 * @param {*} exceptMe 是否把本身除外，默认是 true
 */
function findBrothersComponents (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
    })
    let index = res.findIndex(item => item._uid === context._uid)
    if (exceptMe) res.splice(index, 1)
    return res
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}
