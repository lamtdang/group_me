import { isMatchingURLPattern } from "../../src/background_script/core";

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
  test("Match_Start_Return_True", () => {
    const url = "example.com";
    const pattern = "*.com";
    const result = isMatchingURLPattern(pattern, url);
    expect(result).toBe(true);
  });
  test("Match_End_Return_True_Case_1", () => {
    const url = "example.com";
    const pattern = "example.*";
    const result = isMatchingURLPattern(pattern, url);
    expect(result).toBe(true);
  });
  test("Match_End_Return_True_Case_2", () => {
    const url = "example.com";
    const pattern = "example*";
    const result = isMatchingURLPattern(pattern, url);
    expect(result).toBe(true);
  });
  test("Match_MiddleWildcard_ReturnTrue_Case_1", () => { 
    const url = "lamtdang.example.com/abc";
    const pattern = "lamtdang.*.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBe(true);
  });
  test("Match_MiddleWildcard_ReturnTrue_Case_2", () => { 
    const url = "lamtdangexample.com/abc";
    const pattern = "lamtdang*.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBe(true);
  });
  test("Match_MiddleWildcard_ReturnFalse", () => {
    const url = "lamtdangexample.com/abc";
    const pattern = "lamtdang.*.com";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBe(false);
  });
  test("Multiple_Wildcard_Sign_Case_1", () => { 
    const url = "lamtdang.example.com/abc";
    const pattern = "*.example.com/*";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBe(true);
  });

  test("Multiple_Wildcard_Sign_Case_2", () => { 
    const url = "api.ahihiexample.com/abc";
    const pattern = "api.*example.com/*";
    const expectMatch = isMatchingURLPattern(pattern, url);
    expect(expectMatch).toBe(true);
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
