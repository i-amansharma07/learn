//n^3
function bruteMaxSubArray(nums: number[]): number {
  let max_sum = nums[0];
  let len = nums.length;

  // here i and j will create the window and k will count the sum inside the window
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum = sum + nums[k];
      }
      if (max_sum < sum) max_sum = sum;
    }
  }

  return max_sum;
}

//n^2
function optimalBruteMaxSubArray(nums: number[]): number {
  let max_sum = nums[0];
  let len = nums.length;

  // here we will memoize the sum of the last window and add the current one to it
  for (let i = 0; i < len; i++) {
    let lastwindow = 0;
    for (let j = i; j < len; j++) {
      //use lastwindow sum and add current one
      //check maxsum and store it in that if current is max
      lastwindow += nums[j];
      max_sum = Math.max(lastwindow, max_sum);
    }
  }

  return max_sum;
}

// O(n)
//kadane's algo : I'll keep on adding and if it goes below 0 i'll frop and start fresh
function maxSubArray(nums: number[]): number {
  let currentSum = nums[0];
  let maxSum = nums[0];
  const len = nums.length;

  //two options at each iteration
  //1.  should we start fresh from this element, or add it to the previous sum
  //2.  is current sum > max sum

  for (let i = 1; i < len; i++) {
    
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

let start = performance.now();
// console.log(bruteMaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(optimalBruteMaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
let end = performance.now();
console.log(`${((end - start) / 1000).toFixed(3)} s`);
