import axios from 'axios'
import { hideLoader, showLoader } from '../components/common_functions'

var user = localStorage.getItem('userdet') && JSON.parse(localStorage.getItem('userdet'))

const paths = {
    profile: '/users/profile'
}
const setUser = () => {
    user = null
}
const getUser = async () => {
    showLoader()
    if (user) {
        return user
    }
    const access = localStorage.getItem('access')
    var headers = {}
    if (access) {
        headers.Authorization = access
        console.log(headers)
        return await axios.get(process.env.REACT_APP_BACKEND_URL + paths.profile, { headers: headers }).then(res => {
            hideLoader()
            delete res.data.password
            user = res.data
            localStorage.setItem('userdet', JSON.stringify(res.data))
            return res
        }).catch(er => {
            hideLoader()
            console.log(er)
        })
    } else {
        hideLoader()
        return false
    }
}

export { getUser }