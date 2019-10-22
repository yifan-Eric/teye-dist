const proBaseUrl = 'https://www.tct-teye.com',
    devBaseUrl = 'https://www.tct-teye.com',
    mapCDN = 'http://d2svindzvhonk3.cloudfront.net';
export default (function () {
    var config = {};
    switch(process.env.NODE_ENV){
        case 'production':
            config.baseUrl = proBaseUrl ;
            // config.baseUrl = 'http://18.222.66.96/big-data' ;
            break;
        case 'development':
            // config.baseUrl = 'http://' + location.host;
            config.baseUrl = devBaseUrl ;
            break;
        default:
            config.baseUrl = 'http://' + location.host + '/' + process.env.NODE_ENV.split('_')[1];
    }

    return config;
})();

const resourceBaseUrl = 'http://18.222.66.96';
const loginUrl = 'https://www.test-teye.com/chaos/login.html';

const apiTest = [
    '/getAllData',
    '/postPerfData',
    '/report/com.tct.camera/getAppPMActiveInfo',
    '/report/retention',
    '/report/hotevent',
    '/report/com.tct.camera/appUserActiveInfo',
    '/report/getAppDistribution',
    '/report/getDeviceNumber',
    '/report/getAndroidVersion',
    '/report/com.tclhz.gallery/getAppVersionList',
    '/report/device-report/getDeviceActiveOfDay',
    '/report/userEngagement',
    '/report/index/getPainSpotList',
    '/report/getAppList',
    '/report/getActivityCount?packageName=flink-com.tclhz.gallery',
    '/report/app/version/list'
];

export {apiTest,resourceBaseUrl,proBaseUrl,devBaseUrl,loginUrl,mapCDN}
