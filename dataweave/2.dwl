%dw 2.0
import * from dw::core::Strings

output application/json

var games = (payload splitBy "\n")

fun getScorePart1 (game) = (
    game match {
        case "AX" -> 3
        case "BY" -> 3
        case "CZ" -> 3
        case "AY" -> 6
        case "BZ" -> 6
        case "CX" -> 6
        else -> 0
    }
)

fun getBasePointsPart2 (game) = (
    game match {
        case "AY" -> 1
        case "BX" -> 1
        case "CZ" -> 1
        case "AZ" -> 2
        case "BY" -> 2
        case "CX" -> 2
        else -> 3
    }
)
---
{
    part1 : sum ((games map {
        score : charCodeAt(($ splitBy " ")[1],0) - 87 + getScorePart1($ replace " " with ""),
    }).score),
    part2 : sum ((games map {
        score : getBasePointsPart2($ replace " " with "") + (charCodeAt(($ splitBy " ")[1],0) - 88) * 3,
    }).score)
}
