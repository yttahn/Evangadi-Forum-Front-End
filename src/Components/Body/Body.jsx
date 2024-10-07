import React from 'react';
import './Body.css'; 
import background from '../../assets/bg-svg-f.svg';
import newImage from '../../assets/newpic.jpg'
const Body = () => {
    return (
        <div className="body-container">
      
                <img src={background} alt="Background" className="background-image" />
                <img src={newImage} alt="Evangadi Image" className="front-image" />
              
            <h1>Evangadi
                <br />
                Forum
            </h1>
            <p>
                Welcome to Evangadi Forum—your premier tech community for global networking and learning.
                Join us to connect with peers, collaborate on projects, and enhance your professional growth.
                Explore the features that can elevate your tech journey today.
            </p>
            <div>
                <button className="join-button">Join Now</button>
            </div>
        </div>
    );
};

export default Body;
