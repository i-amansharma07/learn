function twoSum(nums: number[], target: number): number[] {
  //create a map
  //single pass is required 
  //fill the hashmap to the point where we have iterated and check the compliement in the 
  //currently filled map
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]) as number, i];
    }
    map.set(nums[i], i);
  }

  return []
}
