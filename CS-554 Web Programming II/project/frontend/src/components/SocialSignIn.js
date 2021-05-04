import React from 'react'
import { doSocialSignIn } from '../firebase/FirebaseFunctions'

const SocialSignIn = () => {
    const socialSignOn = async (provider) => {
        try {
            await doSocialSignIn(provider)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 social">
                    <button onClick={() => socialSignOn('google')}>
                        <img
                            //onClick={() => socialSignOn('google')}
                            alt="google signin"
                            src="/imgs/social_media_icon/Google+.png"
                            height="40px"
                        />{' '}
                        Google
                    </button>
                </div>
                <div className="col-sm-6 social">
                    <button onClick={() => socialSignOn('facebook')}>
                        <img
                            alt="facebook signin"
                            src="/imgs/social_media_icon/Facebook.png"
                            height="40px"
                        />{' '}
                        Facebook
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SocialSignIn
