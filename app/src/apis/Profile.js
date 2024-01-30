import axios from 'axios'
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../components/common_functions';

const paths = {
    profile: '/users/profile'
}

const putProfile = async ({ name }) => {
    showLoader()
    return await axios({
        method: "put",
        url: `${process.env.REACT_APP_BACKEND_URL + paths.profile}`,
        headers: {
            Authorization: localStorage.getItem("access")
        },
        data: {
            name: name
        }
    }).then(response => {
        hideLoader()
        toast.success('User Name updated successfully')
        localStorage.setItem('userdet', JSON.stringify(response.data.user))
        return response.data.user
    }).catch(err => {
        hideLoader()
        if (err.response.data.error)
            toast.error(err.response.data.error)
        else
            toast.error(JSON.stringify(err))
        return false
    })
}
export { putProfile }