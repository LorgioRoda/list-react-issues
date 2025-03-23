export type Error = "ServerError" | "ClientError" | "Unknown";

export interface ErrorContent {
  code: string;
  message: string;
}

export const getErrorMapper = (name: Error): ErrorContent => {
  const map: Record<Error, ErrorContent> = {
    ServerError: {
      code: "500",
      message: "Something went wrong on our side. Please try again in a moment.",
    },
    ClientError: {
      code: "400",
      message: "Oops! Something’s not right. Try refreshing the page or checking your input.",
    },
    Unknown: {
      code: "Error",
      message: "An unexpected error occurred. Please try again later.",
    },
  };
  
  return map[name] || map.Unknown;
};
