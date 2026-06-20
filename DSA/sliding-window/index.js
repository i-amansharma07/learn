/* 

fixed window : 
Q. Give an array of positive and negative elements, find the k consective elements whose sum is max;

arr =  [-1, 2, 3, 3, 4, 5,-1] 

*/

function findSum(arr, k) {
  let left = 0;
  let right = 0;
  let window_sum = 0;

  for (; right < k; right++) {
    window_sum += arr[right];
  }

  let max_sum = window_sum;

  while (right < arr.length - 1) {
    window_sum = window_sum + arr[right];
    right++;
    window_sum = window_sum - arr[left];
    left++;
    max_sum = Math.max(max_sum, window_sum);
  }

  return max_sum;
}

const arr = [-1, 2, 3, 3, 4, 5, -1];
const k = 3;
console.log(findSum(arr, k));
