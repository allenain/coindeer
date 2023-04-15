export const mathRound = (number: number) => {
  const num = Math.round(number * 100) / 100;
  num.toString().replace("-", "");
  return Number(num);
};

export const transformMoney = (
  number: number,
  symbol = "$",
  isAtEnd = false
) => {
  let integer = number;
  let reminder = "";
  if (!Number.isInteger(number)) {
    const digits = number.toString().split(".");
    integer = +digits[0];
    reminder = digits[1];
  }
  const string = String(integer);
  const arr = string.split("").reverse().join("");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      result.push(`${arr[i]},`);
    } else result.push(arr[i]);
  }
  result.reverse();
  if (isAtEnd && reminder !== "")
    return `${result.join("")}${reminder}${symbol}`;
  else if (reminder !== "") return `${symbol}${result.join("")}.${reminder}`;
  else return `${symbol}${result.join("")}${reminder}`;
};

//1251256.39
//целая часть - 1251256
//дробная часть - 39
// ${symbol}
