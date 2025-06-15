'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button 
                    type="button" 
                    className="navbar-toggle collapsed" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    data-toggle="collapse" 
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded={!isCollapsed}
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" href="/">
                    <Image 
                      src="/img/logo.png" 
                      alt="Digital DevOps Logo"
                      width={200}
                      height={50}
                      priority
                    />
                  </Link>
                </div>
                
                <div className={`collapse navbar-collapse ${!isCollapsed ? 'in' : ''}`} id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/hire-us">Hire us</Link></li>
                    <li><Link href="/apply">Work with us</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}