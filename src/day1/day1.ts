export const diff = (locationId1: number, locationId2: number): number => {
    return Math.abs(locationId2 - locationId1);
}

export const extract = (line: String): number[] => {
    return line.split("   ").map(it => Number(it));
}

export const pairs = (lines: String[]): number => {

    const list1 = lines.map(line => extract(line)[0]).sort((a, b) => a - b)
    const list2 = lines.map(line => extract(line)[1]).sort((a, b) => a - b)

    var total = 0;

    for (let index = 0; index < list1.length; index++) {
        total += diff(list1[index], list2[index]);
    }
    return total;
}

export const similarity = (lines: String[]): number => {

    const list1 = lines.map(line => extract(line)[0])
    const list2 = lines.map(line => extract(line)[1])

    var total = 0;

    for (let index = 0; index < list1.length; index++) {
        const value = list1[index];
        var count = list2.filter(it => it == value);
        total += value * count.length;
    }
    return total;
}