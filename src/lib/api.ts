/**
 * API service for Manim Studio frontend
 * Handles communication with the backend server
 */

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// API response types
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
  [key: string]: unknown;
}

export interface GenerateResponse {
  success: boolean;
  error?: string;
  message?: string;
  code: string;
  videoPath: string;
  videoFileName: string;
  sessionId?: string;
  sessionInfo?: SessionInfo;
  metadata?: {
    generationAttempts: number;
    wasCodeFixed: boolean;
    wasImproved: boolean;
    renderingAttempts: number;
  };
}

export interface RenderResponse {
  success: boolean;
  error?: string;
  message?: string;
  videoPath: string;
  videoFileName: string;
  code: string;
  sessionId?: string;
  sessionInfo?: SessionInfo;
  metadata?: {
    wasCodeFixed: boolean;
    wasImproved: boolean;
    renderingAttempts: number;
  };
}

export interface SessionInfo {
  exists: boolean;
  lastActivity?: Date;
  codeHistory?: number;
  errorHistory?: number;
  conversationLength?: number;
  userPreferences?: string[];
}

export interface SessionResponse {
  success: boolean;
  error?: string;
  message?: string;
  sessionId: string;
  sessionInfo: SessionInfo;
  activeSessions?: string[];
  cleared?: boolean;
  preferences?: Record<string, unknown>;
}

export interface ImproveResponse {
  success: boolean;
  error?: string;
  message?: string;
  code: string;
  originalCode: string;
  feedback: string;
  sessionId: string;
  sessionInfo: SessionInfo;
}

export interface ValidateResponse {
  success: boolean;
  error?: string;
  message?: string;
  valid: boolean;
}

export interface StatusResponse {
  success: boolean;
  error?: string;
  message?: string;
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
async function apiRequest<T = Record<string, unknown>>(
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
    const data = await response.json();    if (!response.ok) {
      throw new ApiError(
        data.error ?? `HTTP error! status: ${response.status}`,
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
   * Generate Manim animation from prompt with session support
   */
  generateAnimation: async (
    prompt: string, 
    sessionId?: string, 
    userPreferences?: Record<string, unknown>
  ): Promise<GenerateResponse> => {
    return apiRequest<GenerateResponse>('/api/manim/generate', {
      method: 'POST',
      body: JSON.stringify({ 
        prompt, 
        sessionId: sessionId ?? 'default',
        userPreferences: userPreferences ?? {}
      }),
    });
  },

  /**
   * Render existing Manim code with session support
   */
  renderAnimation: async (code: string, sessionId?: string): Promise<RenderResponse> => {
    return apiRequest<RenderResponse>('/api/manim/render', {
      method: 'POST',
      body: JSON.stringify({ 
        code, 
        sessionId: sessionId ?? 'default'
      }),
    });
  },

  /**
   * Improve existing Manim code with feedback and session context
   */
  improveCode: async (
    code: string, 
    feedback: string, 
    sessionId?: string
  ): Promise<ImproveResponse> => {
    return apiRequest<ImproveResponse>('/api/manim/improve', {
      method: 'POST',
      body: JSON.stringify({ 
        code, 
        feedback, 
        sessionId: sessionId ?? 'default'
      }),
    });
  },

  /**
   * Get session information
   */
  getSession: async (sessionId?: string): Promise<SessionResponse> => {
    const endpoint = sessionId ? `/api/manim/session/${sessionId}` : '/api/manim/session';
    return apiRequest<SessionResponse>(endpoint);
  },

  /**
   * Clear a conversation session
   */
  clearSession: async (sessionId: string): Promise<SessionResponse> => {
    return apiRequest<SessionResponse>(`/api/manim/session/${sessionId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Set user preferences for a session
   */
  setSessionPreferences: async (
    sessionId: string, 
    preferences: Record<string, unknown>
  ): Promise<SessionResponse> => {
    return apiRequest<SessionResponse>(`/api/manim/session/${sessionId}/preferences`, {
      method: 'POST',
      body: JSON.stringify({ preferences }),
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
