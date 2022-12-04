%dw 2.2
import * from dw::core::Strings

output application/json

fun intersect(a, b) = (
    // a filter (value, index) -> (value > 2)
    b filter (value) -> ((indexOf(a,value)) > -1)
)

fun toPriority (val) = (
    if (val == lower(val)) (
        charCodeAt(val,0) - 96
     ) else (
        charCodeAt(val,0) - 38
     )
)

---
{
    part1: sum(((payload splitBy "\n") map {
        priority: toPriority(intersect($[0 to ceil(sizeOf($)/2)-1] splitBy "", $[ceil(sizeOf($)/2) to sizeOf($)-1] splitBy "")[0])
}).priority)

}