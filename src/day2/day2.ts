
export const isSafe = (numbers: number[]): boolean => {
    var up = true;
    if (numbers[0] > numbers[1]) {
        up = false;
    } else {
        up = true;
    }
    if (numbers.length == 1) {
        return false;
    }

    for (let index = 0; index < numbers.length - 1; index++) {
        const current = numbers[index];
        const next = numbers[index + 1];
        if (current === next) {
            return false;
        }

        var value = next - current;

        if (up) {
            if (value > 3 || value <= 0) {
                return false
            }
        } else {
            if (value < -3 || value >= 0) {
                return false
            }
        }
    }
    return true;
}

// part 1
export const safeCount = (lines: string[]): number => {
    return lines.map(it => it.toNumbers()).filter(isSafe).length;
}

// part 2
export const isSafe2 = (numbers: number[]): boolean => {

    for (let index = 0; index < numbers.length; index++) {
        var newNumbers = [...numbers.slice(0, index), ...numbers.slice(index + 1)]
        if (isSafe(newNumbers)) {
            return true;
        }
    }
    return false;
}

export const safeCount2 = (lines: string[]): number => {
    return lines.map(it => it.toNumbers()).filter(isSafe2).length;
}