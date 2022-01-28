let num = 0
function table(n){
    for (let i = 0; i <= n; i++) {
    num += i*table(n-1)
    }
}
table(5500)