import { cookies } from 'next/headers';
import type { RestResponse, SessionInfo } from '@/types';
import { HttpStatusCode } from '@/types';
import { SESSION_COOKIE_NAME } from '@/app/constants';
import { toBase64 } from '@/utility';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const response: RestResponse<string> = {
    success: false,
  };

  try {
    const body = await request.json();

    // in real life we'd validate these, but for the demo we accept anyting... nice
    const { email = '', password = '' } = body;
    const result = (email.trim().length > 0) && (password.trim().length > 0);

    if (result) {
      const session: SessionInfo = {
        user: {
          createdAt: new Date(),
          email: email.trim(),
          emailVerified: false,
          id: '123',
          image: null,
          name: 'John Doe',
          updatedAt: new Date(),
        }
      };

      // encode to prevent special characters from breaking the protocol
      cookieStore.set(SESSION_COOKIE_NAME, toBase64(JSON.stringify(session)));
    } else
      throw Error('User not authenticated.');

    // this will convert the enum into a readable string
    response.payload = HttpStatusCode[HttpStatusCode.Ok];

    // set this last to avoid try short circuiting
    response.success = result;

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.Ok,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // keep this atomic to deleting any residual cookie
    cookieStore.delete(SESSION_COOKIE_NAME);

    // never send this to the user in production, simply
    // loging it to STDERR on the server for the demo
    console.error(error); // eslint-disable-line no-console

    // reset payload to avoid confusion
    response.payload = undefined;

    // in real life the error code wouldn't be the same as the
    // HTTP codes, but we're just having fun here for the demo
    response.error = {
      code: HttpStatusCode.Unauthorized,
      message: HttpStatusCode[HttpStatusCode.Unauthorized]
    };

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.Unauthorized,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
