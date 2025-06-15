import CallToAction from '@/components/CallToAction'

export default function Clients() {
  return (
    <>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Our Happy Clients</h1>
                <p>We love to work with our clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-work">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>A few of our latest projects. (Coming soon!)</h2>
            </div>
            <div className="col-md-12">
              <div className="block">
                <div className="portfolio-contant">
                  <ul id="portfolio-contant-active">
                    {/* Portfolio items will go here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clients-logo-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <div id="clients-logo" className="owl-carousel">
                  {/* Client logos would go here */}
                  <div className="clients-logo-img">
                    <div style={{ 
                      width: '150px', 
                      height: '80px', 
                      background: '#f0f0f0', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      Client Logo
                    </div>
                  </div>
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