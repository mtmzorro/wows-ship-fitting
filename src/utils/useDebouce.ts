import { useState, useRef } from 'react'

/**
 * useDebouce 防抖 Hook
 * @param value 防抖目标
 * @param delay 延时
 */
const useDebouce = (value: any, delay: number = 300) => {
    const [deboucedValue, setDeboucedvalue] = useState(value)

    // useRef 实现
    const rtimeRef = useRef<any>()
    clearTimeout(rtimeRef.current)
    rtimeRef.current = setTimeout(() => {
        setDeboucedvalue(value)
    }, delay)

    return deboucedValue
}

export default useDebouce
