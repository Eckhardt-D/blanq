export default defineEventHandler(async (event) => {
  const { sendAccountVerificationEmail } = useEmails(event)
  await sendAccountVerificationEmail()
  return 'ok'
})
