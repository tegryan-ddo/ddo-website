'use client'
import { useState } from 'react'
import CallToAction from '@/components/CallToAction'

export default function Apply() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Application submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const culturePoints = [
    {
      icon: 'ion-ios-people',
      title: 'Collaborative Team',
      description: 'Work with talented professionals in a supportive environment.'
    },
    {
      icon: 'ion-ios-lightbulb',
      title: 'Innovation First',
      description: 'We encourage creative thinking and new ideas.'
    },
    {
      icon: 'ion-ios-home',
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options available.'
    },
    {
      icon: 'ion-ios-rocket',
      title: 'Career Growth',
      description: 'Continuous learning and advancement opportunities.'
    }
  ]

  return (
    <>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Work With Us</h1>
                <p>Join our team of DevOps experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apply">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Why Work at Digital DevOps?</h2>
                <p>We&apos;re always looking for talented individuals to join our growing team.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {culturePoints.map((point, index) => (
              <div key={index} className="col-sm-6 col-md-3">
                <div className="culture-point">
                  <i className={`icon ${point.icon}`}></i>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h2 className="text-center">Apply to Join Our Team</h2>
                <form onSubmit={handleSubmit} className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Full Name"
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
                  <div className="form-group">
                    <select 
                      className="form-control"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Position</option>
                      <option value="devops-engineer">DevOps Engineer</option>
                      <option value="cloud-architect">Cloud Architect</option>
                      <option value="sre">Site Reliability Engineer</option>
                      <option value="security-engineer">Security Engineer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Years of Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="url" 
                      className="form-control" 
                      placeholder="Portfolio/LinkedIn URL"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group-2">
                    <textarea 
                      className="form-control" 
                      rows="5" 
                      placeholder="Tell us why you want to join Digital DevOps"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-default" type="submit">Submit Application</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial" style={{ background: '#f7f7f7', padding: '70px 0' }}>
        <div className="container">
          <div className="row">
            <div className="section-title text-center">
              <h2>What Our Team Says</h2>
              <p>Hear from our current employees</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="block">
                <p className="testimonial-text" style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: '28px', marginBottom: '20px' }}>
                  &quot;Working at Digital DevOps has been an incredible journey. The team is supportive, 
                  the projects are challenging, and there&apos;s always opportunity to learn something new.&quot;
                </p>
                <div className="testimonial-author">
                  <h5>John Smith</h5>
                  <p>Senior DevOps Engineer</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="block">
                <p className="testimonial-text" style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: '28px', marginBottom: '20px' }}>
                  &quot;The culture here is amazing. We truly work as a team, and everyone&apos;s ideas are 
                  valued. Plus, the flexibility to work remotely has been a game-changer.&quot;
                </p>
                <div className="testimonial-author">
                  <h5>Sarah Johnson</h5>
                  <p>Cloud Solutions Architect</p>
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