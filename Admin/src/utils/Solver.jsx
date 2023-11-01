// Fungsi untuk membandingkan objek secara mendalam
export function isObjectsEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (const key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export const IsThisAnImage = (src) => {
  if (src) {
    const typeRegex = /^data:image\/([a-zA-Z]+);base64,/;
    const matches = src.match(typeRegex); // .test
    if (matches && matches.length > 1) {
      const extractedType = matches[1];
      return true;
    }
  } else {
    return false;
  }
};
