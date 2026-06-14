const local_api_url = 'http://127.0.0.1:5000'
const deploy_api_url = 'http://share-moment.ru:5000'

export const api_url = process.env.VUE_APP_MODE === "production" ? deploy_api_url : local_api_url;
