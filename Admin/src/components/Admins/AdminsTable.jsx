export const GrantFeatures = (authorityString, adminId, isChecked) => {
  return (
    <>
      <div></div>
    </>
  );
};

// Function to parse the authority string and return true/false for chat
export function isChatEnabled(authorityString) {
  const authorityObj = JSON.parse(authorityString);
  return authorityObj.chat === "true";
}

// Function to handle checkbox changes and update state
export function handleCheckboxChange(adminId, isChecked) {
  // PUT admin's authority
  setData((prevAdmins) =>
    prevAdmins.map((admin) => {
      if (admin.id === adminId) {
        // Update the authority based on isChecked
        const newAuthority = JSON.parse(admin.authority);
        newAuthority.chat = isChecked ? "true" : "false";
        // Return a new admin object with updated authority
        return { ...admin, authority: JSON.stringify(newAuthority) };
      }
      return admin;
    })
  );
}
