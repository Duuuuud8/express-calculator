function mean(nums) {
    let total = 0;

    for(let num of nums) {
        total += num;
    }

    return total / nums.length
}

function median(nums) {
    nums.sort((a, b) => a - b);

    const mid = Math.floor(nums.length / 2);
    // finds mid and odd is = mid

    if (nums.length % 2 === 0) {
        // if even
        return (nums[mid - 1] + nums[mid]) / 2;
        // average the middle 2 numbers
    }

    return nums[mid];
}

function mode(nums) {
    const counts = {};
    // empty object for key value pairs

    for(let num of nums) {
        // loops through the numbers
        counts[num] = (counts[num] || 0) + 1;
        // counts the key value pairs +1 adds a tally to the number
        // if there is no number yet, start with 0
    }

    let maxCount = 0;
    let mode = null;

    for(let key in counts) {
        // loops through the object pairs
        if(counts[key] > maxCount) {
            // if current object pair frequency is > replace it
            maxCount = counts[key];
            mode = Number(key);
            // converts from string to number, since object keys are strings
        }
    }

    return mode;
}


module.exports = {
    mean,
    median,
    mode
};