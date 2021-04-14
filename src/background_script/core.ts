export function isMatchingURLPattern(pattern: string, url: string): boolean {

    pattern = pattern.replace(/\./g, '\\.');
    pattern = pattern.replace(/\*/g, '.*');

    const re: RegExp = new RegExp(pattern, "g")
    const matchingURL = url.match(re)
    return matchingURL !== null
}