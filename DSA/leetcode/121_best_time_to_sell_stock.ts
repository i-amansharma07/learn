function maxProfit(prices: number[]): number {
  //two pointers
  /* 
    
    left = buy
    right = sell

    if left > right then left = right and right++ 
    if max_profit < (right-left) then max_profit = right - left
    if right > prices.length then exit loop
    
*/

  let left = 0;
  let right = 1;
  let max_profit = 0;
  let len = prices.length;

  while (right < len) {
    if (prices[left] > prices[right]) {
      left = right;
      right++;
      continue;
    }

    let currentProfit = prices[right] - prices[left];

    max_profit = Math.max(currentProfit, max_profit);
    right++;
  }


  return max_profit;
}

const prices = [7,1,5,3,6,4];
const ans = maxProfit(prices);
console.log(ans);
