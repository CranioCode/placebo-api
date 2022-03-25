import { getRandomNum } from "./random.js";

/**
 * @returns A random character between `0-9`, `A-Z`
 * and `a-z`.
 */
function getRandomChar() {
  let digit = getRandomNum(61, 0); //0-9,A-Z,a-z

  if (digit <= 9) return digit.toString();
  //0-9
  else if (digit <= 35)
    return String.fromCharCode(digit - 10 + "A".charCodeAt());
  //A-Z
  else return String.fromCharCode(digit - 36 + "a".charCodeAt()); //a-z
}

/**
 * @returns A random string with a length between `8-20` characters,
 * with characters each being multiple return values of `getRandomChar`
 */
function newHashString() {
  let hashLength = getRandomNum(20, 8);
  let hash = "";
  for (let i = 0; i < hashLength; i++) hash += getRandomChar();

  return hash;
}

export { getRandomChar, newHashString };
