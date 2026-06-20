# Sliding Window

## What Is It?

A sliding window is a **subarray or substring that moves through the data** from left to right.
Instead of recomputing everything from scratch for every position (brute force),
you maintain a window and **update it incrementally** — adding one element on the right,
removing one on the left — so each step is O(1) rather than O(n).

The "window" is just two pointers: `left` and `right`, defining the current range `[left, right]`.

---

## When to Use It

Ask yourself these questions when you see a problem:

1. Is the input a **string, array, or sequence** (linear, ordered data)?
2. Does the problem ask about a **contiguous subarray or substring**?
3. Is there a **constraint** on the window — a target sum, a max length, no repeats, at most K distinct elements?
4. Would a brute force require a **nested loop** to check every possible subarray?

If all four are yes → reach for sliding window.

### Quick Recognition Triggers

| Phrase in the problem | Likely pattern |
|---|---|
| "longest substring with..." | Variable sliding window |
| "smallest subarray with sum ≥ k" | Variable sliding window |
| "maximum sum subarray of size k" | Fixed sliding window |
| "at most k distinct characters" | Variable sliding window + hash map |
| "minimum window containing all of..." | Variable sliding window + frequency map |

---

## Two Flavors

### 1. Fixed-Size Window
Window size `k` is given. Slide it one step at a time.

```
[a, b, c, d, e]  k=3
 |-----|            window 1: [a,b,c]
    |-----|         window 2: [b,c,d]
       |-----|      window 3: [c,d,e]
```

Skeleton:
```python
def fixed_window(arr, k):
    window_sum = sum(arr[:k])   # seed the first window
    best = window_sum

    for right in range(k, len(arr)):
        window_sum += arr[right]        # expand right
        window_sum -= arr[right - k]    # shrink left (drop element that fell off)
        best = max(best, window_sum)

    return best
```

### 2. Variable-Size Window
Window grows and shrinks based on a condition. `right` always moves forward; `left` moves forward only when the window becomes **invalid**.

```
Expand right until window is invalid → shrink left until window is valid again → record answer
```

Skeleton:
```python
def variable_window(arr):
    left = 0
    window_state = {}   # tracks whatever the constraint needs (counts, sum, etc.)
    best = 0

    for right in range(len(arr)):
        # --- EXPAND: add arr[right] into the window ---
        # update window_state with arr[right]

        # --- SHRINK: while window is invalid, move left forward ---
        while not is_valid(window_state):
            # remove arr[left] from window_state
            left += 1

        # --- RECORD: window [left, right] is valid here ---
        best = max(best, right - left + 1)

    return best
```

The key insight: `right` never goes backward, `left` never goes backward.
So the total work across all iterations is O(n) — each element enters and exits the window at most once.

---

## Example 1 — Fixed Window

**Problem: Maximum Sum Subarray of Size K**
Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.

```
Input:  arr = [2, 1, 5, 1, 3, 2],  k = 3
Output: 9   (subarray [5, 1, 3])
```

**Brute force:** For every starting index i, sum arr[i..i+k-1]. Two nested loops → O(n·k).

**Bottleneck:** We recompute overlapping sums. When sliding from [2,1,5] to [1,5,1],
we recompute 1 and 5 even though they didn't change.

**Insight:** Sliding by one position means:
  new_sum = old_sum - element_leaving_left + element_entering_right

```python
def max_sum_subarray(arr, k):
    # seed the first window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for right in range(k, len(arr)):
        # slide: drop the leftmost element, add the new rightmost
        window_sum += arr[right] - arr[right - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

# arr = [2, 1, 5, 1, 3, 2], k = 3
# window:  [2,1,5]=8 → [1,5,1]=7 → [5,1,3]=9 → [1,3,2]=6
# answer: 9
```

**Complexity:** O(n) time, O(1) space

---

## Example 2 — Variable Window

**Problem: Longest Substring Without Repeating Characters** (Blind 75 — String)
Given a string, find the length of the longest substring with all unique characters.

```
Input:  s = "abcabcbb"
Output: 3   (substring "abc")
```

**Brute force:** Check every substring for uniqueness. O(n²) or O(n³).

**Bottleneck:** When we find a duplicate at position `right`, we don't need to restart
from scratch — we just need to shrink from the left until the duplicate is gone.

**Insight:** Keep a set of characters currently in the window.
- Expand `right`: if s[right] not in set → add it, update answer.
- Shrink `left`: if s[right] already in set → remove s[left], move left forward. Repeat until valid.

```python
def length_of_longest_substring(s: str) -> int:
    seen = set()        # characters currently inside the window
    left = 0
    best = 0

    for right in range(len(s)):
        # shrink from left until s[right] can safely enter the window
        while s[right] in seen:
            seen.remove(s[left])
            left += 1

        # s[right] is not in seen — safe to expand
        seen.add(s[right])
        best = max(best, right - left + 1)  # window size = right - left + 1

    return best

# Trace on "abcabcbb":
# right=0 'a': seen={a},          window=[0,0], best=1
# right=1 'b': seen={a,b},        window=[0,1], best=2
# right=2 'c': seen={a,b,c},      window=[0,2], best=3
# right=3 'a': 'a' in seen → remove 'a', left=1 → seen={b,c}, add 'a' → seen={b,c,a}, window=[1,3], best=3
# right=4 'b': 'b' in seen → remove 'b', left=2 → add 'b' → seen={c,a,b}, window=[2,4], best=3
# ... and so on
```

**Complexity:** O(n) time — each character is added and removed at most once. O(min(n, alphabet_size)) space for the set.

---

## The Mental Checklist Before Coding

```
1. What goes inside the window? (characters, integers, pairs?)
2. What is the validity condition? (sum ≤ k? all unique? freq matches?)
3. Fixed or variable size?
4. What am I tracking to check validity efficiently? (set, map, counter, running sum?)
5. Am I maximizing window size, minimizing it, or counting valid windows?
```

Answer these five before writing a single line of code.

---

## Common Mistakes

- **Off-by-one on window size:** window length = `right - left + 1`, not `right - left`
- **Forgetting to shrink:** expanding without a shrink condition leads to an invalid window being recorded
- **Updating the answer at the wrong place:** record after the window is valid, not before
- **Using a set when you need a map:** if duplicates matter (e.g., "at most 2 of each"), a set isn't enough — use a frequency map

---

## Problems in This Folder (Blind 75)

| Problem | Window Type | Key State |
|---|---|---|
| Longest Substring Without Repeating Characters | Variable | `set` of seen chars |
| Longest Repeating Character Replacement | Variable | freq map + max_freq trick |
| Minimum Window Substring | Variable | freq map + match counter |
