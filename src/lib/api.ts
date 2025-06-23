/**
 * API service for Manim Studio frontend
 * Handles communication with the backend server
 */

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  message?: string;
  [key: string]: any;
}

export interface GenerateResponse extends ApiResponse {
  code: string;
  videoPath: string;
  videoFileName: string;
  metadata?: {
    generationAttempts: number;
    wasCodeFixed: boolean;
    wasImproved: boolean;
    renderingAttempts: number;
  };
}

export interface RenderResponse extends ApiResponse {
  videoPath: string;
  videoFileName: string;
  code: string;
  metadata?: {
    wasCodeFixed: boolean;
    wasImproved: boolean;
    renderingAttempts: number;
  };
}

export interface ValidateResponse extends ApiResponse {
  valid: boolean;
}

export interface StatusResponse extends ApiResponse {
  requirements: {
    manim: { installed: boolean; version?: string };
    ffmpeg: { installed: boolean; version?: string };
    allRequirementsMet: boolean;
  };
  environment: {
    nodeVersion: string;
    platform: string;
    tempDir: string;
    outputDir: string;
  };
  recommendations: string[];
}

// Error classes
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: ApiResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or parsing error
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

// API service functions
export const api = {
  /**
   * Generate Manim animation from prompt
   */
  generateAnimation: async (prompt: string): Promise<GenerateResponse> => {
    return apiRequest<GenerateResponse>('/api/manim/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  },

  /**
   * Render existing Manim code
   */
  renderAnimation: async (code: string): Promise<RenderResponse> => {
    return apiRequest<RenderResponse>('/api/manim/render', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  /**
   * Validate Manim code
   */
  validateCode: async (code: string): Promise<ValidateResponse> => {
    return apiRequest<ValidateResponse>('/api/manim/validate', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  /**
   * Get system status and requirements
   */
  getStatus: async (): Promise<StatusResponse> => {
    return apiRequest<StatusResponse>('/api/manim/status');
  },

  /**
   * Get full video URL for serving
   */
  getVideoUrl: (videoFileName: string): string => {
    return `${API_BASE_URL}/animations/${videoFileName}`;
  },

  /**
   * Check if backend is healthy
   */
  healthCheck: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/health');
  },
};

// Helper function to handle API errors in components
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Hook for loading states (optional, can be used in components)
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const createLoadingState = (): LoadingState => ({
  isLoading: false,
  error: null,
});
