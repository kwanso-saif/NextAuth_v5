// "use client";
// import { useSession } from "next-auth/react";
// import React from "react";

// const page = () => {
//   const { data: session } = useSession();
//   if (!session || !session.user) return <div className="text-red-500 p-5">You Need To Sign In</div>;
//   return <div>This is a client page and must be protected</div>;
// };

// export default page;

'use client'
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const GET_ITEMS = gql`
query Me {
  me {
    createdAt
    email
    emailVerified
    fullName
    id
     
    roles {
      createdAt
      id
      role
      updatedAt
    }
    status
    updatedAt
  }
}
`;

const About = () => {
  const { data: session } = useSession()
  // const { data } = useQuery(GET_ITEMS);

  // useEffect(() => {
  //   console.log("session in about>>>>>>>>", session)
  //   console.log(session?.user?.data?.login?.accessToken, ">>>>>>>>>AT");

  //   if (session && session?.user?.data?.login?.accessToken) {
  //     // getMeData();
  //     console.log(data, "lol>>>>>>>>>>>>>")
  //      getMeData()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session?.user])


  // if (loading) return <p>Loading...</p>;

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error.message}</p>
  //       {/* You can add additional error handling or retry logic here */}
  //     </div>
  //   );
  // }

  // console.log(data)

  const [getMeData, { data, loading, error }] = useLazyQuery(GET_ITEMS);


  useEffect(() => {
    if (!!session) {
      const { user } = session;
      const { login } = user?.data || {};
      const { accessToken } = login || {};

      if (!!accessToken) {
        console.log("access token >>>>", accessToken);
        getMeData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('data in session', session, data)

  return (
    <div>
      <h1 className="text-3xl font-semibold">User Data {JSON.stringify(data)} :)</h1>
    </div>
  );
};

// export ;

const page = About;
export default page;