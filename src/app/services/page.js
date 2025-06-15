import CallToAction from '@/components/CallToAction'

export default function Services() {
  return (
    <>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Our Services</h1>
                <p>List of our services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-work">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <div className="portfolio-menu">
                  <ul>
                    <li className="filter active" data-filter="all">Everything</li>
                    <li className="filter" data-filter=".Branding">Branding</li>
                    <li className="filter" data-filter=".Websites">Websites</li>
                    <li className="filter" data-filter=".Graphic">Graphic</li>
                    <li className="filter" data-filter=".design">Design</li>
                    <li className="filter" data-filter=".Video">Video</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}