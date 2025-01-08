import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import "./register.css"

function Register() {
    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden background-container2 '>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        The best offer <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>

                    </p>

                </MDBCol>

                <MDBCol md='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 glass-effect'
                        style={{
                            background: "rgba(70, 170, 47, 0.25)", // Semi-transparent background
                            borderRadius: "15px", // Rounded corners
                            boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)", // Subtle shadow
                            backdropFilter: "blur(10px)", // Blur effect
                            WebkitBackdropFilter: "blur(10px)", // Safari support
                            border: "1px solid rgba(255, 255, 255, 0.18)", // Subtle border
                        }}
                    >
                        <MDBCardBody className='p-5'>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' />
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' />
                                </MDBCol>
                            </MDBRow>

                            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' />



                            <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>

                            <div className="text-center"  >

                                <p style={{color:"white"}}>Already have an account? <a href="/login">Login</a></p>
                            </div>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Register;