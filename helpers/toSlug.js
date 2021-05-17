module.exports = function toSlug(str) {
  return str.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}