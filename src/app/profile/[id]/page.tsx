"use client";
import { useRouter } from "next/navigation";
import React from "react";

const UserProfile = ({ params }: any) => {
  const router = useRouter();
  // const { id } = router.query;
  return (
    <>
      <div>profile</div>
      <hr />
      <div>{params.id}</div>
    </>
  );
};

export default UserProfile;
