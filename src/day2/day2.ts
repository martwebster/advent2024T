
export const isSafe = (line: String): boolean => {
    var up = true;
    const numbers = line.toNumbers();
    if (numbers[0] > numbers[1]) {
        up = false;
    } else {
        up = true;
    }

    for (let index = 0; index < numbers.length - 1; index++) {
        const current = numbers[index];
        const next = numbers[index + 1];
        if (current === next) {
            return false;
        }

        console.log(current, next)
        var value = next - current;
        if (!up) {
            value = Math.abs(value)
        }

        if (value > 3 || value <= 0) {
            return false
        }
    }
    return true;

}

// part 1
export const safeCount = (lines: string[]): number => {
    return lines.filter(isSafe).length;
}

