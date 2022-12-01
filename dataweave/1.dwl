%dw 2.0
output application/json
var elves = payload splitBy "\n\n" map {calories: sum($ splitBy "\n") as Number}
---
{
    part1: (elves orderBy $.calories)[-1].calories,
    part2: sum((elves orderBy $.calories)[-1 to -3].calories)
}
