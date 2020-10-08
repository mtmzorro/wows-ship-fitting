#!/usr/bin/env node
/* eslint-disable import/no-commonjs */
const ci = require('miniprogram-ci')

class MiniprogramCI {
    constructor(config) {
        this.config = config
        this.project = new ci.Project({
            appid: config.appid,
            type: 'miniProgram',
            projectPath: config.projectPath,
            privateKeyPath: config.keyPath,
            ignores: ['node_modules/**/*'],
        })
    }

    upload = async () => {
        const project = this.project
        const config = this.config
        const previewResult = await ci.upload({
            project,
            version: config.ver,
            desc: config.desc,
            robot: config.robot,
            onProgressUpdate: console.log,
        })
        console.log(previewResult)
    }

    preview = async () => {
        const project = this.project
        const config = this.config
        const previewResult = await ci.preview({
            project,
            version: config.ver,
            desc: config.desc,
            robot: config.robot,
            qrcodeFormat: config.qrcodeFormat,
            qrcodeOutputDest: config.qrcodeOutputDest,
            onProgressUpdate: console.log,
        })
        console.log(previewResult)
    }
}

module.exports = MiniprogramCI
