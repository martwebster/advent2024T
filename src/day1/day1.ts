// part 1
export const pairs = (lines: String[]): number => {

    const numbers = lines.map(it => it.toNumbers());

    const list1 = numbers.map(it => it[0]).sortAscending();
    const list2 = numbers.map(it => it[1]).sortAscending();

    return list1
        .map((value, index) => Math.abs(value - list2[index]))
        .sum();
}

// part 2
export const similarity = (lines: String[]): number => {
    const numbers = lines.map(it => it.toNumbers());

    const list1 = numbers.map(it => it[0]);
    const list2 = numbers.map(it => it[1]);

    return list1
        .map(value => value * list2.filter(it => it === value).length)
        .sum();
}