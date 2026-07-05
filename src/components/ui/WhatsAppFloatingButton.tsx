export default function WhatsAppFloatingButton() {
  const url = 'https://wa.me/917895428914?text=Hello%20Tiger%20Yoga%20Dhyan%20Kendra%2C%20I%20would%20like%20to%20enquire%20about%20booking.'

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(201,169,110,0.22)] bg-[rgba(13,34,24,0.92)] text-white shadow-[0_28px_68px_rgba(3,8,6,0.44)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_34px_88px_rgba(3,8,6,0.54)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="sr-only">WhatsApp chat</span>
      <svg viewBox="0 0 24 24" className="h-8 w-8 whatsapp-icon-glow" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.549 4.086 1.512 5.813L0 24l6.553-1.688A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.149-.2.297-.772.967-.947 1.166-.174.2-.348.223-.645.075-.297-.149-1.255-.462-2.39-1.478-.883-.786-1.48-1.761-1.654-2.059-.174-.297-.018-.458.13-.606.134-.133.297-.348.446-.522.149-.174.198-.298.298-.497.1-.199.05-.373-.025-.522-.075-.149-.672-1.612-.92-2.206-.242-.579-.487-.5-.672-.51-.2-.009-.445-.009-.67-.009-.224 0-.536.087-.817.398-.281.31-1.063 1.04-1.063 2.513 0 1.472 1.088 2.876 1.24 3.074.149.199 2.095 3.2 5.076 4.487.71.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.01-1.413.248-.694.248-1.289.174-1.413-.075-.124-.273-.199-.57-.348z" />
      </svg>
    </a>
  )
}
