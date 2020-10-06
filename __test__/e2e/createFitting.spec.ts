import miniProgramCreator from './helpers/miniProgramCreator'
import mockResponse from './fixtures/fittingEditorResponse.json'

const mockInput = {
    title: 'E2E-测试标题',
    description: 'E2E-测试描述',
}

let miniProgram
let page

beforeAll(async () => {
    miniProgram = await miniProgramCreator()
    page = await miniProgram.currentPage()
    await page.waitFor(500)
}, 40000)

afterAll(async () => {
    await miniProgram.close()
})

describe('FittingEditor 方案编辑页', () => {
    it('新建装配方案应该能正确打开', async () => {
        const newFitting = await page.$('.fitting-banner')
        await newFitting.tap()
        await page.waitFor(2000)
        page = await miniProgram.currentPage()
        expect(page.path).toBe('pages/fittingEditor/fittingEditor')
    })

    describe('shipSelector 战舰选择器', () => {
        it('战舰选择器应该能正确打开', async () => {
            const shipSelector = await page.$('#ship-selector')
            await shipSelector.tap()
            await page.waitFor(1000)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/shipSelector/shipSelector')
        })

        it('应该能正确的显示选择的战舰', async () => {
            // 选择 德国 - 战列舰 - X 大选低吼
            const nationSelect = await page.$$('.selector-list__item')
            await nationSelect[2].tap()
            await page.waitFor(200)
            const speciesSelect = await page.$$('.selector-list__item')
            await speciesSelect[1].tap()
            await page.waitFor(200)
            const shipSelect = await page.$$('.ship-list')
            const shipImage = await shipSelect[0].$('.item__ext-ship')
            const shipImageUrl = await shipImage.attribute('src')

            await shipSelect[0].tap()
            await page.waitFor(500)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/fittingEditor/fittingEditor')

            // 判断实际选择船只是否相符
            const previewShip = await page.$('.preview-area__ship')
            expect(await previewShip.attribute('src')).toBe(shipImageUrl)
        })
    })

    describe('cmdrSelector 舰长选择器', () => {
        it('舰长选择器应该能正确打开', async () => {
            const cmdrSelector = await page.$('#commander-selector')
            await cmdrSelector.tap()
            await page.waitFor(1000)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/cmdrSelector/cmdrSelector')
        })

        it('应该能正确的显示选择的舰长', async () => {
            // 选择 2 Azur 欧根亲王
            const cmdrSelect = await page.$$('.selector-list__item')
            const cmdrImage = await cmdrSelect[1].$('.item__image-ship')
            const cmdrImageUrl = await cmdrImage.attribute('src')
            await cmdrSelect[1].tap()
            await page.waitFor(500)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/fittingEditor/fittingEditor')

            // 判断实际选择舰长是否相符
            const previewCmdr = await page.$('.preview-area__commander')
            expect(await previewCmdr.attribute('src')).toBe(cmdrImageUrl)
        })
    })

    describe('skillSelector 技能选择器', () => {
        it('技能选择器应该能正确打开', async () => {
            // 跳转技能选择器
            const skillSelector = await page.$('#skill-selector')
            await skillSelector.tap()
            await page.waitFor(1000)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/skillSelector/skillSelector')
        })

        it('越级选择技能应该无效', async () => {
            const level_4 = await page.$('#skill-level-4')
            const level_4_items = await level_4.$$('.skill-item')
            await level_4_items[7].tap()
            await page.waitFor(200)
            expect(await level_4_items[7].attribute('class')).not.toContain('skill-item--selected')
        })

        it('skillSelector 应该能正确的选择技能', async () => {
            const level_1 = await page.$('#skill-level-1')
            const level_1_items = await level_1.$$('.skill-item')
            await level_1_items[0].tap()
            await page.waitFor(200)
            expect(await level_1_items[0].attribute('class')).toContain('skill-item--selected')

            const level_2 = await page.$('#skill-level-2')
            const level_2_items = await level_2.$$('.skill-item')
            await level_2_items[2].tap()
            await page.waitFor(200)
            expect(await level_2_items[2].attribute('class')).toContain('skill-item--selected')

            const level_3 = await page.$('#skill-level-3')
            const level_3_items = await level_3.$$('.skill-item')
            await level_3_items[5].tap()
            await page.waitFor(200)
            expect(await level_3_items[5].attribute('class')).toContain('skill-item--selected')

            const level_4 = await page.$('#skill-level-4')
            const level_4_items = await level_4.$$('.skill-item')
            await level_4_items[7].tap()
            await page.waitFor(200)
            expect(await level_4_items[7].attribute('class')).toContain('skill-item--selected')
        })

        afterAll(async () => {
            // 结束提交跳转回编辑器
            const submitButton = await page.$('#skill-submit')
            await submitButton.tap()
            await page.waitFor(500)

            page = await miniProgram.currentPage()
            expect(page.path).toBe('pages/fittingEditor/fittingEditor')
        })
    })

    it('应该正确的获取输入的标题和描述', async () => {
        const title = await page.$('#title')
        await title.input(mockInput.title)
        expect(await title.value()).toBe(mockInput.title)

        const description = await page.$('#description')
        await description.input(mockInput.description)
        expect(await description.value()).toBe(mockInput.description)
        await page.waitFor(500)
    })

    it('应该正确的根据选择内容提交装备方案，并跳转详情页', async () => {
        // 拦截提交 post 直接返回 mock 成功ID
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
            JSON.stringify(mockResponse)
        )

        // 拦截成功后 confirm 跳转成功后 装配详情
        await miniProgram.mockWxMethod('showModal', {
            confirm: true,
            cancel: false,
        })

        // 提交
        const submitButton = await page.$('#fitting-submit')
        await submitButton.tap()

        await miniProgram.restoreWxMethod('request')
        await miniProgram.restoreWxMethod('showModal')

        await page.waitFor(500)

        // expect 跳转详情页
        page = await miniProgram.currentPage()
        expect(page.path).toBe('pages/fittingDetail/fittingDetail')
    })
})
