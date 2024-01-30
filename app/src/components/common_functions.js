const showLoader = () => {
    document.getElementsByClassName('loading-container')[0].style.display = 'flex'
}
const hideLoader = () => {
    document.getElementsByClassName('loading-container')[0].style.display = 'none'
}
export { showLoader, hideLoader }