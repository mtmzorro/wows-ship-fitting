import automator from 'miniprogram-automator'
import path from 'path'
import os from 'os'

// cli Path 问题参考 https://developers.weixin.qq.com/miniprogram/dev/devtools/auto/automator.html 结尾
// win 平台如修改安装路径则自定义
const cliPath = path.resolve('D:/Applications/WeChat Dev Tools/cli.bat')
// 项目路径
const porjectPath = path.join(__dirname, '../../../dist')

// darwin MacOS 使用默认路径
const automatorConfig =
    os.platform() === 'darwin'
        ? {
              projectPath: porjectPath,
          }
        : {
              projectPath: porjectPath,
              cliPath: cliPath,
          }

const miniProgram = async () => {
    return await automator.launch(automatorConfig)
}

export default miniProgram
