import axios from 'axios'

class CommonHelper {

    public async http(url, method, data) {
        return await axios({
            method: method,
            url: url,
            data: data
        });
    }

}
export default new CommonHelper()
