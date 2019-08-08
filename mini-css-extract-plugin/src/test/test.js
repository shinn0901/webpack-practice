import '@/assets/scss/animate.scss'
import '@/assets/scss/style.scss'

import $ from 'jquery'

export default new Promise((resolve) => {
    // import( /* webpackChunkName:"jQuery" */ 'jquery').then(jQuery => {
    // const $ = jQuery.default
    const numberlog = (str) => {
        const result = new Promise((resolve, reject) => {
            const num = parseInt(str)
            if (!isNaN(num)) {
                let win = $(window)
                if (win) resolve([num, win])
                else resolve([num])
            } else {
                reject(Error("It's not a number"))
            }
        })
        return result
    }
    resolve(numberlog)
    // })
})