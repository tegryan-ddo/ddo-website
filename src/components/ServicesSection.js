export default function ServicesSection() {
  const services = [
    {
      icon: 'ion-compose',
      title: 'Modern Tooling',
      description: 'Use modern tools with confidence.'
    },
    {
      icon: 'ion-leaf',
      title: 'Clean & Elegant',
      description: 'Clean, testable, maintanable code.'
    },
    {
      icon: 'ion-planet',
      title: 'Sharing vision',
      description: 'We understand your vision and share it.'
    },
    {
      icon: 'ion-earth',
      title: 'Managed solutions',
      description: 'Automate manual work, reduce errors, build quality.'
    }
  ]

  return (
    <section id="services">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>We are AWS experts specializing in software delivery using modern DevOps methodologies.</p>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-sm-6 col-md-3">
              <div className="service-item">
                <i className={`icon ${service.icon}`}></i>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}