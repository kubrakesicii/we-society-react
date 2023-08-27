import React from 'react'
import { Link } from 'react-router-dom';

const AuthRequiredModal = () => {
  return (
    <div className="modal" tabindex="-1" role="dialog" id='auth-required-modal'>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Bu işlemi gerçekleştirebilmek için giriş yapmalısınız!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <Link to='/login'><button type="button" className="btn btn-primary">Login</button></Link>
                <Link to='/register'><button type="button" className="btn btn-secondary" data-dismiss="modal">Register</button></Link>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>

  )
}



export default AuthRequiredModal;
