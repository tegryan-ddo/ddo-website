import CallToAction from '@/components/CallToAction'

export default function About() {
  return (
    <>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <h1>About Us</h1>
                <p>Passionate about technology, experts in infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <h3 className="subtitle">Who We Are</h3>
                <p>We are a team of DevOps experts passionate about helping businesses transform their software delivery processes.</p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <h3 className="subtitle">What We Do</h3>
                <p>We specialize in cloud architecture, CI/CD pipelines, infrastructure as code, and DevOps best practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}