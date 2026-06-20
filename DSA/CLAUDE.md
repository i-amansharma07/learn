ref : [https://leetcode.com/discuss/post/460599/blind-75-leetcode-questions-by-krishnade-9xev/]()

# DSA — Blind 75 Learning Journal

## Who This Is For

Aman is brushing up DSA fundamentals using the Blind 75 problem set. The goal is not just to solve problems but to:

- Recognize **patterns** across problems
- Develop **first-principles thinking** (brute force → optimal reasoning)
- Build a **problem-solver mindset** transferable to unseen problems

This folder lives at `/home/aman-sharma/Desktop/learn/DSA` inside the broader `learn/` workspace.

---

## How to Work Through Each Problem

For every problem, follow this thinking framework:

1. **Understand** — Restate the problem in your own words. Identify input/output types, constraints, edge cases.
2. **Brute Force** — What is the naive solution? State its time/space complexity.
3. **Identify the Bottleneck** — What makes brute force slow? A redundant scan? Repeated subproblems? Unsorted data?
4. **Apply a Pattern** — Which pattern eliminates the bottleneck? (See patterns below.)
5. **Optimize** — Arrive at the optimal solution. State its complexity.
6. **Code** — Write clean, readable code. No magic numbers.
7. **Verify** — Test with: normal case, edge case (empty, single element), large input.

---

## Core Patterns (The Lens to Apply)

| Pattern                              | When to Reach For It                                   |
| ------------------------------------ | ------------------------------------------------------ |
| **Sliding Window**             | Contiguous subarray/substring with a constraint        |
| **Two Pointers**               | Sorted array, pairs, palindromes, merge                |
| **Fast & Slow Pointers**       | Cycle detection, middle of list                        |
| **Binary Search**              | Sorted data, "find minimum/maximum satisfying X"       |
| **Prefix Sum / Running State** | Range queries, subarray sums                           |
| **Hash Map / Set**             | O(1) lookup, frequency count, seen-before checks       |
| **Stack / Monotonic Stack**    | Next greater element, valid parentheses, span problems |
| **BFS**                        | Shortest path, level-order, spreading problems         |
| **DFS / Backtracking**         | Exhaustive search, permutations, tree traversal        |
| **Union-Find**                 | Connected components, dynamic connectivity             |
| **Dynamic Programming**        | Overlapping subproblems + optimal substructure         |
| **Greedy**                     | Local optimal = global optimal (intervals, scheduling) |
| **Heap / Priority Queue**      | Top-K, streaming median, merge K sorted                |
| **Trie**                       | Prefix search, word dictionaries                       |

---

## The 75 Problems by Category

### Array (10)

- [ ] Two Sum
- [ ] Best Time to Buy and Sell Stock
- [ ] Contains Duplicate
- [ ] Product of Array Except Self
- [ ] Maximum Subarray
- [ ] Maximum Product Subarray
- [ ] Find Minimum in Rotated Sorted Array
- [ ] Search in Rotated Sorted Array
- [ ] 3 Sum
- [ ] Container With Most Water

### Binary / Bit Manipulation (5)

- [ ] Sum of Two Integers
- [ ] Number of 1 Bits
- [ ] Counting Bits
- [ ] Missing Number
- [ ] Reverse Bits

### Dynamic Programming (11)

- [ ] Climbing Stairs
- [ ] Coin Change
- [ ] Longest Increasing Subsequence
- [ ] Longest Common Subsequence
- [ ] Word Break Problem
- [ ] Combination Sum
- [ ] House Robber
- [ ] House Robber II
- [ ] Decode Ways
- [ ] Unique Paths
- [ ] Jump Game

### Graph (8)

- [ ] Clone Graph
- [ ] Course Schedule
- [ ] Pacific Atlantic Water Flow
- [ ] Number of Islands
- [ ] Longest Consecutive Sequence
- [ ] Alien Dictionary *(Premium)*
- [ ] Graph Valid Tree *(Premium)*
- [ ] Number of Connected Components in an Undirected Graph *(Premium)*

### Interval (5)

- [ ] Insert Interval
- [ ] Merge Intervals
- [ ] Non-overlapping Intervals
- [ ] Meeting Rooms *(Premium)*
- [ ] Meeting Rooms II *(Premium)*

### Linked List (6)

- [ ] Reverse a Linked List
- [ ] Detect Cycle in a Linked List
- [ ] Merge Two Sorted Lists
- [ ] Merge K Sorted Lists
- [ ] Remove Nth Node From End Of List
- [ ] Reorder List

### Matrix (4)

- [ ] Set Matrix Zeroes
- [ ] Spiral Matrix
- [ ] Rotate Image
- [ ] Word Search

### String (10)

- [ ] Longest Substring Without Repeating Characters
- [ ] Longest Repeating Character Replacement
- [ ] Minimum Window Substring
- [ ] Valid Anagram
- [ ] Group Anagrams
- [ ] Valid Parentheses
- [ ] Valid Palindrome
- [ ] Longest Palindromic Substring
- [ ] Palindromic Substrings
- [ ] Encode and Decode Strings *(Premium)*

### Tree (14)

- [ ] Maximum Depth of Binary Tree
- [ ] Same Tree
- [ ] Invert/Flip Binary Tree
- [ ] Binary Tree Maximum Path Sum
- [ ] Binary Tree Level Order Traversal
- [ ] Serialize and Deserialize Binary Tree
- [ ] Subtree of Another Tree
- [ ] Construct Binary Tree from Preorder and Inorder Traversal
- [ ] Validate Binary Search Tree
- [ ] Kth Smallest Element in a BST
- [ ] Lowest Common Ancestor of BST
- [ ] Implement Trie (Prefix Tree)
- [ ] Add and Search Word
- [ ] Word Search II

### Heap (3)

- [ ] Top K Frequent Elements
- [ ] Find Median from Data Stream
- [ ] *(Merge K Sorted Lists counted above)*

---

## Folder Conventions

- One file per problem: `<category>/<problem-name>.md` or `<problem-name>.py`
- Each solution file should have the thinking steps at the top as comments:
  ```
  # Brute Force: O(n²) — nested scan
  # Pattern: Hash Map for O(1) lookup
  # Optimal: O(n) time, O(n) space
  ```
- Mark the checkbox in this file once a problem is fully understood (not just solved).

---

## Progress Tracker

**Completed: 0 / 75**

Update this number as you go. The goal is understanding, not speed.

---

## Useful Mental Models

- **"What information do I need to keep?"** — guides choice of data structure
- **"Where is the repeated work?"** — guides DP vs cache vs two-pointer
- **"Can I sort this?"** — unlocks binary search, two pointers, greedy
- **"What does BFS/DFS give me that the other doesn't?"** — BFS = shortest path, DFS = exhaustive exploration
- **"Is there a monotonic property I can exploit?"** — binary search on answer space
