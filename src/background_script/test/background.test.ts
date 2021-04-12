import { isMatchingURLPattern } from "../main/core";

describe("Match Without Wildcard", () => {
  test("Match_SameDomain_ReturnTrue", () => {
    const url = "example.com";
    const pattern = "example.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
    test("Match_SameDomainAddedSubdomain_ReturnTrue", () => {
    const url = "lamtdang.example.com";
    const pattern = "example.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
     test("Match_SameDomainAddedPath_ReturnTrue", () => { 
    const url = "example.com/abc";
    const pattern = "example.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_SameDomainAddedSubdomainAndPath_ReturnTrue", () => { 
    const url = "lamtdang.example.com/abc";
    const pattern = "example.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_DomainKeyword_ReturnTrue", () => { 
    const url = "lamtdang.example.com";
    const pattern = "example";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_PathKeyword_ReturnTrue", () => { 
    const url = "lamtdang.example.com/github";
    const pattern = "github";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_InvalidDomain_ReturnFalse", () => { 
    const url = "lamtdang.example.com";
    const pattern = "example.com.vn";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeFalsy();
  });
});

describe("Match With Wildcard", () => {
  test("Match_InvalidStart_ReturnException", () => {
    const url = "example.com";
    const pattern = "*.com";
    const expectMatch = () => isMatchingURLPattern(pattern, url);
    expect(expectMatch).toThrow("Pattern cannot start (or end) with \"*\"");
    expect(expectMatch).toThrow(SyntaxError)
  });
  test("Match_InvalidEnd_ReturnException", () => {
    const url = "example.com";
    const pattern = "example.*";
    const expectMatch = () => isMatchingURLPattern(pattern, url);
    expect(expectMatch).toThrowError("Pattern cannot start (or end) with \"*\"");
    expect(expectMatch).toThrow(SyntaxError)
  });
  test("Match_MiddleWildcard_ReturnTrue", () => { 
    const url = "lamtdang.example.com/abc";
    const pattern = "lamtdang.*.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_PathKeyword_ReturnTrue", () => { 
    const url = "lamtdang.example.com/github";
    const pattern = "github";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
  test("Match_EmptyWildCard_ReturnTrue", () => { 
    const url = "lamtdang.example.com";
    const pattern = "lamtdang.*example.*com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBeTruthy();
  });
});
