#!/usr/bin/env node
/* eslint-disable import/no-commonjs */
const program = require('commander')
const projectConfig = require('../project.config.json')
const MiniprogramCI = require('./miniprogramCI')

program
    .command('upload [env]')
    .description('发布(设为体验版本)')
    .option('--appid [value]', '小程序 appid', projectConfig.appid)
    .option('--ver [value]', '版本号', projectConfig.version)
    .option('--desc [value]', '发布简介', 'Upload CI')
    .option('--projectPath [value]', '项目路径', projectConfig.miniprogramRoot)
    .option('--keyPath [value]', '上传私钥路径')
    .option('--robot [value]', 'CI机器人 1 ~ 30', '1')
    .action(function (env, options) {
        const uploadCI = new MiniprogramCI({
            appid: options.appid,
            ver: options.ver,
            desc: options.desc,
            projectPath: options.projectPath,
            keyPath: options.keyPath,
            robot: options.robot,
        })
        uploadCI.upload()
    })

program
    .command('preview [env]')
    .description('上传开发版本')
    .option('--appid [value]', '小程序 appid', projectConfig.appid)
    .option('--ver [value]', '版本号', projectConfig.version)
    .option('--desc [value]', '发布简介', 'Preview CI')
    .option('--projectPath [value]', '项目路径', projectConfig.miniprogramRoot)
    .option('--keyPath [value]', '上传私钥路径')
    .option('--robot [value]', 'CI机器人 1 ~ 30', '2')
    .option('--qrcodeFormat [value]', '返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用', 'terminal')
    .option('--qrcodeOutputDest [value]', '二维码文件保存路径')
    .action(function (env, options) {
        const previewCI = new MiniprogramCI({
            appid: options.appid,
            ver: options.ver,
            desc: options.desc,
            projectPath: options.projectPath,
            keyPath: options.keyPath,
            robot: options.robot,
            qrcodeFormat: options.qrcodeFormat,
            qrcodeOutputDest: options.qrcodeOutputDest,
        })
        previewCI.preview()
    })

program.parse(process.argv)
