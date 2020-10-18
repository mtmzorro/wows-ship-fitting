import miniProgramCreator from './helpers/miniProgramCreator'
import mockData from './fixtures/indexList.json'

let miniProgram
let page

beforeAll(async () => {
    miniProgram = await miniProgramCreator()

    // 进入页面初始化 清理已有 本地存储
    await miniProgram.callWxMethod('removeStorageSync', 'indexFittings')

    page = await miniProgram.currentPage()
    await page.waitFor(500)
}, 40000)

afterAll(async () => {
    await miniProgram.close()
})

describe('Index 首页', () => {
    it('首页应该能正常打开，正常显示标题、新建装配方案', async () => {
        const title = await page.$$('.title')
        expect(title.length).toBe(1)
        const newFitting = await page.$$('.fitting-banner')
        expect(newFitting.length).toBe(1)
    })

    it('近期装配列表根据 mock 数据应该正常显示', async () => {
        const listTitle = await page.$('.section-title__content')
        expect(await listTitle.text()).toBe('精选云端装配')

        // 清理已有 本地存储
        await miniProgram.callWxMethod('removeStorageSync', 'indexFittings')
        // mock request 近期列表数据
        await miniProgram.mockWxMethod(
            'request',
            (obj, data) => {
                return {
                    data: data,
                    cookies: [],
                    header: {},
                    statusCode: 200,
                }
            },
            JSON.stringify(mockData)
        )
        // 下拉刷新调用 mock 数据
        await miniProgram.callWxMethod('startPullDownRefresh')
        await page.waitFor(500)

        const listItem = await page.$$('.fitting-item')
        expect(listItem.length).toBe(3)
        const listItem_1 = await listItem[0].$('.info__title')
        expect(await listItem_1.text()).toBe(mockData.results[0].title)

        // 重置 数据请求 mock
        await miniProgram.restoreWxMethod('request')
        await miniProgram.restoreWxMethod('getStorage')
    })
})

describe('FittingDetail 详情页', () => {
    it('点击详情应该能正确打开', async () => {
        const listItem = await page.$$('.fitting-item')
        await listItem[0].tap()
        await page.waitFor(500)
        expect((await miniProgram.currentPage()).path).toBe('pages/fittingDetail/fittingDetail')
    })

    it('左上角应该正确显示返回按钮', async () => {
        page = await miniProgram.currentPage()

        const navBar = await page.$$('.nav-bar')
        expect(navBar.length).toBe(1)
        const barIcon = await navBar[0].$('.iconfont')
        expect(await barIcon.attribute('class')).toContain('icon-back')
    })

    it('装配图和基础信息应该正确显示', async () => {
        const commanderImage = await page.$('.detail-top__commander')
        const shipImage = await page.$('.detail-top__ship')
        expect(await commanderImage.attribute('src')).toContain(mockData.results[0].commanderName)
        expect(await shipImage.attribute('src')).toContain(mockData.results[0].shipId)

        const section = await page.$('.detail-content__main')
        const authorLine = await section.$$('.section__line-content')
        expect(await authorLine[3].text()).toBe(mockData.results[0].authorNickName)
    })

    it('技能列表应该能正确显示', async () => {
        const skillItem = await page.$$('.skill-item')
        expect(skillItem.length).toBe(mockData.results[0].commanderSkill.length)
    })

    it('其他信息应该能正确显示', async () => {
        const section = await page.$('.section__description')
        expect(await section.text()).toContain(mockData.results[0].description)
    })
})
