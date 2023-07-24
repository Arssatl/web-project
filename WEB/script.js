n = "text"
console.log(n)
for (i = 1; i < 11; i++) {
    console.log(i)
}
a = 5
b = 10
function sum(x, y) {
    return x + y
}
console.log(sum(a, b))

subtract = function(x, y) {
    return x - y 
}
console.log(subtract(a, b))

multiply = (x, y) => {
    return x * y
}
console.log(multiply(a, b))

a = [1, 2, 3, 4]
a = a.map((e) => e * 2)
console.log(a)

b = [9, 9, 1, 2]
b = b.filter((e) => e == 9)
console.log(b)

c = [5, 7, 9, 0]
c = c.reduce((s, e) => s + e, 0)
console.log(c)

d = [1, 4, 1, 10]
d = d.find((e) => e == 7)
console.log(d)

e = [10, 11, 12, 13]
e.fill(7, 1)
console.log(e)

f = [22, 33, 44, 55]
f = f.some((e) => e == 22)
console.log(f)

g = [22, 22, 22, 23]
g = g.every((e) => e == 22)
console.log(g)