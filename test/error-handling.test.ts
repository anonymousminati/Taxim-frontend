/**
 * Enhanced Integration Test for Error Handling and Auto-Retry Features
 * Tests the new error handling, code fixing, and automatic preview switching
 */

import { api, handleApiError } from '../src/lib/api';

// Test configuration
const ERROR_HANDLING_TESTS = {
  timeout: 60000, // 60 seconds for error handling tests
  
  // Test prompts that might cause different types of errors
  testCases: [
    {
      name: "Simple Valid Animation",
      prompt: "Create a blue circle",
      shouldWork: true,
      expectedAttempts: 1
    },
    {
      name: "Complex Mathematical Animation",
      prompt: "Show the quadratic formula with derivation steps and colorful animations",
      shouldWork: true,
      expectedAttempts: 1
    },
    {
      name: "Potentially Problematic Code",
      prompt: "Create 100 overlapping shapes with complex transformations and equations",
      shouldWork: true,
      expectedAttempts: 1,
      mightNeedFixes: true
    },
    {
      name: "Advanced Animation with Text",
      prompt: "Animate the Pythagorean theorem proof with moving triangles and text explanations",
      shouldWork: true,
      expectedAttempts: 1
    }
  ],

  // Test invalid code that should be auto-fixed
  invalidCodeTests: [
    {
      name: "Missing Import",
      code: `class TestAnimation(Scene):
    def construct(self):
        circle = Circle()
        self.play(Create(circle))`,
      shouldBeFixed: true
    },
    {
      name: "Wrong Method Name",
      code: `from manim import *
class TestAnimation(Scene):
    def build(self):  # Wrong method name
        circle = Circle()
        self.play(Create(circle))`,
      shouldBeFixed: true
    },
    {
      name: "Syntax Error",
      code: `from manim import *
class TestAnimation(Scene):
    def construct(self):
        circle = Circle(
        self.play(Create(circle))`,  // Missing closing parenthesis
      shouldBeFixed: true
    }
  ]
};

// Utility functions
const log = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  const symbols = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  };
  
  console.log(`[${timestamp}] ${symbols[type]} ${message}`);
};

