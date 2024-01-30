import axios from 'axios'
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../components/common_functions';

const paths = {
    signin: '/users/login',
    signup: '/users/signup',
    subscription: ['/users/', '/subscription']
}

const postSignin = async ({ email, pass }) => {
    showLoader()
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL + paths.signin}`,
        data: {
            email: email,
            password: pass
        }
    }).then(response => {
        hideLoader()
        delete response.data.user.password
        response.data.user.token = response.data.user.token.replaceAll('"', '')
        return response.data
    }).catch(err => {
        hideLoader()
        if (err.response.data.error)
            toast.error(err.response.data.error)
        else
            toast.error(JSON.stringify(err))
    })
}

const postSignup = async ({ email, pass, name }) => {
    showLoader()
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL + paths.signup}`,
        data: {
            email: email,
            password: pass,
            name: name
        }
    }).then(response => {
        hideLoader()
        toast.success(response.data.user)
    }).catch(err => {
        hideLoader()
        if (err.response.data.error)
            toast.error(err.response.data.error)
        else
            toast.error(JSON.stringify(err))
    })
}
const checkSubscription = async () => {
    showLoader()
    const access = localStorage.getItem('access')
    const user = localStorage.getItem('userdet') && JSON.parse(localStorage.getItem('userdet'))
    if (!access) {
        toast.error('Please Login')
        hideLoader()
        return false
    }
    return await axios.get(process.env.REACT_APP_BACKEND_URL + paths.subscription.join(user._id)).then(res => {
        hideLoader()
        if (res.data.message)
            return true
        else {
            toast.error('Please Subscribe to Watch This Content')
            return false
        }
    }).catch(er => {
        hideLoader()
        console.log(er)
        return false
    })
}
export { postSignin, postSignup, checkSubscription }


// axios({
//   method: "post",
//   url: `${process.env.REACT_APP_BACKEND_URL}`,
//   headers: config.headers,
// }).then(response => {
// }).catch(err => {
//   toast.error(err)
// })