const UserProfileInfo = (props) => {
    return(
        <div class="box box-author m_b_2rem">
            <div class="post-author row-flex">
                <div class="author-img">
                    <img alt="author avatar" src={`${props.info.image != "" ? `data:image/jpeg;base64,${props.info.image}` : '/assets/images/default.jpg'}`} class="avatar" />
                </div>
                <div class="author-content">
                <div class="top-author">
                    <h5 class="heading-font"><a href="author.html" title="Ryan" rel="author"> {props.info.fullName} </a></h5></div>
                    <p class="d-none d-md-block"> {props.info.bio} </p>
                    <div class="content-social-author">
                        <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
                            <li><a href="#"><i className="icon-facebook"></i></a></li>
                            <li><a href="#"><i className="icon-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileInfo;