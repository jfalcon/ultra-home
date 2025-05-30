import { cookies } from 'next/headers';
import type { RestResponse } from '@/types';
import { HttpStatusCode } from '@/types';
import { SESSION_COOKIE_NAME } from '@/app/constants';

export async function POST() {
  const cookieStore = await cookies();

  const response: RestResponse<string> = {
    success: false,
  };

  try {
    cookieStore.delete(SESSION_COOKIE_NAME);

    // this will convert the enum into a readable string
    response.payload = HttpStatusCode[HttpStatusCode.Ok];

    // set this last to avoid try short circuiting
    response.success = true;

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.Ok,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // never send this to the user in production, simply
    // loging it to STDERR on the server for the demo
    console.error(error); // eslint-disable-line no-console

    // in real life the error code wouldn't be the same as the
    // HTTP codes, but we're just having fun here for the demo
    response.error = {
      code: HttpStatusCode.InternalServerError,
      message: HttpStatusCode[HttpStatusCode.InternalServerError]
    };

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.InternalServerError,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
