'use client'
import { useState, useEffect } from 'react'
import CallToAction from '@/components/CallToAction'

export default function HireUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Hire us form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Hire Us</h1>
                <p>Tell us about your project</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <h2>Stop By For A Visit</h2>
                <ul className="address-block">
                  <li>
                    <i className="fa fa-map-marker"></i>1583 Bay St, Ucluelet, BC, Canada
                  </li>
                  <li>
                    <i className="fa fa-envelope-o"></i>Email: contact@digitaldevops.io
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>Phone: 250-726-6712
                  </li>
                </ul>

                <div style={{ marginTop: '40px' }}>
                  <h3>Ready to Get Started?</h3>
                  <p style={{ marginBottom: '20px' }}>
                    Schedule a free consultation to discuss your project needs and how we can help.
                  </p>
                  <a 
                    href="https://calendly.com/tegryan/digital-devops-intro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-main"
                    style={{ display: 'inline-block' }}
                  >
                    Schedule a Consultation
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div style={{ 
                  height: '300px', 
                  width: '100%', 
                  maxWidth: '455px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isClient ? (
                    <iframe 
                      width="100%" 
                      height="300" 
                      src="https://maps.google.com/maps?q=1583%20Bay%20St%2C%20Ucluelet%2C%20BC%2C%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      Loading map...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: '50px' }}>
            <div className="col-md-12">
              <div className="block">
                <h2>Tell Us About Your Project</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group-2">
                    <textarea 
                      className="form-control" 
                      rows="5" 
                      placeholder="Tell us about your project"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-default" type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}