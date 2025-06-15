import Link from 'next/link'

export default function FeatureSection() {
  return (
    <section id="feature">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-6">
            <h2 className="text-uppercase">Our clients love us!</h2>
            <p>
              Our solution driven approach, managed by experts in DevOps and software development, is designed to ease the anxiety and frustration created by technical challenges. Business leaders trust our highly skilled team to quickly and effectively resolve technical issues so they can focus on growing their business. We understand project scope and business needs vary, and designed our firm to deliver quality results in a package and approach that works for our clients.
            </p>
            <Link href="/clients" className="btn btn-main">Recent Work</Link>
          </div>
        </div>
      </div>
    </section>
  )
}