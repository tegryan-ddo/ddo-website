import Image from 'next/image'
import Link from 'next/link'

export default function IntroSection() {
  return (
    <section id="intro">
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <div className="block">
              <div className="section-title">
                <h2>About Us</h2>
                <p>&quot;Our team of experts have witnessed different businesses and industries facing the same challenges in software development - how to deliver quickly and reliably. I saw an opportunity to build a team of highly skilled and experienced developers who deliver quality code, on time and support C-Level executives in executing the business strategy. Digital DevOps is that team. &quot; - DDO Founder</p>
              </div>
              <p></p>
              <p><Link href="/about" className="btn btn-main">Read More</Link></p>
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="block">
              <Image 
                src="/img/wrapper-img.png" 
                alt="About Digital DevOps"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}