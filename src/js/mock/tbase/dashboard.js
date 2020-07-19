module.exports = [
    {
        desc: '获取productList',
        type: 'GET',
        url: '/getProducts',
        params: {},
        result: {
            code: '0',
            data: [
                'Gallery',
                'Dialer',
                'Contacts',
                'Email',
                'Messaging',
                'Camera',
                'Smart TV',
                'Launcher',
                'Simple Launcher',
                'SystemUI',
                'LockScreen',
                'Wallpaper',
                'Smart Manager',
                'Dual APP',
                'Split screen',
                'one-handed mode',
                'Face Unlock',
                'VUI(AI语音交互)',
                'Screen Recorder',
                'Screen shot',
                'Compass',
                'Support Center',
                'User Support ',
                'One Account'
            ]
        }
    },
    {
        desc: '地图数据',
        type: 'GET',
        url: '/map/initData',
        result: {
            code: 0,
            data: [{"name":"Afghanistan","value":0,"selected":false},{"name":"Albania","value":0,"selected":false},{"name":"Algeria","value":0,"selected":false},{"name":"Andorra","value":0,"selected":false},{"name":"Angola","value":0,"selected":false},{"name":"Anguilla","value":0,"selected":false},{"name":"Antigua and Barbuda","value":0,"selected":false},{"name":"Argentina","value":0,"selected":false},{"name":"Armenia","value":0,"selected":false},{"name":"Australia","value":0,"selected":false},{"name":"Austria","value":0,"selected":false},{"name":"Azerbaijan","value":0,"selected":false},{"name":"Bahrain","value":0,"selected":false},{"name":"Bangladesh","value":5593968,"selected":false},{"name":"Barbados","value":0,"selected":false},{"name":"Belarus","value":0,"selected":false},{"name":"Belgium","value":0,"selected":false},{"name":"Belize","value":0,"selected":false},{"name":"Benin","value":0,"selected":false},{"name":"Bermuda","value":0,"selected":false},{"name":"Bhutan","value":0,"selected":false},{"name":"Bolivia","value":0,"selected":false},{"name":"Bosnia and Herzegovina","value":0,"selected":false},{"name":"Botswana","value":0,"selected":false},{"name":"Brazil","value":7733858,"selected":false},{"name":"British Indian Ocean Territory","value":0,"selected":false},{"name":"British Virgin Islands","value":0,"selected":false},{"name":"Brunei","value":0,"selected":false},{"name":"Bulgaria","value":0,"selected":false},{"name":"Burkina Faso","value":0,"selected":false},{"name":"Burundi","value":0,"selected":false},{"name":"Cambodia","value":0,"selected":false},{"name":"Cameroon","value":0,"selected":false},{"name":"Canada","value":0,"selected":false},{"name":"Cape Verde","value":0,"selected":false},{"name":"Cayman Islands","value":0,"selected":false},{"name":"Central African Republic","value":0,"selected":false},{"name":"Chad","value":0,"selected":false},{"name":"Chile","value":0,"selected":false},{"name":"China","value":0,"selected":false},{"name":"Colombia","value":0,"selected":false},{"name":"Comoros","value":0,"selected":false},{"name":"Congo-Brazzaville","value":0,"selected":false},{"name":"Congo-Kinshasa","value":0,"selected":false},{"name":"Cook Islands","value":0,"selected":false},{"name":"Coral Sea Islands Territory","value":0,"selected":false},{"name":"Costa Rica","value":0,"selected":false},{"name":"Croatia","value":0,"selected":false},{"name":"Cuba","value":0,"selected":false},{"name":"Cyprus","value":0,"selected":false},{"name":"Czechia","value":0,"selected":false},{"name":"Denmark","value":0,"selected":false},{"name":"Djibouti","value":0,"selected":false},{"name":"Dominica","value":0,"selected":false},{"name":"Dominican Republic","value":0,"selected":false},{"name":"East Timor","value":0,"selected":false},{"name":"Ecuador","value":0,"selected":false},{"name":"Egypt","value":0,"selected":false},{"name":"El Salvador","value":0,"selected":false},{"name":"Equatorial Guinea","value":0,"selected":false},{"name":"Eritrea","value":0,"selected":false},{"name":"Estonia","value":0,"selected":false},{"name":"Ethiopia","value":0,"selected":false},{"name":"Falkland Islands","value":0,"selected":false},{"name":"Faroe Islands","value":0,"selected":false},{"name":"Federated States of Micronesia","value":0,"selected":false},{"name":"Fiji","value":0,"selected":false},{"name":"Finland","value":0,"selected":false},{"name":"France","value":0,"selected":false},{"name":"Gabon","value":0,"selected":false},{"name":"Georgia","value":0,"selected":false},{"name":"Germany","value":0,"selected":false},{"name":"Ghana","value":0,"selected":false},{"name":"Gibraltar","value":0,"selected":false},{"name":"Greece","value":0,"selected":false},{"name":"Greenland","value":0,"selected":false},{"name":"Guatemala","value":0,"selected":false},{"name":"Guernsey","value":0,"selected":false},{"name":"Guinea-Bissau","value":0,"selected":false},{"name":"Guinea","value":0,"selected":false},{"name":"Guyana","value":0,"selected":false},{"name":"Haiti","value":0,"selected":false},{"name":"Honduras","value":0,"selected":false},{"name":"Hungary","value":0,"selected":false},{"name":"Iceland","value":0,"selected":false},{"name":"India","value":35544983,"selected":false},{"name":"Indonesia","value":7686701,"selected":false},{"name":"Iraq","value":0,"selected":false},{"name":"Ireland","value":0,"selected":false},{"name":"Islamic Republic of Iran","value":0,"selected":false},{"name":"Isle of Man","value":0,"selected":false},{"name":"Israel","value":0,"selected":false},{"name":"Italy","value":0,"selected":false},{"name":"Jamaica","value":0,"selected":false},{"name":"Japan","value":0,"selected":false},{"name":"Jersey","value":0,"selected":false},{"name":"Jordan","value":0,"selected":false},{"name":"Juguang","value":0,"selected":false},{"name":"Kazakhstan","value":0,"selected":false},{"name":"Kenya","value":0,"selected":false},{"name":"Kiribati","value":0,"selected":false},{"name":"Kuwait","value":0,"selected":false},{"name":"Kyrgyzstan","value":0,"selected":false},{"name":"Laos","value":0,"selected":false},{"name":"Latvia","value":0,"selected":false},{"name":"Lebanon","value":0,"selected":false},{"name":"Lesotho","value":0,"selected":false},{"name":"Liberia","value":0,"selected":false},{"name":"Libya","value":0,"selected":false},{"name":"Liechtenstein","value":0,"selected":false},{"name":"Lithuania","value":0,"selected":false},{"name":"Luxemburg","value":0,"selected":false},{"name":"Macedonia","value":0,"selected":false},{"name":"Madagascar","value":0,"selected":false},{"name":"Malawi","value":0,"selected":false},{"name":"Malaysia","value":0,"selected":false},{"name":"Maldives","value":0,"selected":false},{"name":"Mali","value":0,"selected":false},{"name":"Malta","value":0,"selected":false},{"name":"Marshall Islands","value":0,"selected":false},{"name":"Mauritania","value":0,"selected":false},{"name":"Mauritius","value":0,"selected":false},{"name":"Mexico","value":5240957,"selected":false},{"name":"Moldova","value":0,"selected":false},{"name":"Monaco","value":0,"selected":false},{"name":"Mongolia","value":0,"selected":false},{"name":"Montenegro","value":0,"selected":false},{"name":"Montserrat","value":0,"selected":false},{"name":"Morocco","value":0,"selected":false},{"name":"Mozambique","value":0,"selected":false},{"name":"Myanmar","value":0,"selected":false},{"name":"Namibia","value":0,"selected":false},{"name":"Nepal","value":0,"selected":false},{"name":"New Zealand","value":0,"selected":false},{"name":"Nicaragua","value":0,"selected":false},{"name":"Niger","value":0,"selected":false},{"name":"Nigeria","value":0,"selected":false},{"name":"Niue","value":0,"selected":false},{"name":"North Korea","value":0,"selected":false},{"name":"Norway","value":0,"selected":false},{"name":"Oman","value":0,"selected":false},{"name":"Pakistan","value":3804107,"selected":false},{"name":"Palau","value":0,"selected":false},{"name":"Palestine","value":0,"selected":false},{"name":"Panama","value":0,"selected":false},{"name":"Papua New Guinea","value":0,"selected":false},{"name":"Paraguay","value":0,"selected":false},{"name":"Peru","value":0,"selected":false},{"name":"Philippines","value":0,"selected":false},{"name":"Pitcairn Islands","value":0,"selected":false},{"name":"Poland","value":0,"selected":false},{"name":"Portugal","value":0,"selected":false},{"name":"Qatar","value":0,"selected":false},{"name":"Republic of Kosovo","value":0,"selected":false},{"name":"Romania","value":0,"selected":false},{"name":"Russia","value":3156433,"selected":false},{"name":"Russian Federation","value":0,"selected":false},{"name":"Rwanda","value":0,"selected":false},{"name":"Sahrawi Arab Democratic Republic","value":0,"selected":false},{"name":"Saint Helena Ascension and Tristan da Cunha","value":0,"selected":false},{"name":"Saint Kitts and Nevis","value":0,"selected":false},{"name":"Saint Lucia","value":0,"selected":false},{"name":"Saint Vincent and the Grenadines","value":0,"selected":false},{"name":"Samoa","value":0,"selected":false},{"name":"San Marino","value":0,"selected":false},{"name":"Saudi Arabia","value":0,"selected":false},{"name":"Senegal","value":0,"selected":false},{"name":"Serbia","value":0,"selected":false},{"name":"Seychelles","value":0,"selected":false},{"name":"Sierra Leone","value":0,"selected":false},{"name":"Singapore","value":0,"selected":false},{"name":"Slovakia","value":0,"selected":false},{"name":"Slovenia","value":0,"selected":false},{"name":"Solomon Islands","value":0,"selected":false},{"name":"Somalia","value":0,"selected":false},{"name":"South Africa","value":0,"selected":false},{"name":"South Georgia and the South Sandwich Islands","value":0,"selected":false},{"name":"South Korea","value":0,"selected":false},{"name":"South Sudan","value":0,"selected":false},{"name":"Spain","value":0,"selected":false},{"name":"Sri Lanka","value":0,"selected":false},{"name":"Sudan","value":0,"selected":false},{"name":"Suriname","value":0,"selected":false},{"name":"Swaziland","value":0,"selected":false},{"name":"Sweden","value":0,"selected":false},{"name":"Syria","value":0,"selected":false},{"name":"Tajikistan","value":0,"selected":false},{"name":"Tanzania","value":0,"selected":false},{"name":"Thailand","value":0,"selected":false},{"name":"The Bahamas","value":0,"selected":false},{"name":"The Gambia","value":0,"selected":false},{"name":"The Netherlands","value":0,"selected":false},{"name":"Togo","value":0,"selected":false},{"name":"Tokelau","value":0,"selected":false},{"name":"Tonga","value":0,"selected":false},{"name":"Trinidad and Tobago","value":0,"selected":false},{"name":"Tunisia","value":0,"selected":false},{"name":"Turkey","value":0,"selected":false},{"name":"Turkmenistan","value":0,"selected":false},{"name":"Turks and Caicos Islands","value":0,"selected":false},{"name":"Tuvalu","value":0,"selected":false},{"name":"Uganda","value":0,"selected":false},{"name":"Ukraine","value":0,"selected":false},{"name":"United States","value":1792666,"selected":false},{"name":"United Arab Emirates","value":0,"selected":false},{"name":"United Kingdom","value":0,"selected":false},{"name":"Uruguay","value":0,"selected":false},{"name":"Uzbekistan","value":0,"selected":false},{"name":"Vanuatu","value":0,"selected":false},{"name":"Vatican City","value":0,"selected":false},{"name":"Venezuela","value":0,"selected":false},{"name":"Vietnam","value":0,"selected":false},{"name":"world","value":0,"selected":false},{"name":"Yemen","value":0,"selected":false},{"name":"Zambia","value":0,"selected":false},{"name":"Zimbabwe","value":0,"selected":false}],
            msg: 'success!'
        }
    }
];