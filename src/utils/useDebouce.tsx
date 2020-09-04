import { useState, useRef } from 'react'

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
