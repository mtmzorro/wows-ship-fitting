import React, { useRef, useState } from 'react'
import { View, MovableArea, MovableView, Text } from '@tarojs/components'
import './swipeAction.scss'

export type ClickType = 'delete' | 'cancel'

interface Props {
    onClick: () => void
    classname: string
}

const SwipeAction: React.FC<Props> = (props) => {
    const { onClick, classname, children } = props

    const [xPosition, setXPosition] = useState(0)
    const xCurPosition = useRef(0)
    const yCurPosition = useRef(0)

    const handleTouchStart = (e) => {
        xCurPosition.current = e.touches[0].clientX
        yCurPosition.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e) => {
        const endXposition = e.changedTouches[0].clientX
        const endYposition = e.changedTouches[0].clientY
        const xResult = endXposition - xCurPosition.current
        const yResult = endYposition - yCurPosition.current
        // 快速滑动屏幕误触发规避
        if (Math.abs(yResult) > 50){
            return
        }
        // 左滑动 为负值
        if (xResult < -30) {
            showButton()
        } else {
            setXPosition(xResult)
            hideButton()
        }
    }

    // 控制滑动状态
    const hideButton = () => {
        setXPosition(0)
    }
    const showButton = () => {
        setXPosition(-240)
    }

    // 触发 button
    const handleCancel = () => {
        hideButton()
        onClick.call(this, 'cancel')
    }
    const handleDelete = () => {
        hideButton()
        onClick.call(this, 'delete')
    }
    return (
        <View className={`swipe-action ${classname}`}>
            {console.log('swipe-action render')}
            <View className='swipe-action__item item'>
                <MovableArea className='item__movable-area'>
                    <MovableView
                        className='item__movable-view'
                        outOfBounds
                        direction='horizontal'
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        x={xPosition}
                    >
                        {children}
                    </MovableView>
                </MovableArea>
            </View>
            <View className='swipe-action__operation operation'>
                <View
                    className='operation__button operation__button--cancel'
                    onClick={handleCancel}
                >
                    <Text>取消</Text>
                </View>
                <View
                    className='operation__button operation__button--delete'
                    onClick={handleDelete}
                >
                    <Text>删除</Text>
                </View>
            </View>
        </View>
    )
}

export default SwipeAction
