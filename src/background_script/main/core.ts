export function isMatchingURLPattern(pattern: string, url: string): boolean{
    if (pattern.startsWith("*") || pattern.endsWith("*")){
        throw new SyntaxError("Pattern cannot start (or end) with \"*\"")
    }

    const re: RegExp = new RegExp(pattern, "g")
    const matchingURL = url.match(re)
    return matchingURL !== null
}