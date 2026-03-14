export const BASE_URL = 'http://localhost:8000'

export const API_PATHS = {

    AUTH: {

        LOGIN:'/api/v1/auth/login',
        REGISTER:'/api/v1/auth/register',
        GET_USER:'/api/v1/auth/getuser',

    },

    DASHBOARD: {

        GET_DATA:'/api/v1/dashboard'

    },

    INCOME: {

        ADD_INCOME:'/api/v1/income/add',
        GET_INCOME: '/api/v1/income/get',
        DELETE_INCOME:(incomeID) => `/api/v1/${incomeID}`,
        DOWNLOAD_INCOME: '/api/v1/income/download'

    },

    EXPENSE: {

        ADD_EXPENSE:'/api/v1/expense/add',
        GET_EXPENSE: '/api/v1/expense/get',
        DELETE_EXPENSE:(expenseID) => `/api/v1/${expenseID}`, 
        DOWNLOAD_EXPENSE: '/api/v1/expense/download'

    },

    IMAGE:{

        UPLOAD_IMAGE:'/api/v1/auth/upload-image'

    }
}