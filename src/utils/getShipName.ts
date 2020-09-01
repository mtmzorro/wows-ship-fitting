import shipName from '../constants/shipName'

const getShipName = (id: string, language: string = 'zh-CN') => {
    if (!shipName[id]) {
        return '未定义的舰船'
    }
    return shipName[id]['zh-CN']
}

export default getShipName