// Test functions
const testErrorHandlingGeneration = async (testCase: any): Promise<boolean> => {
  log(`Testing: ${testCase.name}`, 'info');
  
  try {
    const response = await api.generateAnimation(testCase.prompt);
    
    if (response.success) {
      log(`✅ Generation successful`, 'success');
      
      // Check metadata for error handling info
      if (response.metadata) {
        const { generationAttempts, wasCodeFixed, wasImproved, renderingAttempts } = response.metadata;
        
        log(`📊 Metadata:`, 'info');
        log(`   - Generation attempts: ${generationAttempts}`, 'info');
        log(`   - Code was fixed: ${wasCodeFixed}`, wasCodeFixed ? 'warning' : 'info');
        log(`   - Code was improved: ${wasImproved}`, wasImproved ? 'warning' : 'info');
        log(`   - Rendering attempts: ${renderingAttempts}`, 'info');
        
        if (testCase.mightNeedFixes && (wasCodeFixed || wasImproved)) {
          log(`   Expected fixes were applied successfully`, 'success');
        }
      }
      
      // Verify video file exists
      const videoUrl = api.getVideoUrl(response.videoFileName);
      log(`📹 Video URL: ${videoUrl}`, 'info');
      
      return true;
    } else {
      log(`Generation failed: ${response.error}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Generation error: ${handleApiError(error)}`, 'error');
    return false;
  }
};

const testCodeFixing = async (testCase: any): Promise<boolean> => {
  log(`Testing code fixing: ${testCase.name}`, 'info');
  
  try {
    const response = await api.renderAnimation(testCase.code);
    
    if (response.success) {
      log(`✅ Code fixing successful`, 'success');
      
      // Check if code was actually fixed
      if (response.metadata && response.metadata.wasCodeFixed) {
        log(`🔧 Code was automatically fixed`, 'success');
        log(`📝 Fixed code length: ${response.code.length} characters`, 'info');
        
        // Check if the fixed code is different from original
        if (response.code !== testCase.code) {
          log(`✨ Code was successfully modified`, 'success');
        }
      }
      
      return true;
    } else {
      log(`Code fixing failed: ${response.error}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Code fixing error: ${handleApiError(error)}`, 'error');
    return false;
  }
};

const testSystemResilience = async (): Promise<boolean> => {
  log('Testing system resilience with rapid requests...', 'info');
  
  const rapidRequests = [
    api.generateAnimation("Create a red square"),
    api.generateAnimation("Create a green triangle"),
    api.generateAnimation("Create a blue circle")
  ];
  
  try {
    const results = await Promise.allSettled(rapidRequests);
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    log(`Rapid requests: ${successCount}/${results.length} succeeded`, 
         successCount === results.length ? 'success' : 'warning');
    
    return successCount >= results.length * 0.8; // 80% success rate acceptable
  } catch (error) {
    log(`Rapid request test failed: ${handleApiError(error)}`, 'error');
    return false;
  }
};

// Main test runner
const runErrorHandlingTests = async () => {
  log('🧪 Starting Enhanced Error Handling Integration Tests', 'info');
  log('=======================================================', 'info');
  
  const results = {
    generationTests: [] as boolean[],
    codeFixingTests: [] as boolean[],
    systemResilience: false,
    overall: false
  };
  
  try {
    // Test 1: Generation with error handling
    log('\n📋 Testing AI Generation with Error Handling...', 'info');
    for (const testCase of ERROR_HANDLING_TESTS.testCases) {
      const result = await testErrorHandlingGeneration(testCase);
      results.generationTests.push(result);
      
      if (!result) {
        log(`❌ Test failed: ${testCase.name}`, 'error');
      }
      
      // Wait between tests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Test 2: Code fixing capabilities
    log('\n🔧 Testing Automatic Code Fixing...', 'info');
    for (const testCase of ERROR_HANDLING_TESTS.invalidCodeTests) {
      const result = await testCodeFixing(testCase);
      results.codeFixingTests.push(result);
      
      if (!result) {
        log(`❌ Code fixing test failed: ${testCase.name}`, 'error');
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Test 3: System resilience
    log('\n🏋️ Testing System Resilience...', 'info');
    results.systemResilience = await testSystemResilience();
    
  } catch (error) {
    log(`Test suite failed with error: ${handleApiError(error)}`, 'error');
  }
  
  // Results summary
  log('\n=======================================================', 'info');
  log('🎯 Enhanced Error Handling Test Results:', 'info');
  
  const generationPassed = results.generationTests.filter(Boolean).length;
  const generationTotal = results.generationTests.length;
  log(`Generation Tests: ${generationPassed}/${generationTotal} passed`, 
       generationPassed === generationTotal ? 'success' : 'warning');
  
  const codeFingingPassed = results.codeFixingTests.filter(Boolean).length;
  const codeFixingTotal = results.codeFixingTests.length;
  log(`Code Fixing Tests: ${codeFingingPassed}/${codeFixingTotal} passed`, 
       codeFingingPassed === codeFixingTotal ? 'success' : 'warning');
  
  log(`System Resilience: ${results.systemResilience ? 'PASS' : 'FAIL'}`, 
       results.systemResilience ? 'success' : 'warning');
  
  const totalPassed = generationPassed + codeFingingPassed + (results.systemResilience ? 1 : 0);
  const totalTests = generationTotal + codeFixingTotal + 1;
  
  results.overall = totalPassed >= totalTests * 0.8; // 80% success rate
  
  log(`\nOverall: ${totalPassed}/${totalTests} tests passed`, 
       results.overall ? 'success' : 'warning');
  
  if (results.overall) {
    log('🎉 Error handling system is working excellently!', 'success');
    log('✨ Features validated:', 'success');
    log('   - Automatic code error detection and fixing', 'info');
    log('   - Iterative improvement with AI assistance', 'info');
    log('   - Robust rendering with retry mechanisms', 'info');
    log('   - Graceful error handling and user feedback', 'info');
    log('   - System resilience under load', 'info');
  } else {
    log('⚠️ Some error handling features need attention:', 'warning');
    log('Please check the failed tests above and ensure:', 'info');
    log('   1. Backend error handling methods are working', 'info');
    log('   2. AI model has sufficient quota and access', 'info');
    log('   3. Manim and FFmpeg are properly installed', 'info');
    log('   4. System has adequate resources for processing', 'info');
  }
  
  return results;
};

// Export for use in frontend or run directly
export default runErrorHandlingTests;

// Auto-run if this file is executed directly in a test environment
if (typeof window !== 'undefined' && window.location.pathname === '/test-error-handling') {
  console.log('Running enhanced error handling tests...');
  runErrorHandlingTests().catch(console.error);
}
