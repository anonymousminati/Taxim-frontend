/**
 * Integration Test for Frontend-Backend Communication
 * Run this test to verify the API integration is working properly
 */

import { api, handleApiError } from '../src/lib/api';

// Test configuration
const TEST_CONFIG = {
  timeout: 30000, // 30 seconds for API calls
  testPrompt: "Create a simple blue circle",
  testCode: `from manim import *

class TestAnimation(Scene):
    def construct(self):
        circle = Circle(color=BLUE)
        self.play(Create(circle))
        self.wait(1)`
};

// Utility function for test logging
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
const testHealthCheck = async (): Promise<boolean> => {
  log('Testing backend health check...');
  
  try {
    const response = await api.healthCheck();
    if (response.success) {
      log('Backend health check passed', 'success');
      return true;
    } else {
      log('Backend health check failed: Invalid response', 'error');
      return false;
    }
  } catch (error) {
    log(`Backend health check failed: ${handleApiError(error)}`, 'error');
    return false;
  }
};

const testSystemStatus = async (): Promise<boolean> => {
  log('Testing system status check...');
  
  try {
    const response = await api.getStatus();
    if (response.success) {
      log(`System status check passed`, 'success');
      log(`Manim installed: ${response.requirements.manim.installed}`, 'info');
      log(`FFmpeg installed: ${response.requirements.ffmpeg.installed}`, 'info');
      log(`All requirements met: ${response.requirements.allRequirementsMet}`, response.requirements.allRequirementsMet ? 'success' : 'warning');
      return true;
    } else {
      log('System status check failed: Invalid response', 'error');
      return false;
    }
  } catch (error) {
    log(`System status check failed: ${handleApiError(error)}`, 'error');
    return false;
  }
};

const testCodeValidation = async (): Promise<boolean> => {
  log('Testing code validation...');
  
  try {
    const response = await api.validateCode(TEST_CONFIG.testCode);
    if (response.success) {
      log(`Code validation passed: ${response.valid ? 'Valid' : 'Invalid'}`, response.valid ? 'success' : 'warning');
      return true;
    } else {
      log('Code validation failed: Invalid response', 'error');
      return false;
    }
  } catch (error) {
    log(`Code validation failed: ${handleApiError(error)}`, 'error');
    return false;
  }
};

const testCodeGeneration = async (): Promise<{ success: boolean; code?: string }> => {
  log('Testing AI code generation...');
  
  try {
    const response = await api.generateAnimation(TEST_CONFIG.testPrompt);
    if (response.success && response.code) {
      log('AI code generation passed', 'success');
      log(`Generated ${response.code.length} characters of code`, 'info');
      log(`Video file: ${response.videoFileName}`, 'info');
      return { success: true, code: response.code };
    } else {
      log('AI code generation failed: Invalid response', 'error');
      return { success: false };
    }
  } catch (error) {
    log(`AI code generation failed: ${handleApiError(error)}`, 'error');
    return { success: false };
  }
};

const testCodeRendering = async (): Promise<boolean> => {
  log('Testing code rendering...');
  
  try {
    const response = await api.renderAnimation(TEST_CONFIG.testCode);
    if (response.success && response.videoPath) {
      log('Code rendering passed', 'success');
      log(`Video file: ${response.videoFileName}`, 'info');
      return true;
    } else {
      log('Code rendering failed: Invalid response', 'error');
      return false;
    }
  } catch (error) {
    log(`Code rendering failed: ${handleApiError(error)}`, 'error');
    return false;
  }
};

// Main test runner
const runIntegrationTests = async () => {
  log('🚀 Starting Frontend-Backend Integration Tests', 'info');
  log('===============================================', 'info');
  
  const results = {
    healthCheck: false,
    systemStatus: false,
    codeValidation: false,
    codeGeneration: false,
    codeRendering: false
  };
  
  try {
    // Test 1: Health Check
    results.healthCheck = await testHealthCheck();
    
    if (!results.healthCheck) {
      log('Backend is not available. Stopping tests.', 'error');
      return results;
    }
    
    // Test 2: System Status
    results.systemStatus = await testSystemStatus();
    
    // Test 3: Code Validation
    results.codeValidation = await testCodeValidation();
    
    // Test 4: AI Code Generation (may take longer)
    log('⏳ This test may take 10-20 seconds...', 'warning');
    results.codeGeneration = (await testCodeGeneration()).success;
    
    // Test 5: Code Rendering (may take longer)
    log('⏳ This test may take 15-30 seconds...', 'warning');
    results.codeRendering = await testCodeRendering();
    
  } catch (error) {
    log(`Test suite failed with error: ${handleApiError(error)}`, 'error');
  }
  
  // Results summary
  log('===============================================', 'info');
  log('🎯 Integration Test Results:', 'info');
  log(`Health Check: ${results.healthCheck ? '✅ PASS' : '❌ FAIL'}`);
  log(`System Status: ${results.systemStatus ? '✅ PASS' : '❌ FAIL'}`);
  log(`Code Validation: ${results.codeValidation ? '✅ PASS' : '❌ FAIL'}`);
  log(`Code Generation: ${results.codeGeneration ? '✅ PASS' : '❌ FAIL'}`);
  log(`Code Rendering: ${results.codeRendering ? '✅ PASS' : '❌ FAIL'}`);
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  log(`Overall: ${passedTests}/${totalTests} tests passed`, passedTests === totalTests ? 'success' : 'warning');
  
  if (passedTests === totalTests) {
    log('🎉 All integration tests passed! Your setup is working correctly.', 'success');
  } else {
    log('⚠️ Some tests failed. Please check the errors above and ensure:', 'warning');
    log('   1. Backend server is running (npm run dev in backend folder)', 'info');
    log('   2. All system requirements are installed (Manim, FFmpeg)', 'info');
    log('   3. Google AI API key is configured in backend/.env', 'info');
    log('   4. No firewall is blocking the connection', 'info');
  }
  
  return results;
};

// Export for use in frontend components or run directly
export default runIntegrationTests;

// Auto-run if this file is executed directly
if (typeof window !== 'undefined' && window.location.pathname === '/test') {
  console.log('Running integration tests...');
  runIntegrationTests().catch(console.error);
}
