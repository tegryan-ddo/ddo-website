import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-manu">
              <ul>
                <li><Link href="/hire-us">Hire us</Link></li>
              </ul>
            </div>
            <p>Copyright &copy; Design &amp; Developed by Digital DevOps, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}