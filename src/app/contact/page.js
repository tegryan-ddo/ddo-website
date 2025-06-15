'use client'
import { useState } from 'react'
import CallToAction from '@/components/CallToAction'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section id="slider-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1 className="animated fadeInUp">DROP US A NOTE</h1>
                <p className="animated fadeInUp">Don&apos;t just take our word for it. Check out some of our latest work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="block">
                <h3>How can we help?</h3>
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
                  <div className="form-group-2">
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
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