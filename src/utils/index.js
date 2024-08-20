import merge from 'lodash/merge'
import pick from 'lodash/pick'
import uniqueId from 'lodash/uniqueId'
import upperFirst from 'lodash/upperFirst'

function generateCustomID(randomFlag, min, max) {
  var str = ''
  var range = min - 1
  var arr = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ]
  const firstCharPos = Math.floor(Math.random() * 52)
  str += arr[firstCharPos]
  if (randomFlag) {
    range = Math.floor(Math.random() * (max - min)) + min - 1
  }
  for (var i = 0; i < range; i++) {
    const pos = Math.floor(Math.random() * arr.length)
    str += arr[pos]
  }
  return str
}
export { merge, pick, uniqueId, upperFirst, generateCustomID }
