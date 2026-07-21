// ============================================
// CodeVerse API Client — HTTP Utility
// ============================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;

  const url = buildUrl(endpoint, params);
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.error?.code || "UNKNOWN_ERROR",
      data?.error?.message || "An unexpected error occurred",
      data?.error?.details,
    );
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | undefined>) =>
    request<T>(endpoint, { method: "GET", params }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};

export { ApiError };
export default api;
