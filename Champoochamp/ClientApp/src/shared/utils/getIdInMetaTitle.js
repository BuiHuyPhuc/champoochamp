const getIdInMetaTitle = metaTitle => {
  const metaTitleArr = metaTitle.split(`-`);
  return metaTitleArr[metaTitleArr.length - 1];
}

export default getIdInMetaTitle;