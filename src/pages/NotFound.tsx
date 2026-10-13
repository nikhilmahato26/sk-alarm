import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { business } from '../config/business'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center py-20">
      <Helmet>
        <title>Page not found | {business.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <p className="text-sm font-bold text-fire-600">404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">This page could not be found</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-muted">
        The link may be out of date. Head back to the home page to see our fire protection services.
      </p>
      <Link to="/" className={buttonClasses('primary', 'lg', 'mt-8')}>
        Back to home
      </Link>
    </section>
  )
}
