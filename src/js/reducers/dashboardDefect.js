import { objectAppend } from '../utils';

const defaultState = {
    firstChartData: {
        data:[],
        // country:{},
        option: {},
        mapJsonData:{}
    },
    secondChartData:{
        option:{},
        data:[]
    },
    thirdChartData:{
        option:{},
        data:[]
    },
    fourthChartData:{
        option:{},
        data:[]
    }
}
export default (state, action) => {
    let newState = {};
    switch (action.type) {
        case 'FIRST_CHART_DATA':
            newState.firstChartData = {
                // country: action.data.country,
                data: action.data,
                option: action.option,
                mapJsonData:action.mapJsonData
            }
            break;
        case 'SECOND_CHART_DATA':
            newState.secondChartData = {
                data: action.data.data,
                option: action.data.option
            }
            break;
        case 'THIRD_CHART_DATA':
            newState.thirdChartData = {
                data: action.data.data,
                option: action.data.option
            }
            break;
        case 'FOURTH_CHART_DATA':
            newState.fourthChartData = {
                data: action.data.data,
                option: action.data.option
            }
            break;
            default:return state || defaultState;
        }

        return objectAppend(newState, state);
}