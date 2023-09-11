// Dummy test file (e.g., dummy.test.js)

// Import the function you want to test
function add(a:number, b:number) {
    return a + b;
  }
  
  // Define a test suite using describe
  describe('add function', () => {
    // Define a test case using it (or test)
    it('should add two numbers correctly', () => {
      // Arrange: Set up the inputs and expected result
      const num1 = 3;
      const num2 = 4;
      const expectedResult = 7;
  
      // Act: Call the function you want to test
      const result = add(num1, num2);
  
      // Assert: Check if the result matches the expected value
      expect(result).toBe(expectedResult);
    });
  });
  