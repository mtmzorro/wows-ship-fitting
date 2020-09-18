import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Button, Text, Image, Label, Input, Textarea, Form } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { shipNameLocalize, commanderNameLocalize } from '../../utils/localization'
import { Fitting, User } from '../../type/types'
import { saveFitting, checkUserInfoSetting, getUserInfo } from '../../service/common'
import './fittingEditor.scss'
import { getShipImage } from '../../service/ship'
import { getCommanderByName, getCommanderImage } from '../../service/commander'
import { getSkillImage } from '../../service/skill'

// verifyModal
const verifyModal = (msg: string) => {
    Taro.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
    })
}

interface State {
    fittingEditor: Fitting
    user: User
}

const FittingEditor: React.FC = () => {

    // connect store
    const { fittingEditor, user } = useSelector((state) => {
        return { fittingEditor: state.fittingEditor, user: state.user }
    }) as State
    const dispatch = useDispatch()

    const [inputTitle, setInputTitle] = useState<string>(fittingEditor.title)
    const [inputDescription, setInputDescription] = useState<string>(fittingEditor.description)

    // selectors
    const handleShipSelector = () => {
        Taro.navigateTo({ url: '/pages/shipSelector/shipSelector' })
    }

    const handleCmdrSelector = () => {
        if (!fittingEditor.nation) {
            return verifyModal('请选择先选择对应国家战舰')
        }
        Taro.navigateTo({ url: '/pages/cmdrSelector/cmdrSelector' })
    }

    const handleSkillSelector = () => {
        Taro.navigateTo({ url: '/pages/skillSelector/skillSelector' })
    }

    // save Fitting Data
    const handleSave = () => {
        const cache = {
            authorNickName: user.nickName,
            authorOpenId: user.openId,
            shipId: fittingEditor.shipId,
            nation: fittingEditor.nation,
            commanderName: fittingEditor.commanderName,
            commanderSkill: fittingEditor.commanderSkill,
            upgrade: [],
            title: inputTitle,
            description: inputDescription,
        }

        if (!cache.shipId) {
            return verifyModal('请选择战舰')
        }
        if (!cache.commanderName) {
            return verifyModal('请选择舰长')
        }
        if (cache.commanderSkill[0].length <= 0) {
            return verifyModal('请选择舰长技能')
        }
        if (cache.title.length <= 0) {
            return verifyModal('请填写装配方案标题')
        }
        if (cache.description.length <= 0) {
            return verifyModal('请填写装配方案详情描述')
        }
        if (!cache.authorNickName || !cache.authorOpenId) {
            return verifyModal('获取微信用户名称异常')
        }

        Taro.showLoading({
            mask: true,
            title: '装配方案保存中',
        })
        saveFitting(cache)
            .then((result) => {
                Taro.hideLoading()
                Taro.showModal({
                    title: '提示',
                    content: '保存成功，点击确定前去查看方案并分享',
                    showCancel: false,
                    success: () =>{
                        Taro.navigateTo({ url: '/pages/index/index' })
                    }
                })
            })
            .catch((error) => {
                Taro.hideLoading()
                verifyModal('保存失败，网络或者服务器未响应。')
            })
    }

    const skillList = fittingEditor.commanderSkill.reduce((all, cur) => {
        return typeof cur === 'object' ? [...all, ...cur] : [...all, cur]
    }, [])

    return (
        <View className='fitting-editor'>
            <View className='section-title'>
                <View className='section-title__sub'>Editor</View>
                <View className='section-title__content'>编辑装配方案</View>
            </View>
            <View className='editor-item common-list'>
                <View className='common-list__line preview-area'>
                    <View className='common-list__line-container'>
                        <View className='preview-area__bg'>
                            {fittingEditor.shipId && (
                                <Image
                                    className='preview-area__ship'
                                    src={getShipImage(fittingEditor.shipId)}
                                />
                            )}
                            {fittingEditor.commanderName && (
                                <Image
                                    className='preview-area__commander'
                                    src={getCommanderImage(
                                        fittingEditor.commanderName,
                                        fittingEditor.nation
                                    )}
                                />
                            )}
                        </View>
                    </View>
                </View>
                <View className='common-list__line preview-selector'>
                    <View className='common-list__line-container'>
                        <View
                            onClick={handleShipSelector}
                            className='preview-selector__button common-list__activable'
                        >
                            <View className='line-content'>选择战舰</View>
                            <View className='line-extra'>&gt;</View>
                        </View>
                        <View
                            onClick={handleCmdrSelector}
                            className='preview-selector__button common-list__activable'
                        >
                            <View className='line-content'>选择舰长</View>
                            <View className='line-extra'>&gt;</View>
                        </View>
                    </View>
                </View>
            </View>
            <View className='editor-item common-list'>
                <View className='common-list__line skill-area'>
                    <View className='common-list__line-container'>
                        {skillList.length > 0 ? (
                            skillList.map((skillId) => {
                                return (
                                    <Image
                                        key={skillId}
                                        className='skill-area__image'
                                        src={getSkillImage(skillId)}
                                    />
                                )
                            })
                        ) : (
                            <View className='line-content skill-area__text'>请点击下方选择</View>
                        )}
                    </View>
                </View>
                <View
                    onClick={handleSkillSelector}
                    className='common-list__line common-list__activable'
                >
                    <View className='common-list__line-container'>
                        <View className='line-content'>点击选择舰长技能</View>
                        <View className='line-extra'>&gt;</View>
                    </View>
                </View>
            </View>
            <View className='editor-item common-list'>
                <View className='common-list__line'>
                    <View className='common-list__line-container'>
                        <View className='line-content'>
                            <Input
                                id='title'
                                className='common-input line-content__input'
                                name='title'
                                placeholder='配置名称'
                                value={inputTitle}
                                onInput={(e: any) => setInputTitle(e.target.value)}
                            />
                        </View>
                    </View>
                </View>
                <View className='common-list__line'>
                    <View className='common-list__line-container'>
                        <View className='line-content'>
                            <Textarea
                                id='description'
                                className='common-textarea line-content__textarea'
                                name='description'
                                placeholder='战舰装配思路（如配件选择）'
                                value={inputDescription}
                                onInput={(e: any) => setInputDescription(e.target.value)}
                            ></Textarea>
                        </View>
                    </View>
                </View>
            </View>

            <Button className='common-button common-button--primary' onClick={handleSave}>
                保存装配方案
            </Button>
        </View>
    )
}

export default FittingEditor
