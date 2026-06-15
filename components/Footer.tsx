import Link from 'next/link'

interface FooterProps {
  /** Show "Back to library" link on the left. Defaults to home variant (copyright + location). */
  backLink?: boolean
}

export function Footer({ backLink = false }: FooterProps) {
  return (
    <footer className="border-t border-border-subtle px-6 py-6 sm:px-12">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
        {backLink ? (
          <Link href="/" className="transition-colors hover:text-accent-cream">
            Back to library
          </Link>
        ) : (
          <span>&copy; {new Date().getFullYear()} Kawin</span>
        )}
        <span>
          {backLink ? `© ${new Date().getFullYear()} Kawin` : 'Bangkok / Online'}
        </span>
      </div>
    </footer>
  )
}
