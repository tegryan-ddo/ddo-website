import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'Digital DevOps',
  description: 'DevOps consulting & engineering',
  generator: 'Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* CSS Files */}
        <link rel="stylesheet" href="/css/owl.carousel.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/airspace-local-fonts.css" />
        <link rel="stylesheet" href="/css/airspace.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/ionicons.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/syntax.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        
        {/* Scripts */}
        <Script 
          src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
          strategy="beforeInteractive"
        />
        <Script 
          id="jquery-fallback"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.jQuery || document.write('<script src="/js/vendor/jquery-1.10.2.min.js"><\/script>')`
          }}
        />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/plugins.js" strategy="afterInteractive" />
        <Script src="/js/min/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.counterup.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}