function countUnique(arr) {
    let count = 0;
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique.push(arr[i]);
            count++;
        }
    }
    return count;
}

export function getCodes(items) {
    const codes = items.map(item => item.code);
    return countUnique(codes);
}