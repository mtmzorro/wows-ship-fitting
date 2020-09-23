import React, { useMemo, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
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

    const handleTouchStart = (e) => {
        xCurPosition.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
        const endXposition = e.changedTouches[0].clientX
        const xResult = endXposition - xCurPosition.current
        // 左滑动 为负值
        if (xResult < 0) {
            showButton()
        } else {
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
    // return useMemo(() => {
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
    // }, [xPosition])
}

export default SwipeAction
