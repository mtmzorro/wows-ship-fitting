import AV from 'leancloud-storage/dist/av-weapp.js'
import { Fitting } from '../type/types'
import LearnCloud from '../utils/learnCloud'

export const saveFitting = (fitting: Fitting): Promise<any> => {
    return LearnCloud.save('Fitting', fitting)
    // return new Promise((resolve) => {
    //     learnCloud.save('Fitting', fitting).then((result) => {
    //         console.log('saveFitting save success')
    //         resolve(result)
    //     }).catch((error) => {
    //         console.log('saveFitting save error', error)
    //     })
    // })
}

export const queryAllFitting = (): Promise<any> => {
    return LearnCloud.queryAll('Fitting')
}
