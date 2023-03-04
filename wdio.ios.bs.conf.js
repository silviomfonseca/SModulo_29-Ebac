const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');

exports.config = {

    path: '/wd/hub',
    user: "silviomfonseca_XUf4vO",
    key: "KFvWTnxQvyEyrg3bhqKX",

    services: ['browserstack'],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    suites: {
        products: [
            './test/specs/products.spec.js',
            './test/specs/productCart.spec.js',
            './test/specs/search.spec.js',
            
        ]
    },
    framework: 'mocha',
    capabilities: [
        {
            project: "Meu primeiro projeto Appium iOS BS",
            build: 'EBAC Test',
            name: 'ebac_test',
            device: 'iPhone 12 Pro',
            os_version: "14",
            'browserstack.debug': true,
            app: "bs://aaec6f8afb058a7a39c4ba88ba4f3bd3943ce541"
        }

    ],
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        if (error) {
            driver.takeScreenshot()
        }
    },
    beforeSuite: async function(){
        //verificar se o app ja esta instalado e executando
        let state = await driver.queryAppState("br.art.ebaconline")
        if(state !== 4){
            await driver.launchApp()
        }
    },
    afterSuite: async function(){
        //fechar o app
        await driver.closeApp()
    },
    maxInstances: 1
}