import React from 'react'
import { Link } from 'react-router-dom';

const AuthRequiredModal = () => {
  return (
    <div class="modal" tabindex="-1" role="dialog" id='auth-required-modal'>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Bu işlemi gerçekleştirebilmek için giirş yapmalısınız!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <Link to='/login'><button type="button" class="btn btn-primary">Login</button></Link>
                <Link to='/register'><button type="button" class="btn btn-secondary" data-dismiss="modal">Register</button></Link>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>

  )
}



export default AuthRequiredModal;
