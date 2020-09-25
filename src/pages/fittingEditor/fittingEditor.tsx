import React, { useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Button, Image, Input, Textarea } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import useLogin from '../../utils/useLogin'
import { saveFitting, updateFitting } from '../../service/common'
import { getShipImage } from '../../service/ship'
import { getCommanderImage } from '../../service/commander'
import { getSkillImage } from '../../service/skill'
import { actions } from '../../reducers/fittingDetail'
import './fittingEditor.scss'

// verifyModal
const verifyModal = (msg: string) => {
    Taro.showModal({
        content: msg,
        showCancel: false,
    })
}

const getEnLength = (text: string) => {
    return text.replace(/[\u4e00-\u9fa5]/g, '**').length
}

interface State {
    fittingEditor: Fitting
    user: User
}

const FittingEditor: React.FC = () => {
    const router = useRouter()
    // new | edit
    const pageType = router.params.type

    // 登录态 微信信息授权
    const isLogin = useLogin('/pages/fittingEditor/fittingEditor', 'page')

    // connect store
    const { fittingEditor, user } = useSelector((state) => {
        return { fittingEditor: state.fittingEditor, user: state.user }
    }) as State
    const dispatch = useDispatch()

    const [inputTitle, setInputTitle] = useState<string>(fittingEditor.title)
    const [inputDescription, setInputDescription] = useState<string>(fittingEditor.description)

    // router to 战舰选择器
    const handleShipSelector = () => {
        Taro.navigateTo({ url: '/pages/shipSelector/shipSelector' })
    }
    // router to 舰长选择器
    const handleCmdrSelector = () => {
        if (!fittingEditor.nation) {
            return verifyModal('请选择先选择对应国家战舰')
        }
        Taro.navigateTo({ url: '/pages/cmdrSelector/cmdrSelector' })
    }
    // router to 技能选择器
    const handleSkillSelector = () => {
        Taro.navigateTo({ url: '/pages/skillSelector/skillSelector' })
    }

    // 数据校验
    const verifySavingData = (cache: any): boolean => {
        if (!cache.shipId) {
            verifyModal('请选择战舰')
            return false
        }
        if (!cache.commanderName) {
            verifyModal('请选择舰长')
            return false
        }
        if (cache.commanderSkill[0].length <= 0) {
            verifyModal('请选择舰长技能')
            return false
        }
        if (cache.title.length <= 0) {
            verifyModal('请填写装配方案标题')
            return false
        }
        if (getEnLength(cache.title) > 24) {
            verifyModal('方案标题不能超过12个中文或24个英文')
            return false
        }
        if (cache.description.length <= 0) {
            verifyModal('请填写装配方案详情描述')
            return false
        }
        if (getEnLength(cache.description) > 400) {
            verifyModal(
                `装配方案详情不能超过200个中文或400个英文\n当前${cache.description.length}个文字`
            )
            return false
        }
        if (!cache.authorNickName || !cache.authorOpenId) {
            verifyModal('获取微信用户名称异常')
            return false
        }
        return true
    }

    // save Fitting Data
    const handleSave = async () => {

        const cache = {
            id: fittingEditor.id,
            authorOpenId: user.openId,
            authorNickName: user.nickName,
            shipId: fittingEditor.shipId,
            nation: fittingEditor.nation,
            commanderName: fittingEditor.commanderName,
            commanderSkill: fittingEditor.commanderSkill,
            upgrade: [],
            title: inputTitle,
            description: inputDescription,
        }

        // 数据校验
        if (!verifySavingData(cache)) return

        Taro.showLoading({ mask: true, title: '装配方案保存中' })
        try {
            // new or edit
            const result =
                pageType === 'new' ? await saveFitting(cache) : await updateFitting(cache)

            Taro.hideLoading()
            Taro.showModal({
                content: '保存成功，点击确定前去查看方案并分享',
                showCancel: false,
                success: () => {
                    // 传递并跳转到 详情页
                    dispatch(actions.setFittingDetail(result))
                    Taro.redirectTo({ url: '/pages/fittingDetail/fittingDetail' })
                },
            })
        } catch (error) {
            console.log(error)
            Taro.hideLoading()
            if (error.code === 403) {
                verifyModal('保存失败，您没有权限操作该装配方案。')
            } else {
                verifyModal('保存失败，网络或者服务器异常。')
            }
        }
    }

    if (!isLogin) {
        return <View className='fitting-editor'></View>
    }
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
                            <View className='line-extra'>
                                <View className='iconfont icon-arrow-right'></View>
                            </View>
                        </View>
                        <View
                            onClick={handleCmdrSelector}
                            className='preview-selector__button common-list__activable'
                        >
                            <View className='line-content'>选择舰长</View>
                            <View className='line-extra'>
                                <View className='iconfont icon-arrow-right'></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View className='editor-item common-list'>
                <View className='common-list__line skill-area'>
                    <View className='common-list__line-container'>
                        {fittingEditor.commanderSkill.length > 0 ? (
                            fittingEditor.commanderSkill.map((skillId) => {
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
                        <View className='line-extra'>
                            <View className='iconfont icon-arrow-right'></View>
                        </View>
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
                                placeholder='配置名称 不超过12个字'
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
                                placeholder='战舰装配思路（如配件选择），不超过200个字'
                                maxlength={200}
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
