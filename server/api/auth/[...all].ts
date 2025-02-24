export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const enhancedRequest = new EnhancedRequest(toWebRequest(event))
  enhancedRequest.__config = config
  return serverAuth().handler(enhancedRequest)
})
