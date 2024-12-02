// part 1
export const isReportSafe = (report: number[]): boolean => {
    const increasing = report[1] > report[0]

    for (let index = 0; index < report.length - 1; index++) {
        const difference = report[index + 1] - report[index]

        if (increasing && (difference > 3 || difference <= 0)) {
            return false
        }
        if (!increasing && (difference < -3 || difference >= 0)) {
            return false
        }
    }
    return true
}

export const countSafeReports = (reports: string[]): number => {
    return reports.map(it => it.toNumbers()).filter(isReportSafe).length
}

// part 2
export const isReportSafeWithDampener = (report: number[]): boolean => {
    // remove a level, and determine if it is safe  
    for (let index = 0; index < report.length; index++) {
        if (isReportSafe(report.removeAtIndex(index))) {
            return true
        }
    }
    return false
}

export const countSafeReportsWithDampener = (lines: string[]): number => {
    return lines.map(it => it.toNumbers()).filter(isReportSafeWithDampener).length
}