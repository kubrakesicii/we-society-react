

const Footer = () => {
    return(
        <footer className="mt-5">
            <div className="container">
                <div className="divider"></div>
                <div className="row">
                    <div className="col-md-6 copyright text-xs-center">
                        <p>Copyright 2023 Designed by <a href="#">wesociety.com</a></p>
                    </div>
                    <div className="col-md-6">
                        <ul className="social-network inline text-md-right text-sm-center">
                            <li className="list-inline-item"><a href="#"><i className="icon-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="icon-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="icon-behance"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;