import { 
    NextResponse, 
    type NextRequest 
} from "next/server";

export function proxy(
    request: NextRequest
) {

    const session = request.cookies.get("session");

    const isDashboard =
        request.nextUrl.pathname.startsWith(
            "/dashboard"
        );


    if ( isDashboard && !session ) {

        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );

    }

    return NextResponse.next();

}


export const config = {

    matcher: [
        "/dashboard/:path*"
    ]

};