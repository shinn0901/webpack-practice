import pro from '@/test/test'

pro.then(log => {
    log('100.1').then(([str, win]) => {
        console.log('您输入的是一个数字：' + str + '.')
        if (win) {
            console.log('视窗的宽度为' + win.width() + 'px.')
        }
    }).catch(err => {
        console.log(err)
    })
})