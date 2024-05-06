import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req, res) {
    // const jwtToken = localStorage.getItem('jwtToken');

    // try {
    //     // Decode the token
    //     const decodedToken = jwtDecode(jwtToken);

    //     // Extract claims from the token
    //     const subject = decodedToken.sub;
    //     const issuedAt = decodedToken.iat;
    //     const expiration = decodedToken.exp;

    //     console.log("Subject: " + subject);
    //     console.log("Issued At: " + new Date(issuedAt * 1000));
    //     console.log("Expiration: " + new Date(expiration * 1000));
    // } catch (error) {
    //     console.error("Error decoding JWT token: " + error.message);
    // }

    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    // Continue to the next middleware or the request handler
    return NextResponse.next();
}
