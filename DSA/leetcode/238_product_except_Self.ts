function burteProductExceptSelf(nums: number[]): number[] {
  //brute-force
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    let prod = 1;
    for (let j = 0; j < nums.length; j++) {
      if (j === i) continue;
      prod *= nums[j];
    }
    res.push(prod);
  }

  return res;
}

function PrePostProductExceptSelf(nums: number[]): number[] {
  //prefix and postfix arrays

  const pre = [nums[0]];
  const len = nums.length;
  const post = [nums[len - 1]];
  let preProd = 1 * pre[0];
  let postProd = 1 * post[0];
  let ans: number[] = [];
  //pre
  for (let i = 1; i < len; i++) {
    preProd *= nums[i];
    pre.push(preProd);
  }

  //post
  for (let i = len - 2; i >= 0; i--) {
    postProd *= nums[i];
    post.unshift(postProd);
  }

  for (let i = 0; i < len; i++) {
    if (i === 0) {
      ans.push(1 * post[i + 1]);
      continue;
    }
    if (i === len - 1) {
      ans.push(pre[i - 1] * 1);
      continue;
    }
    ans.push(pre[i - 1] * post[i + 1]);
  }

  return ans;
}

function ProductExceptSelf(nums: number[]): number[] {
  let len = nums.length;
  let ans = new Array(len);

  let preProd = 1;
  for (let i = 0; i < len; i++) {
    ans[i] = preProd;
    preProd *= nums[i];
  }

  let postProd = 1;
  for (let i = len - 1; i >= 0; i--) {
    ans[i] *= postProd;
    postProd *= nums[i];
  }

  return ans;
}

// console.log(burteProductExceptSelf([-1,1,0,-3,3]));
// console.log(PrePostProductExceptSelf([1, 2, 3, 4]));
console.log(ProductExceptSelf([1, 2, 3, 4]));
