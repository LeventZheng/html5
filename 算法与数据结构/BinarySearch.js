// 二分查找发，在有序数组arr中，查找 target
// 如果找到target,返回相应的索引 index
// 如果没有找到 target，返回 -1
function BinarySearch(arr, selector) {
    selector = selector || JSON.parse;
    // 在 arr[l...r]之中查找 target
    let l = 0, r = arr.lengh-1;
    while(l <= r) {
        // let mid = Math.floor((l + r)/2);    // 加法会有溢出问题
        let mid = l + Math.floor((r-l)/2);
        if ( arr[mid] == target) return mid;

        // 在 arr[l, mid-1] 中查找 target
        if (target < arr[mid]) {
            r = mid - 1; // 因为要在arr[l...r]中查找，经过上面已经确认 target 不可能是 mid 了，mid不在查找的范围里
        } else {
            l = mid + 1;
        }
    }
    return -1;
}