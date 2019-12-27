export class LingosSystemError extends Error {
  public constructor(message?: string, public code?: number) {
    super(message);
  }
}
