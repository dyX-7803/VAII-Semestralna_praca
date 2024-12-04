import React from 'react';


const Footer = () => {
    return (
        <section class="bg-dark text-light">
        <div class="container py-5">
            <div class="row">
            <div class="col-lg-3">
                <div class="lc-block mb-4 text-center">
                <img class="img-fluid" alt="logo" src="/images/logo.png"/>
                </div>
                <div class="lc-block small">
                <div contenteditable="true" class="text-center">
                    <p>I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper matti pibus leo.</p>
                </div>
                </div>


            </div>
            <div class="col-lg-2 offset-lg-1 text-center">
                <div class="lc-block mb-4">
                <div contenteditable="true">
                    <h4>Get Started</h4>
                </div>
                </div>
                <div class="lc-block small">
                <div contenteditable="true">
                    <p>Tutorial</p>
                    <p>Resources
                    <br/>
                    </p>
                    <p>Docs</p>
                    <p>Example</p>
                </div>
                </div>
            </div>
            <div class="col-lg-2 offset-lg-1 text-center">
                <div class="lc-block mb-4">
                <div contenteditable="true">
                    <h4>About us</h4>
                </div>
                </div>
                <div class="lc-block small">
                <div contenteditable="true">
                    <p>Story</p>
                    <p>Work with us</p>
                    <p>Blog</p>
                    <p>News</p>
                </div>
                </div>
            </div>
            <div class="col-lg-2 offset-lg-1 text-center">
                <div class="lc-block mb-4">
                <div contenteditable="true">
                    <h4>Downloads</h4>
                </div>
                </div>
                <div class="lc-block small">
                <div contenteditable="true">

                    <p>Vertex 1.2</p>
                    <p>Templates</p>
                    <p>Sounds</p>
                    <p>Gradients</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="py-5 container">
            <div class="row">
            <div class="col-6 small">
                <div class="lc-block">
                <div contenteditable="true">
                    <p>Copyright © WearWave 2024</p>
                </div>
                </div>
            </div>
            <div class="col-6 text-end small">
                <div class="lc-block">
                <div contenteditable="true">
                    <p>
                    <a class="text-decoration-none" href="/#">License Details</a> -
                    <a class="text-decoration-none" href="/#">Terms &amp; Conditions</a>
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Footer;