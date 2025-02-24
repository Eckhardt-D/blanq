export class EnhancedRequest extends Request {
  public __config?: ReturnType<typeof useRuntimeConfig>

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init)
  }
}
